// Initialize charts and setup event listeners when document is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    setupEventListeners();
    loadWeighmentData();
});

// Initialize ApexCharts for weighment analytics
function initializeCharts() {
    // Waste Collection Trend Chart
    const collectionOptions = {
        series: [{
            name: 'Waste Collection',
            data: [42, 45, 38, 42, 40, 45, 42, 40, 45, 42, 40, 42]
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
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
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

    const collectionChart = new ApexCharts(document.querySelector("#wasteCollectionChart"), collectionOptions);
    collectionChart.render();

    // Collection by Vehicle Type Chart
    const vehicleTypeOptions = {
        series: [{
            name: 'Collection',
            data: [65, 25, 10]
        }],
        chart: {
            type: 'pie',
            height: 350,
            toolbar: {
                show: false
            }
        },
        labels: ['Trucks', 'Vans', 'Auto Rickshaws'],
        colors: ['#2196F3', '#4CAF50', '#FFC107'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        tooltip: {
            theme: 'dark',
            y: {
                formatter: function(val) {
                    return val + '%';
                }
            }
        }
    };

    const vehicleTypeChart = new ApexCharts(document.querySelector("#vehicleTypeChart"), vehicleTypeOptions);
    vehicleTypeChart.render();
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

    // Date filter change
    document.getElementById('dateFilter').addEventListener('change', function() {
        filterWeighmentRecords(this.value);
    });

    // Vehicle filter change
    document.getElementById('vehicleFilter').addEventListener('change', function() {
        filterWeighmentRecords(document.getElementById('dateFilter').value, this.value);
    });

    // Action button clicks
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.classList[1];
            const vehicleId = this.closest('.weighment-item').querySelector('.vehicle-info h4').textContent;
            handleWeighmentAction(action, vehicleId);
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('input', function() {
        searchWeighmentRecords(this.value);
    });
}

// Load sample weighment data
function loadWeighmentData() {
    const weighmentData = [
        {
            id: 'VH-001',
            type: 'Garbage Truck',
            status: 'completed',
            grossWeight: '2.5 Tons',
            netWeight: '2.3 Tons',
            collectionTime: '45 mins',
            dateTime: 'Today, 10:30 AM',
            location: 'Zone A, Sector 1',
            operator: 'John Doe'
        },
        // Add more weighment data as needed
    ];

    renderWeighmentList(weighmentData);
}

// Render weighment list
function renderWeighmentList(records) {
    const weighmentList = document.querySelector('.weighment-list');
    weighmentList.innerHTML = '';

    records.forEach(record => {
        const recordElement = createWeighmentItem(record);
        weighmentList.appendChild(recordElement);
    });
}

// Create weighment item element
function createWeighmentItem(record) {
    const div = document.createElement('div');
    div.className = 'weighment-item';
    div.innerHTML = `
        <div class="weighment-header">
            <div class="vehicle-info">
                <h4>Vehicle ID: ${record.id}</h4>
                <span class="vehicle-type">${record.type}</span>
            </div>
            <div class="weighment-status ${record.status}">${record.status}</div>
        </div>
        <div class="weighment-content">
            <div class="weighment-metrics">
                <div class="metric">
                    <span class="label">Gross Weight</span>
                    <span class="value">${record.grossWeight}</span>
                </div>
                <div class="metric">
                    <span class="label">Net Weight</span>
                    <span class="value">${record.netWeight}</span>
                </div>
                <div class="metric">
                    <span class="label">Collection Time</span>
                    <span class="value">${record.collectionTime}</span>
                </div>
            </div>
            <div class="weighment-details">
                <div class="detail-row">
                    <span class="label">Date & Time:</span>
                    <span class="value">${record.dateTime}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Location:</span>
                    <span class="value">${record.location}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Operator:</span>
                    <span class="value">${record.operator}</span>
                </div>
            </div>
        </div>
        <div class="weighment-actions">
            <button class="action-btn view">View Details</button>
            <button class="action-btn print">Print Receipt</button>
            <button class="action-btn export">Export Data</button>
        </div>
    `;

    return div;
}

// Filter weighment records based on date and vehicle type
function filterWeighmentRecords(date, vehicleType = 'all') {
    // Implement filtering logic here
    console.log('Filtering records:', date, vehicleType);
}

// Search weighment records
function searchWeighmentRecords(query) {
    // Implement search logic here
    console.log('Searching records:', query);
}

// Update analytics based on time period
function updateAnalytics(period) {
    // Implement analytics update logic here
    console.log('Updating analytics for period:', period);
}

// Handle weighment-related actions
function handleWeighmentAction(action, vehicleId) {
    switch(action) {
        case 'view':
            showWeighmentDetails(vehicleId);
            break;
        case 'print':
            printReceipt(vehicleId);
            break;
        case 'export':
            exportWeighmentData(vehicleId);
            break;
    }
}

// Show weighment details
function showWeighmentDetails(vehicleId) {
    // Implement details modal logic here
    console.log('Showing details for vehicle:', vehicleId);
}

// Print receipt
function printReceipt(vehicleId) {
    // Implement receipt printing logic here
    console.log('Printing receipt for vehicle:', vehicleId);
}

// Export weighment data
function exportWeighmentData(vehicleId) {
    // Implement data export logic here
    console.log('Exporting data for vehicle:', vehicleId);
}

// Update data periodically
setInterval(loadWeighmentData, 30000); // Update every 30 seconds 