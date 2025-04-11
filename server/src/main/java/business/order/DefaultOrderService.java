package business.order;

import api.ApiException;
import business.BookstoreDbException;
import business.JdbcUtils;
import business.book.Book;
import business.book.BookDao;
import business.cart.ShoppingCart;
import business.cart.ShoppingCartItem;
import business.customer.Customer;
import business.customer.CustomerDao;
import business.customer.CustomerForm;

import java.sql.Connection;
import java.sql.SQLException;
import java.time.YearMonth;
import java.time.DateTimeException;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

public class DefaultOrderService implements OrderService {

	private BookDao bookDao;
	private CustomerDao customerDao;
	private OrderDao orderDao;
	private LineItemDao lineItemDao;

	public void setBookDao(BookDao bookDao) {
		this.bookDao = bookDao;
	}

	public void setCustomerDao(CustomerDao customerDao) {
		this.customerDao = customerDao;
	}

	public void setOrderDao(OrderDao orderDao) {
		this.orderDao = orderDao;
	}

	public void setLineItemDao(LineItemDao lineItemDao) {
		this.lineItemDao = lineItemDao;
	}

	@Override
	public OrderDetails getOrderDetails(long orderId) {
		try {
			Order order = orderDao.findByOrderId(orderId);
			if (order == null) {
				throw new ApiException.ValidationFailure("Order not found");
			}
			Customer customer = customerDao.findByCustomerId(order.customerId());
			if (customer == null) {
				throw new ApiException.ValidationFailure("Customer not found");
			}
			List<LineItem> lineItems = lineItemDao.findByOrderId(orderId);
			List<Book> books = lineItems
					.stream()
					.map(lineItem -> bookDao.findByBookId(lineItem.bookId()))
					.toList();
			if (books.contains(null)) {
				throw new ApiException.ValidationFailure("Book not found");
			}
			return new OrderDetails(order, customer, lineItems, books);
		} catch (SQLException e) {
			throw new BookstoreDbException("Error retrieving order details", e);
		}
	}

	@Override
	public long placeOrder(CustomerForm customerForm, ShoppingCart cart) {
		validateCustomer(customerForm);
		validateCart(cart);

		try (Connection connection = JdbcUtils.getConnection()) {
			Date ccExpDate = getCardExpirationDate(
					customerForm.getCcExpiryMonth(),
					customerForm.getCcExpiryYear());
			return performPlaceOrderTransaction(
					customerForm.getName(),
					customerForm.getAddress(),
					customerForm.getPhone(),
					customerForm.getEmail(),
					customerForm.getCcNumber(),
					ccExpDate, cart, connection);
		} catch (SQLException e) {
			throw new BookstoreDbException("Error during order placement", e);
		}
	}

	private Date getCardExpirationDate(String monthString, String yearString) {
		try {
			int year = Integer.parseInt(yearString);
			int month = Integer.parseInt(monthString);
			YearMonth expiryDate = YearMonth.of(year, month);
			return java.sql.Date.valueOf(expiryDate.atEndOfMonth());
		} catch (DateTimeException e) {
			throw new ApiException.ValidationFailure("Invalid expiration date");
		}
	}

	private long performPlaceOrderTransaction(
			String name, String address, String phone,
			String email, String ccNumber, Date date,
			ShoppingCart cart, Connection connection) {
		try {
			connection.setAutoCommit(false);
			long customerId = customerDao.create(
					connection, name, address, phone, email,
					ccNumber, date);

			// Calculate total in cents
			int subtotalInCents = cart.getComputedSubtotal();
			int taxInCents = (int)(subtotalInCents * 0.08);
			int surchargeInCents = cart.getSurcharge();
			int totalInCents = subtotalInCents + taxInCents + surchargeInCents;

			long customerOrderId = orderDao.create(
					connection,
					totalInCents,
					generateConfirmationNumber(),
					customerId);

			for (ShoppingCartItem item : cart.getItems()) {
				lineItemDao.create(connection, customerOrderId,
						item.getBookId(), item.getQuantity());
			}
			connection.commit();
			return customerOrderId;
		} catch (Exception e) {
			try {
				connection.rollback();
			} catch (SQLException e1) {
				throw new BookstoreDbException("Failed to roll back transaction", e1);
			}
			throw new ApiException.ValidationFailure("Order placement failed");
		}
	}

	private int generateConfirmationNumber() {
		return Math.abs(ThreadLocalRandom.current().nextInt(999999999));
	}

	private void validateCustomer(CustomerForm customerForm) {
		// Name validation
		String name = customerForm.getName();
		if (name == null || name.trim().isEmpty() || name.length() < 4 || name.length() > 45) {
			throw new ApiException.ValidationFailure("name", "Name must be between 4 and 45 characters");
		}

		// Address validation
		String address = customerForm.getAddress();
		if (address == null || address.trim().isEmpty() || address.length() < 4 || address.length() > 45) {
			throw new ApiException.ValidationFailure("address", "Address must be between 4 and 45 characters");
		}

		// Phone validation
		String phone = customerForm.getPhone();
		if (phone == null || phone.trim().isEmpty()) {
			throw new ApiException.ValidationFailure("phone", "Phone number is required");
		}
		String cleanPhone = phone.replaceAll("[\\s\\-()]", "");
		if (cleanPhone.length() != 10 || !cleanPhone.matches("\\d+")) {
			throw new ApiException.ValidationFailure("phone", "Phone must be exactly 10 digits");
		}

		// Email validation
		String email = customerForm.getEmail();
		if (email == null || email.trim().isEmpty()) {
			throw new ApiException.ValidationFailure("email", "Email is required");
		}
		if (email.contains(" ") || !email.contains("@") || email.endsWith(".")) {
			throw new ApiException.ValidationFailure("email", "Please enter a valid email address");
		}

		// Credit card validation
		String ccNumber = customerForm.getCcNumber();
		if (ccNumber == null || ccNumber.trim().isEmpty()) {
			throw new ApiException.ValidationFailure("ccNumber", "Credit card number is required");
		}
		String cleanCCNumber = ccNumber.replaceAll("[\\s\\-]", "");
		if (cleanCCNumber.length() < 14 || cleanCCNumber.length() > 16 || !cleanCCNumber.matches("\\d+")) {
			throw new ApiException.ValidationFailure("ccNumber", "Invalid credit card number");
		}

		// Expiration date validation
		if (expiryDateIsInvalid(customerForm.getCcExpiryMonth(), customerForm.getCcExpiryYear())) {
			throw new ApiException.ValidationFailure("ccExpiryDate", "Please enter a valid expiration date");
		}
	}

	private boolean expiryDateIsInvalid(String ccExpiryMonth, String ccExpiryYear) {
		try {
			int month = Integer.parseInt(ccExpiryMonth);
			int year = Integer.parseInt(ccExpiryYear);

			YearMonth cardExpiry = YearMonth.of(year, month);
			YearMonth currentDate = YearMonth.now();

			return cardExpiry.isBefore(currentDate);
		} catch (NumberFormatException | DateTimeException e) {
			return true;
		}
	}

	private void validateCart(ShoppingCart cart) {
		if (cart.getItems() == null || cart.getItems().size() <= 0) {
			throw new ApiException.ValidationFailure("Cart is empty");
		}

		cart.getItems().forEach(item -> {
			if (item.getQuantity() < 1 || item.getQuantity() > 99) {
				throw new ApiException.ValidationFailure("Quantity must be between 1 and 99");
			}

			Book databaseBook = bookDao.findByBookId(item.getBookId());
			if (databaseBook == null) {
				throw new ApiException.ValidationFailure("Book not found in database");
			}

			if (item.getBookForm().getPrice() != databaseBook.price()) {
				throw new ApiException.ValidationFailure(
						String.format("Price mismatch with database. Submitted: %d, Database: %d",
								item.getBookForm().getPrice(),
								databaseBook.price())
				);
			}

			if (item.getBookForm().getCategoryId() != databaseBook.categoryId()) {
				throw new ApiException.ValidationFailure(
						String.format("Category mismatch with database. Submitted: %d, Database: %d",
								item.getBookForm().getCategoryId(),
								databaseBook.categoryId())
				);
			}
		});
	}
}