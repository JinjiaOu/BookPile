package business.book;

public record Book(
		long bookId,
		String title,
		String author,
		int price,
		boolean isPublic,
		long categoryId,
		String description,  // Newly added
		int rating,          // Newly added
		boolean isFeatured   // Newly added
) {}

