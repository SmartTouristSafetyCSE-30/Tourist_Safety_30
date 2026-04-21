const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'tourist_safety_db',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function initDatabase() {
    try {
        const connection = await pool.getConnection();
        
        await connection.query(`CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            full_name VARCHAR(100) NOT NULL,
            phone VARCHAR(20),
            role ENUM('tourist', 'police', 'tourism', 'admin') DEFAULT 'tourist',
            digital_id VARCHAR(50) UNIQUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);

        await connection.query(`CREATE TABLE IF NOT EXISTS panic_alerts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            alert_id VARCHAR(50) UNIQUE NOT NULL,
            tourist_id VARCHAR(50) NOT NULL,
            alert_type VARCHAR(50),
            latitude DECIMAL(10, 8),
            longitude DECIMAL(11, 8),
            message TEXT,
            status ENUM('active', 'resolved', 'cancelled') DEFAULT 'active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);

        await connection.query(`CREATE TABLE IF NOT EXISTS digital_ids (
            id INT AUTO_INCREMENT PRIMARY KEY,
            digital_id VARCHAR(50) UNIQUE NOT NULL,
            user_id INT,
            qr_code TEXT,
            blockchain_hash VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`);

        await connection.query(`CREATE TABLE IF NOT EXISTS gps_logs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            tourist_id VARCHAR(50) NOT NULL,
            latitude DECIMAL(10, 8),
            longitude DECIMAL(11, 8),
            accuracy FLOAT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);

        connection.release();
        console.log('✅ Database tables initialized');
        return true;
    } catch (error) {
        console.error('❌ Database initialization error:', error.message);
        throw error;
    }
}

module.exports = { pool, initDatabase };
