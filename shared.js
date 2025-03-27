// Shared data and functionality across all pages
const globalConfig = {
    apiBaseUrl: 'http://localhost:3000/api', // Replace with your actual API endpoint
    mapCenter: [27.4924, 77.6737], // Mathura coordinates
    refreshInterval: 60000, // 1 minute
};

// Notification System
class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.panel = document.createElement('div');
        this.panel.className = 'notification-panel';
        document.body.appendChild(this.panel);
        this.setupNotificationSystem();
    }

    setupNotificationSystem() {
        const bellIcon = document.querySelector('.fa-bell');
        if (bellIcon) {
            bellIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleNotificationPanel();
            });
        }

        document.addEventListener('click', (e) => {
            if (!this.panel.contains(e.target)) {
                this.panel.style.display = 'none';
            }
        });
    }

    toggleNotificationPanel() {
        this.updateNotificationPanel();
        this.panel.style.display = this.panel.style.display === 'none' ? 'block' : 'none';
    }

    updateNotificationPanel() {
        this.panel.innerHTML = `
            <div class="notification-header">
                <h3>Notifications</h3>
                <button onclick="notificationSystem.markAllAsRead()">Mark all as read</button>
            </div>
            <div class="notification-list">
                ${this.notifications.map(notif => `
                    <div class="notification-item ${notif.read ? '' : 'unread'}">
                        <i class="${notif.icon}"></i>
                        <div class="notification-content">
                            <p>${notif.message}</p>
                            <small>${notif.time}</small>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    addNotification(message, type = 'info') {
        const icons = {
            info: 'fas fa-info-circle',
            warning: 'fas fa-exclamation-triangle',
            success: 'fas fa-check-circle',
            error: 'fas fa-times-circle'
        };

        this.notifications.unshift({
            message,
            icon: icons[type] || icons.info,
            time: new Date().toLocaleTimeString(),
            read: false
        });

        this.updateNotificationBadge();
    }

    markAllAsRead() {
        this.notifications.forEach(notif => notif.read = true);
        this.updateNotificationPanel();
        this.updateNotificationBadge();
    }

    updateNotificationBadge() {
        const unreadCount = this.notifications.filter(n => !n.read).length;
        const bellIcon = document.querySelector('.fa-bell');
        if (bellIcon) {
            const badge = bellIcon.querySelector('.notification-badge') || document.createElement('span');
            badge.className = 'notification-badge';
            badge.textContent = unreadCount || '';
            if (!badge.parentNode) {
                bellIcon.appendChild(badge);
            }
        }
    }
}

// Language System
class LanguageSystem {
    constructor() {
        this.currentLang = 'en';
        this.translations = {
            en: {
                dashboard: 'Dashboard',
                vehicles: 'Vehicles',
                workers: 'Workers',
                complaints: 'Complaints',
                reports: 'Reports',
                settings: 'Settings',
                // Add more translations
            },
            hi: {
                dashboard: 'डैशबोर्ड',
                vehicles: 'वाहन',
                workers: 'कर्मचारी',
                complaints: 'शिकायतें',
                reports: 'रिपोर्ट',
                settings: 'सेटिंग्स',
                // Add more translations
            }
        };
        this.setupLanguageSystem();
    }

    setupLanguageSystem() {
        const globeIcon = document.querySelector('.fa-globe');
        if (globeIcon) {
            globeIcon.addEventListener('click', () => this.toggleLanguagePanel());
        }
    }

    toggleLanguagePanel() {
        const panel = document.createElement('div');
        panel.className = 'language-panel';
        panel.innerHTML = `
            <div class="language-option" onclick="languageSystem.changeLanguage('en')">English</div>
            <div class="language-option" onclick="languageSystem.changeLanguage('hi')">हिंदी</div>
        `;
        
        const existingPanel = document.querySelector('.language-panel');
        if (existingPanel) {
            existingPanel.remove();
        } else {
            document.body.appendChild(panel);
            
            // Position the panel
            const globeIcon = document.querySelector('.fa-globe');
            const rect = globeIcon.getBoundingClientRect();
            panel.style.top = `${rect.bottom + 10}px`;
            panel.style.right = '20px';
        }
    }

    changeLanguage(lang) {
        this.currentLang = lang;
        this.updatePageText();
        document.querySelector('.language-panel')?.remove();
    }

    updatePageText() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.dataset.translate;
            if (this.translations[this.currentLang][key]) {
                element.textContent = this.translations[this.currentLang][key];
            }
        });
    }
}

// Search System
class SearchSystem {
    constructor() {
        this.setupSearchSystem();
    }

    setupSearchSystem() {
        const searchInput = document.querySelector('.search-box input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }
    }

    handleSearch(term) {
        // Implement based on current page
        const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
        switch(currentPage) {
            case 'vehicles':
                initVehicleList(term);
                break;
            case 'workers':
                initWorkerList(term);
                break;
            // Add more cases for other pages
        }
    }
}

// Mobile Menu System
class MobileMenuSystem {
    constructor() {
        this.menuIcon = null;
        this.sidebar = null;
        this.mainContent = null;
        this.clickOutsideHandler = this.handleClickOutside.bind(this);
        this.resizeHandler = this.handleResize.bind(this);
        this.setupMobileMenu();
    }

    setupMobileMenu() {
        this.menuIcon = document.querySelector('.menu-icon');
        this.sidebar = document.querySelector('.sidebar');
        this.mainContent = document.querySelector('.main-content');

        if (this.menuIcon && this.sidebar && this.mainContent) {
            this.menuIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleSidebar();
            });

            // Setup event listeners
            document.addEventListener('click', this.clickOutsideHandler);
            window.addEventListener('resize', this.resizeHandler);
        }
    }

    toggleSidebar() {
        if (this.sidebar && this.mainContent) {
            const isShown = this.sidebar.classList.contains('show');
            if (isShown) {
                this.sidebar.classList.remove('show');
                this.mainContent.classList.remove('expanded');
            } else {
                this.sidebar.classList.add('show');
                this.mainContent.classList.add('expanded');
            }
        }
    }

    handleClickOutside(e) {
        if (this.sidebar && this.menuIcon && window.innerWidth <= 768) {
            if (!this.sidebar.contains(e.target) && !this.menuIcon.contains(e.target)) {
                this.sidebar.classList.remove('show');
                this.mainContent.classList.remove('expanded');
            }
        }
    }

    handleResize() {
        if (window.innerWidth > 768 && this.sidebar && this.mainContent) {
            this.sidebar.classList.remove('show');
            this.mainContent.classList.remove('expanded');
        }
    }
}

// Initialize all systems
let notificationSystem, languageSystem, searchSystem, mobileMenuSystem;

document.addEventListener('DOMContentLoaded', () => {
    notificationSystem = new NotificationSystem();
    languageSystem = new LanguageSystem();
    searchSystem = new SearchSystem();
    mobileMenuSystem = new MobileMenuSystem();

    // Add some sample notifications
    notificationSystem.addNotification('New vehicle added to the fleet', 'success');
    notificationSystem.addNotification('Worker attendance updated', 'info');
    notificationSystem.addNotification('Maintenance required for Vehicle V002', 'warning');
});

// Export for use in other files
window.notificationSystem = notificationSystem;
window.languageSystem = languageSystem;
window.searchSystem = searchSystem;
window.mobileMenuSystem = mobileMenuSystem;