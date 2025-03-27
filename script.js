// Task Completion Rate Chart
function initializeCharts() {
    const taskChartOptions = {
        series: [{
            name: 'Task Completion Rate',
            data: [65, 75, 70, 80, 85, 90]
        }],
        chart: {
            type: 'line',
            height: 350,
            toolbar: {
                show: false
            }
        },
        colors: ['#6366f1'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.3,
                stops: [0, 90, 100]
            }
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
        },
        yaxis: {
            max: 100,
            labels: {
                formatter: function(val) {
                    return val + '%';
                }
            }
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: function(val) {
                    return val + '%';
                }
            }
        }
    };

    const taskChart = new ApexCharts(document.querySelector("#taskChart"), taskChartOptions);
    taskChart.render();

    // Worker Distribution Chart
    const workerChartOptions = {
        series: [40, 30, 20, 10],
        chart: {
            type: 'donut',
            height: 350
        },
        labels: ['Street Cleaning', 'Garbage Collection', 'Drain Cleaning', 'Others'],
        colors: ['#6366f1', '#22c55e', '#f59e0b', '#f43f5e'],
        plotOptions: {
            pie: {
                donut: {
                    size: '70%'
                }
            }
        },
        legend: {
            position: 'bottom',
            labels: {
                colors: '#666666'
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function(val, opts) {
                return opts.w.config.series[opts.seriesIndex];
            }
        }
    };

    const workerChart = new ApexCharts(document.querySelector("#workerChart"), workerChartOptions);
    workerChart.render();
}

// Add hover effect to cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Handle notification click with a custom notification panel
const notifications = document.querySelector('.fa-bell');
const notificationPanel = document.createElement('div');
notificationPanel.className = 'notification-panel';
notificationPanel.innerHTML = `
    <div class="notification-header">
        <h3>Notifications</h3>
        <button class="close-notifications"><i class="fas fa-times"></i></button>
    </div>
    <div class="notification-list">
        <div class="notification-item">
            <div class="notification-icon">
                <i class="fas fa-tasks"></i>
            </div>
            <div class="notification-content">
                <p>New task assigned: Street Cleaning - Sector 7</p>
                <span class="notification-time">2 minutes ago</span>
            </div>
        </div>
        <div class="notification-item">
            <div class="notification-icon">
                <i class="fas fa-user-plus"></i>
            </div>
            <div class="notification-content">
                <p>New worker joined the team</p>
                <span class="notification-time">1 hour ago</span>
            </div>
        </div>
        <div class="notification-item">
            <div class="notification-icon">
                <i class="fas fa-exclamation-circle"></i>
            </div>
            <div class="notification-content">
                <p>Task report submitted for review</p>
                <span class="notification-time">3 hours ago</span>
            </div>
        </div>
    </div>
`;

// Add notification panel styles
const style = document.createElement('style');
style.textContent = `
    .notification-panel {
        position: absolute;
        top: 60px;
        right: 0;
        width: 300px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        display: none;
    }

    .notification-header {
        padding: 15px 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .notification-header h3 {
        font-size: 1rem;
        font-weight: 600;
        color: var(--text-primary);
    }

    .close-notifications {
        background: none;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        padding: 5px;
        border-radius: 8px;
        transition: all 0.3s ease;
    }

    .close-notifications:hover {
        background: var(--background-color);
        color: var(--text-primary);
    }

    .notification-list {
        max-height: 300px;
        overflow-y: auto;
    }

    .notification-item {
        padding: 15px 20px;
        display: flex;
        align-items: center;
        gap: 15px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease;
    }

    .notification-item:hover {
        background: var(--background-color);
    }

    .notification-icon {
        width: 40px;
        height: 40px;
        background: var(--gradient-primary);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
    }

    .notification-content {
        flex: 1;
    }

    .notification-content p {
        margin-bottom: 5px;
        font-size: 0.9rem;
        color: var(--text-primary);
    }

    .notification-time {
        font-size: 0.8rem;
        color: var(--text-secondary);
    }
`;
document.head.appendChild(style);

// Add notification panel to the DOM
document.body.appendChild(notificationPanel);

// Handle notification click
notifications.addEventListener('click', (e) => {
    e.stopPropagation();
    notificationPanel.style.display = notificationPanel.style.display === 'none' ? 'block' : 'none';
});

// Close notification panel when clicking outside
document.addEventListener('click', (e) => {
    if (!notifications.contains(e.target)) {
        notificationPanel.style.display = 'none';
    }
});

// Close notification panel when clicking close button
notificationPanel.querySelector('.close-notifications').addEventListener('click', () => {
    notificationPanel.style.display = 'none';
});

// Initialize all components when document is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    initializeMap();
    setupEventListeners();
    loadRecentActivity();
    setupNotifications();
    setupLanguageToggle();
});

// Initialize ApexCharts
function initializeCharts() {
    // Waste Collection Trend Chart
    const wasteCollectionOptions = {
        series: [{
            name: 'Waste Collection',
            data: [45, 52, 38, 45, 42, 48, 50, 45, 42, 48, 50, 45]
        }],
        chart: {
            type: 'area',
            height: 350,
            toolbar: {
                show: false
            }
        },
        colors: ['#4CAF50'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.3,
                stops: [0, 90, 100]
            }
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: function(val) {
                    return val + ' Tons';
                }
            }
        }
    };

    const wasteCollectionChart = new ApexCharts(document.querySelector("#wasteCollectionChart"), wasteCollectionOptions);
    wasteCollectionChart.render();

    // Vehicle Status Distribution Chart
    const vehicleStatusOptions = {
        series: [178, 32, 15],
        chart: {
            type: 'donut',
            height: 350
        },
        labels: ['Running', 'Maintenance', 'Inactive'],
        colors: ['#4CAF50', '#FF9800', '#F44336'],
        plotOptions: {
            pie: {
                donut: {
                    size: '70%'
                }
            }
        },
        legend: {
            position: 'bottom',
            labels: {
                colors: '#666666'
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function(val, opts) {
                return opts.w.config.series[opts.seriesIndex];
            }
        }
    };

    const vehicleStatusChart = new ApexCharts(document.querySelector("#vehicleStatusChart"), vehicleStatusOptions);
    vehicleStatusChart.render();
}

// Initialize Leaflet Map
// Sample vehicle data
const vehicles = [
    { id: 'V001', type: 'truck', status: 'active', location: [27.4924, 77.6737], lastUpdate: '2 mins ago', driver: 'John Doe' },
    { id: 'V002', type: 'van', status: 'maintenance', location: [27.4934, 77.6747], lastUpdate: '5 mins ago', driver: 'Jane Smith' },
    { id: 'V003', type: 'truck', status: 'active', location: [27.4914, 77.6727], lastUpdate: '1 min ago', driver: 'Mike Johnson' }
];

// Initialize map and markers array
let vehicleMap;
let markers = [];

function initVehicleMap() {
    vehicleMap = L.map('vehicleMap').setView([27.4924, 77.6737], 12);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(vehicleMap);

    updateVehicleMarkers();
}

function updateVehicleMarkers() {
    // Clear existing markers
    markers.forEach(marker => marker.remove());
    markers = [];

    // Get filter values
    const statusFilter = document.getElementById('statusFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;

    // Add markers for filtered vehicles
    vehicles.forEach(vehicle => {
        if ((statusFilter === 'all' || vehicle.status === statusFilter) &&
            (typeFilter === 'all' || vehicle.type === typeFilter)) {
            
            const marker = L.marker(vehicle.location, {
                icon: L.divIcon({
                    className: `vehicle-marker ${vehicle.status}`,
                    html: `<i class="fas fa-truck"></i>`,
                    iconSize: [30, 30]
                })
            }).addTo(vehicleMap);

            marker.bindPopup(`
                <div class="marker-popup">
                    <h4>Vehicle ${vehicle.id}</h4>
                    <p>Driver: ${vehicle.driver}</p>
                    <p>Status: ${vehicle.status}</p>
                    <p>Last Updated: ${vehicle.lastUpdate}</p>
                </div>
            `);

            markers.push(marker);
        }
    });
}

// Event Listeners
document.getElementById('statusFilter').addEventListener('change', updateVehicleMarkers);
document.getElementById('typeFilter').addEventListener('change', updateVehicleMarkers);

// Initialize map when page loads
window.addEventListener('load', initVehicleMap);

// Update map markers
function updateMapMarkers(vehicles) {
    // Clear existing markers
    if (window.markers) {
        window.markers.forEach(marker => marker.remove());
    }
    window.markers = [];

    // Add new markers
    vehicles.forEach(vehicle => {
        const marker = L.marker(vehicle.coordinates, {
            icon: getVehicleIcon(vehicle.status)
        }).addTo(window.map);

        // Add popup with vehicle info
        marker.bindPopup(`
            <div class="marker-popup">
                <h4>${vehicle.id}</h4>
                <p>${vehicle.type}</p>
                <p>Status: ${vehicle.status}</p>
            </div>
        `);

        window.markers.push(marker);
    });
}

// Get vehicle icon based on status
function getVehicleIcon(status) {
    const iconUrl = {
        running: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        stopped: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        maintenance: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png'
    }[status] || 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png';

    return L.icon({
        iconUrl: iconUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    });
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    const menuIcon = document.querySelector('.menu-icon');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    menuIcon.addEventListener('click', function() {
        sidebar.classList.toggle('show');
        mainContent.classList.toggle('expanded');
    });

    // Map control button clicks
    document.querySelectorAll('.map-controls .control-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.map-controls .control-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterMapMarkers(this.dataset.filter);
        });
    });

    // Time filter clicks
    document.querySelectorAll('.time-filters .filter').forEach(filter => {
        filter.addEventListener('click', function() {
            document.querySelectorAll('.time-filters .filter').forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            updateAnalytics(this.textContent.toLowerCase());
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('input', function() {
        searchDashboard(this.value);
    });
}

// Filter map markers
function filterMapMarkers(status) {
    if (!window.markers) return;

    window.markers.forEach(marker => {
        const vehicleStatus = marker.options.icon.options.iconUrl.includes(status);
        if (status === 'all' || vehicleStatus) {
            marker.addTo(window.map);
        } else {
            marker.remove();
        }
    });
}

// Update analytics based on time period
function updateAnalytics(period) {
    // Implement analytics update logic here
    console.log('Updating analytics for period:', period);
}

// Search dashboard
function searchDashboard(query) {
    // Implement search logic here
    console.log('Searching dashboard for:', query);
}

// Load recent activity
function loadRecentActivity() {
    const activities = [
        {
            type: 'complaint',
            title: 'New Complaint Registered',
            description: 'Garbage collection delay reported in Sector 7',
            time: '2 hours ago'
        },
        {
            type: 'vehicle',
            title: 'Vehicle Status Updated',
            description: 'VH-001 marked as running',
            time: '3 hours ago'
        },
        {
            type: 'collection',
            title: 'Collection Completed',
            description: 'Zone A collection completed successfully',
            time: '4 hours ago'
        }
    ];

    const activityList = document.querySelector('.activity-list');
    activityList.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon ${activity.type}">
                <i class="fas ${getActivityIcon(activity.type)}"></i>
            </div>
            <div class="activity-content">
                <h4>${activity.title}</h4>
                <p>${activity.description}</p>
                <small>${activity.time}</small>
            </div>
        </div>
    `).join('');
}

// Get activity icon
function getActivityIcon(type) {
    const icons = {
        complaint: 'fa-exclamation-circle',
        vehicle: 'fa-truck',
        collection: 'fa-check-circle'
    };
    return icons[type] || 'fa-info-circle';
}

// Setup notifications
function setupNotifications() {
    const notificationIcon = document.querySelector('.header-icons .fa-bell');
    const notificationPanel = document.querySelector('.notification-panel');
    const closeButton = document.querySelector('.close-notifications');

    notificationIcon.addEventListener('click', function() {
        notificationPanel.classList.toggle('show');
    });

    closeButton.addEventListener('click', function() {
        notificationPanel.classList.remove('show');
    });

    // Add sample notifications
    const notifications = [
        {
            type: 'warning',
            title: 'Low Fuel Alert',
            message: 'VH-002 fuel level below 20%',
            time: '5 minutes ago'
        },
        {
            type: 'success',
            title: 'Collection Completed',
            message: 'Zone B collection completed successfully',
            time: '1 hour ago'
        }
    ];

    const notificationList = document.querySelector('.notification-list');
    notificationList.innerHTML = notifications.map(notification => `
        <div class="notification-item ${notification.type}">
            <i class="fas ${getNotificationIcon(notification.type)}"></i>
            <div class="notification-content">
                <h4>${notification.title}</h4>
                <p>${notification.message}</p>
                <small>${notification.time}</small>
            </div>
        </div>
    `).join('');
}

// Get notification icon
function getNotificationIcon(type) {
    const icons = {
        warning: 'fa-exclamation-triangle',
        success: 'fa-check-circle',
        info: 'fa-info-circle'
    };
    return icons[type] || 'fa-info-circle';
}

// Setup language toggle
function setupLanguageToggle() {
    const languageIcon = document.querySelector('.header-icons .fa-globe');
    const languagePanel = document.querySelector('.language-panel');
    const languageOptions = document.querySelectorAll('.language-option');

    languageIcon.addEventListener('click', function() {
        languagePanel.classList.toggle('show');
    });

    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.dataset.lang;
            // Implement language change logic here
            console.log('Changing language to:', lang);
            languagePanel.classList.remove('show');
        });
    });
}

// Update data periodically
setInterval(function() {
    // Update map markers
    const vehicles = [
        { id: 'VH-001', type: 'Garbage Truck', status: 'running', coordinates: [27.4924 + (Math.random() - 0.5) * 0.01, 77.6737 + (Math.random() - 0.5) * 0.01] },
        { id: 'VH-002', type: 'Collection Van', status: 'stopped', coordinates: [27.5024, 77.6837] },
        { id: 'VH-003', type: 'Auto Rickshaw', status: 'maintenance', coordinates: [27.4824, 77.6637] }
    ];
    updateMapMarkers(vehicles);

    // Update recent activity
    loadRecentActivity();
}, 30000); // Update every 30 seconds

// Add map styles
const mapStyle = document.createElement('style');
mapStyle.textContent = `
    .vehicle-marker {
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        border-radius: 50%;
        width: 30px !important;
        height: 30px !important;
    }
    .vehicle-marker.running { background: #4caf50; }
    .vehicle-marker.stopped { background: #f44336; }
    .vehicle-marker.standing { background: #ff9800; }
    .marker-popup { padding: 10px; }
    .marker-popup h4 { margin: 0 0 5px 0; }
    .marker-popup p { margin: 2px 0; }
`;
document.head.appendChild(mapStyle);

// Update real-time data
function updateStats() {
    // This function would typically fetch real-time data from your backend
    const stats = {
        waste: '13807.005',
        vehicles: '225',
        fuel: '31.5k/42.8M',
        attendance: 'P445/T561',
        complaints: '74',
        userFees: '0'
    };

    // Update the stats in the UI
    document.querySelector('.stat-card.blue .stat-number').textContent = stats.waste;
    document.querySelector('.stat-card.green .stat-number').textContent = stats.vehicles;
    document.querySelector('.stat-card.orange .stat-number').textContent = stats.fuel;
    document.querySelector('.stat-card.purple .stat-number').textContent = stats.attendance;
    document.querySelector('.stat-card.pink .stat-number').textContent = stats.complaints;
    document.querySelector('.stat-card.violet .stat-number').textContent = stats.userFees;

    // Update charts with new data
    // This is where you would update the charts with real-time data
}

// Update stats periodically
setInterval(updateStats, 60000); // Update every minute

// Add menu toggle functionality
const menuIcon = document.querySelector('.menu-icon');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');

menuIcon.addEventListener('click', () => {
    sidebar.classList.toggle('show');
    mainContent.classList.toggle('expanded');
});

// Add filter functionality
document.querySelectorAll('.map-filters button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.map-filters button').forEach(b => b.classList.remove('active'));
        button.classList.add('active');
    });
});

// Add search functionality
const searchInput = document.querySelector('.search-box input');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    // You can implement the search logic here
    console.log('Searching for:', searchTerm);
});

// Handle "More" link functionality
function handleMoreLink() {
    const moreLink = document.querySelector('.more-link');
    if (moreLink) {
        moreLink.addEventListener('click', (e) => {
            e.preventDefault();
            const navLinks = document.querySelectorAll('.nav-links li:not(.more-link)');
            navLinks.forEach(link => {
                link.style.display = link.style.display === 'none' ? 'block' : 'none';
            });
            moreLink.querySelector('i').classList.toggle('fa-ellipsis-h');
            moreLink.querySelector('i').classList.toggle('fa-ellipsis-v');
        });
    }
}