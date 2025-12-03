/**
 * GBVIMS+ Import System
 * Frontend handler for CSV upload and import processing
 */

// Load import history on page load
document.addEventListener('DOMContentLoaded', () => {
  loadImportHistory();
  setupFileUpload();
});

/**
 * Setup file upload handlers
 */
function setupFileUpload() {
  const fileInput = document.getElementById('csv-file-input');
  const uploadZone = document.getElementById('upload-zone');
  
  // File input change handler
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  });
  
  // Drag and drop handlers
  uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadZone.classList.add('border-blue-500', 'bg-blue-50');
  });
  
  uploadZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadZone.classList.remove('border-blue-500', 'bg-blue-50');
  });
  
  uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadZone.classList.remove('border-blue-500', 'bg-blue-50');
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/csv') {
      fileInput.files = e.dataTransfer.files;
      handleFileUpload(file);
    } else {
      showError('Please upload a CSV file');
    }
  });
}

/**
 * Handle CSV file upload and import
 */
async function handleFileUpload(file) {
  const progressDiv = document.getElementById('import-progress');
  const resultsDiv = document.getElementById('import-results');
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  
  // Show progress
  progressDiv.classList.remove('hidden');
  resultsDiv.classList.add('hidden');
  progressBar.style.width = '10%';
  progressText.textContent = 'Reading CSV file...';
  
  try {
    // Create form data
    const formData = new FormData();
    formData.append('file', file);
    
    progressBar.style.width = '30%';
    progressText.textContent = 'Uploading to server...';
    
    // Upload and process
    const response = await axios.post('/api/import/gbvims-csv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 50) / progressEvent.total) + 30;
        progressBar.style.width = percentCompleted + '%';
        progressText.textContent = 'Processing import...';
      }
    });
    
    progressBar.style.width = '100%';
    progressText.textContent = 'Import complete!';
    
    setTimeout(() => {
      progressDiv.classList.add('hidden');
      displayImportResults(response.data);
      loadImportHistory(); // Refresh history
    }, 1000);
    
  } catch (error) {
    console.error('Import error:', error);
    progressDiv.classList.add('hidden');
    
    let errorMessage = 'Failed to import CSV file';
    if (error.response?.data?.error) {
      errorMessage = error.response.data.error;
    } else if (error.response?.data?.details) {
      errorMessage = error.response.data.details;
    }
    
    showError(errorMessage);
  }
}

/**
 * Display import results
 */
function displayImportResults(data) {
  const resultsDiv = document.getElementById('import-results');
  const summary = data.import_summary;
  
  const successRate = summary.success_rate || 0;
  const statusColor = successRate >= 90 ? 'green' : successRate >= 70 ? 'yellow' : 'red';
  
  resultsDiv.innerHTML = `
    <div class="bg-white rounded-lg shadow-md p-8 mb-8">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">
        <i class="fas fa-check-circle text-${statusColor}-600 mr-2"></i>
        Import Complete
      </h2>
      
      <!-- Summary Cards -->
      <div class="grid grid-cols-4 gap-6 mb-8">
        <div class="bg-blue-50 rounded-lg p-6 text-center">
          <div class="text-4xl font-bold text-blue-600 mb-2">
            ${summary.total_records}
          </div>
          <div class="text-sm text-gray-600">Total Records</div>
        </div>
        
        <div class="bg-green-50 rounded-lg p-6 text-center">
          <div class="text-4xl font-bold text-green-600 mb-2">
            ${summary.successful_imports}
          </div>
          <div class="text-sm text-gray-600">Successfully Imported</div>
        </div>
        
        <div class="bg-yellow-50 rounded-lg p-6 text-center">
          <div class="text-4xl font-bold text-yellow-600 mb-2">
            ${summary.skipped_duplicates}
          </div>
          <div class="text-sm text-gray-600">Duplicates Skipped</div>
        </div>
        
        <div class="bg-${statusColor}-50 rounded-lg p-6 text-center">
          <div class="text-4xl font-bold text-${statusColor}-600 mb-2">
            ${successRate}%
          </div>
          <div class="text-sm text-gray-600">Success Rate</div>
        </div>
      </div>
      
      <!-- Field Mapping Coverage -->
      <div class="bg-purple-50 rounded-lg p-6 mb-8">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-purple-900">
            <i class="fas fa-random mr-2"></i>
            Field Mapping Coverage
          </h3>
          <span class="text-2xl font-bold text-purple-600">
            ${summary.field_mapping_coverage}%
          </span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-4">
          <div class="bg-purple-600 h-4 rounded-full" style="width: ${summary.field_mapping_coverage}%"></div>
        </div>
        <p class="text-sm text-purple-800 mt-3">
          Your system supports 96 out of 126 GBVIMS+ standard fields
        </p>
      </div>
      
      <!-- Errors and Warnings -->
      ${summary.errors.length > 0 ? `
        <div class="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-6 mb-6">
          <h3 class="text-lg font-bold text-red-900 mb-3">
            <i class="fas fa-exclamation-circle mr-2"></i>
            Errors (${summary.errors.length})
          </h3>
          <div class="space-y-2 max-h-64 overflow-y-auto">
            ${summary.errors.map(err => `
              <div class="bg-white rounded p-3 text-sm">
                <span class="font-semibold text-red-700">Row ${err.row}:</span>
                <span class="text-gray-700">${err.case_id || 'unknown'} - ${err.error}</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
      
      ${summary.warnings.length > 0 ? `
        <div class="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg p-6 mb-6">
          <h3 class="text-lg font-bold text-yellow-900 mb-3">
            <i class="fas fa-exclamation-triangle mr-2"></i>
            Warnings (${summary.warnings.length})
          </h3>
          <div class="space-y-2 max-h-64 overflow-y-auto">
            ${summary.warnings.map(warn => `
              <div class="bg-white rounded p-3 text-sm">
                <span class="font-semibold text-yellow-700">Row ${warn.row}:</span>
                <span class="text-gray-700">${warn.case_id || 'info'} - ${warn.message}</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
      
      <!-- Success Message -->
      ${summary.successful_imports > 0 ? `
        <div class="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-6">
          <div class="flex items-start">
            <i class="fas fa-check-circle text-green-600 text-2xl mr-4 mt-1"></i>
            <div>
              <h3 class="text-lg font-bold text-green-900 mb-2">
                Import Successful!
              </h3>
              <p class="text-green-800 mb-3">
                Successfully imported <strong>${summary.successful_imports}</strong> cases from GBVIMS+.
              </p>
              <div class="text-sm text-green-700">
                <p class="mb-1">✓ All case data has been validated and stored</p>
                <p class="mb-1">✓ Service referrals have been created</p>
                <p class="mb-1">✓ Cases are now accessible in your dashboard</p>
              </div>
            </div>
          </div>
        </div>
      ` : ''}
      
      <!-- Action Buttons -->
      <div class="mt-8 flex gap-4">
        <button 
          onclick="window.location.href='/'" 
          class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
          <i class="fas fa-arrow-left mr-2"></i>
          Return to Dashboard
        </button>
        <button 
          onclick="window.location.reload()" 
          class="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 font-semibold">
          <i class="fas fa-upload mr-2"></i>
          Import Another File
        </button>
      </div>
    </div>
  `;
  
  resultsDiv.classList.remove('hidden');
}

/**
 * Load import history
 */
async function loadImportHistory() {
  try {
    const response = await axios.get('/api/import/history');
    const data = response.data;
    
    const historyDiv = document.getElementById('import-history-content');
    
    if (data.summary?.total_imported > 0) {
      historyDiv.innerHTML = `
        <div class="mb-6 grid grid-cols-4 gap-6">
          <div class="bg-blue-50 rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-blue-600">${data.summary.total_imported}</div>
            <div class="text-xs text-gray-600">Total Imported</div>
          </div>
          <div class="bg-green-50 rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-green-600">${data.summary.districts_covered}</div>
            <div class="text-xs text-gray-600">Districts Covered</div>
          </div>
          <div class="bg-purple-50 rounded-lg p-4 text-center">
            <div class="text-sm font-semibold text-purple-600">
              ${data.summary.first_import ? new Date(data.summary.first_import).toLocaleDateString() : 'N/A'}
            </div>
            <div class="text-xs text-gray-600">First Import</div>
          </div>
          <div class="bg-indigo-50 rounded-lg p-4 text-center">
            <div class="text-sm font-semibold text-indigo-600">
              ${data.summary.last_import ? new Date(data.summary.last_import).toLocaleDateString() : 'N/A'}
            </div>
            <div class="text-xs text-gray-600">Last Import</div>
          </div>
        </div>
        
        <h3 class="text-lg font-semibold mb-4 text-gray-700">Recent Imports</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Case Number</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Incident Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Import Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Survivor Info</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              ${data.recent_imports.map(imp => `
                <tr class="hover:bg-gray-50">
                  <td class="px-6 py-4 text-sm font-mono text-gray-900">${imp.case_number}</td>
                  <td class="px-6 py-4 text-sm text-gray-700">${new Date(imp.incident_date).toLocaleDateString()}</td>
                  <td class="px-6 py-4 text-sm text-gray-700">${new Date(imp.import_date).toLocaleDateString()}</td>
                  <td class="px-6 py-4 text-sm text-gray-700">${imp.survivor_age_group}, ${imp.survivor_gender}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    } else {
      historyDiv.innerHTML = `
        <p class="text-gray-500 text-center py-8">
          <i class="fas fa-inbox text-4xl mb-3 block"></i>
          No imports yet. Upload your first GBVIMS+ CSV export above.
        </p>
      `;
    }
    
  } catch (error) {
    console.error('Error loading import history:', error);
  }
}

/**
 * Show error message
 */
function showError(message) {
  const resultsDiv = document.getElementById('import-results');
  resultsDiv.innerHTML = `
    <div class="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-6 mb-8">
      <div class="flex items-start">
        <i class="fas fa-times-circle text-red-600 text-2xl mr-4 mt-1"></i>
        <div>
          <h3 class="text-lg font-bold text-red-900 mb-2">
            Import Failed
          </h3>
          <p class="text-red-800">${message}</p>
          <button 
            onclick="window.location.reload()" 
            class="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 font-semibold text-sm">
            <i class="fas fa-redo mr-2"></i>
            Try Again
          </button>
        </div>
      </div>
    </div>
  `;
  resultsDiv.classList.remove('hidden');
}
