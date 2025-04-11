package business.order;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public interface LineItemDao {

    public long create(Connection connection, long orderId, long bookId, int quantity) throws SQLException;

    public List<LineItem> findByOrderId(long orderId) throws SQLException;
}