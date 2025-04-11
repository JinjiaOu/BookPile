package business.customer;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;

public interface CustomerDao {

    public long create(Connection connection,
                       String customerName,
                       String address,
                       String phone,
                       String email,
                       String ccNumber,
                       Date ccExpDate) throws SQLException;

    public List<Customer> findAll() throws SQLException;

    public Customer findByCustomerId(long customerId) throws SQLException;
}

