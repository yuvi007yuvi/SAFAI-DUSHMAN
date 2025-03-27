// Initialize charts and setup event listeners when document is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    setupEventListeners();
    loadFuelData();
});

// Initialize ApexCharts for fuel analytics
function initializeCharts() {
    // Fuel Consumption Trend Chart
    const consumptionOptions = {
        series: [{
            name: 'Fuel Consumption',
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
                    return val + ' Ltrs';
                }
            }
        }
    };

    const consumptionChart = new ApexCharts(document.querySelector("#fuelConsumptionChart"), consumptionOptions);
    consumptionChart.render();

    // Cost Analysis Chart
    const costOptions = {
        series: [{
            name: 'Cost',
            data: [3150, 3500, 2800, 3150, 2940, 3360, 3500, 3150, 2940, 3360, 3500, 3150]
        }],
        chart: {
            type: 'bar',
            height: 350,
            toolbar: {
                show: false
            }
        },
        colors: ['#2196F3'],
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: false,
                columnWidth: '60%'
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: function(val) {
                    return '₹' + val;
                }
            }
        }
    };

    const costChart = new ApexCharts(document.querySelector("#fuelCostChart"), costOptions);
    costChart.render();
}

// Setup event listeners for filters and actions
function setupEventListeners() {
    // Time filter clicks
    document.querySelectorAll('.time-filters .filter').forEach(filter => {
        filter.addEventListener('click', function() {
            document.querySelectorAll('.time-filters .filter').forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            updateAnalytics(this.textContent.toLowerCase());
        });
    });

    // Vehicle filter change
    document.getElementById('vehicleFilter').addEventListener('change', function() {
        filterVehicles(this.value);
    });

    // Fuel type filter change
    document.getElementById('fuelTypeFilter').addEventListener('change', function() {
        filterVehicles(document.getElementById('vehicleFilter').value, this.value);
    });

    // Action button clicks
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.classList[1];
            const vehicleId = this.closest('.fuel-item').querySelector('.vehicle-info h4').textContent;
            handleFuelAction(action, vehicleId);
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('input', function() {
        searchVehicles(this.value);
    });
}

// Load sample fuel data
function loadFuelData() {
    const fuelData = [
        {
            id: 'VH-001',
            type: 'Garbage Truck',
            status: 'good',
            lastRefuel: '2 hours ago',
            fuelLevel: '85%',
            mileage: '4.5 km/l',
            history: [
                { date: 'Today, 10:30 AM', amount: '50 Ltrs', cost: '₹3,500' },
                { date: 'Yesterday, 3:45 PM', amount: '45 Ltrs', cost: '₹3,150' }
            ]
        },
        // Add more vehicle data as needed
    ];

    renderFuelList(fuelData);
}

// Render fuel list
function renderFuelList(vehicles) {
    const fuelList = document.querySelector('.fuel-list');
    fuelList.innerHTML = '';

    vehicles.forEach(vehicle => {
        const vehicleElement = createFuelItem(vehicle);
        fuelList.appendChild(vehicleElement);
    });
}

// Create fuel item element
function createFuelItem(vehicle) {
    const div = document.createElement('div');
    div.className = 'fuel-item';
    div.innerHTML = `
        <div class="fuel-header">
            <div class="vehicle-info">
                <h4>Vehicle ID: ${vehicle.id}</h4>
                <span class="vehicle-type">${vehicle.type}</span>
            </div>
            <div class="fuel-status ${vehicle.status}">${vehicle.status}</div>
        </div>
        <div class="fuel-content">
            <div class="fuel-metrics">
                <div class="metric">
                    <span class="label">Last Refuel</span>
                    <span class="value">${vehicle.lastRefuel}</span>
                </div>
                <div class="metric">
                    <span class="label">Fuel Level</span>
                    <span class="value">${vehicle.fuelLevel}</span>
                </div>
                <div class="metric">
                    <span class="label">Mileage</span>
                    <span class="value">${vehicle.mileage}</span>
                </div>
            </div>
            <div class="fuel-history">
                <h5>Recent History</h5>
                ${vehicle.history.map(entry => `
                    <div class="history-item">
                        <span class="date">${entry.date}</span>
                        <span class="amount">${entry.amount}</span>
                        <span class="cost">${entry.cost}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="fuel-actions">
            <button class="action-btn refuel">Record Refuel</button>
            <button class="action-btn details">View Details</button>
            <button class="action-btn report">Generate Report</button>
        </div>
    `;

    return div;
}

// Filter vehicles based on status and fuel type
function filterVehicles(status, fuelType = 'all') {
    // Implement filtering logic here
    console.log('Filtering vehicles:', status, fuelType);
}

// Search vehicles
function searchVehicles(query) {
    // Implement search logic here
    console.log('Searching vehicles:', query);
}

// Update analytics based on time period
function updateAnalytics(period) {
    // Implement analytics update logic here
    console.log('Updating analytics for period:', period);
}

// Handle fuel-related actions
function handleFuelAction(action, vehicleId) {
    switch(action) {
        case 'refuel':
            showRefuelModal(vehicleId);
            break;
        case 'details':
            showVehicleDetails(vehicleId);
            break;
        case 'report':
            generateReport(vehicleId);
            break;
    }
}

// Show refuel modal
function showRefuelModal(vehicleId) {
    // Implement refuel modal logic here
    console.log('Showing refuel modal for vehicle:', vehicleId);
}

// Show vehicle details
function showVehicleDetails(vehicleId) {
    // Implement vehicle details modal logic here
    console.log('Showing details for vehicle:', vehicleId);
}

// Generate report
function generateReport(vehicleId) {
    // Implement report generation logic here
    console.log('Generating report for vehicle:', vehicleId);
}

// Update data periodically
setInterval(loadFuelData, 30000); // Update every 30 seconds 