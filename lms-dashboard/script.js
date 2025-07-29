

document.addEventListener('DOMContentLoaded', function() {
    
    initializeDashboard();
    initializeChart();
    setupEventListeners();
});

function initializeDashboard() {
    
    console.log('LMS Dashboard initialized');
}

function setupEventListeners() {
    
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebarNav');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('show');
        });
    }
    
    
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            
            
            this.classList.add('active');
            
            
            const section = this.getAttribute('data-section');
            console.log(`Navigating to: ${section}`);
            
            
            
            updateMainContent(section);
        });
    });
    
    
    document.addEventListener('click', function(e) {
        if (window.innerWidth < 992) {
            const sidebar = document.getElementById('sidebarNav');
            const sidebarToggle = document.getElementById('sidebarToggle');
            
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('show');
            }
        }
    });
    
    
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
            const sidebar = document.getElementById('sidebarNav');
            sidebar.classList.remove('show');
        }
    });
}

function updateMainContent(section) {
    const mainHeading = document.querySelector('.main-content h1');
    const sectionTitles = {
        'dashboard': 'Dashboard Overview',
        'courses': 'Course Management',
        'instructors': 'Instructor Management',
        'students': 'Student Management',
        'reports': 'Reports & Analytics',
        'settings': 'System Settings'
    };
    
    if (mainHeading && sectionTitles[section]) {
        mainHeading.textContent = sectionTitles[section];
    }
}

function initializeChart() {
    const ctx = document.getElementById('enrollmentChart');
    if (!ctx) return;
    
    
    const months = ['August', 'September', 'October', 'November', 'December', 'January'];
    const enrollmentData = [180, 220, 165, 290, 245, 286];
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Student Enrollments',
                data: enrollmentData,
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#007bff',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 14
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        title: function(context) {
                            return context[0].label;
                        },
                        label: function(context) {
                            return context.parsed.y + ' enrollments';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        color: '#6c757d',
                        font: {
                            size: 12
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)',
                        borderDash: [2, 2]
                    },
                    ticks: {
                        color: '#6c757d',
                        font: {
                            size: 12
                        },
                        callback: function(value) {
                            return value + ' students';
                        }
                    }
                }
            },
            elements: {
                point: {
                    hoverBackgroundColor: '#007bff',
                    hoverBorderColor: '#fff'
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}


function animateStatsCards() {
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}


document.addEventListener('DOMContentLoaded', function() {
    setTimeout(animateStatsCards, 100);
});


function simulateDataRefresh() {
    setInterval(() => {
        
        const statsElements = document.querySelectorAll('.h5.font-weight-bold');
        statsElements.forEach(element => {
            const currentValue = parseInt(element.textContent.replace(/,/g, ''));
            if (!isNaN(currentValue)) {
                
                const variation = Math.floor(Math.random() * 5) - 2;
                const newValue = Math.max(0, currentValue + variation);
                element.textContent = newValue.toLocaleString();
                
                
                element.parentElement.style.background = 'rgba(0, 123, 255, 0.1)';
                setTimeout(() => {
                    element.parentElement.style.background = '';
                }, 1000);
            }
        });
    }, 30000); 
}


document.addEventListener('DOMContentLoaded', function() {
    setTimeout(simulateDataRefresh, 5000); 
});


document.addEventListener('DOMContentLoaded', function() {
    
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.setAttribute('aria-label', 'Toggle navigation menu');
        sidebarToggle.setAttribute('aria-expanded', 'false');
    }
    
    
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});


function exportData(format) {
    console.log(`Exporting data in ${format} format`);
    
    alert(`Export to ${format} functionality would be implemented here`);
}


document.addEventListener('DOMContentLoaded', function() {
    const exportBtn = document.querySelector('.btn-outline-secondary:last-child');
    if (exportBtn && exportBtn.textContent.trim() === 'Export') {
        exportBtn.addEventListener('click', function() {
            exportData('PDF');
        });
    }
});