// Video Resources Library - Educational content and animated explainers
// Comprehensive GBV training videos, survivor testimonials, and educational materials

const videoCategories = [
  {
    id: 'understanding_gbv',
    name: 'Understanding GBV',
    icon: 'book-open',
    color: 'blue',
    description: 'Learn about different forms of gender-based violence',
    count: 8
  },
  {
    id: 'survivor_support',
    name: 'Survivor Support',
    icon: 'hand-holding-heart',
    color: 'pink',
    description: 'Best practices for supporting survivors',
    count: 12
  },
  {
    id: 'legal_rights',
    name: 'Legal Rights & Procedures',
    icon: 'gavel',
    color: 'purple',
    description: 'Know your rights and legal options',
    count: 6
  },
  {
    id: 'medical_response',
    name: 'Medical Response',
    icon: 'heartbeat',
    color: 'red',
    description: 'Medical care and forensic procedures',
    count: 10
  },
  {
    id: 'testimonials',
    name: 'Survivor Stories',
    icon: 'users',
    color: 'green',
    description: 'Inspiring stories of resilience and recovery',
    count: 5
  },
  {
    id: 'prevention',
    name: 'Prevention & Education',
    icon: 'shield-alt',
    color: 'indigo',
    description: 'Community education and prevention strategies',
    count: 9
  }
];

const videoLibrary = {
  understanding_gbv: [
    {
      id: 1,
      title: 'What is Gender-Based Violence?',
      description: 'Introduction to GBV: types, causes, and global impact',
      duration: '12:45',
      views: 1247,
      thumbnail: '🎬',
      level: 'beginner',
      language: 'English',
      subtitles: ['Krio', 'French'],
      uploaded: '2024-01-15',
      topics: ['Definition', 'Types of GBV', 'Statistics']
    },
    {
      id: 2,
      title: 'Recognizing Signs of Abuse',
      description: 'Physical, emotional, and behavioral indicators',
      duration: '15:30',
      views: 892,
      thumbnail: '🔍',
      level: 'beginner',
      language: 'English',
      subtitles: ['Krio'],
      uploaded: '2024-01-20',
      topics: ['Warning Signs', 'Red Flags', 'Early Detection']
    },
    {
      id: 3,
      title: 'Sexual Violence: Understanding Consent',
      description: 'Clear explanation of consent and sexual assault',
      duration: '18:20',
      views: 1453,
      thumbnail: '⚖️',
      level: 'intermediate',
      language: 'English',
      subtitles: ['Krio', 'French'],
      uploaded: '2024-01-25',
      topics: ['Consent', 'Sexual Assault', 'Rape']
    }
  ],
  survivor_support: [
    {
      id: 4,
      title: 'First Contact with Survivors',
      description: 'Trauma-informed initial response techniques',
      duration: '20:15',
      views: 2145,
      thumbnail: '🤝',
      level: 'intermediate',
      language: 'English',
      subtitles: ['Krio'],
      uploaded: '2024-02-01',
      topics: ['First Response', 'Trauma-Informed Care', 'Active Listening']
    },
    {
      id: 5,
      title: 'Creating Safe Spaces',
      description: 'Building trust and ensuring survivor safety',
      duration: '16:45',
      views: 1678,
      thumbnail: '🏠',
      level: 'beginner',
      language: 'English',
      subtitles: ['Krio', 'French'],
      uploaded: '2024-02-05',
      topics: ['Safety Planning', 'Trust Building', 'Confidentiality']
    },
    {
      id: 6,
      title: 'Supporting Child Survivors',
      description: 'Special considerations for working with children',
      duration: '22:30',
      views: 1892,
      thumbnail: '👶',
      level: 'advanced',
      language: 'English',
      subtitles: ['Krio'],
      uploaded: '2024-02-10',
      topics: ['Child Protection', 'Age-Appropriate Communication', 'Family Involvement']
    }
  ],
  legal_rights: [
    {
      id: 7,
      title: 'Survivor Rights in Sierra Leone',
      description: 'Legal protections under national law',
      duration: '14:20',
      views: 1234,
      thumbnail: '📜',
      level: 'beginner',
      language: 'English',
      subtitles: ['Krio', 'French'],
      uploaded: '2024-02-15',
      topics: ['Legal Framework', 'Rights', 'Protections']
    },
    {
      id: 8,
      title: 'Reporting to Police: What to Expect',
      description: 'Step-by-step guide to filing a police report',
      duration: '19:45',
      views: 2341,
      thumbnail: '👮',
      level: 'beginner',
      language: 'English',
      subtitles: ['Krio'],
      uploaded: '2024-02-20',
      topics: ['Police Reporting', 'FSU Process', 'Evidence Collection']
    }
  ],
  medical_response: [
    {
      id: 9,
      title: 'Medical Forensic Examination',
      description: 'Understanding the rape kit process',
      duration: '25:10',
      views: 1567,
      thumbnail: '🔬',
      level: 'intermediate',
      language: 'English',
      subtitles: ['Krio', 'French'],
      uploaded: '2024-02-25',
      topics: ['Forensic Exam', 'Evidence Collection', 'Patient Rights']
    },
    {
      id: 10,
      title: 'Post-Exposure Prophylaxis (PEP)',
      description: 'Critical 72-hour window for HIV prevention',
      duration: '13:30',
      views: 2789,
      thumbnail: '💊',
      level: 'intermediate',
      language: 'English',
      subtitles: ['Krio'],
      uploaded: '2024-03-01',
      topics: ['PEP', 'HIV Prevention', 'Time-Sensitive Care']
    }
  ],
  testimonials: [
    {
      id: 11,
      title: 'Amina\'s Journey to Recovery',
      description: 'Survivor shares her path from trauma to empowerment',
      duration: '18:40',
      views: 3421,
      thumbnail: '💪',
      level: 'all',
      language: 'English',
      subtitles: ['Krio', 'French'],
      uploaded: '2024-03-05',
      topics: ['Recovery', 'Resilience', 'Empowerment'],
      featured: true
    },
    {
      id: 12,
      title: 'Breaking the Silence',
      description: 'Three women speak out about domestic violence',
      duration: '22:15',
      views: 4123,
      thumbnail: '🗣️',
      level: 'all',
      language: 'English',
      subtitles: ['Krio'],
      uploaded: '2024-03-10',
      topics: ['Domestic Violence', 'Speaking Out', 'Community Support'],
      featured: true
    }
  ],
  prevention: [
    {
      id: 13,
      title: 'Community Education Programs',
      description: 'Engaging communities in GBV prevention',
      duration: '17:20',
      views: 1456,
      thumbnail: '👥',
      level: 'intermediate',
      language: 'English',
      subtitles: ['Krio', 'French'],
      uploaded: '2024-03-15',
      topics: ['Community Engagement', 'Prevention', 'Education']
    },
    {
      id: 14,
      title: 'Healthy Relationships Workshop',
      description: 'Teaching respectful relationships to youth',
      duration: '21:30',
      views: 1789,
      thumbnail: '❤️',
      level: 'beginner',
      language: 'English',
      subtitles: ['Krio'],
      uploaded: '2024-03-20',
      topics: ['Relationships', 'Respect', 'Youth Education']
    }
  ]
};

const animatedExplainers = [
  {
    id: 'consent_animated',
    title: 'Understanding Consent - Animated',
    description: 'Simple, clear explanation of consent using animation',
    duration: '5:30',
    thumbnail: '🎨',
    style: 'cartoon',
    audience: 'youth',
    topics: ['Consent', 'Boundaries', 'Communication']
  },
  {
    id: 'reporting_process',
    title: 'How to Report GBV - Step by Step',
    description: 'Animated walkthrough of reporting process',
    duration: '8:15',
    thumbnail: '📱',
    style: 'infographic',
    audience: 'survivors',
    topics: ['Reporting', 'Process', 'Support Services']
  },
  {
    id: 'trauma_brain',
    title: 'How Trauma Affects the Brain',
    description: 'Scientific explanation made accessible',
    duration: '10:45',
    thumbnail: '🧠',
    style: 'educational',
    audience: 'professionals',
    topics: ['Trauma', 'Neuroscience', 'Response']
  },
  {
    id: 'safety_planning',
    title: 'Creating Your Safety Plan',
    description: 'Interactive guide to developing a personal safety plan',
    duration: '12:00',
    thumbnail: '🛡️',
    style: 'interactive',
    audience: 'survivors',
    topics: ['Safety Planning', 'Risk Assessment', 'Resources']
  }
];

let currentCategory = 'all';
let watchHistory = [];
let favorites = [];
let currentVideo = null;

function showVideoResources() {
  loadWatchHistory();
  loadFavorites();

  const modalHTML = `
    <div id="video-resources-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden flex flex-col">
        <!-- Header -->
        <div class="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 flex justify-between items-center">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <i class="fas fa-video text-2xl"></i>
            </div>
            <div>
              <h2 class="text-2xl font-bold">Video Resources Library</h2>
              <p class="text-sm text-purple-100">Educational content and animated explainers</p>
            </div>
          </div>
          <button onclick="closeVideoResources()" class="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>

        <!-- Search & Filter Bar -->
        <div class="border-b border-gray-200 p-4 bg-gray-50">
          <div class="flex gap-4 items-center">
            <div class="flex-1 relative">
              <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input type="text" id="video-search" 
                     onkeyup="searchVideos(this.value)"
                     placeholder="Search videos by title, topic, or description..."
                     class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
            </div>
            <select id="language-filter" onchange="filterVideos()" 
                    class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
              <option value="all">All Languages</option>
              <option value="English">English</option>
              <option value="Krio">Krio</option>
              <option value="French">French</option>
            </select>
            <select id="level-filter" onchange="filterVideos()" 
                    class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        <!-- Main Content -->
        <div class="flex-1 overflow-hidden flex">
          <!-- Left Sidebar: Categories -->
          <div class="w-64 border-r border-gray-200 bg-gray-50 overflow-y-auto">
            <div class="p-4">
              <h3 class="font-bold text-gray-800 mb-3">Categories</h3>
              <div class="space-y-1">
                <button onclick="filterByCategory('all')" 
                        id="category-all"
                        class="w-full text-left px-4 py-3 rounded-lg transition-all category-btn category-active">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <i class="fas fa-th text-purple-600"></i>
                      <span class="font-semibold">All Videos</span>
                    </div>
                    <span class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                      ${Object.values(videoLibrary).flat().length}
                    </span>
                  </div>
                </button>
                ${videoCategories.map(cat => `
                  <button onclick="filterByCategory('${cat.id}')" 
                          id="category-${cat.id}"
                          class="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-all category-btn">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-3">
                        <i class="fas fa-${cat.icon} text-${cat.color}-600"></i>
                        <span class="font-semibold text-sm">${cat.name}</span>
                      </div>
                      <span class="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                        ${cat.count}
                      </span>
                    </div>
                  </button>
                `).join('')}
              </div>

              <div class="mt-6 pt-6 border-t border-gray-200">
                <h3 class="font-bold text-gray-800 mb-3">Collections</h3>
                <button onclick="showWatchHistory()" class="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-all">
                  <div class="flex items-center gap-3">
                    <i class="fas fa-history text-indigo-600"></i>
                    <span class="font-semibold text-sm">Watch History</span>
                  </div>
                </button>
                <button onclick="showFavorites()" class="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-all">
                  <div class="flex items-center gap-3">
                    <i class="fas fa-heart text-red-600"></i>
                    <span class="font-semibold text-sm">Favorites</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <!-- Center: Video Grid -->
          <div class="flex-1 overflow-y-auto p-6">
            <!-- Featured Section -->
            <div id="featured-section" class="mb-8">
              <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i class="fas fa-star text-yellow-500"></i>
                Featured Content
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${Object.values(videoLibrary).flat().filter(v => v.featured).map(video => `
                  <div class="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-4 border-2 border-purple-200">
                    <div class="flex gap-4">
                      <div class="w-24 h-24 bg-white rounded-lg flex items-center justify-center text-4xl">
                        ${video.thumbnail}
                      </div>
                      <div class="flex-1">
                        <h4 class="font-bold text-gray-800 mb-1">${video.title}</h4>
                        <p class="text-sm text-gray-600 mb-2">${video.description}</p>
                        <div class="flex items-center gap-4 text-xs text-gray-500 mb-3">
                          <span><i class="fas fa-clock mr-1"></i>${video.duration}</span>
                          <span><i class="fas fa-eye mr-1"></i>${video.views} views</span>
                        </div>
                        <button onclick="playVideo(${video.id})" 
                                class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
                          <i class="fas fa-play mr-2"></i>
                          Watch Now
                        </button>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Animated Explainers -->
            <div class="mb-8">
              <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i class="fas fa-magic text-indigo-600"></i>
                Animated Explainers
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                ${animatedExplainers.map(video => `
                  <div class="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-indigo-400 transition-all cursor-pointer"
                       onclick="playAnimatedExplainer('${video.id}')">
                    <div class="w-full h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center text-5xl mb-3">
                      ${video.thumbnail}
                    </div>
                    <h4 class="font-bold text-sm text-gray-800 mb-1">${video.title}</h4>
                    <p class="text-xs text-gray-600 mb-2">${video.description}</p>
                    <div class="flex items-center justify-between text-xs text-gray-500">
                      <span><i class="fas fa-clock mr-1"></i>${video.duration}</span>
                      <span class="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded">${video.style}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Video Grid by Category -->
            <div id="video-grid-container">
              <h3 class="text-xl font-bold text-gray-800 mb-4">All Videos</h3>
              <div id="video-grid" class="grid grid-cols-1 md:grid-cols-3 gap-4">
                ${renderVideoGrid(Object.values(videoLibrary).flat())}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function renderVideoGrid(videos) {
  if (videos.length === 0) {
    return '<div class="col-span-3 text-center py-12 text-gray-500">No videos found matching your criteria</div>';
  }

  return videos.map(video => `
    <div class="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-purple-400 transition-all group cursor-pointer">
      <div class="relative">
        <div class="w-full h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-6xl">
          ${video.thumbnail}
        </div>
        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
          <button onclick="playVideo(${video.id})" 
                  class="opacity-0 group-hover:opacity-100 transition-all transform scale-75 group-hover:scale-100 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
            <i class="fas fa-play text-purple-600 text-2xl ml-1"></i>
          </button>
        </div>
        <div class="absolute bottom-2 right-2 px-2 py-1 bg-black bg-opacity-75 text-white text-xs rounded">
          ${video.duration}
        </div>
      </div>
      <div class="p-4">
        <h4 class="font-bold text-gray-800 mb-1 line-clamp-2">${video.title}</h4>
        <p class="text-sm text-gray-600 mb-3 line-clamp-2">${video.description}</p>
        <div class="flex items-center justify-between text-xs text-gray-500 mb-3">
          <span><i class="fas fa-eye mr-1"></i>${video.views} views</span>
          <span class="px-2 py-0.5 bg-gray-100 rounded">${video.level}</span>
        </div>
        <div class="flex gap-2">
          <button onclick="playVideo(${video.id}); event.stopPropagation();" 
                  class="flex-1 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
            <i class="fas fa-play mr-1"></i>
            Watch
          </button>
          <button onclick="toggleFavorite(${video.id}); event.stopPropagation();" 
                  class="px-3 py-2 border-2 border-gray-300 rounded-lg hover:border-red-500 hover:text-red-500 text-sm ${favorites.includes(video.id) ? 'border-red-500 text-red-500' : ''}">
            <i class="fas fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function filterByCategory(categoryId) {
  currentCategory = categoryId;

  // Update active button
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('category-active', 'bg-purple-100');
  });
  document.getElementById(`category-${categoryId}`).classList.add('category-active', 'bg-purple-100');

  // Filter videos
  let videos;
  if (categoryId === 'all') {
    videos = Object.values(videoLibrary).flat();
  } else {
    videos = videoLibrary[categoryId] || [];
  }

  // Apply additional filters
  videos = applyFilters(videos);

  // Update grid
  const categoryName = categoryId === 'all' ? 'All Videos' : videoCategories.find(c => c.id === categoryId)?.name || 'Videos';
  document.getElementById('video-grid-container').innerHTML = `
    <h3 class="text-xl font-bold text-gray-800 mb-4">${categoryName}</h3>
    <div id="video-grid" class="grid grid-cols-1 md:grid-cols-3 gap-4">
      ${renderVideoGrid(videos)}
    </div>
  `;
}

function searchVideos(query) {
  if (!query.trim()) {
    filterByCategory(currentCategory);
    return;
  }

  const lowerQuery = query.toLowerCase();
  const allVideos = Object.values(videoLibrary).flat();
  const filtered = allVideos.filter(video => 
    video.title.toLowerCase().includes(lowerQuery) ||
    video.description.toLowerCase().includes(lowerQuery) ||
    video.topics.some(topic => topic.toLowerCase().includes(lowerQuery))
  );

  document.getElementById('video-grid-container').innerHTML = `
    <h3 class="text-xl font-bold text-gray-800 mb-4">Search Results for "${query}"</h3>
    <div id="video-grid" class="grid grid-cols-1 md:grid-cols-3 gap-4">
      ${renderVideoGrid(filtered)}
    </div>
  `;
}

function filterVideos() {
  filterByCategory(currentCategory);
}

function applyFilters(videos) {
  const language = document.getElementById('language-filter')?.value || 'all';
  const level = document.getElementById('level-filter')?.value || 'all';

  let filtered = videos;

  if (language !== 'all') {
    filtered = filtered.filter(v => 
      v.language === language || v.subtitles?.includes(language)
    );
  }

  if (level !== 'all') {
    filtered = filtered.filter(v => v.level === level || v.level === 'all');
  }

  return filtered;
}

function playVideo(videoId) {
  const allVideos = Object.values(videoLibrary).flat();
  const video = allVideos.find(v => v.id === videoId);
  if (!video) return;

  // Add to watch history
  addToWatchHistory(videoId);

  // Show video player modal
  const playerHTML = `
    <div id="video-player-modal" class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[60]">
      <div class="w-full max-w-5xl p-4">
        <div class="bg-white rounded-xl overflow-hidden">
          <!-- Video Player Area -->
          <div class="bg-black aspect-video flex items-center justify-center">
            <div class="text-center text-white">
              <div class="text-8xl mb-4">${video.thumbnail}</div>
              <p class="text-xl mb-6">Video Player</p>
              <p class="text-sm text-gray-400 mb-4">In production, this would play: ${video.title}</p>
              <button onclick="closeVideoPlayer()" class="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700">
                <i class="fas fa-times mr-2"></i>
                Close Player
              </button>
            </div>
          </div>

          <!-- Video Info -->
          <div class="p-6">
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3 class="text-2xl font-bold text-gray-800 mb-2">${video.title}</h3>
                <p class="text-gray-600 mb-3">${video.description}</p>
                <div class="flex items-center gap-4 text-sm text-gray-500">
                  <span><i class="fas fa-eye mr-1"></i>${video.views} views</span>
                  <span><i class="fas fa-calendar mr-1"></i>${video.uploaded}</span>
                  <span><i class="fas fa-clock mr-1"></i>${video.duration}</span>
                  <span class="px-2 py-1 bg-gray-200 rounded">${video.level}</span>
                </div>
              </div>
              <button onclick="toggleFavorite(${video.id})" 
                      class="px-4 py-2 border-2 rounded-lg ${favorites.includes(video.id) ? 'border-red-500 text-red-500' : 'border-gray-300'}">
                <i class="fas fa-heart mr-2"></i>
                ${favorites.includes(video.id) ? 'Saved' : 'Save'}
              </button>
            </div>

            <!-- Topics -->
            <div class="mb-4">
              <h4 class="font-semibold text-gray-800 mb-2">Topics Covered:</h4>
              <div class="flex flex-wrap gap-2">
                ${video.topics.map(topic => `
                  <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">${topic}</span>
                `).join('')}
              </div>
            </div>

            <!-- Language Info -->
            <div>
              <h4 class="font-semibold text-gray-800 mb-2">Languages:</h4>
              <div class="flex gap-2">
                <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  <i class="fas fa-microphone mr-1"></i>${video.language}
                </span>
                ${video.subtitles?.map(lang => `
                  <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    <i class="fas fa-closed-captioning mr-1"></i>${lang}
                  </span>
                `).join('') || ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', playerHTML);
}

function playAnimatedExplainer(explainerId) {
  const explainer = animatedExplainers.find(e => e.id === explainerId);
  if (!explainer) return;

  alert(`▶️ Playing Animated Explainer:\n\n${explainer.title}\n${explainer.description}\n\nIn production, this would play the animated video.`);
}

function closeVideoPlayer() {
  document.getElementById('video-player-modal')?.remove();
}

function toggleFavorite(videoId) {
  if (favorites.includes(videoId)) {
    favorites = favorites.filter(id => id !== videoId);
  } else {
    favorites.push(videoId);
  }
  saveFavorites();
  
  // Refresh current view if needed
  if (currentCategory) {
    filterByCategory(currentCategory);
  }
}

function addToWatchHistory(videoId) {
  watchHistory = watchHistory.filter(item => item.videoId !== videoId);
  watchHistory.unshift({
    videoId: videoId,
    timestamp: new Date().toISOString()
  });
  
  // Keep only last 50
  if (watchHistory.length > 50) {
    watchHistory = watchHistory.slice(0, 50);
  }
  
  saveWatchHistory();
}

function showWatchHistory() {
  const videos = watchHistory.map(item => {
    const allVideos = Object.values(videoLibrary).flat();
    return allVideos.find(v => v.id === item.videoId);
  }).filter(v => v);

  document.getElementById('video-grid-container').innerHTML = `
    <h3 class="text-xl font-bold text-gray-800 mb-4">Watch History</h3>
    <div id="video-grid" class="grid grid-cols-1 md:grid-cols-3 gap-4">
      ${renderVideoGrid(videos)}
    </div>
  `;
}

function showFavorites() {
  const allVideos = Object.values(videoLibrary).flat();
  const videos = favorites.map(id => allVideos.find(v => v.id === id)).filter(v => v);

  document.getElementById('video-grid-container').innerHTML = `
    <h3 class="text-xl font-bold text-gray-800 mb-4">Favorite Videos</h3>
    <div id="video-grid" class="grid grid-cols-1 md:grid-cols-3 gap-4">
      ${renderVideoGrid(videos)}
    </div>
  `;
}

function saveWatchHistory() {
  localStorage.setItem('gbv_video_watch_history', JSON.stringify(watchHistory));
}

function loadWatchHistory() {
  watchHistory = JSON.parse(localStorage.getItem('gbv_video_watch_history') || '[]');
}

function saveFavorites() {
  localStorage.setItem('gbv_video_favorites', JSON.stringify(favorites));
}

function loadFavorites() {
  favorites = JSON.parse(localStorage.getItem('gbv_video_favorites') || '[]');
}

function closeVideoResources() {
  document.getElementById('video-resources-modal')?.remove();
  closeVideoPlayer();
}

// Add CSS for category active state
const style = document.createElement('style');
style.textContent = `
  .category-active {
    background-color: rgb(243 232 255);
    font-weight: 600;
  }
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;
document.head.appendChild(style);

// Initialize on page load
console.log('✅ Video Resources Library loaded successfully');
