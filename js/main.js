// Main JavaScript File for NasDem Cyber Patrol Platform

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Dashboard Navigation
    initDashboardNav();
    
    // Initialize Header Navigation
    initHeaderNavigation(); // ← TAMBAHKAN INI
    
    // Initialize Sidebar Toggle
    initSidebarToggle();
    
    // Initialize Tab Navigation for Reports Section
    initTabNavigation();
    
    // Initialize Charts
    renderDashboardCharts();
    
    // Initialize Fullscreen Chart Functionality
    initFullscreenCharts();
    
    // Show topics section for debugging
    showTopicsSection();
    
    // Simulate data loading for demo purposes
    simulateLoading();
    
    // Load real data from backend
    loadRealData();
    
    // Refresh data every 30 seconds
    setInterval(loadRealData, 30000);
    
    // Set dashboard as active by default
    setActiveHeaderNav('dashboard');
});

// Function to show topics section for debugging
function showTopicsSection() {
    // Hide all sections
    const sections = document.querySelectorAll('.dashboard-section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show topics section
    const topicsSection = document.getElementById('topics-section');
    if (topicsSection) {
        topicsSection.classList.remove('hidden');
        
        // Update active state in navigation
        const navItems = document.querySelectorAll('.dashboard-nav-item');
        navItems.forEach(navItem => {
            navItem.classList.remove('bg-orange-50', 'text-nasdem-primary');
            navItem.classList.add('text-gray-700', 'hover:bg-gray-100');
            
            if (navItem.getAttribute('data-section') === 'topics') {
                navItem.classList.remove('text-gray-700', 'hover:bg-gray-100');
                navItem.classList.add('bg-blue-50', 'text-nasdem-primary');
            }
        });
        
        // Initialize word cloud
        setTimeout(() => {
            console.log('Initializing word cloud');
            initWordCloud();
        }, 300);
    } else {
        console.error('Topics section not found');
    }
}

// Handle Dashboard Navigation
function initDashboardNav() {
    const navItems = document.querySelectorAll('.dashboard-nav-item'); // ← Pastikan class ini
    const sections = document.querySelectorAll('.dashboard-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get section to show
            const sectionToShow = this.getAttribute('data-section');
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.add('hidden');
            });
            
            // Show selected section
            const targetSection = document.getElementById(`${sectionToShow}-section`);
            if (targetSection) {
                targetSection.classList.remove('hidden');
            }
            
            // Update active state in navigation
            navItems.forEach(navItem => {
                navItem.classList.remove('active', 'bg-blue-50', 'text-blue-600');
                navItem.classList.add('text-gray-700');
            });
            
            // Set active state
            this.classList.remove('text-gray-700');
            this.classList.add('active', 'bg-blue-50', 'text-blue-600');
            
            // Reinitialize word cloud if topics section is shown
            if (sectionToShow === 'topics') {
                setTimeout(() => initWordCloud(), 100);
            }
            
            console.log(`Navigated to ${sectionToShow} section`);
        });
    });
    
    // Set dashboard as active by default
    const dashboardNav = document.querySelector('[data-section="dashboard"]');
    if (dashboardNav) {
        dashboardNav.classList.add('active', 'bg-blue-50', 'text-blue-600');
    }
}

// Header Navigation Functions
function initHeaderNavigation() {
    // Initialize top navigation
    const navDashboard = document.getElementById('nav-dashboard');
    const navAnalisis = document.getElementById('nav-analisis');
    const navLaporan = document.getElementById('nav-laporan');
    
    if (navDashboard) {
        navDashboard.addEventListener('click', function(e) {
            e.preventDefault();
            setActiveHeaderNav('dashboard');
            showDashboardSection();
            console.log('Navigate to Dashboard');
        });
    }
    
    if (navAnalisis) {
        navAnalisis.addEventListener('click', function(e) {
            e.preventDefault();
            setActiveHeaderNav('analisis');
            showAnalisisSection();
            console.log('Navigate to Analisis');
        });
    }
    
    if (navLaporan) {
        navLaporan.addEventListener('click', function(e) {
            e.preventDefault();
            setActiveHeaderNav('laporan');
            showLaporanSection();
            console.log('Navigate to Laporan');
        });
    }
    
    // Initialize user menu dropdown
    initUserMenuDropdown();
}

// Set active navigation state
function setActiveHeaderNav(activeSection) {
    const navItems = ['nav-dashboard', 'nav-analisis', 'nav-laporan'];
    
    navItems.forEach(navId => {
        const navElement = document.getElementById(navId);
        if (navElement) {
            navElement.classList.remove('text-blue-600', 'border-b-2', 'border-blue-600');
            navElement.classList.add('text-gray-700');
        }
    });
    
    const activeNav = document.getElementById(`nav-${activeSection}`);
    if (activeNav) {
        activeNav.classList.remove('text-gray-700');
        activeNav.classList.add('text-blue-600', 'border-b-2', 'border-blue-600');
    }
}

// User menu dropdown functionality
function initUserMenuDropdown() {
    const userMenuButton = document.getElementById('user-menu-button');
    const userMenuDropdown = document.getElementById('user-menu-dropdown');
    
    if (userMenuButton && userMenuDropdown) {
        // Toggle dropdown on button click
        userMenuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            userMenuDropdown.classList.toggle('hidden');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!userMenuButton.contains(e.target) && !userMenuDropdown.contains(e.target)) {
                userMenuDropdown.classList.add('hidden');
            }
        });
        
        // Close dropdown when pressing Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                userMenuDropdown.classList.add('hidden');
            }
        });
    }
}

// Section navigation functions (placeholder)
function showDashboardSection() {
    // Hide all sections, show dashboard
    hideAllSections();
    const dashboardSection = document.querySelector('[data-section="dashboard"]');
    if (dashboardSection) {
        dashboardSection.style.display = 'block';
    }
}

function showAnalisisSection() {
    // Hide all sections, show analisis
    hideAllSections();
    const analisisSection = document.querySelector('[data-section="analisis"]');
    if (analisisSection) {
        analisisSection.style.display = 'block';
    } else {
        console.log('Analisis section not implemented yet');
        showNotification('Halaman Analisis dalam pengembangan', 'info');
    }
}

function showLaporanSection() {
    // Hide all sections, show laporan
    hideAllSections();
    const laporanSection = document.querySelector('[data-section="laporan"]');
    if (laporanSection) {
        laporanSection.style.display = 'block';
    } else {
        console.log('Laporan section not implemented yet');
        showNotification('Halaman Laporan dalam pengembangan', 'info');
    }
}

function hideAllSections() {
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => {
        section.style.display = 'none';
    });
}

// Notification function
function showNotification(message, type = 'info') {
    // Simple notification - you can enhance this later
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 p-4 rounded-md shadow-lg z-50 ${
        type === 'info' ? 'bg-blue-500 text-white' : 
        type === 'success' ? 'bg-green-500 text-white' : 
        type === 'error' ? 'bg-red-500 text-white' : 'bg-gray-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

// Initialize Word Cloud with improved overlap prevention
function initWordCloud() {
    const wordCloudContainer = document.getElementById('word-cloud');
    if (!wordCloudContainer) {
        console.error('Word cloud container not found');
        return;
    }
    
    // Clear any existing word cloud
    wordCloudContainer.innerHTML = '';
    
    // Topic data with percentages
    const topics = [
        { text: 'Infrastruktur', percentage: 24.5, color: '#263238' },  // nasdem-dark
        { text: 'Pendidikan', percentage: 18.7, color: '#1976D2' },     // nasdem-secondary
        { text: 'UMKM', percentage: 16.2, color: '#2196F3' },           // nasdem-primary
        { text: 'Banjir', percentage: 14.8, color: '#F44336' },         // red-like
        { text: 'Harga Pangan', percentage: 12.3, color: '#FF9800' },   // orange
        { text: 'Ekonomi', percentage: 9.7, color: '#4CAF50' },         // green
        { text: 'Transportasi', percentage: 8.5, color: '#2196F3' },    // nasdem-accent
        { text: 'Kesehatan', percentage: 7.2, color: '#9C27B0' },       // purple
        { text: 'Bantuan Sosial', percentage: 6.5, color: '#795548' },  // brown
        { text: 'Lapangan Kerja', percentage: 5.8, color: '#607D8B' },  // blue-gray
        { text: 'Pariwisata', percentage: 4.3, color: '#009688' },      // teal
        { text: 'Keamanan', percentage: 3.7, color: '#3F51B5' },        // indigo
        { text: 'Lingkungan', percentage: 3.2, color: '#8BC34A' },      // light-green
        { text: 'Pembangunan', percentage: 2.8, color: '#2196F3' },     // nasdem-primary
        { text: 'Kebersihan', percentage: 2.5, color: '#00BCD4' }       // cyan
    ];
    
    // Get container dimensions
    const containerWidth = wordCloudContainer.offsetWidth;
    const containerHeight = wordCloudContainer.offsetHeight;
    
    console.log('Container dimensions:', containerWidth, containerHeight);
    
    if (containerWidth === 0 || containerHeight === 0) {
        console.error('Container has no dimensions');
        return;
    }
    
    // Simple grid-based placement for better results
    topics.forEach((topic, index) => {
        // Calculate font size based on percentage (min 14px, max 36px)
        const fontSize = Math.max(14, Math.min(36, 14 + (topic.percentage * 0.9)));
        
        // Create element
        const wordElement = document.createElement('div');
        wordElement.className = 'word-cloud-item';
        wordElement.textContent = topic.text;
        wordElement.style.fontSize = `${fontSize}px`;
        wordElement.style.fontWeight = topic.percentage > 15 ? 'bold' : 'normal';
        wordElement.style.color = topic.color;
        wordElement.style.position = 'absolute';
        
        // Simple positioning with some randomness
        const padding = 20;
        const maxLeft = containerWidth - 200; // Assume max word width
        const maxTop = containerHeight - 40;  // Assume max word height
        
        let left = Math.random() * Math.max(padding, maxLeft - padding) + padding;
        let top = Math.random() * Math.max(padding, maxTop - padding) + padding;
        
        // Ensure within bounds
        left = Math.max(padding, Math.min(left, containerWidth - 150));
        top = Math.max(padding, Math.min(top, containerHeight - 30));
        
        wordElement.style.left = `${left}px`;
        wordElement.style.top = `${top}px`;
        
        // Add small random rotation for visual interest
        const rotation = Math.random() * 20 - 10; // -10 to +10 degrees
        wordElement.style.transform = `rotate(${rotation}deg)`;
        
        // Add tooltip with exact percentage
        wordElement.setAttribute('title', `${topic.text}: ${topic.percentage}%`);
        
        // Add to container
        wordCloudContainer.appendChild(wordElement);
    });
    
    console.log('Word cloud initialized with', topics.length, 'words');
}

// Create grid for word placement
function createPlacementGrid(containerWidth, containerHeight) {
    const cellSize = 20; // Size of each grid cell
    const cols = Math.ceil(containerWidth / cellSize);
    const rows = Math.ceil(containerHeight / cellSize);
    
    // Create empty grid
    const grid = [];
    for (let i = 0; i < rows; i++) {
        grid.push(new Array(cols).fill(false)); // false means cell is empty
    }
    
    return {
        cellSize,
        cols,
        rows,
        occupied: grid
    };
}

// Mark grid cells as occupied
function markGridOccupied(grid, left, top, width, height) {
    const startCol = Math.max(0, Math.floor(left / grid.cellSize));
    const endCol = Math.min(grid.cols - 1, Math.ceil((left + width) / grid.cellSize));
    const startRow = Math.max(0, Math.floor(top / grid.cellSize));
    const endRow = Math.min(grid.rows - 1, Math.ceil((top + height) / grid.cellSize));
    
    for (let row = startRow; row <= endRow; row++) {
        for (let col = startCol; col <= endCol; col++) {
            grid.occupied[row][col] = true;
        }
    }
}

// Find best position for a word using quadrant strategy
function findBestPosition(grid, width, height, containerWidth, containerHeight, existingElements) {
    // Try the central spiral placement first
    const spiralPosition = findSpiralPosition(width, height, containerWidth, containerHeight, existingElements);
    if (spiralPosition) return spiralPosition;
    
    // Divide container into quadrants for better distribution
    const quadrants = [
        { x: 0, y: 0, width: containerWidth / 2, height: containerHeight / 2 },
        { x: containerWidth / 2, y: 0, width: containerWidth / 2, height: containerHeight / 2 },
        { x: 0, y: containerHeight / 2, width: containerWidth / 2, height: containerHeight / 2 },
        { x: containerWidth / 2, y: containerHeight / 2, width: containerWidth / 2, height: containerHeight / 2 }
    ];
    
    // Shuffle quadrants for more randomness
    shuffleArray(quadrants);
    
    // Try each quadrant
    for (const quadrant of quadrants) {
        // Try random positions within this quadrant
        for (let attempt = 0; attempt < 10; attempt++) {
            const left = quadrant.x + Math.random() * (quadrant.width - width);
            const top = quadrant.y + Math.random() * (quadrant.height - height);
            
            // Check if position overlaps with existing elements
            if (!hasPositionOverlap(left, top, width, height, existingElements)) {
                return { left, top };
            }
        }
    }
    
    // Fallback: find any position with minimal overlap
    return findPositionWithMinimalOverlap(width, height, containerWidth, containerHeight, existingElements);
}

// Find position using spiral pattern from center
function findSpiralPosition(width, height, containerWidth, containerHeight, existingElements) {
    const centerX = containerWidth / 2 - width / 2;
    const centerY = containerHeight / 2 - height / 2;
    
    const maxRadius = Math.max(containerWidth, containerHeight) / 2;
    const radiusStep = 10;
    const angleStep = Math.PI / 8; // 22.5 degrees
    
    for (let radius = 0; radius <= maxRadius; radius += radiusStep) {
        for (let angle = 0; angle < 2 * Math.PI; angle += angleStep) {
            const left = centerX + radius * Math.cos(angle);
            const top = centerY + radius * Math.sin(angle);
            
            // Check if position is valid (within container and no overlap)
            if (
                left >= 0 && 
                left + width <= containerWidth && 
                top >= 0 && 
                top + height <= containerHeight &&
                !hasPositionOverlap(left, top, width, height, existingElements)
            ) {
                return { left, top };
            }
        }
    }
    
    return null; // No valid position found
}

// Check if a position overlaps with existing elements
function hasPositionOverlap(left, top, width, height, existingElements) {
    const right = left + width;
    const bottom = top + height;
    
    for (const elem of existingElements) {
        if (
            left < elem.right &&
            right > elem.left &&
            top < elem.bottom &&
            bottom > elem.top
        ) {
            return true; // Overlap found
        }
    }
    
    return false; // No overlap
}

// Find position with minimal overlap
function findPositionWithMinimalOverlap(width, height, containerWidth, containerHeight, existingElements) {
    let bestLeft = 0;
    let bestTop = 0;
    let minOverlapArea = Number.MAX_VALUE;
    
    // Try different positions and calculate overlap area
    for (let left = 0; left <= containerWidth - width; left += width / 2) {
        for (let top = 0; top <= containerHeight - height; top += height / 2) {
            const overlapArea = calculateTotalOverlapArea(left, top, width, height, existingElements);
            
            if (overlapArea < minOverlapArea) {
                minOverlapArea = overlapArea;
                bestLeft = left;
                bestTop = top;
            }
        }
    }
    
    return { left: bestLeft, top: bestTop };
}

// Calculate total overlap area with existing elements
function calculateTotalOverlapArea(left, top, width, height, existingElements) {
    const right = left + width;
    const bottom = top + height;
    let totalOverlap = 0;
    
    for (const elem of existingElements) {
        // Calculate overlap dimensions
        const overlapLeft = Math.max(left, elem.left);
        const overlapRight = Math.min(right, elem.right);
        const overlapTop = Math.max(top, elem.top);
        const overlapBottom = Math.min(bottom, elem.bottom);
        
        // If there is an overlap, add to total
        if (overlapLeft < overlapRight && overlapTop < overlapBottom) {
            totalOverlap += (overlapRight - overlapLeft) * (overlapBottom - overlapTop);
        }
    }
    
    return totalOverlap;
}

// Resolve any remaining overlaps with force-directed method
function resolveRemainingOverlaps(wordElements, containerWidth, containerHeight) {
    const maxIterations = 100;
    let iteration = 0;
    
    while (iteration < maxIterations) {
        let moved = false;
        
        for (let i = 0; i < wordElements.length; i++) {
            const elem1 = wordElements[i];
            
            // Calculate repulsion forces from other elements
            let forceX = 0;
            let forceY = 0;
            
            for (let j = 0; j < wordElements.length; j++) {
                if (i === j) continue;
                
                const elem2 = wordElements[j];
                
                // Check if elements overlap
                if (
                    elem1.left < elem2.right &&
                    elem1.right > elem2.left &&
                    elem1.top < elem2.bottom &&
                    elem1.bottom > elem2.top
                ) {
                    // Calculate centers
                    const center1X = elem1.left + elem1.width / 2;
                    const center1Y = elem1.top + elem1.height / 2;
                    const center2X = elem2.left + elem2.width / 2;
                    const center2Y = elem2.top + elem2.height / 2;
                    
                    // Direction from elem2 to elem1
                    const dirX = center1X - center2X;
                    const dirY = center1Y - center2Y;
                    
                    // Normalize and add force (stronger for bigger overlap)
                    const distance = Math.max(1, Math.sqrt(dirX * dirX + dirY * dirY));
                    const overlapWidth = Math.min(elem1.right, elem2.right) - Math.max(elem1.left, elem2.left);
                    const overlapHeight = Math.min(elem1.bottom, elem2.bottom) - Math.max(elem1.top, elem2.top);
                    const overlapArea = overlapWidth * overlapHeight;
                    
                    forceX += 15 * (dirX / distance) * Math.sqrt(overlapArea);
                    forceY += 15 * (dirY / distance) * Math.sqrt(overlapArea);
                    
                    moved = true;
                }
            }
            
            // Apply forces, keeping element within container
            if (forceX !== 0 || forceY !== 0) {
                const newLeft = Math.max(0, Math.min(containerWidth - elem1.width, elem1.left + forceX));
                const newTop = Math.max(0, Math.min(containerHeight - elem1.height, elem1.top + forceY));
                
                // Update element position
                elem1.element.style.left = `${newLeft}px`;
                elem1.element.style.top = `${newTop}px`;
                
                // Update tracking data
                elem1.left = newLeft;
                elem1.top = newTop;
                elem1.right = newLeft + elem1.width;
                elem1.bottom = newTop + elem1.height;
            }
        }
        
        // If nothing moved, we're done
        if (!moved) break;
        
        iteration++;
    }
}

// Utility function to shuffle array in place
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}// Handle Tab Navigation in Reports Section
function initTabNavigation() {
    const tabReports = document.getElementById('tab-reports');
    const tabAlerts = document.getElementById('tab-alerts');
    const panelReports = document.getElementById('panel-reports');
    const panelAlerts = document.getElementById('panel-alerts');
    
    if (tabReports && tabAlerts) {
        tabReports.addEventListener('click', function() {
            panelReports.classList.remove('hidden');
            panelAlerts.classList.add('hidden');
            
            tabReports.classList.add('text-nasdem-primary', 'border-nasdem-primary');
            tabReports.classList.remove('text-gray-500', 'hover:text-gray-700', 'border-transparent');
            
            tabAlerts.classList.remove('text-nasdem-primary', 'border-nasdem-primary');
            tabAlerts.classList.add('text-gray-500', 'hover:text-gray-700', 'border-transparent');
        });
        
        tabAlerts.addEventListener('click', function() {
            panelAlerts.classList.remove('hidden');
            panelReports.classList.add('hidden');
            
            tabAlerts.classList.add('text-nasdem-primary', 'border-nasdem-primary');
            tabAlerts.classList.remove('text-gray-500', 'hover:text-gray-700', 'border-transparent');
            
            tabReports.classList.remove('text-nasdem-primary', 'border-nasdem-primary');
            tabReports.classList.add('text-gray-500', 'hover:text-gray-700', 'border-transparent');
        });
    }
}

// Initialize Fullscreen Chart Functionality
function initFullscreenCharts() {
    // Find all chart containers and add fullscreen buttons
    const chartContainers = document.querySelectorAll('.chart-container');
    
    chartContainers.forEach(container => {
        // Get chart title from parent element
        const chartTitle = container.querySelector('h3') ? 
            container.querySelector('h3').textContent : 
            'Chart View';
            
        // Add fullscreen button
        const fullscreenBtn = document.createElement('button');
        fullscreenBtn.className = 'fullscreen-btn';
        fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        fullscreenBtn.setAttribute('title', 'Tampilan Penuh');
        fullscreenBtn.addEventListener('click', function() {
            toggleFullscreen(container, chartTitle);
        });
        
        container.appendChild(fullscreenBtn);
    });
}

// Toggle Fullscreen for Charts
function toggleFullscreen(container, chartTitle) {
    if (!container.classList.contains('fullscreen')) {
        // Enter fullscreen
        container.classList.add('fullscreen');
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-fullscreen-btn';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.addEventListener('click', function() {
            toggleFullscreen(container, chartTitle);
        });
        
        // Add title to fullscreen view
        const title = document.createElement('div');
        title.className = 'fullscreen-title';
        title.textContent = chartTitle;
        
        container.appendChild(closeBtn);
        container.appendChild(title);
        
        // Disable body scroll
        document.body.style.overflow = 'hidden';
        
        // Resize chart to fit fullscreen
        const chartId = container.querySelector('canvas')?.id;
        if (chartId) {
            const chartInstance = Chart.getChart(chartId);
            if (chartInstance) {
                chartInstance.resize();
            }
        }
    } else {
        // Exit fullscreen
        container.classList.remove('fullscreen');
        
        // Remove close button and title
        const closeBtn = container.querySelector('.close-fullscreen-btn');
        const title = container.querySelector('.fullscreen-title');
        if (closeBtn) container.removeChild(closeBtn);
        if (title) container.removeChild(title);
        
        // Enable body scroll
        document.body.style.overflow = '';
        
        // Resize chart back to original size
        const chartId = container.querySelector('canvas')?.id;
        if (chartId) {
            const chartInstance = Chart.getChart(chartId);
            if (chartInstance) {
                chartInstance.resize();
            }
        }
    }
}

// Render all charts on the dashboard
function renderDashboardCharts() {
    // Sentiment Trend Chart (Main Dashboard)
    if (document.getElementById('sentimentTrendChart')) {
        const sentimentTrendCtx = document.getElementById('sentimentTrendChart').getContext('2d');
        new Chart(sentimentTrendCtx, {
            type: 'line',
            data: {
                labels: ['25 Mei', '26 Mei', '27 Mei', '28 Mei', '29 Mei', '30 Mei', '31 Mei'],
                datasets: [
                    {
                        label: 'Positif',
                        data: [62, 65, 63, 68, 65, 67, 67.3],
                        borderColor: '#10B981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Negatif',
                        data: [22, 19, 21, 17, 19, 18, 18.7],
                        borderColor: '#EF4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Netral',
                        data: [16, 16, 16, 15, 16, 15, 14],
                        borderColor: '#F59E0B',
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Sentiment Pie Chart (Main Dashboard)
    if (document.getElementById('sentimentPieChart')) {
        const sentimentPieCtx = document.getElementById('sentimentPieChart').getContext('2d');
        new Chart(sentimentPieCtx, {
            type: 'doughnut',
            data: {
                labels: ['Positif', 'Negatif', 'Netral'],
                datasets: [{
                    data: [67.3, 18.7, 14.0],
                    backgroundColor: [
                        '#10B981',
                        '#EF4444',
                        '#F59E0B'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Sentiment Analysis Chart (Sentiment Analysis Page)
    if (document.getElementById('sentimentAnalysisChart')) {
        const sentimentAnalysisCtx = document.getElementById('sentimentAnalysisChart').getContext('2d');
        new Chart(sentimentAnalysisCtx, {
            type: 'line',
            data: {
                labels: ['25 Mei', '26 Mei', '27 Mei', '28 Mei', '29 Mei', '30 Mei', '31 Mei'],
                datasets: [
                    {
                        label: 'Positif',
                        data: [62, 65, 63, 68, 65, 67, 67.3],
                        borderColor: '#10B981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Negatif',
                        data: [22, 19, 21, 17, 19, 18, 18.7],
                        borderColor: '#EF4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Netral',
                        data: [16, 16, 16, 15, 16, 15, 14],
                        borderColor: '#F59E0B',
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Topic Trend Chart (Topics Page)
    if (document.getElementById('topicTrendChart')) {
        const topicTrendCtx = document.getElementById('topicTrendChart').getContext('2d');
        new Chart(topicTrendCtx, {
            type: 'line',
            data: {
                labels: ['2 Mei', '7 Mei', '12 Mei', '17 Mei', '22 Mei', '27 Mei', '31 Mei'],
                datasets: [
                    {
                        label: 'Infrastruktur',
                        data: [18, 19, 20, 22, 23, 24, 24.5],
                        borderColor: '#2196F3',
                        tension: 0.4
                    },
                    {
                        label: 'Pendidikan',
                        data: [12, 14, 15, 16, 17, 18, 18.7],
                        borderColor: '#2196F3',
                        tension: 0.4
                    },
                    {
                        label: 'UMKM',
                        data: [10, 11, 12, 14, 15, 16, 16.2],
                        borderColor: '#4CAF50',
                        tension: 0.4
                    },
                    {
                        label: 'Banjir',
                        data: [8, 9, 10, 12, 14, 15, 14.8],
                        borderColor: '#9C27B0',
                        tension: 0.4
                    },
                    {
                        label: 'Harga Pangan',
                        data: [6, 7, 8, 9, 10, 11, 12.3],
                        borderColor: '#64B5F6',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Comparison Charts (Comparison Page)
    if (document.getElementById('sentimentComparisonChart')) {
        const sentimentComparisonCtx = document.getElementById('sentimentComparisonChart').getContext('2d');
        new Chart(sentimentComparisonCtx, {
            type: 'bar',
            data: {
                labels: ['NasDem Bandung', 'Partai A Bandung', 'Partai B Bandung'],
                datasets: [
                    {
                        label: 'Positif',
                        data: [67.3, 48.5, 52.1],
                        backgroundColor: '#10B981'
                    },
                    {
                        label: 'Negatif',
                        data: [18.7, 32.2, 28.9],
                        backgroundColor: '#EF4444'
                    },
                    {
                        label: 'Netral',
                        data: [14.0, 19.3, 19.0],
                        backgroundColor: '#F59E0B'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        stacked: true,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }
    
    if (document.getElementById('volumeComparisonChart')) {
        const volumeComparisonCtx = document.getElementById('volumeComparisonChart').getContext('2d');
        new Chart(volumeComparisonCtx, {
            type: 'bar',
            data: {
                labels: ['NasDem Bandung', 'Partai A Bandung', 'Partai B Bandung'],
                datasets: [{
                    label: 'Total Mentions',
                    data: [12847, 9452, 10583],
                    backgroundColor: [
                        '#2196F3',
                        '#2196F3',
                        '#64B5F6'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Platform Distribution Chart (ganti yang lama)
    const sentimentCtx = document.getElementById('sentimentChart'); 
    if (sentimentCtx) {
        window.sentimentChart = new Chart(sentimentCtx, {
            type: 'doughnut',
            data: {
                labels: ['Twitter', 'Facebook', 'Instagram', 'Berita Online'], // ← PLATFORM
                datasets: [{
                    data: [8500, 3200, 2100, 2047], // ← PLATFORM DATA
                    backgroundColor: [
                        '#1DA1F2', '#4267B2', '#E4405F', '#FF6B35'
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }
}

// Simulate loading effects (for demo purposes)
function simulateLoading() {
    // Add pulse effect to alerts
    const alerts = document.querySelectorAll('.bg-red-50, .bg-yellow-50');
    alerts.forEach(alert => {
        alert.classList.add('alert-pulse');
    });
    
    // Simulate periodic refresh of data
    setInterval(() => {
        const refreshTime = document.createElement('div');
        refreshTime.classList.add('fixed', 'bottom-4', 'right-4', 'bg-white', 'shadow', 'p-2', 'rounded-lg', 'text-xs', 'text-gray-500');
        refreshTime.innerHTML = '<i class="fas fa-sync-alt fa-spin mr-1"></i> Memperbarui data...';
        document.body.appendChild(refreshTime);
        
        setTimeout(() => {
            refreshTime.remove();
        }, 2000);
    }, 60000);
}// API Configuration
const API_BASE_URL = 'http://localhost:8000/api/v1';

// API Service
class APIService {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    
    async fetchData(endpoint) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
    
    async getDashboardStats() {
        return this.fetchData('/dashboard/stats');
    }
}

// Initialize API service
const apiService = new APIService(API_BASE_URL);

// Load real data from backend
async function loadRealData() {
    try {
        console.log('🔄 Loading data from backend...');
        
        // Load dashboard stats
        const stats = await apiService.getDashboardStats();
        console.log('✅ Dashboard stats loaded:', stats);
        
        // Update dashboard stats
        updateDashboardStats(stats);
        
        // Update charts if they exist
        updateChartsWithRealData(stats);
        
        console.log('✅ All data updated successfully!');
        
    } catch (error) {
        console.error('❌ Failed to load real data:', error);
        showNotification('Failed to connect to backend', 'error');
    }
}

// Update dashboard stats in UI
function updateDashboardStats(stats) {
    // Update total mentions
    const totalMentionsEl = document.querySelector('[data-total-mentions]');
    if (totalMentionsEl) {
        totalMentionsEl.textContent = stats.total_mentions.toLocaleString();
    }
    
    // Update sentiment percentages
    const positiveEl = document.querySelector('[data-positive-percent]');
    if (positiveEl) {
        positiveEl.textContent = `${stats.sentiment_distribution.positive}%`;
    }
    
    const negativeEl = document.querySelector('[data-negative-percent]');
    if (negativeEl) {
        negativeEl.textContent = `${stats.sentiment_distribution.negative}%`;
    }
    
    const neutralEl = document.querySelector('[data-neutral-percent]');
    if (neutralEl) {
        neutralEl.textContent = `${stats.sentiment_distribution.neutral}%`;
    }
    
    // Update platform stats
    if (stats.platforms) {
        const twitterEl = document.querySelector('[data-twitter-count]');
        if (twitterEl) twitterEl.textContent = stats.platforms.twitter.toLocaleString();
        
        const facebookEl = document.querySelector('[data-facebook-count]');
        if (facebookEl) facebookEl.textContent = stats.platforms.facebook.toLocaleString();
        
        const instagramEl = document.querySelector('[data-instagram-count]');
        if (instagramEl) instagramEl.textContent = stats.platforms.instagram.toLocaleString();
        
        const newsEl = document.querySelector('[data-news-count]');
        if (newsEl) newsEl.textContent = stats.platforms.news.toLocaleString();
    }
}

// Update charts with real data
function updateChartsWithRealData(stats) {
    // Update PLATFORM chart (bukan sentiment chart)
    if (window.sentimentChart && stats.platforms) {
        window.sentimentChart.data.labels = ['Twitter', 'Facebook', 'Instagram', 'Berita Online'];
        window.sentimentChart.data.datasets[0].data = [
            stats.platforms.twitter,   // 8500
            stats.platforms.facebook,  // 3200
            stats.platforms.instagram, // 2100
            stats.platforms.news       // 2047
        ];
        window.sentimentChart.update();
        console.log('📊 Platform chart updated');
    }
}

// Tambahkan function ini di main.js
function initSidebarToggle() {
    const toggleBtn = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', function() {
            console.log('Sidebar toggle clicked'); // Debug
            
            // Toggle sidebar visibility dengan Tailwind classes
            sidebar.classList.toggle('-translate-x-full');
            
            // Adjust main content margin jika ada
            if (mainContent) {
                mainContent.classList.toggle('ml-64');
                mainContent.classList.toggle('ml-0');
            }
            
            console.log('Sidebar classes:', sidebar.className); // Debug
        });
    } else {
        console.error('Toggle button atau sidebar tidak ditemukan');
    }
}

// Topics API Integration
async function loadTopicsData() {
    try {
        console.log('🔄 Loading topics data from backend...');
        
        const period = document.getElementById('topics-period')?.value || '24h';
        const category = document.getElementById('keywords-category')?.value || 'all';
        
        // Load trending topics
        const topicsUrl = `${API_BASE_URL}/topics/trending?limit=10&period=${period}`;
        console.log('📡 Fetching:', topicsUrl);
        
        const topicsResponse = await fetch(topicsUrl);
        if (!topicsResponse.ok) {
            throw new Error(`Topics API error: ${topicsResponse.status}`);
        }
        const topicsData = await topicsResponse.json();
        
        // Load trending keywords
        const keywordsUrl = `${API_BASE_URL}/topics/keywords?limit=20${category !== 'all' ? `&category=${category}` : ''}`;
        console.log('📡 Fetching:', keywordsUrl);
        
        const keywordsResponse = await fetch(keywordsUrl);
        if (!keywordsResponse.ok) {
            throw new Error(`Keywords API error: ${keywordsResponse.status}`);
        }
        const keywordsData = await keywordsResponse.json();
        
        console.log('✅ Topics data loaded:', topicsData);
        console.log('✅ Keywords data loaded:', keywordsData);
        
        // Update UI
        updateTopicsDisplay(topicsData);
        updateKeywordsDisplay(keywordsData);
        
        return { topics: topicsData, keywords: keywordsData };
        
    } catch (error) {
        console.error('❌ Error loading topics data:', error);
        
        // Show error message to user
        const container = document.getElementById('topics-container');
        if (container) {
            container.innerHTML = `
                <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <h3 class="text-red-800 font-semibold mb-2">⚠️ Error Loading Topics</h3>
                    <p class="text-red-600">${error.message}</p>
                    <button onclick="loadTopicsData()" class="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                        🔄 Retry
                    </button>
                </div>
            `;
        }
    }
}

function updateTopicsDisplay(data) {
    const container = document.getElementById('topics-container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="mb-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Trending Topics (${data.period})</h2>
            <p class="text-gray-600 mb-4">Total: ${data.total_topics} topics</p>
        </div>
        
        <div class="grid gap-6">
            ${data.topics.map(topic => `
                <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                     onclick="showTopicDetail('${topic.id}')">
                    
                    <!-- Topic Header -->
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h3 class="text-xl font-semibold text-gray-800 mb-2">${topic.name}</h3>
                            <div class="flex items-center space-x-4 text-sm text-gray-600">
                                <span>📊 ${topic.mentions.toLocaleString()} mentions</span>
                                <span class="trending-score">🔥 ${topic.trending_score}/10</span>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="sentiment-badge ${getSentimentColor(topic.sentiment_score)}">
                                ${getSentimentLabel(topic.sentiment_score)}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Sentiment Distribution -->
                    <div class="mb-4">
                        <div class="text-sm text-gray-600 mb-2">Sentiment Distribution</div>
                        <div class="flex rounded-lg overflow-hidden h-3">
                            <div class="bg-green-500" style="width: ${topic.sentiment_distribution.positive}%"></div>
                            <div class="bg-red-500" style="width: ${topic.sentiment_distribution.negative}%"></div>
                            <div class="bg-gray-400" style="width: ${topic.sentiment_distribution.neutral}%"></div>
                        </div>
                        <div class="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Positive ${topic.sentiment_distribution.positive}%</span>
                            <span>Negative ${topic.sentiment_distribution.negative}%</span>
                            <span>Neutral ${topic.sentiment_distribution.neutral}%</span>
                        </div>
                    </div>
                    
                    <!-- Keywords -->
                    <div class="mb-4">
                        <div class="text-sm text-gray-600 mb-2">Keywords</div>
                        <div class="flex flex-wrap gap-2">
                            ${topic.keywords.map(keyword => `
                                <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                    ${keyword}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Platform Distribution - FIX: platforms bukan platform_distribution -->
                    <div class="grid grid-cols-4 gap-2 text-center text-xs">
                        <div class="platform-stat">
                            <div class="text-blue-600 font-semibold">${topic.platforms.twitter}</div>
                            <div class="text-gray-500">Twitter</div>
                        </div>
                        <div class="platform-stat">
                            <div class="text-blue-800 font-semibold">${topic.platforms.facebook}</div>
                            <div class="text-gray-500">Facebook</div>
                        </div>
                        <div class="platform-stat">
                            <div class="text-pink-600 font-semibold">${topic.platforms.instagram}</div>
                            <div class="text-gray-500">Instagram</div>
                        </div>
                        <div class="platform-stat">
                            <div class="text-gray-800 font-semibold">${topic.platforms.news}</div>
                            <div class="text-gray-500">News</div>
                        </div>
                    </div>
                    
                    <!-- Timestamp -->
                    <div class="text-xs text-gray-400 mt-4 border-t pt-2">
                        Last updated: ${formatTimestamp(topic.last_updated)}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Add missing helper functions
function getSentimentColor(score) {
    if (score > 0.3) return 'sentiment-positive';
    if (score < -0.3) return 'sentiment-negative';
    return 'sentiment-neutral';
}

function getSentimentLabel(score) {
    if (score > 0.3) return 'Positive';
    if (score < -0.3) return 'Negative';
    return 'Neutral';
}

function formatTimestamp(timestamp) {
    return new Date(timestamp).toLocaleString('id-ID');
}

function updateKeywordsDisplay(data) {
    const container = document.getElementById('keywords-container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="mb-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Trending Keywords</h2>
            <p class="text-gray-600 mb-4">Total: ${data.total_keywords} keywords</p>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
            ${data.keywords.map(keyword => `
                <div class="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
                    <div class="font-semibold text-gray-800">${keyword.text}</div>
                    <div class="text-gray-500 text-sm">${keyword.mentions.toLocaleString()} mentions</div>
                </div>
            `).join('')}
        </div>
    `;
}

// Mock data functions (for fallback)
function getMockTopicsData() {
    return {
        period: '24 Jam Terakhir',
        total_topics: 150,
        topics: Array.from({ length: 10 }, (_, i) => ({
            id: `topic-${i + 1}`,
            name: `Topik Populer ${i + 1}`,
            mentions: Math.floor(Math.random() * 1000),
            trending_score: Math.floor(Math.random() * 10) + 1,
            sentiment_score: Math.random() > 0.5 ? 1 : -1,
            sentiment_distribution: {
                positive: Math.random() * 100,
                negative: Math.random() * 100,
                neutral: Math.random() * 100
            },
            keywords: Array.from({ length: 3 }, () => `Keyword ${Math.floor(Math.random() * 100)}`),
            platforms: {
                twitter: Math.floor(Math.random() * 500),
                facebook: Math.floor(Math.random() * 500),
                instagram: Math.floor(Math.random() * 500),
                news: Math.floor(Math.random() * 500)
            },
            last_updated: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24).toISOString()
        }))
    };
}

function getMockKeywordsData() {
    return {
        total_keywords: 20,
        keywords: Array.from({ length: 20 }, (_, i) => ({
            text: `Keyword ${i + 1}`,
            mentions: Math.floor(Math.random() * 1000)
        }))
    };
}

// Detail topic page (placeholder)
function showTopicDetail(topicId) {
    console.log('Show detail for topic:', topicId);
    // Navigate to topic detail page or show modal
    // window.location.href = `/topics/${topicId}`;
}

// Add event listeners for Topics page
document.addEventListener('DOMContentLoaded', function() {
    // Topics page event listeners
    const topicsPeriodSelect = document.getElementById('topics-period');
    const keywordsCategorySelect = document.getElementById('keywords-category');
    const refreshTopicsBtn = document.getElementById('refresh-topics');
    
    if (topicsPeriodSelect) {
        topicsPeriodSelect.addEventListener('change', function() {
            loadTopicsData();
        });
    }
    
    if (keywordsCategorySelect) {
        keywordsCategorySelect.addEventListener('change', function() {
            loadTopicsData();
        });
    }
    
    if (refreshTopicsBtn) {
        refreshTopicsBtn.addEventListener('click', function() {
            loadTopicsData();
        });
    }
});

// Update navigation function
function navigateToSection(sectionId) {
    console.log(`🔄 Navigating to: ${sectionId}`);
    
    // Hide all sections
    hideAllSections();
    
    // Show requested section
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.remove('hidden');
        console.log(`✅ Section ${sectionId} shown`);
    } else {
        console.error(`❌ Section ${sectionId} not found`);
        return;
    }
    
    // Load section-specific data
    switch(sectionId) {
        case 'dashboard-section':
            loadDashboardData();
            break;
        case 'topics-section':
            loadTopicsData();
            break;
        default:
            console.log(`No specific loader for ${sectionId}`);
    }
    
    // Update active navigation
    updateActiveNavigation(sectionId);
}

function hideAllSections() {
    const sections = document.querySelectorAll('.dashboard-section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
}

function updateActiveNavigation(activeSection) {
    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.dashboard-nav-item');
    navItems.forEach(item => {
        item.classList.remove('active', 'bg-blue-50', 'text-blue-600');
        item.classList.add('text-gray-700');
    });
    
    // Add active class to current nav item
    const activeNav = document.querySelector(`[onclick*="${activeSection}"]`);
    if (activeNav) {
        activeNav.classList.add('active', 'bg-blue-50', 'text-blue-600');
        activeNav.classList.remove('text-gray-700');
    }
}

// Specific navigation functions
function navigateToDeteksiTopik() {
    navigateToSection('topics-section');
}

function navigateToDashboard() {
    navigateToSection('dashboard-section');
}