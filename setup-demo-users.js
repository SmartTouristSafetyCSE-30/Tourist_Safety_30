const bcrypt = require('bcryptjs');
const { pool, initDatabase } = require('./db');
require('dotenv').config();

async function setupDemoUsers() {
    try {
        await initDatabase();
        
        const demoUsers = [
            { username: 'demo_tourist', password: 'tourist123', email: 'tourist@demo.com', fullName: 'Demo Tourist', phone: '9876543210', role: 'tourist', digitalId: 'TOURIST-1001' },
            { username: 'demo_police', password: 'police123', email: 'police@demo.com', fullName: 'Demo Police Officer', phone: '9876543211', role: 'police', digitalId: 'POLICE-2001' },
            { username: 'demo_tourism', password: 'tourism123', email: 'tourism@demo.com', fullName: 'Demo Tourism Officer', phone: '9876543212', role: 'tourism', digitalId: 'TOURISM-3001' },
            { username: 'demo_admin', password: 'admin123', email: 'admin@demo.com', fullName: 'Demo Admin', phone: '9876543213', role: 'admin', digitalId: 'ADMIN-4001' }
        ];
        
        for (const user of demoUsers) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            
            await pool.query(
                'INSERT INTO users (username, password, email, full_name, phone, role, digital_id) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE password = ?',
                [user.username, hashedPassword, user.email, user.fullName, user.phone, user.role, user.digitalId, hashedPassword]
            );
            
            console.log(`✅ Demo user created: ${user.username}`);
        }
        
        console.log('✅ All demo users setup complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error setting up demo users:', error.message);
        process.exit(1);
    }
}

setupDemoUsers();
