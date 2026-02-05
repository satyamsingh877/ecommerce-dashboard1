// Sample data for orders
const orders = [
    { id: '#ORD-001', customer: 'John Doe', date: '2024-01-15', amount: '$249.99', status: 'delivered' },
    { id: '#ORD-002', customer: 'Jane Smith', date: '2024-01-14', amount: '$149.50', status: 'pending' },
    { id: '#ORD-003', customer: 'Robert Johnson', date: '2024-01-13', amount: '$89.99', status: 'delivered' },
    { id: '#ORD-004', customer: 'Emily Davis', date: '2024-01-12', amount: '$299.99', status: 'cancelled' },
    { id: '#ORD-005', customer: 'Michael Wilson', date: '2024-01-11', amount: '$199.99', status: 'delivered' },
    { id: '#ORD-006', customer: 'Sarah Brown', date: '2024-01-10', amount: '$159.99', status: 'pending' },
    { id: '#ORD-007', customer: 'David Miller', date: '2024-01-09', amount: '$229.99', status: 'delivered' },
    { id: '#ORD-008', customer: 'Lisa Taylor', date: '2024-01-08', amount: '$179.99', status: 'delivered' }
];

// Sample data for charts
const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
        label: 'Sales ($)',
        data: [6500, 5900, 8000, 8100, 5600, 5500, 4000, 7200, 8800, 9100, 8600, 9500],
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
    }]
};

const categoriesData = {
    labels: ['Electronics', 'Fashion', 'Home & Garden', 'Books', 'Sports', 'Health'],
    datasets: [{
        data: [35, 25, 15, 10, 8, 7],
        backgroundColor: [
            '#4F46E5',
            '#10B981',
            '#F59E0B',
            '#EF4444',
            '#8B5CF6',
            '#06B6D4'
        ]
    }]
};

// Initialize charts when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize orders table
    const ordersTable = document.getElementById('orders-table');
    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${order.id}</strong></td>
            <td>${order.customer}</td>
            <td>${order.date}</td>
            <td><strong>${order.amount}</strong></td>
            <td><span class="status ${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></td>
        `;
        ordersTable.appendChild(row);
    });

    // Initialize Sales Chart
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    new Chart(salesCtx, {
        type: 'line',
        data: salesData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value;
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Initialize Categories Chart
    const categoriesCtx = document.getElementById('categoriesChart').getContext('2d');
    new Chart(categoriesCtx, {
        type: 'doughnut',
        data: categoriesData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });

    // Add some interactivity to stats cards
    const statsCards = document.querySelectorAll('.card');
    statsCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Update stats with animation
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = start < end ? 
                value.toLocaleString() : 
                end.toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Animate stats when page loads
    setTimeout(() => {
        animateValue(document.getElementById('total-orders'), 1000, 1248, 2000);
        animateValue(document.getElementById('revenue'), 30000, 42580, 2000);
        animateValue(document.getElementById('customers'), 5000, 5842, 2000);
        animateValue(document.getElementById('products'), 1200, 1536, 2000);
    }, 500);
});
