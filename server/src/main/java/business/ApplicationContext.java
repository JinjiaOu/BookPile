package business;

import business.book.BookDao;
import business.book.BookDaoJdbc;
import business.category.CategoryDao;
import business.category.CategoryDaoJdbc;
import business.order.OrderService;
import business.order.DefaultOrderService;
import business.customer.CustomerDao;
import business.customer.CustomerDaoJdbc;
import business.order.OrderDao;
import business.order.OrderDaoJdbc;
import business.order.LineItemDao;
import business.order.LineItemDaoJdbc;

public class ApplicationContext {

    public static final ApplicationContext INSTANCE = new ApplicationContext();

    private final CategoryDao categoryDao;
    private final BookDao bookDao;
    private final OrderService orderService;
    private final CustomerDao customerDao;
    private final OrderDao orderDao;
    private final LineItemDao lineItemDao;

    private ApplicationContext() {
        // Initialize all DAOs
        this.categoryDao = new CategoryDaoJdbc();
        this.bookDao = new BookDaoJdbc();
        this.customerDao = new CustomerDaoJdbc();
        this.orderDao = new OrderDaoJdbc();
        this.lineItemDao = new LineItemDaoJdbc();

        // Initialize OrderService and set its dependencies
        DefaultOrderService orderService = new DefaultOrderService();
        orderService.setBookDao(bookDao);
        orderService.setCustomerDao(customerDao);
        orderService.setOrderDao(orderDao);
        orderService.setLineItemDao(lineItemDao);
        this.orderService = orderService;
    }

    public static ApplicationContext getInstance() {
        return INSTANCE;
    }

    public CategoryDao getCategoryDao() {
        return categoryDao;
    }

    public BookDao getBookDao() {
        return bookDao;
    }

    public OrderService getOrderService() {
        return orderService;
    }

    public CustomerDao getCustomerDao() {
        return customerDao;
    }

    public OrderDao getOrderDao() {
        return orderDao;
    }

    public LineItemDao getLineItemDao() {
        return lineItemDao;
    }
}