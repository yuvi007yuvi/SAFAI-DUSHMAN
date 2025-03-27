// Initialize charts and setup event listeners when document is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    setupEventListeners();
    loadCustomerData();
});

// Initialize ApexCharts for customer analytics
function initializeCharts() {
    // Customer Growth Trend Chart
    const growthOptions = {
        series: [{
            name: 'Customers',
            data: [14500, 14800, 15000, 15200, 15250, 15300, 15350, 15400, 15450, 15500, 15550, 15600]
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
                    return val + ' customers';
                }
            }
        }
    };

    const growthChart = new ApexCharts(document.querySelector("#customerGrowthChart"), growthOptions);
    growthChart.render();

    // Customer Distribution Chart
    const distributionOptions = {
        series: [{
            name: 'Distribution',
            data: [65, 25, 10]
        }],
        chart: {
            type: 'pie',
            height: 350,
            toolbar: {
                show: false
            }
        },
        labels: ['Residential', 'Commercial', 'Industrial'],
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

    const distributionChart = new ApexCharts(document.querySelector("#customerDistributionChart"), distributionOptions);
    distributionChart.render();
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
        filterCustomers(this.value);
    });

    // Type filter change
    document.getElementById('typeFilter').addEventListener('change', function() {
        filterCustomers(document.getElementById('statusFilter').value, this.value);
    });

    // Action button clicks
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.classList[1];
            const customerId = this.closest('.customer-item').querySelector('.customer-info h4').textContent;
            handleCustomerAction(action, customerId);
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('input', function() {
        searchCustomers(this.value);
    });
}

// Load sample customer data
function loadCustomerData() {
    const customerData = [
        {
            id: 'CUST-001',
            type: 'Residential',
            status: 'active',
            servicePlan: 'Daily Collection',
            paymentStatus: 'Up to Date',
            lastPayment: '₹500',
            name: 'John Doe',
            address: '123 Main St, Zone A',
            contact: '+91 98765 43210'
        },
        // Add more customer data as needed
    ];

    renderCustomerList(customerData);
}

// Render customer list
function renderCustomerList(customers) {
    const customerList = document.querySelector('.customer-list');
    customerList.innerHTML = '';

    customers.forEach(customer => {
        const customerElement = createCustomerItem(customer);
        customerList.appendChild(customerElement);
    });
}

// Create customer item element
function createCustomerItem(customer) {
    const div = document.createElement('div');
    div.className = 'customer-item';
    div.innerHTML = `
        <div class="customer-header">
            <div class="customer-info">
                <h4>Customer ID: ${customer.id}</h4>
                <span class="customer-type">${customer.type}</span>
            </div>
            <div class="customer-status ${customer.status}">${customer.status}</div>
        </div>
        <div class="customer-content">
            <div class="customer-metrics">
                <div class="metric">
                    <span class="label">Service Plan</span>
                    <span class="value">${customer.servicePlan}</span>
                </div>
                <div class="metric">
                    <span class="label">Payment Status</span>
                    <span class="value">${customer.paymentStatus}</span>
                </div>
                <div class="metric">
                    <span class="label">Last Payment</span>
                    <span class="value">${customer.lastPayment}</span>
                </div>
            </div>
            <div class="customer-details">
                <div class="detail-row">
                    <span class="label">Name:</span>
                    <span class="value">${customer.name}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Address:</span>
                    <span class="value">${customer.address}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Contact:</span>
                    <span class="value">${customer.contact}</span>
                </div>
            </div>
        </div>
        <div class="customer-actions">
            <button class="action-btn view">View Details</button>
            <button class="action-btn edit">Edit Profile</button>
            <button class="action-btn history">Payment History</button>
        </div>
    `;

    return div;
}

// Filter customers based on status and type
function filterCustomers(status, type = 'all') {
    // Implement filtering logic here
    console.log('Filtering customers:', status, type);
}

// Search customers
function searchCustomers(query) {
    // Implement search logic here
    console.log('Searching customers:', query);
}

// Update analytics based on time period
function updateAnalytics(period) {
    // Implement analytics update logic here
    console.log('Updating analytics for period:', period);
}

// Handle customer-related actions
function handleCustomerAction(action, customerId) {
    switch(action) {
        case 'view':
            showCustomerDetails(customerId);
            break;
        case 'edit':
            editCustomerProfile(customerId);
            break;
        case 'history':
            showPaymentHistory(customerId);
            break;
    }
}

// Show customer details
function showCustomerDetails(customerId) {
    // Implement details modal logic here
    console.log('Showing details for customer:', customerId);
}

// Edit customer profile
function editCustomerProfile(customerId) {
    // Implement profile edit modal logic here
    console.log('Editing profile for customer:', customerId);
}

// Show payment history
function showPaymentHistory(customerId) {
    // Implement payment history modal logic here
    console.log('Showing payment history for customer:', customerId);
}

// Update data periodically
setInterval(loadCustomerData, 30000); // Update every 30 seconds 