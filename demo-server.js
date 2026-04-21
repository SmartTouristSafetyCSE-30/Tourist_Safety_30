const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.static('.'));

// Mock data for demo
const mockUsers = [
    { id: 1, username: 'demo_tourist', password: 'tourist123', role: 'tourist' },
    { id: 2, username: 'demo_police', password: 'police123', role: 'police' },
    { id: 3, username: 'demo_tourism', password: 'tourism123', role: 'tourism' }
];

// Simple authentication (demo only)
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    const user = mockUsers.find(u => u.username === username && u.password === password);
    
    if (user) {
        res.json({ 
            success: true, 
            token: 'demo_token_' + user.id,
            user: { id: user.id, username: user.username, role: user.role }
        });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Mock APIs for demo
app.post('/api/auth/register', (req, res) => {
    res.json({ success: true, message: 'Registration successful (demo mode)' });
});

app.post('/api/digital-id/generate', (req, res) => {
    res.json({ 
        success: true, 
        digitalId: 'DT-2024-DEMO-' + Date.now(),
        qrData: JSON.stringify({ demo: true, timestamp: Date.now() })
    });
});

app.post('/api/gps/update', (req, res) => {
    res.json({ success: true, message: 'Location updated (demo mode)' });
});

app.post('/api/panic/trigger', (req, res) => {
    res.json({ 
        success: true, 
        alertId: 'ALERT-' + Date.now(),
        message: 'Emergency alert sent (demo mode)'
    });
});

app.get('/api/police/alerts', (req, res) => {
    res.json({ 
        success: true, 
        alerts: [
            { id: 1, tourist_id: 'DT-001', alert_type: 'panic', status: 'active', created_at: new Date() },
            { id: 2, tourist_id: 'DT-002', alert_type: 'geo_fence', status: 'acknowledged', created_at: new Date() }
        ]
    });
});

app.post('/api/ai/chat', (req, res) => {
    const responses = {
        'emergency': 'For emergencies, press the panic button or call 112.',
        'safety': 'Stay in groups, avoid isolated areas, keep emergency contacts handy.',
        'places': 'Popular spots: Kaziranga National Park, Tawang Monastery, Cherrapunji.',
        'default': 'I am Ask India Gov AI. How can I help you today?'
    };
    
    const message = req.body.message || '';
    let response = responses.default;
    
    if (message.toLowerCase().includes('emergency')) response = responses.emergency;
    else if (message.toLowerCase().includes('safety')) response = responses.safety;
    else if (message.toLowerCase().includes('place')) response = responses.places;
    
    res.json({ success: true, response });
});

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('*.html', (req, res) => {
    res.sendFile(path.join(__dirname, req.path));
});

// Start server
app.listen(PORT, () => {
    console.log('🚀 Smart Tourist Safety System Started!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📱 Main Portal: http://localhost:${PORT}`);
    console.log(`👤 Tourist Portal: http://localhost:${PORT}/tourist-login.html`);
    console.log(`👮 Police Portal: http://localhost:${PORT}/police-login.html`);
    console.log(`🏛️ Tourism Dept: http://localhost:${PORT}/tourism-login.html`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎯 Demo Credentials:');
    console.log('   Tourist: demo_tourist / tourist123');
    console.log('   Police: demo_police / police123');
    console.log('   Tourism: demo_tourism / tourism123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ Server running in DEMO mode (no database required)');
});
