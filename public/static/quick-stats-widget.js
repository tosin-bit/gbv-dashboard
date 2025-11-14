// Quick Stats Widget - Floating dashboard mini-widget
// Real-time statistics display that stays visible across all pages

let widgetVisible = true;
let widgetMinimized = false;
let widgetPosition = { x: 20, y: 100 };
let statsUpdateInterval = null;
let currentStats = null;

const statsConfig = {
  refreshInterval: 30000, // 30 seconds
  animationDuration: 1000,
  categories: [
    {
      id: 'overview',
      name: 'Overview',
      icon: 'tachometer-alt',
      metrics: [
        { key: 'total_cases', label: 'Total Cases', icon: 'folder', color: 'blue' },
        { key: 'active_cases', label: 'Active Cases', icon: 'folder-open', color: 'green' },
        { key: 'high_risk', label: 'High Risk', icon: 'exclamation-triangle', color: 'red' },
        { key: 'resolved_today', label: 'Resolved Today', icon: 'check-circle', color: 'purple' }
      ]
    },
    {
      id: 'today',
      name: 'Today',
      icon: 'calendar-day',
      metrics: [
        { key: 'new_cases', label: 'New Cases', icon: 'plus-circle', color: 'blue' },
        { key: 'appointments', label: 'Appointments', icon: 'calendar-check', color: 'green' },
        { key: 'urgent_alerts', label: 'Urgent Alerts', icon: 'bell', color: 'red' },
        { key: 'messages', label: 'Team Messages', icon: 'comments', color: 'indigo' }
      ]
    },
    {
      id: 'performance',
      name: 'Performance',
      icon: 'chart-line',
      metrics: [
        { key: 'response_time', label: 'Avg Response', icon: 'clock', color: 'blue', suffix: 'min' },
        { key: 'satisfaction', label: 'Satisfaction', icon: 'smile', color: 'green', suffix: '%' },
        { key: 'completion_rate', label: 'Completion', icon: 'tasks', color: 'purple', suffix: '%' },
        { key: 'follow_up_rate', label: 'Follow-up', icon: 'redo', color: 'indigo', suffix: '%' }
      ]
    }
  ]
};

function createQuickStatsWidget() {
  const widgetHTML = `
    <div id="quick-stats-widget" 
         class="fixed z-40 bg-white rounded-2xl shadow-2xl transition-all"
         style="left: ${widgetPosition.x}px; top: ${widgetPosition.y}px; width: 320px;">
      
      <!-- Widget Header -->
      <div id="widget-header" 
           class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-t-2xl cursor-move flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <i class="fas fa-chart-pie text-sm"></i>
          </div>
          <div>
            <div class="font-bold text-sm">Quick Stats</div>
            <div class="text-xs text-indigo-100" id="widget-update-time">Just now</div>
          </div>
        </div>
        <div class="flex gap-2">
          <button onclick="refreshWidgetStats()" 
                  class="w-8 h-8 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all flex items-center justify-center"
                  title="Refresh">
            <i class="fas fa-sync text-sm"></i>
          </button>
          <button onclick="toggleWidgetMinimize()" 
                  id="widget-minimize-btn"
                  class="w-8 h-8 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all flex items-center justify-center"
                  title="Minimize">
            <i class="fas fa-minus text-sm"></i>
          </button>
          <button onclick="closeQuickStatsWidget()" 
                  class="w-8 h-8 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all flex items-center justify-center"
                  title="Close">
            <i class="fas fa-times text-sm"></i>
          </button>
        </div>
      </div>

      <!-- Widget Body -->
      <div id="widget-body" class="p-4 max-h-[500px] overflow-y-auto">
        <!-- Category Tabs -->
        <div class="flex gap-1 mb-4 bg-gray-100 p-1 rounded-lg">
          ${statsConfig.categories.map((cat, index) => `
            <button onclick="switchWidgetCategory('${cat.id}')" 
                    id="widget-tab-${cat.id}"
                    class="flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${index === 0 ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'}">
              <i class="fas fa-${cat.icon} mr-1"></i>
              <span class="hidden sm:inline">${cat.name}</span>
            </button>
          `).join('')}
        </div>

        <!-- Stats Content -->
        <div id="widget-stats-content">
          ${renderStatsCategory(statsConfig.categories[0])}
        </div>

        <!-- Quick Actions -->
        <div class="mt-4 pt-4 border-t border-gray-200">
          <div class="text-xs font-semibold text-gray-600 mb-2">Quick Actions</div>
          <div class="grid grid-cols-2 gap-2">
            <button onclick="showTab('report')" 
                    class="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-xs font-semibold">
              <i class="fas fa-plus mr-1"></i>
              New Case
            </button>
            <button onclick="showTab('cases')" 
                    class="px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-xs font-semibold">
              <i class="fas fa-folder-open mr-1"></i>
              View Cases
            </button>
            <button onclick="showAdvancedAnalytics()" 
                    class="px-3 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 text-xs font-semibold">
              <i class="fas fa-chart-line mr-1"></i>
              Analytics
            </button>
            <button onclick="showAIChatbot()" 
                    class="px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 text-xs font-semibold">
              <i class="fas fa-robot mr-1"></i>
              AI Help
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', widgetHTML);
  initializeWidget();
}

function renderStatsCategory(category) {
  const metrics = category.metrics;

  return `
    <div class="grid grid-cols-2 gap-3">
      ${metrics.map(metric => {
        const value = getSampleValue(metric);
        return `
          <div class="bg-gradient-to-br from-${metric.color}-50 to-${metric.color}-100 p-3 rounded-xl border-2 border-${metric.color}-200">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-8 h-8 bg-${metric.color}-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                <i class="fas fa-${metric.icon} text-${metric.color}-600 text-sm"></i>
              </div>
            </div>
            <div class="text-2xl font-bold text-${metric.color}-800 mb-1">
              ${value}${metric.suffix || ''}
            </div>
            <div class="text-xs text-${metric.color}-700 font-semibold">
              ${metric.label}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function getSampleValue(metric) {
  // Generate sample data - in production, this would fetch real data
  const sampleData = {
    total_cases: 1234,
    active_cases: 87,
    high_risk: 12,
    resolved_today: 5,
    new_cases: 3,
    appointments: 8,
    urgent_alerts: 2,
    messages: 15,
    response_time: 24,
    satisfaction: 94,
    completion_rate: 87,
    follow_up_rate: 92
  };

  return sampleData[metric.key] || 0;
}

function initializeWidget() {
  // Make widget draggable
  makeWidgetDraggable();

  // Load saved position
  loadWidgetPosition();

  // Start auto-refresh
  startStatsRefresh();

  // Fetch initial stats
  refreshWidgetStats();

  console.log('✅ Quick Stats Widget initialized');
}

function makeWidgetDraggable() {
  const widget = document.getElementById('quick-stats-widget');
  const header = document.getElementById('widget-header');

  let isDragging = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;

  header.addEventListener('mousedown', dragStart);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', dragEnd);

  function dragStart(e) {
    initialX = e.clientX - widgetPosition.x;
    initialY = e.clientY - widgetPosition.y;

    if (e.target === header || header.contains(e.target)) {
      isDragging = true;
      header.style.cursor = 'grabbing';
    }
  }

  function drag(e) {
    if (isDragging) {
      e.preventDefault();
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;

      // Keep widget within viewport
      const maxX = window.innerWidth - widget.offsetWidth;
      const maxY = window.innerHeight - widget.offsetHeight;

      currentX = Math.max(0, Math.min(currentX, maxX));
      currentY = Math.max(0, Math.min(currentY, maxY));

      widgetPosition.x = currentX;
      widgetPosition.y = currentY;

      widget.style.left = currentX + 'px';
      widget.style.top = currentY + 'px';
    }
  }

  function dragEnd(e) {
    if (isDragging) {
      isDragging = false;
      header.style.cursor = 'move';
      saveWidgetPosition();
    }
  }
}

function switchWidgetCategory(categoryId) {
  const category = statsConfig.categories.find(c => c.id === categoryId);
  if (!category) return;

  // Update tabs
  statsConfig.categories.forEach(cat => {
    const tab = document.getElementById(`widget-tab-${cat.id}`);
    if (tab) {
      if (cat.id === categoryId) {
        tab.className = 'flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-all bg-white text-indigo-600 shadow-sm';
      } else {
        tab.className = 'flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-all text-gray-600 hover:text-gray-800';
      }
    }
  });

  // Update content
  const content = document.getElementById('widget-stats-content');
  if (content) {
    content.innerHTML = renderStatsCategory(category);
  }
}

function refreshWidgetStats() {
  // In production, this would fetch real data from API
  const updateTime = document.getElementById('widget-update-time');
  if (updateTime) {
    updateTime.textContent = 'Just now';
  }

  // Animate refresh
  const refreshBtn = document.querySelector('#quick-stats-widget button[onclick="refreshWidgetStats()"] i');
  if (refreshBtn) {
    refreshBtn.classList.add('fa-spin');
    setTimeout(() => {
      refreshBtn.classList.remove('fa-spin');
    }, 1000);
  }

  // Update time display
  setTimeout(() => {
    updateTimeDisplay();
  }, 5000);
}

function updateTimeDisplay() {
  const updateTime = document.getElementById('widget-update-time');
  if (updateTime && updateTime.textContent === 'Just now') {
    updateTime.textContent = 'Updated recently';
  }
}

function startStatsRefresh() {
  if (statsUpdateInterval) {
    clearInterval(statsUpdateInterval);
  }

  statsUpdateInterval = setInterval(() => {
    refreshWidgetStats();
  }, statsConfig.refreshInterval);
}

function stopStatsRefresh() {
  if (statsUpdateInterval) {
    clearInterval(statsUpdateInterval);
    statsUpdateInterval = null;
  }
}

function toggleWidgetMinimize() {
  widgetMinimized = !widgetMinimized;
  const body = document.getElementById('widget-body');
  const btn = document.getElementById('widget-minimize-btn');

  if (widgetMinimized) {
    body.style.display = 'none';
    btn.innerHTML = '<i class="fas fa-plus text-sm"></i>';
    btn.title = 'Expand';
  } else {
    body.style.display = 'block';
    btn.innerHTML = '<i class="fas fa-minus text-sm"></i>';
    btn.title = 'Minimize';
  }
}

function closeQuickStatsWidget() {
  if (!confirm('Close Quick Stats widget? You can reopen it from the main menu.')) {
    return;
  }

  widgetVisible = false;
  stopStatsRefresh();
  document.getElementById('quick-stats-widget')?.remove();
  saveWidgetPreferences();
}

function showQuickStatsWidget() {
  if (document.getElementById('quick-stats-widget')) {
    return; // Already visible
  }

  widgetVisible = true;
  createQuickStatsWidget();
  saveWidgetPreferences();
}

function saveWidgetPosition() {
  localStorage.setItem('gbv_widget_position', JSON.stringify(widgetPosition));
}

function loadWidgetPosition() {
  const saved = localStorage.getItem('gbv_widget_position');
  if (saved) {
    try {
      widgetPosition = JSON.parse(saved);
      const widget = document.getElementById('quick-stats-widget');
      if (widget) {
        widget.style.left = widgetPosition.x + 'px';
        widget.style.top = widgetPosition.y + 'px';
      }
    } catch (e) {
      console.error('Error loading widget position:', e);
    }
  }
}

function saveWidgetPreferences() {
  localStorage.setItem('gbv_widget_visible', widgetVisible);
  localStorage.setItem('gbv_widget_minimized', widgetMinimized);
}

function loadWidgetPreferences() {
  const visible = localStorage.getItem('gbv_widget_visible');
  const minimized = localStorage.getItem('gbv_widget_minimized');

  if (visible !== null) {
    widgetVisible = visible === 'true';
  }

  if (minimized !== null) {
    widgetMinimized = minimized === 'true';
  }
}

// Auto-initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    loadWidgetPreferences();
    if (widgetVisible) {
      setTimeout(() => {
        createQuickStatsWidget();
        if (widgetMinimized) {
          toggleWidgetMinimize();
        }
      }, 2000); // Delay to avoid overwhelming the user
    }
  });
} else {
  loadWidgetPreferences();
  if (widgetVisible) {
    setTimeout(() => {
      createQuickStatsWidget();
      if (widgetMinimized) {
        toggleWidgetMinimize();
      }
    }, 2000);
  }
}

console.log('✅ Quick Stats Widget loaded successfully');
