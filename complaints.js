// Initialize charts when the document is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeComplaintsCharts();
    setupEventListeners();
    loadComplaints();
});

// Initialize Complaints Charts
function initializeComplaintsCharts() {
    // Complaints by Type Chart
    const complaintsTypeOptions = {
        series: [45, 25, 30],
        chart: {
            type: 'donut',
            height: 350
        },
        labels: ['Waste Collection', 'Sanitation', 'Infrastructure'],
        colors: ['#2196f3', '#4caf50', '#ff9800'],
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

    const complaintsTypeChart = new ApexCharts(document.querySelector("#complaintsTypeChart"), complaintsTypeOptions);
    complaintsTypeChart.render();

    // Resolution Time Trend Chart
    const resolutionTimeOptions = {
        series: [{
            name: 'Resolution Time (hours)',
            data: [4.2, 3.8, 4.5, 3.9, 4.1, 4.0, 3.7]
        }],
        chart: {
            type: 'line',
            height: 350,
            toolbar: {
                show: false
            }
        },
        colors: ['#9c27b0'],
        stroke: {
            curve: 'smooth',
            width: 2
        },
        xaxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            labels: {
                style: {
                    colors: '#666666'
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#666666'
                }
            }
        },
        tooltip: {
            y: {
                formatter: function(value) {
                    return value + ' hours';
                }
            }
        }
    };

    const resolutionTimeChart = new ApexCharts(document.querySelector("#resolutionTimeChart"), resolutionTimeOptions);
    resolutionTimeChart.render();
}

// Setup Event Listeners
function setupEventListeners() {
    // Status filter change
    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            filterComplaints();
        });
    }

    // Type filter change
    const typeFilter = document.getElementById('typeFilter');
    if (typeFilter) {
        typeFilter.addEventListener('change', function() {
            filterComplaints();
        });
    }

    // Time filter clicks
    const timeFilters = document.querySelectorAll('.time-filters .filter');
    timeFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            timeFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            updateAnalytics(this.textContent.toLowerCase());
        });
    });

    // Action buttons
    document.querySelectorAll('.action-btn').forEach(button => {
        button.addEventListener('click', function() {
            handleComplaintAction(this);
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchComplaints(this.value);
        });
    }
}

// Load Complaints
function loadComplaints() {
    // Sample complaints data
    const complaints = [
        {
            id: 'CMT-001',
            title: 'Garbage Collection Delay',
            description: 'Resident reported delayed garbage collection in Sector 7. Collection was scheduled for 9 AM but hasn\'t arrived yet.',
            status: 'pending',
            type: 'waste',
            reporter: 'John Doe',
            location: 'Sector 7, Mathura',
            time: '2 hours ago'
        },
        // Add more complaints as needed
    ];

    // Render complaints
    renderComplaints(complaints);
}

// Render Complaints
function renderComplaints(complaints) {
    const complaintsList = document.querySelector('.complaints-list');
    if (!complaintsList) return;

    complaintsList.innerHTML = complaints.map(complaint => `
        <div class="complaint-item">
            <div class="complaint-header">
                <div class="complaint-id">#${complaint.id}</div>
                <div class="complaint-status ${complaint.status}">${complaint.status}</div>
            </div>
            <div class="complaint-content">
                <h4>${complaint.title}</h4>
                <p>${complaint.description}</p>
                <div class="complaint-meta">
                    <span><i class="fas fa-user"></i> ${complaint.reporter}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${complaint.location}</span>
                    <span><i class="fas fa-clock"></i> ${complaint.time}</span>
                </div>
            </div>
            <div class="complaint-actions">
                <button class="action-btn assign">Assign</button>
                <button class="action-btn view">View Details</button>
                <button class="action-btn resolve">Resolve</button>
            </div>
        </div>
    `).join('');
}

// Filter Complaints
function filterComplaints() {
    const status = document.getElementById('statusFilter').value;
    const type = document.getElementById('typeFilter').value;
    const searchTerm = document.querySelector('.search-box input').value.toLowerCase();

    // Implement filtering logic here
    console.log('Filtering complaints:', { status, type, searchTerm });
}

// Search Complaints
function searchComplaints(term) {
    // Implement search logic here
    console.log('Searching for:', term);
}

// Handle Complaint Actions
function handleComplaintAction(button) {
    const action = button.textContent.toLowerCase();
    const complaintItem = button.closest('.complaint-item');
    const complaintId = complaintItem.querySelector('.complaint-id').textContent;

    switch (action) {
        case 'assign':
            showAssignModal(complaintId);
            break;
        case 'view':
            showComplaintDetails(complaintId);
            break;
        case 'resolve':
            resolveComplaint(complaintId);
            break;
    }
}

// Show Assign Modal
function showAssignModal(complaintId) {
    // Implement assign modal logic
    console.log('Showing assign modal for:', complaintId);
}

// Show Complaint Details
function showComplaintDetails(complaintId) {
    // Implement details view logic
    console.log('Showing details for:', complaintId);
}

// Resolve Complaint
function resolveComplaint(complaintId) {
    // Implement resolve logic
    console.log('Resolving complaint:', complaintId);
}

// Update Analytics
function updateAnalytics(timeframe) {
    // Implement analytics update logic
    console.log('Updating analytics for:', timeframe);
}

// Periodically update real-time data
setInterval(function() {
    loadComplaints();
}, 30000); // Update every 30 seconds 