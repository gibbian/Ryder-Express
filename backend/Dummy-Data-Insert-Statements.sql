SELECT * FROM Account;

SELECT * FROM Buyer_Reviews;

SELECT * FROM Customer;

SELECT * FROM Dates;

ALTER TABLE Dates
ADD COLUMN schedule_id INT REFERENCES Schedule(id);

ALTER TABLE Dates
ADD FOREIGN KEY (schedule_id) REFERENCES Schedule(id);

INSERT INTO Dates (is_available, is_scheduled, date, schedule_id)
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


SELECT * FROM Delivery;

INSERT INTO Employee (first_name, last_name, company_name, email, phone)
VALUES
('Bernard', 'Sanders', 'Temple Runners', 'sandersVT@Senate.gov', '917-224-5141'),
('Patrick', 'Leahy', 'Temple Runners', 'leahyVT@Senate.gov', '917-734-1745'),
('Susan', 'Collins', 'Temple Runners', 'collinsME@Senate.gov', '917-158-3576'),
('Charles', 'Schumer', 'Temple Runners', 'schumerNY@Senate.gov', '917-185-2699'),
('Elizabeth', 'Warren', 'Temple Runners', 'warrenMA@Senate.gov', '917-925-5571'),
('Thomas', 'Tuberville', 'All My Sons', 'tubervilleAL@Senate.gov', '205-985-1856'),
('Richard', 'Shelby', 'All My Sons', 'shelbyAL@Senate.gov', '205-298-0923'),
('William', 'Hagerty', 'All My Sons', 'hagertyTN@Senate.gov', '205-197-5764'),
('Roger', 'Wicker', 'All My Sons', 'wickerMS@Senate.gov', '205-987-1234'),
('John', 'Kennedy', 'All My Sons', 'kennedyLA@Senate.gov', '205-186-6846'),
('William', 'Cassidy', 'All My Sons', 'cassidyLA@Senate.gov', '205-567-3856'),
('Richard', 'Scott', 'All My Sons', 'scottFL@Senate.gov', '205-486-5756'),
('Patty', 'Murray', 'West Coast Elites', 'murrayWA@Senate.gov', '213-547-8576'),
('Jeffrey', 'Merkley', 'West Coast Elites', 'merkleyOR@Senate.gov', '213-567-4635'),
('Dianne', 'Feinstein', 'West Coast Elites', 'feinsteinCA@Senate.gov', '213-375-9485');

ALTER TABLE Employee
ADD FOREIGN KEY (company_name) REFERENCES Shipper(name);

SELECT * FROM Employee;

SELECT * FROM Review_Rating;

INSERT INTO Schedule (shipper_company_name)
VALUES
('Temple Runners'),
('All My Sons'),
('West Coast Elites');

ALTER TABLE Schedule
ADD COLUMN shipper_company_name VARCHAR(200);

ALTER TABLE Schedule
ADD FOREIGN KEY (shipper_company_name) REFERENCES Shipper(name);

SELECT * FROM Schedule;

INSERT INTO Shipper (name, email, phone, region, shipping_rates, fleet_size, num_deliveries, is_verified)
VALUES
('Temple Runners', 'templerunners@gmail.com', '917-769-3243', 'Northeast', 300, 10, 0, false),
('All My Sons', 'ihavetoomanykids@gmail.com', '205-975-3486', 'Deep South', 200, 15, 0, false),
('West Coast Elites', 'educatedandstrong@gmail.com', '213-473-9763', 'West Coast', 500, 5, 0, false);

CREATE INDEX names
ON Shipper(name);

SELECT * FROM Shipper;

SELECT * FROM Shipper_Reviews;

