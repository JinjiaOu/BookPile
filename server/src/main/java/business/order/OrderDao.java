package business.order;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public interface OrderDao {

    public long create(Connection connection, int amount, int confirmationNumber, long customerId) throws SQLException;

    public List<Order> findAll() throws SQLException;

    public Order findByOrderId(long orderId) throws SQLException;

    public List<Order> findByCustomerId(long customerId) throws SQLException;
}