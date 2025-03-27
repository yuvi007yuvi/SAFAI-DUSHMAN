// Initialize charts and setup event listeners when document is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    setupEventListeners();
    loadTaxData();
});

// Initialize ApexCharts for tax analytics
function initializeCharts() {
    // Collection Trend Chart
    const trendOptions = {
        series: [{
            name: 'Collection',
            data: [250000, 280000, 220000, 250000, 240000, 260000, 250000, 240000, 260000, 250000, 240000, 250000]
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
                    return '₹' + val.toLocaleString();
                }
            }
        }
    };

    const trendChart = new ApexCharts(document.querySelector("#collectionTrendChart"), trendOptions);
    trendChart.render();

    // Collection by Zone Chart
    const zoneOptions = {
        series: [{
            name: 'Collection',
            data: [45, 30, 25]
        }],
        chart: {
            type: 'pie',
            height: 350,
            toolbar: {
                show: false
            }
        },
        labels: ['Zone A', 'Zone B', 'Zone C'],
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

    const zoneChart = new ApexCharts(document.querySelector("#zoneCollectionChart"), zoneOptions);
    zoneChart.render();
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

    // Status filter change
    document.getElementById('statusFilter').addEventListener('change', function() {
        filterTaxRecords(this.value);
    });

    // Zone filter change
    document.getElementById('zoneFilter').addEventListener('change', function() {
        filterTaxRecords(document.getElementById('statusFilter').value, this.value);
    });

    // Action button clicks
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.classList[1];
            const billNo = this.closest('.tax-item').querySelector('.customer-info h4').textContent;
            handleTaxAction(action, billNo);
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('input', function() {
        searchTaxRecords(this.value);
    });
}

// Load sample tax data
function loadTaxData() {
    const taxData = [
        {
            billNo: 'TAX-001',
            type: 'Residential',
            status: 'paid',
            amount: '₹2,500',
            dueDate: '15 Mar 2024',
            paymentDate: '10 Mar 2024',
            customerName: 'John Doe',
            propertyId: 'PROP-001',
            zone: 'Zone A'
        },
        // Add more tax data as needed
    ];

    renderTaxList(taxData);
}

// Render tax list
function renderTaxList(records) {
    const taxList = document.querySelector('.tax-list');
    taxList.innerHTML = '';

    records.forEach(record => {
        const recordElement = createTaxItem(record);
        taxList.appendChild(recordElement);
    });
}

// Create tax item element
function createTaxItem(record) {
    const div = document.createElement('div');
    div.className = 'tax-item';
    div.innerHTML = `
        <div class="tax-header">
            <div class="customer-info">
                <h4>Bill No: ${record.billNo}</h4>
                <span class="customer-type">${record.type}</span>
            </div>
            <div class="tax-status ${record.status}">${record.status}</div>
        </div>
        <div class="tax-content">
            <div class="tax-metrics">
                <div class="metric">
                    <span class="label">Amount</span>
                    <span class="value">${record.amount}</span>
                </div>
                <div class="metric">
                    <span class="label">Due Date</span>
                    <span class="value">${record.dueDate}</span>
                </div>
                <div class="metric">
                    <span class="label">Payment Date</span>
                    <span class="value">${record.paymentDate}</span>
                </div>
            </div>
            <div class="tax-details">
                <div class="detail-row">
                    <span class="label">Customer Name:</span>
                    <span class="value">${record.customerName}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Property ID:</span>
                    <span class="value">${record.propertyId}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Zone:</span>
                    <span class="value">${record.zone}</span>
                </div>
            </div>
        </div>
        <div class="tax-actions">
            <button class="action-btn view">View Bill</button>
            <button class="action-btn print">Print Receipt</button>
            <button class="action-btn history">Payment History</button>
        </div>
    `;

    return div;
}

// Filter tax records based on status and zone
function filterTaxRecords(status, zone = 'all') {
    // Implement filtering logic here
    console.log('Filtering records:', status, zone);
}

// Search tax records
function searchTaxRecords(query) {
    // Implement search logic here
    console.log('Searching records:', query);
}

// Update analytics based on time period
function updateAnalytics(period) {
    // Implement analytics update logic here
    console.log('Updating analytics for period:', period);
}

// Handle tax-related actions
function handleTaxAction(action, billNo) {
    switch(action) {
        case 'view':
            showTaxBill(billNo);
            break;
        case 'print':
            printReceipt(billNo);
            break;
        case 'history':
            showPaymentHistory(billNo);
            break;
    }
}

// Show tax bill
function showTaxBill(billNo) {
    // Implement bill view modal logic here
    console.log('Showing bill for:', billNo);
}

// Print receipt
function printReceipt(billNo) {
    // Implement receipt printing logic here
    console.log('Printing receipt for:', billNo);
}

// Show payment history
function showPaymentHistory(billNo) {
    // Implement payment history modal logic here
    console.log('Showing payment history for:', billNo);
}

// Update data periodically
setInterval(loadTaxData, 30000); // Update every 30 seconds 