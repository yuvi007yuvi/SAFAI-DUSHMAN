// Sample vehicle data
const vehicles = [
    { id: 'V001', type: 'truck', status: 'active', location: [27.4924, 77.6737], lastUpdate: '2 mins ago', driver: 'John Doe' },
    { id: 'V002', type: 'van', status: 'maintenance', location: [27.4934, 77.6747], lastUpdate: '5 mins ago', driver: 'Jane Smith' },
    { id: 'V003', type: 'truck', status: 'active', location: [27.4914, 77.6727], lastUpdate: '1 min ago', driver: 'Mike Johnson' },
    // Add more vehicles as needed
];

// Initialize map
let vehicleMap;
let markers = [];

function initVehicleMap() {
    vehicleMap = L.map('vehicleMap').setView([27.4924, 77.6737], 12);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(vehicleMap);

    // Add vehicle markers
    updateVehicleMarkers();
}

function updateVehicleMarkers() {
    // Clear existing markers
    markers.forEach(marker => marker.remove());
    markers = [];

    // Add markers for filtered vehicles
    const statusFilter = document.getElementById('statusFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;

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

// Initialize vehicle list
function initVehicleList() {
    const vehicleList = document.querySelector('.vehicle-list');
    vehicleList.innerHTML = '';

    const statusFilter = document.getElementById('statusFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;
    const searchTerm = document.querySelector('.search-box input').value.toLowerCase();

    vehicles.forEach(vehicle => {
        if ((statusFilter === 'all' || vehicle.status === statusFilter) &&
            (typeFilter === 'all' || vehicle.type === typeFilter) &&
            (vehicle.id.toLowerCase().includes(searchTerm) || vehicle.driver.toLowerCase().includes(searchTerm))) {
            
            const vehicleItem = document.createElement('div');
            vehicleItem.className = 'vehicle-item';
            vehicleItem.innerHTML = `
                <div class="vehicle-info">
                    <h4>${vehicle.id}</h4>
                    <p>Driver: ${vehicle.driver}</p>
                    <p>Status: <span class="status ${vehicle.status}">${vehicle.status}</span></p>
                    <p>Last Updated: ${vehicle.lastUpdate}</p>
                </div>
                <div class="vehicle-actions">
                    <button class="edit-btn" onclick="editVehicle('${vehicle.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn" onclick="deleteVehicle('${vehicle.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            vehicleList.appendChild(vehicleItem);
        }
    });
}

// Event Listeners
document.getElementById('statusFilter').addEventListener('change', () => {
    updateVehicleMarkers();
    initVehicleList();
});

document.getElementById('typeFilter').addEventListener('change', () => {
    updateVehicleMarkers();
    initVehicleList();
});

document.querySelector('.search-box input').addEventListener('input', initVehicleList);

document.querySelector('.add-vehicle-btn').addEventListener('click', () => {
    // Implement add vehicle functionality
    alert('Add vehicle functionality will be implemented here');
});

// Vehicle Actions
function editVehicle(id) {
    // Implement edit vehicle functionality
    alert(`Edit vehicle ${id}`);
}

function deleteVehicle(id) {
    if (confirm(`Are you sure you want to delete vehicle ${id}?`)) {
        // Implement delete vehicle functionality
        alert(`Vehicle ${id} deleted`);
    }
}

// Mobile menu toggle
const menuIcon = document.querySelector('.menu-icon');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');

menuIcon.addEventListener('click', () => {
    sidebar.classList.toggle('show');
    mainContent.classList.toggle('expanded');
});

// Initialize the page
window.addEventListener('load', () => {
    initVehicleMap();
    initVehicleList();
}); 