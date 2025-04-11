DELETE FROM book;
ALTER TABLE book AUTO_INCREMENT = 1001;

DELETE FROM category;
ALTER TABLE category AUTO_INCREMENT = 1001;

INSERT INTO `category` (`name`) VALUES ('ScienceFiction'),('Romance'),('Fantasy'),('Non-fiction'),('Historical');

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Rita Hayworth and Shawshank Redemption ', 'Stephen King', '',6.00 , 0, TRUE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Death by Fountain', 'Jennifer S. Alderson', '', 5.00, 0, TRUE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Fahrenheit 451', 'Ray Bradbury', '', 15.00, 0, TRUE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Jurassic Park', 'Michael Crichton', '', 0.00, 0, TRUE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Ballad of Songbirds and Snakes', 'Suzanne Collins', '', 13.00, 0, TRUE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('All Systems Red', 'Martha Wells', '', 9.00, 0, TRUE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Road', 'Cormac McCarthy', '', 11.00, 0, TRUE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Cat''s Cradle', 'Kurt Vonnegut', '', 12.00, 0, TRUE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Star Wars Jedi: Battle Scars', 'Sam Maggs', '', 0.00, 0, TRUE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('House of Sky and Breath', 'Sarah J. Maas', '', 14.00, 0, TRUE, FALSE, 1001);


INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Who Could Ever Love You', 'Mary L. Trump', '', 14.00, 0, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Seven Husbands of Evelyn Hugo', 'Taylor Jenkins Reid', '', 20.00, 0, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Emma', 'Jane Austen', '', 10.00, 0, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Flatland', 'Edwin Abbott Abbott', '', 6.00, 0, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('House of Leaves', 'Mark Z. Danielewski', '', 5.00, 0, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Remains of the Day', 'Kazuo Ishiguro', '', 4.00, 0, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('East of Eden', 'John Steinbeck', '', 6.00, 0, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Scarlet Letter', 'Nathaniel Hawthornei', '', 8.00, 0, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Sun Also Rises', 'Ernest Hemingway', '', 11.00, 0, TRUE, FALSE, 1002);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Harry Potter and the Sorcerer''s Stone', 'J. K. Rowling', '', 10.00, 0, TRUE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Housemaid''s Secret', 'Freida McFadden', '', 0.00, 0, TRUE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Perfect Couple', 'Elin Hilderbrand', '', 7.00, 0, TRUE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Hobbit', 'J.R.R. Tolkien', '', 9.00, 0, TRUE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('A Game of Thrones', 'George R.R. Martin', '', 8.00, 0, TRUE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Name of the Wind', 'Patrick Rothfuss', '', 9.00, 0, TRUE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Mistborn: The Final Empire', 'Brandon Sanderson', '', 7.00, 0, TRUE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Eragon', 'Christopher Paolini', '', 6.00, 0, TRUE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Way of Kings', 'Brandon Sanderson', '', 11.00, 0, TRUE, FALSE, 1003);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Learn, Improve, Master', 'Nick Velasquez', '', 1.00, 0, TRUE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', '', 13.00, 0, TRUE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Educated', 'Tara Westover', '', 9.00, 0, TRUE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Atomic Habits', 'James Clear', '', 12.00, 0, TRUE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Power of Habit', 'Charles Duhigg', '', 11.00, 0, TRUE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Becoming', 'Michelle Obama', '', 14.00, 0, TRUE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Outliers: The Story of Success', 'Malcolm Gladwell', '', 8.00, 0, TRUE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Subtle Art of Not Giving a F*ck', 'Mark Manson', '', 10.00, 0, TRUE, FALSE, 1004);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Diary of a Young Girl', 'Anne Frank', '', 7.00, 0, TRUE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Wright Brothers', 'David McCullough', '', 11.00, 0, TRUE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Team of Rivals: The Political Genius of Abraham Lincoln', 'Doris Kearns Goodwin', '', 12.00, 0, TRUE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('1776', 'David McCullough', '', 10.00, 0, TRUE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Guns of August', 'Barbara W. Tuchman', '', 8.00, 0, TRUE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Alexander Hamilton', 'Ron Chernow', '', 13.00, 0, TRUE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Silk Roads: A New History of the World', 'Peter Frankopan', '', 10.00, 0, TRUE, FALSE, 1005);