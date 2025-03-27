// Initialize map and setup event listeners when document is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    setupEventListeners();
    loadVehicleData();
});

// Initialize Leaflet map
function initializeMap() {
    // Create map centered on Mathura
    const map = L.map('map').setView([27.4924, 77.6737], 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Store map instance globally
    window.map = map;
}

// Setup event listeners for filters and actions
function setupEventListeners() {
    // Map control button clicks
    document.querySelectorAll('.map-controls .control-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.map-controls .control-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterMapMarkers(this.dataset.filter);
        });
    });

    // Status filter change
    document.getElementById('statusFilter').addEventListener('change', function() {
        filterVehicles(this.value);
    });

    // Type filter change
    document.getElementById('typeFilter').addEventListener('change', function() {
        filterVehicles(document.getElementById('statusFilter').value, this.value);
    });

    // Action button clicks
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.classList[1];
            const vehicleId = this.closest('.vehicle-item').querySelector('.vehicle-info h4').textContent;
            handleVehicleAction(action, vehicleId);
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('input', function() {
        searchVehicles(this.value);
    });
}

// Load sample vehicle data
function loadVehicleData() {
    const vehicleData = [
        {
            id: 'VH-001',
            type: 'Garbage Truck',
            status: 'running',
            speed: '45 km/h',
            distance: '125 km',
            time: '2.5 hrs',
            driver: 'John Doe',
            location: 'Zone A, Sector 1',
            lastUpdate: '2 mins ago',
            coordinates: [27.4924, 77.6737]
        },
        // Add more vehicle data as needed
    ];

    renderVehicleList(vehicleData);
    updateMapMarkers(vehicleData);
}

// Render vehicle list
function renderVehicleList(vehicles) {
    const vehicleList = document.querySelector('.vehicle-list');
    vehicleList.innerHTML = '';

    vehicles.forEach(vehicle => {
        const vehicleElement = createVehicleItem(vehicle);
        vehicleList.appendChild(vehicleElement);
    });
}

// Create vehicle item element
function createVehicleItem(vehicle) {
    const div = document.createElement('div');
    div.className = 'vehicle-item';
    div.innerHTML = `
        <div class="vehicle-header">
            <div class="vehicle-info">
                <h4>Vehicle ID: ${vehicle.id}</h4>
                <span class="vehicle-type">${vehicle.type}</span>
            </div>
            <div class="vehicle-status ${vehicle.status}">${vehicle.status}</div>
        </div>
        <div class="vehicle-content">
            <div class="vehicle-metrics">
                <div class="metric">
                    <span class="label">Speed</span>
                    <span class="value">${vehicle.speed}</span>
                </div>
                <div class="metric">
                    <span class="label">Distance</span>
                    <span class="value">${vehicle.distance}</span>
                </div>
                <div class="metric">
                    <span class="label">Time</span>
                    <span class="value">${vehicle.time}</span>
                </div>
            </div>
            <div class="vehicle-details">
                <div class="detail-row">
                    <span class="label">Driver:</span>
                    <span class="value">${vehicle.driver}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Location:</span>
                    <span class="value">${vehicle.location}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Last Update:</span>
                    <span class="value">${vehicle.lastUpdate}</span>
                </div>
            </div>
        </div>
        <div class="vehicle-actions">
            <button class="action-btn track">Track Live</button>
            <button class="action-btn route">View Route</button>
            <button class="action-btn history">History</button>
        </div>
    `;

    return div;
}

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
                <p>Location: ${vehicle.location}</p>
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

// Filter vehicles based on status and type
function filterVehicles(status, type = 'all') {
    // Implement filtering logic here
    console.log('Filtering vehicles:', status, type);
}

// Search vehicles
function searchVehicles(query) {
    // Implement search logic here
    console.log('Searching vehicles:', query);
}

// Handle vehicle-related actions
function handleVehicleAction(action, vehicleId) {
    switch(action) {
        case 'track':
            trackVehicle(vehicleId);
            break;
        case 'route':
            showVehicleRoute(vehicleId);
            break;
        case 'history':
            showVehicleHistory(vehicleId);
            break;
    }
}

// Track vehicle live
function trackVehicle(vehicleId) {
    // Implement live tracking logic here
    console.log('Tracking vehicle:', vehicleId);
}

// Show vehicle route
function showVehicleRoute(vehicleId) {
    // Implement route display logic here
    console.log('Showing route for vehicle:', vehicleId);
}

// Show vehicle history
function showVehicleHistory(vehicleId) {
    // Implement history display logic here
    console.log('Showing history for vehicle:', vehicleId);
}

// Update data periodically
setInterval(loadVehicleData, 30000); // Update every 30 seconds 