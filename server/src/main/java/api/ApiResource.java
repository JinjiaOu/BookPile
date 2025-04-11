package api;

import business.ApplicationContext;
import business.category.Category;
import business.category.CategoryDao;
import business.book.Book;
import business.book.BookDao;
import business.order.OrderService;
import business.order.OrderDetails;
import business.order.OrderForm;
import business.customer.CustomerForm;
import business.cart.ShoppingCart;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@ApplicationPath("/")
@Path("/")
public class ApiResource {

    private final BookDao bookDao = ApplicationContext.getInstance().getBookDao();
    private final CategoryDao categoryDao = ApplicationContext.getInstance().getCategoryDao();
    private final OrderService orderService = ApplicationContext.INSTANCE.getOrderService();


    @GET
    @Path("categories")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Category> categories(@Context HttpServletRequest httpRequest) {
        try {
            return categoryDao.findAll();
        } catch (Exception e) {
            throw new ApiException("categories lookup failed", e);
        }
    }

    @GET
    @Path("categories/{category-id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Category categoryById(@PathParam("category-id") long categoryId,
                                 @Context HttpServletRequest httpRequest) {
        try {
            Category result = categoryDao.findByCategoryId(categoryId);
            if (result == null) {
                throw new ApiException(String.format("No such category id: %d", categoryId));
            }
            return result;
        } catch (Exception e) {
            throw new ApiException(String.format("Category lookup by category-id %d failed", categoryId), e);
        }
    }

    @GET
    @Path("books/{book-id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Book bookById(@PathParam("book-id") long bookId,
                         @Context HttpServletRequest httpRequest) {
        try {
            Book result = bookDao.findByBookId(bookId);
            if (result == null) {
                throw new ApiException(String.format("No such book id: %d", bookId));
            }
            return result;
        } catch (Exception e) {
            throw new ApiException(String.format("Book lookup by book-id %d failed", bookId), e);
        }
    }

    @GET
    @Path("categories/{category-id}/books")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Book> booksByCategoryId(@PathParam("category-id") long categoryId,
                                        @Context HttpServletRequest httpRequest) {
        try {
            Category category = categoryDao.findByCategoryId(categoryId);
            if (category == null) {
                throw new ApiException(String.format("No such category id: %d", categoryId));
            }
            return bookDao.findByCategoryId(category.categoryId());
        } catch (Exception e) {
            throw new ApiException(String.format("Books lookup by category-id %d failed", categoryId), e);
        }
    }

    @GET
    @Path("categories/{category-id}/suggested-books")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Book> suggestedBooks(@PathParam("category-id") long categoryId,
                                     @QueryParam("limit") @DefaultValue("3") int limit,
                                     @Context HttpServletRequest request) {
        try {
            return bookDao.findRandomByCategoryId(categoryId, limit);
        } catch (Exception e) {
            throw new ApiException("products lookup via categoryName failed", e);
        }
    }

    @GET
    @Path("categories/name/{category-name}")
    @Produces(MediaType.APPLICATION_JSON)
    public Category categoryByName(@PathParam("category-name") String categoryName,
                                   @Context HttpServletRequest httpRequest) {
        try {
            Category result = categoryDao.findByName(categoryName);
            if (result == null) {
                throw new ApiException(String.format("No such category name: %s", categoryName));
            }
            return result;
        } catch (Exception e) {
            throw new ApiException(String.format("Category lookup by name '%s' failed", categoryName), e);
        }
    }

    @GET
    @Path("categories/name/{category-name}/books")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Book> booksByCategoryName(@PathParam("category-name") String categoryName,
                                          @Context HttpServletRequest httpRequest) {
        try {
            Category category = categoryDao.findByName(categoryName);
            if (category == null) {
                throw new ApiException(String.format("No such category name: %s", categoryName));
            }
            return bookDao.findByCategoryId(category.categoryId());
        } catch (Exception e) {
            throw new ApiException(String.format("Books lookup for category name '%s' failed", categoryName), e);
        }
    }

    @GET
    @Path("categories/name/{category-name}/suggested-books")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Book> suggestedBooksByCategoryName(@PathParam("category-name") String categoryName,
                                                   @QueryParam("limit") @DefaultValue("3") int limit,
                                                   @Context HttpServletRequest httpRequest) {
        try {
            Category category = categoryDao.findByName(categoryName);
            if (category == null) {
                throw new ApiException(String.format("No such category name: %s", categoryName));
            }
            return bookDao.findRandomByCategoryId(category.categoryId(), limit);
        } catch (Exception e) {
            throw new ApiException(String.format("Suggested books lookup for category name '%s' failed", categoryName), e);
        }
    }

    @POST
    @Path("orders")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public OrderDetails placeOrder(OrderForm orderForm) {
        try {
            if (orderForm == null || orderForm.getCustomerForm() == null || orderForm.getCart() == null) {
                throw new ApiException.ValidationFailure("Invalid order format");
            }

            long orderId = orderService.placeOrder(orderForm.getCustomerForm(), orderForm.getCart());
            System.out.println("Order placed successfully with ID: " + orderId);

            if (orderId > 0) {
                try {
                    OrderDetails details = orderService.getOrderDetails(orderId);
                    System.out.println("Retrieved order details: " + details);
                    if (details == null) {
                        System.err.println("OrderDetails is null for orderId: " + orderId);
                        throw new ApiException.ValidationFailure("Unable to retrieve order details");
                    }
                    return details;
                } catch (Exception e) {
                    System.err.println("Error retrieving order details for orderId: " + orderId);
                    e.printStackTrace();
                    throw e;
                }
            } else {
                throw new ApiException.ValidationFailure("Unknown error occurred");
            }

        } catch (ApiException e) {
            System.err.println("ApiException occurred: " + e.getMessage());
            throw e;
        } catch (Exception e) {
            System.err.println("Unexpected error: " + e.getMessage());
            e.printStackTrace();
            throw new ApiException("Order placement failed: " + e.getMessage(), e);
        }
    }

}