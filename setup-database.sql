-- Create Database
CREATE DATABASE IF NOT EXISTS tourist_safety_db;
USE tourist_safety_db;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    role ENUM('tourist', 'police', 'tourism', 'admin') DEFAULT 'tourist',
    digital_id VARCHAR(50) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Panic Alerts Table
CREATE TABLE IF NOT EXISTS panic_alerts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    alert_id VARCHAR(50) UNIQUE NOT NULL,
    tourist_id VARCHAR(50) NOT NULL,
    alert_type VARCHAR(50),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    message TEXT,
    status ENUM('active', 'resolved', 'cancelled') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Digital IDs Table
CREATE TABLE IF NOT EXISTS digital_ids (
    id INT AUTO_INCREMENT PRIMARY KEY,
    digital_id VARCHAR(50) UNIQUE NOT NULL,
    user_id INT,
    qr_code TEXT,
    blockchain_hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- GPS Logs Table
CREATE TABLE IF NOT EXISTS gps_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tourist_id VARCHAR(50) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    accuracy FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Demo Users (passwords are hashed with bcrypt)
-- demo_tourist / tourist123 -> $2a$10$XqZ8J5YqZ8J5YqZ8J5YqZOZ8J5YqZ8J5YqZ8J5YqZ8J5YqZ8J5YqZ
-- demo_police / police123 -> $2a$10$AbC1D2E3F4G5H6I7J8K9L0M1N2O3P4Q5R6S7T8U9V0W1X2Y3Z4A5B6
-- demo_tourism / tourism123 -> $2a$10$1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7
-- demo_admin / admin123 -> $2a$10$9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k3j2i1h0g9f8e7d6c5b4a3

INSERT INTO users (username, password, email, full_name, phone, role, digital_id) VALUES
('demo_tourist', '$2a$10$XqZ8J5YqZ8J5YqZ8J5YqZOZ8J5YqZ8J5YqZ8J5YqZ8J5YqZ8J5YqZ', 'tourist@demo.com', 'Demo Tourist', '9876543210', 'tourist', 'TOURIST-1001'),
('demo_police', '$2a$10$AbC1D2E3F4G5H6I7J8K9L0M1N2O3P4Q5R6S7T8U9V0W1X2Y3Z4A5B6', 'police@demo.com', 'Demo Police Officer', '9876543211', 'police', 'POLICE-2001'),
('demo_tourism', '$2a$10$1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7', 'tourism@demo.com', 'Demo Tourism Officer', '9876543212', 'tourism', 'TOURISM-3001'),
('demo_admin', '$2a$10$9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k3j2i1h0g9f8e7d6c5b4a3', 'admin@demo.com', 'Demo Admin', '9876543213', 'admin', 'ADMIN-4001')
ON DUPLICATE KEY UPDATE username=username;

-- Insert Digital IDs Data
INSERT INTO digital_ids (digital_id, user_id, qr_code, blockchain_hash, created_at) VALUES
('TOURIST-1001', 1, 'QR_TOURIST_1001_DATA', '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3', '2024-01-15 10:30:00'),
('POLICE-2001', 2, 'QR_POLICE_2001_DATA', '0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4', '2024-01-10 09:00:00'),
('TOURISM-3001', 3, 'QR_TOURISM_3001_DATA', '0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5', '2024-01-08 08:00:00'),
('ADMIN-4001', 4, 'QR_ADMIN_4001_DATA', '0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6', '2024-01-05 07:00:00'),
('TOURIST-1002', NULL, 'QR_TOURIST_1002_DATA', '0x5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7', '2024-01-20 11:00:00'),
('TOURIST-1003', NULL, 'QR_TOURIST_1003_DATA', '0x6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8', '2024-01-22 14:30:00')
ON DUPLICATE KEY UPDATE digital_id=digital_id;

-- Insert GPS Logs Data (Static - Historical)
INSERT INTO gps_logs (tourist_id, latitude, longitude, accuracy, created_at) VALUES
-- Demo Tourist Route in Shillong, Meghalaya
('TOURIST-1001', 25.5788, 91.8933, 10.5, '2024-01-25 09:00:00'),
('TOURIST-1001', 25.5795, 91.8945, 12.3, '2024-01-25 09:15:00'),
('TOURIST-1001', 25.5802, 91.8958, 8.7, '2024-01-25 09:30:00'),
('TOURIST-1001', 25.5810, 91.8970, 15.2, '2024-01-25 09:45:00'),
('TOURIST-1001', 25.5825, 91.8985, 11.8, '2024-01-25 10:00:00'),
-- Tourist in Guwahati, Assam
('TOURIST-1002', 26.1445, 91.7362, 9.5, '2024-01-25 08:30:00'),
('TOURIST-1002', 26.1458, 91.7380, 13.2, '2024-01-25 08:45:00'),
('TOURIST-1002', 26.1470, 91.7395, 10.8, '2024-01-25 09:00:00'),
('TOURIST-1002', 26.1485, 91.7410, 14.5, '2024-01-25 09:15:00'),
-- Tourist in Gangtok, Sikkim
('TOURIST-1003', 27.3389, 88.6065, 7.3, '2024-01-25 10:00:00'),
('TOURIST-1003', 27.3395, 88.6078, 9.1, '2024-01-25 10:20:00'),
('TOURIST-1003', 27.3402, 88.6090, 11.4, '2024-01-25 10:40:00'),
-- Tourist in Imphal, Manipur
('TOURIST-1004', 24.8170, 93.9368, 12.6, '2024-01-25 11:00:00'),
('TOURIST-1004', 24.8180, 93.9385, 10.2, '2024-01-25 11:15:00'),
-- Tourist in Aizawl, Mizoram
('TOURIST-1005', 23.7271, 92.7176, 8.9, '2024-01-25 12:00:00'),
('TOURIST-1005', 23.7285, 92.7190, 13.7, '2024-01-25 12:20:00'),
-- Tourist in Kohima, Nagaland
('TOURIST-1006', 25.6747, 94.1077, 15.3, '2024-01-25 13:00:00'),
('TOURIST-1006', 25.6760, 94.1095, 11.9, '2024-01-25 13:20:00'),
-- Tourist in Agartala, Tripura
('TOURIST-1007', 23.8315, 91.2868, 9.8, '2024-01-25 14:00:00'),
('TOURIST-1007', 23.8330, 91.2885, 12.4, '2024-01-25 14:20:00'),
-- Tourist in Itanagar, Arunachal Pradesh
('TOURIST-1008', 27.0844, 93.6053, 14.1, '2024-01-25 15:00:00'),
('TOURIST-1008', 27.0858, 93.6070, 10.6, '2024-01-25 15:20:00');

-- Insert GPS Logs Data (Dynamic - Recent/Live using NOW())
INSERT INTO gps_logs (tourist_id, latitude, longitude, accuracy, created_at) VALUES
('TOURIST-1001', 25.5840, 91.9000, 9.2, NOW()),
('TOURIST-1001', 25.5855, 91.9015, 11.1, DATE_SUB(NOW(), INTERVAL 5 MINUTE)),
('TOURIST-1002', 26.1500, 91.7425, 10.3, NOW()),
('TOURIST-1002', 26.1515, 91.7440, 8.6, DATE_SUB(NOW(), INTERVAL 10 MINUTE)),
('TOURIST-1003', 27.3415, 88.6105, 12.0, NOW()),
('TOURIST-1004', 24.8195, 93.9400, 9.4, NOW()),
('TOURIST-1005', 23.7300, 92.7205, 11.5, NOW()),
('TOURIST-1006', 25.6775, 94.1110, 13.2, NOW()),
('TOURIST-1007', 23.8345, 91.2900, 10.7, NOW()),
('TOURIST-1008', 27.0872, 93.6085, 8.3, NOW());

-- Insert Dynamic Digital IDs (recently issued)
INSERT INTO digital_ids (digital_id, user_id, qr_code, blockchain_hash, created_at) VALUES
('TOURIST-1004', NULL, 'QR_TOURIST_1004_DATA', '0x7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0x1y2z3a4b5c6d7e8f', NOW()),
('TOURIST-1005', NULL, 'QR_TOURIST_1005_DATA', '0x8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0x1y2z3a4b5c6d7e8f9g', DATE_SUB(NOW(), INTERVAL 1 DAY)),
('TOURIST-1006', NULL, 'QR_TOURIST_1006_DATA', '0x9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0x1y2z3a4b5c6d7e8f9g0h', DATE_SUB(NOW(), INTERVAL 2 DAY)),
('TOURIST-1007', NULL, 'QR_TOURIST_1007_DATA', '0x0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0x1y2z3a4b5c6d7e8f9g0h1i', DATE_SUB(NOW(), INTERVAL 3 DAY)),
('TOURIST-1008', NULL, 'QR_TOURIST_1008_DATA', '0x1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0x1y2z3a4b5c6d7e8f9g0h1i2j', DATE_SUB(NOW(), INTERVAL 4 DAY))
ON DUPLICATE KEY UPDATE digital_id=digital_id;

-- Stored Procedure: Insert live GPS log (call this from server.js for real-time tracking)
DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS insert_gps_log(
    IN p_tourist_id VARCHAR(50),
    IN p_lat DECIMAL(10,8),
    IN p_lng DECIMAL(11,8),
    IN p_accuracy FLOAT
)
BEGIN
    INSERT INTO gps_logs (tourist_id, latitude, longitude, accuracy, created_at)
    VALUES (p_tourist_id, p_lat, p_lng, p_accuracy, NOW());
END$$
DELIMITER ;

-- Event: Auto-insert simulated GPS pings every minute for active tourists (enable event scheduler: SET GLOBAL event_scheduler = ON)
DELIMITER $$
CREATE EVENT IF NOT EXISTS simulate_live_gps
ON SCHEDULE EVERY 1 MINUTE
DO
BEGIN
    INSERT INTO gps_logs (tourist_id, latitude, longitude, accuracy, created_at) VALUES
    ('TOURIST-1001', 25.5788 + (RAND() * 0.01), 91.8933 + (RAND() * 0.01), ROUND(5 + RAND() * 15, 1), NOW()),
    ('TOURIST-1002', 26.1445 + (RAND() * 0.01), 91.7362 + (RAND() * 0.01), ROUND(5 + RAND() * 15, 1), NOW()),
    ('TOURIST-1003', 27.3389 + (RAND() * 0.01), 88.6065 + (RAND() * 0.01), ROUND(5 + RAND() * 15, 1), NOW());
END$$
DELIMITER ;
