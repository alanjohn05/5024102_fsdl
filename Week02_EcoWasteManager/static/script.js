// Global variables
let currentUserId = null;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadGlobalStats();
    loadLeaderboard();
});

// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            // Update active link
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Show signup modal
function showSignUp() {
    document.getElementById('signupModal').style.display = 'block';
}

// Close signup modal
function closeSignUp() {
    document.getElementById('signupModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('signupModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Register user
function registerUser(event) {
    event.preventDefault();
    
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    
    fetch('/api/user/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email
        })
    })
    .then(response => response.json())
    .then(data => {
        currentUserId = data.user_id;
        closeSignUp();
        document.getElementById('signupForm').reset();
        
        // Redirect to dashboard
        window.location.href = `/dashboard/${data.user_id}`;
    })
    .catch(error => {
        alert('Error creating user. Please try again.');
        console.error('Error:', error);
    });
}

// Load global statistics
function loadGlobalStats() {
    fetch('/api/global-stats')
        .then(response => response.json())
        .then(data => {
            document.getElementById('totalWaste').textContent = data.total_waste_kg.toFixed(2);
            document.getElementById('totalRecycled').textContent = data.total_recycled_kg.toFixed(2);
            document.getElementById('recyclePercent').textContent = data.recycling_percentage.toFixed(1);
            document.getElementById('carbonSaved').textContent = data.carbon_saved_kg.toFixed(0);
            document.getElementById('treeEquiv').textContent = data.equivalent_trees;
            document.getElementById('totalUsers').textContent = data.total_users;
        })
        .catch(error => console.error('Error loading global stats:', error));
}

// Load leaderboard
function loadLeaderboard() {
    fetch('/api/leaderboard')
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('leaderboardBody');
            tbody.innerHTML = '';
            
            if (data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="4">No data yet. Be the first to contribute!</td></tr>';
            } else {
                data.forEach(entry => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><strong>${entry.rank}</strong></td>
                        <td>${entry.name}</td>
                        <td>${entry.points} pts</td>
                        <td>${entry.total_waste_kg.toFixed(2)} kg</td>
                    `;
                    tbody.appendChild(row);
                });
            }
        })
        .catch(error => console.error('Error loading leaderboard:', error));
}

// Refresh stats every 30 seconds
setInterval(function() {
    loadGlobalStats();
    loadLeaderboard();
}, 30000);
