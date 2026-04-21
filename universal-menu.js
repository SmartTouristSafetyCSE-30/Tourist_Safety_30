// Universal Menu System for Smart Tourist Safety System
// Ministry of Development of North Eastern Region (MoDoNER)
// Government of India

class UniversalMenuSystem {
    constructor() {
        this.menuData = {
            government: {
                title: "🏛️ Government Portal",
                items: [
                    { name: "🏠 Homepage", url: "index.html" },
                    { name: "📍 About North East", url: "about-north-east.html" },
                    { name: "🏢 Departments", url: "departments.html" },
                    { name: "⚙️ Services", url: "services.html" },
                    { name: "📞 Contact", url: "contact.html" },
                    { name: "❓ Help & Support", url: "help-support.html" },
                    { name: "📰 News", url: "news.html" },
                    { name: "📢 Notices", url: "notices.html" },
                    { name: "🏆 Awards", url: "awards.html" },
                    { name: "👥 Ministers & Officers", url: "ministers-officers.html" },
                    { name: "📋 Terms & Privacy", url: "terms-privacy.html" }
                ]
            },
            tourist: {
                title: "👤 Tourist Portal",
                items: [
                    { name: "🔐 Tourist Login", url: "tourist-login.html" },
                    { name: "📝 Tourist Registration", url: "tourist-register.html" },
                    { name: "📊 Tourist Dashboard", url: "tourist-dashboard.html" },
                    { name: "🆔 Digital Tourist ID", url: "digital-tourist-id.html" },
                    { name: "✅ KYC Verification", url: "kyc-verification.html" },
                    { name: "🚨 Panic Button", url: "panic-button.html" },
                    { name: "📍 Live Location", url: "live-location.html" },
                    { name: "👨‍👩‍👧‍👦 Family Tracking", url: "family-tracking.html" },
                    { name: "🛡️ Safety Score", url: "tourist-safety-score.html" },
                    { name: "🔔 Notifications", url: "tourist-notifications.html" },
                    { name: "💬 Feedback", url: "tourist-feedback.html" },
                    { name: "🎤 Voice SOS", url: "voice-sos.html" }
                ]
            },
            ai: {
                title: "🤖 AI & Digital Services",
                items: [
                    { name: "🤖 Ask India Gov AI", url: "ask-india-gov-ai.html" },
                    { name: "🌐 Language Selection", url: "multilingual-selection.html" },
                    { name: "📱 QR Generator", url: "qr-generator.html" },
                    { name: "📷 QR Scanner", url: "qr-scanner.html" },
                    { name: "🆔 QR Tourist ID", url: "qr-tourist-id.html" },
                    { name: "✅ ID Verification", url: "digital-id-verification.html" },
                    { name: "💬 WhatsApp Chatbot", url: "whatsapp-chatbot-access.html" }
                ]
            },
            police: {
                title: "👮 Police Portal",
                items: [
                    { name: "🔐 Police Login", url: "police-login.html" },
                    { name: "📊 Police Dashboard", url: "police-dashboard.html" },
                    { name: "🚨 Live Alerts", url: "live-alerts.html" },
                    { name: "🔍 Tourist Lookup", url: "tourist-lookup.html" },
                    { name: "📄 E-FIR Generation", url: "e-fir-generation.html" },
                    { name: "📋 Police Reports", url: "police-reports.html" },
                    { name: "🔍 Missing Tourist", url: "missing-tourist.html" },
                    { name: "📝 Incident Details", url: "incident-details.html" },
                    { name: "📁 Evidence Logs", url: "evidence-logs.html" },
                    { name: "📍 Last Known Location", url: "last-known-location.html" }
                ]
            },
            tourism: {
                title: "🏛️ Tourism Department",
                items: [
                    { name: "🔐 Tourism Login", url: "tourism-login.html" },
                    { name: "📊 Tourism Dashboard", url: "tourism-dashboard.html" },
                    { name: "📈 Tourist Statistics", url: "tourist-statistics.html" },
                    { name: "⚠️ Risk Zone Management", url: "risk-zone-management.html" },
                    { name: "📋 Tourism Reports", url: "tourism-reports.html" },
                    { name: "📢 Tourism Advisories", url: "tourism-advisories.html" },
                    { name: "🗺️ Tourist Heatmap", url: "tourist-heatmap.html" },
                    { name: "📍 Cluster Map", url: "tourist-cluster-map.html" },
                    { name: "📊 Incident Analytics", url: "incident-analytics.html" },
                    { name: "🏢 Department Info", url: "department-tourism.html" }
                ]
            },
            states: {
                title: "🗺️ North Eastern States",
                items: [
                    { name: "🌿 Assam", url: "Assam.html" },
                    { name: "🏔️ Arunachal Pradesh", url: "Arunchal pradhesh.html" },
                    { name: "🏞️ Manipur", url: "Manipur.html" },
                    { name: "☁️ Meghalaya", url: "Meghalaya.html" },
                    { name: "🌲 Mizoram", url: "Mizoram.html" },
                    { name: "🏕️ Nagaland", url: "Nagaland.html" },
                    { name: "🏔️ Sikkim", url: "Sikkim.html" },
                    { name: "🌺 Tripura", url: "tripura.html" }
                ]
            },
            safety: {
                title: "🛡️ Safety & Monitoring",
                items: [
                    { name: "🚧 Geo-fencing", url: "geo-fencing.html" },
                    { name: "🔍 Anomaly Detection", url: "anomaly-detection.html" },
                    { name: "🤖 AI Risk Predictions", url: "ai-risk-predictions.html" },
                    { name: "🛣️ Route Deviation", url: "route-deviation-alert.html" },
                    { name: "⏰ Inactivity Alert", url: "inactivity-alert.html" },
                    { name: "⌚ Wearable Monitoring", url: "wearable-device-monitoring.html" },
                    { name: "📊 Device Status", url: "wearable-device-status.html" },
                    { name: "📞 Helpline Access", url: "helpline-access.html" }
                ]
            },
            admin: {
                title: "⚙️ Admin & System",
                items: [
                    { name: "🔐 Admin Login", url: "admin-login.html" },
                    { name: "🚪 Logout", url: "logout.html" }
                ]
            }
        };
        
        this.init();
    }
    
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.injectMenu());
        } else {
            this.injectMenu();
        }
    }
    
    injectMenu() {
        this.injectStyles();
        this.injectMenuHTML();
        this.attachEventListeners();
        this.loadUserPreferences();
    }
    
    injectStyles() {
        const styles = `
            <style id="universal-menu-styles">
                /* Universal Menu Styles */
                :root {
                    --gov-blue: #003366;
                    --gov-orange: #FF6600;
                    --gov-white: #FFFFFF;
                    --gov-light-blue: #E6F2FF;
                    --gov-gray: #F5F5F5;
                    --gov-dark-gray: #333333;
                    --gov-border: #CCCCCC;
                }
                
                .universal-menu-toggle {
                    position: fixed;
                    top: 20px;
                    left: 20px;
                    z-index: 1001;
                    background: var(--gov-orange);
                    color: var(--gov-white);
                    border: none;
                    padding: 12px 15px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 18px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                    transition: all 0.3s ease;
                    font-weight: 600;
                }
                
                .universal-menu-toggle:hover {
                    background: #E55A00;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
                }
                
                .universal-side-menu {
                    position: fixed;
                    top: 0;
                    left: -380px;
                    width: 380px;
                    height: 100vh;
                    background: var(--gov-white);
                    box-shadow: 0 0 30px rgba(0, 0, 0, 0.15);
                    z-index: 1000;
                    transition: left 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    overflow-y: auto;
                    border-right: 4px solid var(--gov-orange);
                }
                
                .universal-side-menu.open {
                    left: 0;
                }
                
                .universal-menu-header {
                    background: linear-gradient(135deg, var(--gov-blue) 0%, #004080 100%);
                    color: var(--gov-white);
                    padding: 25px 20px;
                    border-bottom: 3px solid var(--gov-orange);
                    position: sticky;
                    top: 0;
                    z-index: 10;
                }
                
                .universal-menu-title {
                    font-size: 18px;
                    font-weight: 700;
                    margin-bottom: 5px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                .universal-menu-subtitle {
                    font-size: 13px;
                    opacity: 0.9;
                    line-height: 1.4;
                }
                
                .universal-menu-section {
                    margin: 0;
                    border-bottom: 1px solid var(--gov-border);
                }
                
                .universal-menu-section-title {
                    padding: 16px 20px;
                    background: var(--gov-light-blue);
                    font-weight: 600;
                    color: var(--gov-blue);
                    font-size: 14px;
                    border-left: 4px solid var(--gov-orange);
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    user-select: none;
                }
                
                .universal-menu-section-title:hover {
                    background: #D6E9FF;
                }
                
                .universal-menu-section-title .toggle-icon {
                    transition: transform 0.3s ease;
                    font-size: 12px;
                }
                
                .universal-menu-section.collapsed .toggle-icon {
                    transform: rotate(-90deg);
                }
                
                .universal-menu-items {
                    max-height: 500px;
                    overflow: hidden;
                    transition: max-height 0.4s ease;
                }
                
                .universal-menu-section.collapsed .universal-menu-items {
                    max-height: 0;
                }
                
                .universal-menu-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 14px 25px;
                    color: var(--gov-dark-gray);
                    text-decoration: none;
                    border-bottom: 1px solid #f0f0f0;
                    transition: all 0.3s ease;
                    font-size: 14px;
                    position: relative;
                }
                
                .universal-menu-item:hover {
                    background: var(--gov-light-blue);
                    padding-left: 35px;
                    color: var(--gov-blue);
                    border-left: 4px solid var(--gov-orange);
                }
                
                .universal-menu-item.active {
                    background: var(--gov-light-blue);
                    color: var(--gov-blue);
                    font-weight: 600;
                    border-left: 4px solid var(--gov-orange);
                }
                
                .universal-menu-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.6);
                    z-index: 999;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(2px);
                }
                
                .universal-menu-overlay.show {
                    opacity: 1;
                    visibility: visible;
                }
                
                .universal-menu-search {
                    padding: 15px 20px;
                    border-bottom: 1px solid var(--gov-border);
                    background: #fafafa;
                }
                
                .universal-menu-search input {
                    width: 100%;
                    padding: 10px 15px;
                    border: 2px solid var(--gov-border);
                    border-radius: 6px;
                    font-size: 14px;
                    transition: border-color 0.3s ease;
                }
                
                .universal-menu-search input:focus {
                    outline: none;
                    border-color: var(--gov-orange);
                }
                
                .universal-menu-close {
                    position: absolute;
                    top: 25px;
                    right: 20px;
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    color: var(--gov-white);
                    font-size: 20px;
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .universal-menu-close:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: rotate(90deg);
                }
                
                /* Responsive Design */
                @media (max-width: 768px) {
                    .universal-side-menu {
                        width: 100vw;
                        left: -100vw;
                    }
                    
                    .universal-menu-toggle {
                        top: 15px;
                        left: 15px;
                        padding: 10px 12px;
                        font-size: 16px;
                    }
                }
                
                /* Accessibility */
                @media (prefers-reduced-motion: reduce) {
                    .universal-side-menu,
                    .universal-menu-overlay,
                    .universal-menu-items,
                    .universal-menu-item,
                    .universal-menu-toggle {
                        transition: none !important;
                    }
                }
                
                /* High contrast mode */
                @media (prefers-contrast: high) {
                    .universal-side-menu {
                        border: 3px solid #000;
                    }
                    
                    .universal-menu-item {
                        border-bottom: 2px solid #000;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }
    
    injectMenuHTML() {
        const menuHTML = `
            <button class="universal-menu-toggle" onclick="universalMenu.toggleMenu()" aria-label="Toggle navigation menu">
                ☰ Menu
            </button>
            
            <nav class="universal-side-menu" id="universalSideMenu" aria-label="Main navigation">
                <div class="universal-menu-header">
                    <div class="universal-menu-title">
                        🇮🇳 Smart Tourist Safety System
                    </div>
                    <div class="universal-menu-subtitle">
                        Ministry of DoNER, Government of India<br>
                        Ensuring Safe Tourism in North Eastern Region
                    </div>
                    <button class="universal-menu-close" onclick="universalMenu.toggleMenu()" aria-label="Close menu">
                        ×
                    </button>
                </div>
                
                <div class="universal-menu-search">
                    <input type="text" placeholder="🔍 Search pages..." id="menuSearchInput" onkeyup="universalMenu.searchMenu(this.value)">
                </div>
                
                ${this.generateMenuSections()}
            </nav>
            
            <div class="universal-menu-overlay" id="universalMenuOverlay" onclick="universalMenu.toggleMenu()"></div>
        `;
        
        document.body.insertAdjacentHTML('afterbegin', menuHTML);
    }
    
    generateMenuSections() {
        let sectionsHTML = '';
        
        Object.keys(this.menuData).forEach(sectionKey => {
            const section = this.menuData[sectionKey];
            const isCollapsed = localStorage.getItem(`menu-section-${sectionKey}`) === 'collapsed';
            
            sectionsHTML += `
                <div class="universal-menu-section ${isCollapsed ? 'collapsed' : ''}" data-section="${sectionKey}">
                    <div class="universal-menu-section-title" onclick="universalMenu.toggleSection('${sectionKey}')">
                        ${section.title}
                        <span class="toggle-icon">▼</span>
                    </div>
                    <div class="universal-menu-items">
                        ${section.items.map(item => `
                            <a href="${item.url}" class="universal-menu-item" data-search="${item.name.toLowerCase()}">
                                ${item.name}
                            </a>
                        `).join('')}
                    </div>
                </div>
            `;
        });
        
        return sectionsHTML;
    }
    
    attachEventListeners() {
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMenu();
            }
        });
        
        // Mark active page
        this.markActivePage();
        
        // Handle menu item clicks
        document.querySelectorAll('.universal-menu-item').forEach(item => {
            item.addEventListener('click', () => {
                this.closeMenu();
            });
        });
    }
    
    toggleMenu() {
        const menu = document.getElementById('universalSideMenu');
        const overlay = document.getElementById('universalMenuOverlay');
        
        if (menu.classList.contains('open')) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    openMenu() {
        const menu = document.getElementById('universalSideMenu');
        const overlay = document.getElementById('universalMenuOverlay');
        
        menu.classList.add('open');
        overlay.classList.add('show');
        
        // Focus management for accessibility
        const firstMenuItem = menu.querySelector('.universal-menu-item');
        if (firstMenuItem) {
            setTimeout(() => firstMenuItem.focus(), 100);
        }
    }
    
    closeMenu() {
        const menu = document.getElementById('universalSideMenu');
        const overlay = document.getElementById('universalMenuOverlay');
        
        menu.classList.remove('open');
        overlay.classList.remove('show');
        
        // Clear search
        const searchInput = document.getElementById('menuSearchInput');
        if (searchInput) {
            searchInput.value = '';
            this.searchMenu('');
        }
    }
    
    toggleSection(sectionKey) {
        const section = document.querySelector(`[data-section="${sectionKey}"]`);
        const isCollapsed = section.classList.contains('collapsed');
        
        if (isCollapsed) {
            section.classList.remove('collapsed');
            localStorage.removeItem(`menu-section-${sectionKey}`);
        } else {
            section.classList.add('collapsed');
            localStorage.setItem(`menu-section-${sectionKey}`, 'collapsed');
        }
    }
    
    searchMenu(query) {
        const items = document.querySelectorAll('.universal-menu-item');
        const sections = document.querySelectorAll('.universal-menu-section');
        
        if (!query.trim()) {
            // Show all items and restore section states
            items.forEach(item => item.style.display = 'flex');
            sections.forEach(section => {
                const sectionKey = section.dataset.section;
                const isCollapsed = localStorage.getItem(`menu-section-${sectionKey}`) === 'collapsed';
                section.classList.toggle('collapsed', isCollapsed);
            });
            return;
        }
        
        const searchTerm = query.toLowerCase();
        
        // Hide all sections first
        sections.forEach(section => section.classList.add('collapsed'));
        
        items.forEach(item => {
            const searchText = item.dataset.search;
            const matches = searchText.includes(searchTerm);
            
            item.style.display = matches ? 'flex' : 'none';
            
            if (matches) {
                // Show parent section
                const section = item.closest('.universal-menu-section');
                section.classList.remove('collapsed');
            }
        });
    }
    
    markActivePage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const menuItems = document.querySelectorAll('.universal-menu-item');
        
        menuItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href === currentPage) {
                item.classList.add('active');
            }
        });
    }
    
    loadUserPreferences() {
        // Load any saved user preferences
        const savedFontSize = localStorage.getItem('governmentFontSize');
        if (savedFontSize) {
            document.body.style.fontSize = `${savedFontSize}px`;
        }
    }
}

// Initialize Universal Menu System
const universalMenu = new UniversalMenuSystem();

// Export for global access
window.universalMenu = universalMenu;