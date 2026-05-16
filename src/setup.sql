-- 
-- ORGANIZATION TABLE
--

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- 
-- Insert sample data: Organizations
-- 
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

-- 
-- SERVICE PROJECT TABLE
--

CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL REFERENCES organization(organization_id),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL
);

-- 
-- Insert sample data: Service Projects
-- 
INSERT INTO service_project (organization_id, title, description, location, date)
VALUES
-- BrightFuture Builders (org 1)
(1, 'Community Center Renovation', 'Renovating the downtown community center with eco-friendly materials and modern amenities.', '450 Main St, Springfield', '2026-06-15'),
(1, 'Affordable Housing Build', 'Constructing energy-efficient homes for low-income families in partnership with local contractors.', '820 Cedar Rd, Springfield', '2026-07-10'),
(1, 'School Playground Rebuild', 'Tearing down and rebuilding an aging playground at Lincoln Elementary with safe, modern equipment.', '55 School Ln, Springfield', '2026-08-05'),
(1, 'Bridge Repair Project', 'Repairing the pedestrian bridge connecting the east and west sides of Riverside Park.', '100 Riverside Park Dr, Springfield', '2026-09-12'),
(1, 'Solar Panel Installation Drive', 'Installing solar panels on community buildings to reduce energy costs and promote sustainability.', '330 Greenway Blvd, Springfield', '2026-10-01'),

-- GreenHarvest Growers (org 2)
(2, 'Neighborhood Garden Initiative', 'Building raised-bed gardens in underserved neighborhoods to promote local food production.', '12 Elm Ave, Riverside', '2026-07-20'),
(2, 'Farm-to-Table Workshop', 'Teaching residents how to grow, harvest, and cook seasonal vegetables from their own gardens.', '98 Harvest Ln, Riverside', '2026-06-25'),
(2, 'Community Composting Program', 'Setting up composting stations across the city to reduce waste and enrich garden soil.', '200 Green St, Riverside', '2026-08-15'),
(2, 'Youth Agriculture Camp', 'A week-long summer camp introducing teens to sustainable farming techniques and career paths.', '75 Meadow Rd, Riverside', '2026-07-07'),
(2, 'Fruit Tree Planting Day', 'Planting 200 fruit trees in public parks and school grounds to increase access to fresh produce.', '40 Orchard Park, Riverside', '2026-09-22'),

-- UnityServe Volunteers (org 3)
(3, 'Summer Food Drive', 'Organizing a city-wide food drive to support local shelters and food banks during the summer months.', '300 Unity Plaza, Lakewood', '2026-08-10'),
(3, 'Senior Companion Program', 'Pairing volunteers with elderly residents for weekly visits, errands, and social activities.', '150 Maple Ave, Lakewood', '2026-06-01'),
(3, 'Back-to-School Supply Drive', 'Collecting and distributing school supplies to students from families in need before the school year.', '500 Civic Center Dr, Lakewood', '2026-08-25'),
(3, 'Holiday Meal Prep', 'Preparing and delivering holiday meals to over 300 families across Lakewood during the winter season.', '22 Warmth Way, Lakewood', '2026-12-18'),
(3, 'Neighborhood Cleanup Day', 'Mobilizing volunteers to clean up litter, paint public benches, and beautify local parks.', '10 Lakeshore Blvd, Lakewood', '2026-10-05');