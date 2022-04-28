

INSERT INTO Buyer_Reviews (text, buyer_rating, buyer_company_id)
VALUES
('This company is the best! They are so nice!', 5, 1);

SELECT * FROM Buyer_Reviews;

ALTER TABLE Buyer_Reviews ADD COLUMN review_rating INTEGER DEFAULT 0;

SELECT * FROM Customer;
INSERT INTO Customer (id, name, email, phone, username, password)
VALUES
(1, 'Timothy Turner', 'ttturner42@gmail.com', '972-943-9506', 'timmyT', 'cosmo');

UPDATE Shipper SET username = 'ElitesWC', password = 'blueberry' WHERE id =3;

SELECT * FROM Shipper;

SELECT * FROM Dates;

INSERT INTO Dates (is_available, is_scheduled, date, company_id)
VALUES
(TRUE, FALSE, CURRENT_DATE, 1),
(TRUE, FALSE, CURRENT_DATE + 1, 1),
(TRUE, FALSE, CURRENT_DATE + 2, 1),
(TRUE, FALSE, CURRENT_DATE + 3, 1),
(TRUE, FALSE, CURRENT_DATE + 4, 1),
(TRUE, FALSE, CURRENT_DATE, 2),
(TRUE, FALSE, CURRENT_DATE + 1, 2),
(TRUE, FALSE, CURRENT_DATE + 2, 2),
(TRUE, FALSE, CURRENT_DATE + 3, 2),
(TRUE, FALSE, CURRENT_DATE + 4, 2),
(TRUE, FALSE, CURRENT_DATE, 3),
(TRUE, FALSE, CURRENT_DATE + 1, 3),
(TRUE, FALSE, CURRENT_DATE + 2, 3),
(TRUE, FALSE, CURRENT_DATE + 3, 3),
(TRUE, FALSE, CURRENT_DATE + 4, 3);

INSERT INTO Delivery (destination, origin_loc, product_name, product_desc, product_picture, delivered_picture, left_warehouse, left_warehouse_date, is_delivered, flagged_for_return, is_return, date_received, buyer_id, seller_id, employee_id)
VALUES('Texas Capitol Building', 'Midwest', 'Election maps', 'Maps of theoretical State House compositions from 2008 and 2020', 'https://imgur.com/ZZH4RC2.png', '', true, CURRENT_DATE - 1, false, false, false, CURRENT_DATE + 1, 1, 13, 76);

SELECT * FROM Delivery;

INSERT INTO Employee (first_name, last_name, company_id, email, phone)
VALUES
('Bernard', 'Sanders', 5, 'sandersVT@Senate.gov', '917-224-5141'),
('Patrick', 'Leahy', 5, 'leahyVT@Senate.gov', '917-734-1745'),
('Susan', 'Collins', 5, 'collinsME@Senate.gov', '917-158-3576'),
('Charles', 'Schumer', 5, 'schumerNY@Senate.gov', '917-185-2699'),
('Elizabeth', 'Warren', 9, 'warrenMA@Senate.gov', '917-925-5571'),
('Thomas', 'Tuberville', 9, 'tubervilleAL@Senate.gov', '205-985-1856'),
('Richard', 'Shelby', 9, 'shelbyAL@Senate.gov', '205-298-0923'),
('William', 'Hagerty', 9, 'hagertyTN@Senate.gov', '205-197-5764'),
('Roger', 'Wicker', 12, 'wickerMS@Senate.gov', '205-987-1234'),
('John', 'Kennedy', 12, 'kennedyLA@Senate.gov', '205-186-6846'),
('William', 'Cassidy', 12, 'cassidyLA@Senate.gov', '205-567-3856'),
('Richard', 'Scott', 12, 'scottFL@Senate.gov', '205-486-5756'),
('Patty', 'Murray', 13, 'murrayWA@Senate.gov', '213-547-8576'),
('Jeffrey', 'Merkley', 13, 'merkleyOR@Senate.gov', '213-567-4635'),
('Dianne', 'Feinstein', 13, 'feinsteinCA@Senate.gov', '213-375-9485');

SELECT * FROM Employee;

SELECT * FROM Review_Rating;

INSERT INTO Shipper (name, email, phone, region, shipping_rates, fleet_size, num_deliveries, is_verified)
VALUES
('Temple Runners', 'templerunners@gmail.com', '917-769-3243', 'Northeast', 300, 10, 0, false),
('All My Sons', 'ihavetoomanykids@gmail.com', '205-975-3486', 'Deep South', 200, 15, 0, false),
('West Coast Elites', 'educatedandstrong@gmail.com', '213-473-9763', 'West Coast', 500, 5, 0, false);

UPDATE Shipper SET bio = 'We love the cold up here!' WHERE id = 1;
UPDATE Shipper SET bio = 'It is hot, and we are hot!' WHERE id = 2;
UPDATE Shipper SET bio = 'Gotta love that west coast air!' WHERE id = 3;

CREATE INDEX names
ON Shipper(name);

SELECT * FROM Shipper;

SELECT * FROM Shipper_Reviews;

INSERT INTO Shipper_Reviews (text, shipper_rating, shipper_company_id)
VALUES
('This company is the best! They are so efficient!', 5, 1);

ALTER TABLE Shipper_Reviews ADD COLUMN review_rating INTEGER DEFAULT 0;

