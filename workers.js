// Sample worker data
const workers = [
    { id: 'W001', name: 'John Doe', department: 'cleaning', status: 'active', phone: '+91 9876543210', joinDate: '2023-01-15' },
    { id: 'W002', name: 'Jane Smith', department: 'collection', status: 'onLeave', phone: '+91 9876543211', joinDate: '2023-02-20' },
    { id: 'W003', name: 'Mike Johnson', department: 'maintenance', status: 'active', phone: '+91 9876543212', joinDate: '2023-03-10' },
    // Add more workers as needed
];

// Initialize worker list
function initWorkerList() {
    const workerList = document.querySelector('.worker-list');
    workerList.innerHTML = '';

    const departmentFilter = document.getElementById('departmentFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    const searchTerm = document.querySelector('.search-box input').value.toLowerCase();

    workers.forEach(worker => {
        if ((departmentFilter === 'all' || worker.department === departmentFilter) &&
            (statusFilter === 'all' || worker.status === statusFilter) &&
            (worker.name.toLowerCase().includes(searchTerm) || worker.id.toLowerCase().includes(searchTerm))) {
            
            const workerItem = document.createElement('div');
            workerItem.className = 'worker-item';
            workerItem.innerHTML = `
                <div class="worker-info">
                    <div class="worker-primary">
                        <h4>${worker.name}</h4>
                        <p class="worker-id">${worker.id}</p>
                    </div>
                    <div class="worker-details">
                        <p><i class="fas fa-building"></i> ${worker.department}</p>
                        <p><i class="fas fa-phone"></i> ${worker.phone}</p>
                        <p><i class="fas fa-calendar"></i> Joined: ${worker.joinDate}</p>
                        <span class="status ${worker.status}">${worker.status}</span>
                    </div>
                </div>
                <div class="worker-actions">
                    <button class="edit-btn" onclick="editWorker('${worker.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn" onclick="deleteWorker('${worker.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            workerList.appendChild(workerItem);
        }
    });
}

// Initialize charts
function initCharts() {
    // Worker Distribution Chart
    const workerDistOptions = {
        series: [40, 30, 20, 10],
        chart: {
            type: 'donut',
            height: 350
        },
        labels: ['Street Cleaning', 'Garbage Collection', 'Maintenance', 'Others'],
        colors: ['#2196f3', '#4caf50', '#ff9800', '#9e9e9e'],
        legend: {
            position: 'bottom'
        },
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
        }]
    };

    const workerDistChart = new ApexCharts(document.querySelector("#workerDistChart"), workerDistOptions);
    workerDistChart.render();

    // Attendance Trends Chart
    const attendanceOptions = {
        series: [{
            name: 'Present',
            data: [445, 428, 456, 442, 445, 430, 445]
        }, {
            name: 'Absent',
            data: [91, 95, 82, 89, 91, 94, 91]
        }, {
            name: 'On Leave',
            data: [25, 38, 23, 30, 25, 37, 25]
        }],
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 5,
                columnWidth: '70%'
            }
        },
        colors: ['#4caf50', '#f44336', '#ff9800'],
        xaxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        legend: {
            position: 'bottom'
        },
        fill: {
            opacity: 1
        }
    };

    const attendanceChart = new ApexCharts(document.querySelector("#attendanceChart"), attendanceOptions);
    attendanceChart.render();
}

// Event Listeners
document.getElementById('departmentFilter').addEventListener('change', initWorkerList);
document.getElementById('statusFilter').addEventListener('change', initWorkerList);
document.querySelector('.search-box input').addEventListener('input', initWorkerList);

document.querySelector('.add-worker-btn').addEventListener('click', () => {
    // Implement add worker functionality
    alert('Add worker functionality will be implemented here');
});

// Worker Actions
function editWorker(id) {
    // Implement edit worker functionality
    alert(`Edit worker ${id}`);
}

function deleteWorker(id) {
    if (confirm(`Are you sure you want to delete worker ${id}?`)) {
        // Implement delete worker functionality
        alert(`Worker ${id} deleted`);
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
    initWorkerList();
    initCharts();
}); 