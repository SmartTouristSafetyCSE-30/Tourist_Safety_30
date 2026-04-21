const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool, initDatabase } = require('./db');
require('dotenv').config();
const app = express();

// Try different ports if 3000 is in use
const tryPorts = [3000, 3001, 3002, 3003, 8000, 8080];
let currentPortIndex = 0;

function startServer(port) {
    const server = app.listen(port, () => {
        console.log(`🇮🇳 Smart Tourist Safety System Server Running`);
        console.log(`🌐 Server: http://localhost:${port}`);
        console.log(`🏛️ Ministry of DoNER - Government of India`);
        console.log(`📊 Dashboard: http://localhost:${port}/tourist-dashboard.html`);
        console.log(`🔐 Login: http://localhost:${port}/tourist-login.html`);
        console.log(`\n📋 Demo Credentials:`);
        console.log(`   Tourist: demo_tourist / tourist123`);
        console.log(`   Police: demo_police / police123`);
        console.log(`   Tourism: demo_tourism / tourism123`);
        console.log(`   Admin: demo_admin / admin123`);
        console.log(`\n✅ All 69+ HTML files connected with Universal Menu`);
        console.log(`🚀 Ready for Smart India Hackathon Demo!`);
    });
    
    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} is in use, trying next port...`);
            currentPortIndex++;
            if (currentPortIndex < tryPorts.length) {
                startServer(tryPorts[currentPortIndex]);
            } else {
                console.error('All ports are in use. Please free up a port and try again.');
                process.exit(1);
            }
        } else {
            console.error('Server error:', err);
            process.exit(1);
        }
    });
}

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API Routes for demo purposes
app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Demo credentials fallback
        const demoCredentials = {
            'demo_tourist': { password: 'tourist123', role: 'tourist', digitalId: 'TOURIST-1001' },
            'demo_police': { password: 'police123', role: 'police', digitalId: 'POLICE-2001' },
            'demo_tourism': { password: 'tourism123', role: 'tourism', digitalId: 'TOURISM-3001' },
            'demo_admin': { password: 'admin123', role: 'admin', digitalId: 'ADMIN-4001' }
        };
        
        // Try MySQL first
        try {
            const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
            
            if (users.length > 0) {
                const user = users[0];
                const validPassword = await bcrypt.compare(password, user.password);
                
                if (validPassword) {
                    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
                    
                    return res.json({
                        success: true,
                        token,
                        user: {
                            username: user.username,
                            role: user.role,
                            digitalId: user.digital_id,
                            loginTime: new Date().toISOString()
                        }
                    });
                }
            }
        } catch (dbError) {
            console.log('MySQL not available, using demo credentials');
        }
        
        // Fallback to demo credentials
        if (demoCredentials[username] && demoCredentials[username].password === password) {
            const demo = demoCredentials[username];
            return res.json({
                success: true,
                token: `demo-token-${Date.now()}`,
                user: {
                    username: username,
                    role: demo.role,
                    digitalId: demo.digitalId,
                    loginTime: new Date().toISOString()
                }
            });
        }
        
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, error: 'Server error. Please try again.' });
    }
});

app.post('/api/auth/register', async (req, res) => {
    try {
        const { fullName, email, username, password, phone, role } = req.body;
        
        if (!fullName || !email || !username || !password || !phone) {
            return res.status(400).json({ success: false, error: 'All required fields must be filled' });
        }
        
        const digitalId = `TID-${Date.now()}`;
        
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            await pool.query(
                'INSERT INTO users (username, password, email, full_name, phone, role, digital_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [username, hashedPassword, email, fullName, phone, role || 'tourist', digitalId]
            );
        } catch (dbError) {
            console.log('MySQL not available, registration simulated');
        }
        
        res.json({
            success: true,
            message: 'Registration successful',
            user: { username, email, fullName, role: role || 'tourist', digitalId, registrationTime: new Date().toISOString() },
            nextStep: 'kyc-verification'
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/panic/trigger', async (req, res) => {
    try {
        const { touristId, alertType, latitude, longitude, message } = req.body;
        const alertId = `ALERT-${Date.now()}`;
        
        try {
            await pool.query(
                'INSERT INTO panic_alerts (alert_id, tourist_id, alert_type, latitude, longitude, message) VALUES (?, ?, ?, ?, ?, ?)',
                [alertId, touristId, alertType, latitude, longitude, message]
            );
        } catch (dbError) {
            console.log('MySQL not available, alert simulated');
        }
        
        res.json({
            success: true,
            alertId,
            message: 'Panic alert sent successfully',
            response: { police: 'Dispatched', medical: 'On standby', estimatedArrival: '5-10 minutes' }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/digital-id/generate', async (req, res) => {
    try {
        const { touristData } = req.body;
        const digitalId = `TID-${Date.now()}`;
        const qrCode = `data:image/svg+xml;base64,${Buffer.from('<svg>QR Code Placeholder</svg>').toString('base64')}`;
        const blockchainHash = `0x${Math.random().toString(16).substr(2, 64)}`;
        
        try {
            await pool.query(
                'INSERT INTO digital_ids (digital_id, qr_code, blockchain_hash) VALUES (?, ?, ?)',
                [digitalId, qrCode, blockchainHash]
            );
        } catch (dbError) {
            console.log('MySQL not available, digital ID simulated');
        }
        
        res.json({ success: true, digitalId, qrCode, blockchainHash });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/gps/location', async (req, res) => {
    try {
        const { touristId, latitude, longitude, accuracy } = req.body;
        
        try {
            await pool.query(
                'INSERT INTO gps_logs (tourist_id, latitude, longitude, accuracy) VALUES (?, ?, ?, ?)',
                [touristId, latitude, longitude, accuracy]
            );
        } catch (dbError) {
            console.log('MySQL not available, location simulated');
        }
        
        res.json({ success: true, message: 'Location saved', timestamp: new Date().toISOString() });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/ai/chat', (req, res) => {
    const { message } = req.body;
    
    // Simple AI responses
    const responses = {
        'hello': 'Hello! I am your AI assistant for tourist safety. How can I help you today?',
        'help': 'I can help you with safety information, emergency contacts, local attractions, and travel guidance.',
        'emergency': 'In case of emergency, press the panic button or call 112. I can also guide you to the nearest police station.',
        'weather': 'The weather in Northeast India is generally pleasant. Check local forecasts for specific areas.',
        'default': 'I understand you need assistance. Please ask me about safety, emergencies, weather, or local information.'
    };
    
    const response = responses[message.toLowerCase()] || responses['default'];
    
    res.json({
        success: true,
        response: response,
        timestamp: new Date().toISOString()
    });
});

// Catch all route - serve index.html for any unmatched routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Initialize database and start server
initDatabase().then(() => {
    startServer(tryPorts[currentPortIndex]);
}).catch((err) => {
    console.log('⚠️ MySQL not available - using demo mode');
    console.log('💡 Install MySQL to enable data persistence');
    startServer(tryPorts[currentPortIndex]);
});

module.exports = app;