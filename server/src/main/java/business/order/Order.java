package business.order;

import java.util.Date;

public record Order(
        long customerOrderId,  // changed from orderId
        int amount,
        Date dateCreated,
        int confirmationNumber,  // changed from long
        long customerId
) {}