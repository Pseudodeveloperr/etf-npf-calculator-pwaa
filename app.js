// ETF & NPF Calculator JavaScript - Fixed Enhanced Version with Records Counter and CSV Export

// Global variables for record keeping
let calculationRecords = [];
let recordCounter = 0;

// Sample Data
const sampleData = {
    "etf": [
        {
            "agreedCeaseDate": "2025-08-20",
            "contractEndDate": "2030-08-20",
            "monthlySell": 50.00
        },
        {
            "agreedCeaseDate": "2025-06-15",
            "contractEndDate": "2028-12-31",
            "monthlySell": 100.00
        }
    ],
    "npf": [
        {
            "agreedCeaseDate": "2025-03-05",
            "requestReceivedDate": "2025-02-26",
            "monthlySell": 3.77
        },
        {
            "agreedCeaseDate": "2025-07-29",
            "requestReceivedDate": "2025-07-28",
            "monthlySell": 23.70
        }
    ]
};

// Tab switching functionality - FIXED
function switchTab(tabId) {
    console.log('Switching to tab:', tabId);
    
    // Get all tabs and content
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Remove active class from all
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to selected elements
    const activeButton = document.querySelector(`[data-tab="${tabId}"]`);
    const activeContent = document.getElementById(`${tabId}-tab`);
    
    if (activeButton) {
        activeButton.classList.add('active');
    }
    if (activeContent) {
        activeContent.classList.add('active');
    }
    
    console.log(`Switched to ${tabId} tab successfully`);
}

// ETF Calculator Functions - FIXED
function calculateETF() {
    console.log('Starting ETF calculation...');
    
    try {
        // Get form data
        const formData = getETFFormData();
        console.log('ETF Form data:', formData);
        
        // Validate
        if (!validateETFForm(true)) {
            console.log('ETF form validation failed');
            return;
        }
        
        // Calculate
        const results = computeETF(formData);
        console.log('ETF Calculation results:', results);
        
        // Display results
        displayETFResults(results, formData);
        
        // Save record
        saveCalculationRecord('ETF', formData, results);
        
        // Show success
        showSuccessNotification('ETF calculation completed and saved!');
        
        // Clear errors
        clearErrors('etf');
        
    } catch (error) {
        console.error('ETF calculation error:', error);
        showError('etf', 'Calculation error: ' + error.message);
    }
}

function loadETFSample() {
    console.log('Loading ETF sample data...');
    const sample = sampleData.etf[0];
    
    document.getElementById('etf-agreed-date').value = sample.agreedCeaseDate;
    document.getElementById('etf-contract-date').value = sample.contractEndDate;
    document.getElementById('etf-monthly-sell').value = sample.monthlySell;
    
    // Auto calculate
    setTimeout(() => calculateETF(), 500);
}

function clearETFForm() {
    document.getElementById('etf-form').reset();
    document.getElementById('etf-results').innerHTML = `
        <div class="results-placeholder modern-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M9 17H7A5 5 0 0 1 7 7h2"/>
                <path d="M15 7h2a5 5 0 1 1 0 10h-2"/>
                <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            <p>Enter data and calculate to see results</p>
        </div>
    `;
    clearErrors('etf');
}

// NPF Calculator Functions - FIXED
function calculateNPF() {
    console.log('Starting NPF calculation...');
    
    try {
        // Get form data
        const formData = getNPFFormData();
        console.log('NPF Form data:', formData);
        
        // Validate
        if (!validateNPFForm(true)) {
            console.log('NPF form validation failed');
            return;
        }
        
        // Calculate
        const results = computeNPF(formData);
        console.log('NPF Calculation results:', results);
        
        // Display results
        displayNPFResults(results, formData);
        
        // Save record
        saveCalculationRecord('NPF', formData, results);
        
        // Show success
        showSuccessNotification('NPF calculation completed and saved!');
        
        // Clear errors
        clearErrors('npf');
        
    } catch (error) {
        console.error('NPF calculation error:', error);
        showError('npf', 'Calculation error: ' + error.message);
    }
}

function loadNPFSample() {
    console.log('Loading NPF sample data...');
    const sample = sampleData.npf[0];
    
    document.getElementById('npf-agreed-date').value = sample.agreedCeaseDate;
    document.getElementById('npf-request-date').value = sample.requestReceivedDate;
    document.getElementById('npf-monthly-sell').value = sample.monthlySell;
    
    // Auto calculate
    setTimeout(() => calculateNPF(), 500);
}

function clearNPFForm() {
    document.getElementById('npf-form').reset();
    document.getElementById('npf-results').innerHTML = `
        <div class="results-placeholder modern-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M9 17H7A5 5 0 0 1 7 7h2"/>
                <path d="M15 7h2a5 5 0 1 1 0 10h-2"/>
                <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            <p>Enter data and calculate to see results</p>
        </div>
    `;
    clearErrors('npf');
}

// Records Management Functions - FIXED
function saveCalculationRecord(type, formData, results) {
    recordCounter++;
    const record = {
        id: recordCounter,
        type: type,
        timestamp: new Date().toISOString(),
        formData: { ...formData },
        results: { ...results }
    };
    
    calculationRecords.push(record);
    updateRecordsCounter();
    enableExportButton();
    
    console.log(`${type} record saved:`, record);
}

function updateRecordsCounter() {
    const counterElement = document.getElementById('records-count');
    if (counterElement) {
        counterElement.textContent = calculationRecords.length;
        console.log(`Updated records counter to: ${calculationRecords.length}`);
    }
}

function enableExportButton() {
    const exportBtn = document.getElementById('export-csv');
    if (exportBtn && calculationRecords.length > 0) {
        exportBtn.disabled = false;
        exportBtn.classList.remove('disabled');
        console.log('Export button enabled');
    }
}

function exportToCSV() {
    if (calculationRecords.length === 0) {
        showError('general', 'No calculation records to export');
        return;
    }
    
    try {
        const csvContent = generateCSVContent();
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `etf_npf_calculations_${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            showSuccessNotification(`Successfully exported ${calculationRecords.length} records to CSV!`);
        }
    } catch (error) {
        console.error('CSV export error:', error);
        showError('general', 'Failed to export CSV: ' + error.message);
    }
}

function generateCSVContent() {
    const headers = [
        'Record ID',
        'Type',
        'Timestamp',
        'Agreed Cease Date',
        'Contract End Date / Request Received Date',
        'Monthly Sell Amount',
        'Actual ACD',
        'Result Amount',
        'Additional Data'
    ];
    
    let csvContent = headers.join(',') + '\n';
    
    calculationRecords.forEach(record => {
        const row = [
            record.id,
            record.type,
            new Date(record.timestamp).toLocaleString(),
            record.formData.agreedCeaseDate || '',
            record.formData.contractEndDate || record.formData.requestReceivedDate || '',
            record.formData.monthlySell || '',
            record.results.actualACD ? new Date(record.results.actualACD).toLocaleDateString() : '',
            record.type === 'ETF' ? record.results.totalETF : record.results.totalNPF,
            record.type === 'ETF' 
                ? `Months: ${record.results.monthsRemaining}, Days: ${record.results.daysRemaining}`
                : `Days Between: ${record.results.daysBetween}, NPF Days: ${record.results.npfDaysRemaining}`
        ];
        
        csvContent += row.map(field => `"${field}"`).join(',') + '\n';
    });
    
    return csvContent;
}

// Data Extraction Functions
function getETFFormData() {
    return {
        agreedCeaseDate: document.getElementById('etf-agreed-date').value,
        contractEndDate: document.getElementById('etf-contract-date').value,
        monthlySell: parseFloat(document.getElementById('etf-monthly-sell').value)
    };
}

function getNPFFormData() {
    return {
        agreedCeaseDate: document.getElementById('npf-agreed-date').value,
        requestReceivedDate: document.getElementById('npf-request-date').value,
        monthlySell: parseFloat(document.getElementById('npf-monthly-sell').value)
    };
}

// EXACT SAME CALCULATION LOGIC - ETF Calculation Function
function computeETF(data) {
    const agreedCeaseDate = new Date(data.agreedCeaseDate);
    const contractEndDate = new Date(data.contractEndDate);
    const monthlySell = data.monthlySell;

    // Step 1: Actual ACD = Agreed Cease Date + 1 day
    const actualACD = new Date(agreedCeaseDate);
    actualACD.setDate(actualACD.getDate() + 1);

    // Check if contract is expired
    if (actualACD >= contractEndDate) {
        return {
            actualACD,
            monthsRemaining: 0,
            daysRemaining: 0,
            daysInContractEndMonth: getDaysInMonth(contractEndDate),
            monthlyPortion: 0,
            dailyPortion: 0,
            totalETF: 0,
            isExpired: true
        };
    }

    // Step 2: Calculate from Actual ACD to Contract End Date
    const monthsRemaining = getMonthsDifference(actualACD, contractEndDate);
    
    // Get the date after adding the calculated months
    const dateAfterMonths = new Date(actualACD);
    dateAfterMonths.setMonth(dateAfterMonths.getMonth() + monthsRemaining);
    
    // Calculate remaining days in the contract end month
    let daysRemaining = 0;
    if (dateAfterMonths < contractEndDate) {
        daysRemaining = getDaysDifference(dateAfterMonths, contractEndDate);
    }
    
    const daysInContractEndMonth = getDaysInMonth(contractEndDate);

    // Step 3 & 4: Calculate ETF using exact formula
    // Monthly Portion = Months Remaining × Monthly Sell Amount
    const monthlyPortion = monthsRemaining * monthlySell;
    
    // Daily Portion = Days Remaining ÷ Days in Contract End Month × Monthly Sell Amount
    const dailyPortion = daysRemaining > 0 ? (daysRemaining / daysInContractEndMonth) * monthlySell : 0;
    
    // Step 5: Total ETF = Monthly Portion + Daily Portion
    const totalETF = monthlyPortion + dailyPortion;

    return {
        actualACD,
        monthsRemaining,
        daysRemaining,
        daysInContractEndMonth,
        monthlyPortion,
        dailyPortion,
        totalETF,
        isExpired: false
    };
}

// EXACT SAME CALCULATION LOGIC - NPF Calculation Function
function computeNPF(data) {
    const requestReceivedDate = new Date(data.requestReceivedDate);
    const agreedCeaseDate = new Date(data.agreedCeaseDate);
    const monthlySell = data.monthlySell;

    // Calculate Actual ACD = Agreed Cease Date + 1 day
    const actualACD = new Date(agreedCeaseDate);
    actualACD.setDate(actualACD.getDate() + 1);

    // Calculate days between Request Received Date and Actual ACD
    const daysBetween = getDaysDifference(requestReceivedDate, actualACD);

    // Calculate NPF Days Remaining (30 - Days Between)
    const npfDaysRemaining = Math.max(0, 30 - daysBetween);

    // Calculate NPF based on formula: NPF = Monthly Sell × NPF Days Remaining ÷ 30
    let totalNPF;
    if (npfDaysRemaining <= 0) {
        totalNPF = 0; // No NPF if no days remaining
    } else {
        totalNPF = monthlySell * npfDaysRemaining / 30;
    }

    return {
        actualACD,
        daysBetween,
        npfDaysRemaining,
        totalNPF
    };
}

// Utility Functions
function getMonthsDifference(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    let months = 0;
    const current = new Date(start);

    while (current < end) {
        const nextMonth = new Date(current);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        
        if (nextMonth <= end) {
            months++;
            current.setMonth(current.getMonth() + 1);
        } else {
            break;
        }
    }

    return months;
}

function getDaysInMonth(date) {
    const d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}

function getDaysDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

function formatDate(dateInput) {
    let date;
    if (dateInput instanceof Date) {
        date = dateInput;
    } else {
        date = new Date(dateInput);
    }
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP'
    }).format(amount);
}

// Enhanced Display Functions - FIXED
function displayETFResults(results, formData) {
    const resultsContainer = document.getElementById('etf-results');
    if (!resultsContainer) {
        console.error('ETF results container not found');
        return;
    }
    
    const statusHtml = results.isExpired ? 
        '<span class="status--expired">Contract Expired</span>' : 
        '<span class="status--active">Active Contract</span>';
    
    resultsContainer.innerHTML = `
        <div class="result-item">
            <span class="result-label">Contract Status:</span>
            <span class="result-value">${statusHtml}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Agreed Cease Date:</span>
            <span class="result-value">${formatDate(formData.agreedCeaseDate)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Actual ACD:</span>
            <span class="result-value">${formatDate(results.actualACD)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Contract End Date:</span>
            <span class="result-value">${formatDate(formData.contractEndDate)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Monthly Sell Amount:</span>
            <span class="result-value">${formatCurrency(formData.monthlySell)}</span>
        </div>
        
        <div class="live-calculation">
            <div class="calculation-header">
                <h4>ETF Calculation Breakdown</h4>
            </div>
            <div class="calculation-breakdown">
                <div class="breakdown-line">
                    <span>Time Remaining:</span>
                    <span>${results.monthsRemaining} months and ${results.daysRemaining} days</span>
                </div>
                <div class="breakdown-line">
                    <span>Monthly Portion:</span>
                    <span>${results.monthsRemaining} × ${formatCurrency(formData.monthlySell)} = ${formatCurrency(results.monthlyPortion)}</span>
                </div>
                <div class="breakdown-line">
                    <span>Daily Portion:</span>
                    <span>${results.daysRemaining} ÷ ${results.daysInContractEndMonth} × ${formatCurrency(formData.monthlySell)} = ${formatCurrency(results.dailyPortion)}</span>
                </div>
                <div class="breakdown-line total">
                    <span>Total ETF:</span>
                    <span class="currency">${formatCurrency(results.totalETF)}</span>
                </div>
            </div>
        </div>
    `;
    
    console.log('ETF results displayed successfully');
}

function displayNPFResults(results, formData) {
    const resultsContainer = document.getElementById('npf-results');
    if (!resultsContainer) {
        console.error('NPF results container not found');
        return;
    }
    
    resultsContainer.innerHTML = `
        <div class="result-item">
            <span class="result-label">Agreed Cease Date:</span>
            <span class="result-value">${formatDate(formData.agreedCeaseDate)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Actual ACD:</span>
            <span class="result-value">${formatDate(results.actualACD)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Request Received Date:</span>
            <span class="result-value">${formatDate(formData.requestReceivedDate)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Monthly Sell Amount:</span>
            <span class="result-value">${formatCurrency(formData.monthlySell)}</span>
        </div>
        
        <div class="live-calculation">
            <div class="calculation-header">
                <h4>NPF Calculation Breakdown</h4>
            </div>
            <div class="calculation-breakdown">
                <div class="breakdown-line">
                    <span>Days between Request and Actual ACD:</span>
                    <span>${results.daysBetween} days</span>
                </div>
                <div class="breakdown-line">
                    <span>NPF Days Remaining:</span>
                    <span>30 - ${results.daysBetween} = ${results.npfDaysRemaining} days</span>
                </div>
                <div class="breakdown-line">
                    <span>NPF Calculation:</span>
                    <span>${formatCurrency(formData.monthlySell)} × ${results.npfDaysRemaining} ÷ 30</span>
                </div>
                <div class="breakdown-line total">
                    <span>Total NPF:</span>
                    <span class="currency">${formatCurrency(results.totalNPF)}</span>
                </div>
            </div>
        </div>
        
        <div class="formula-display">
            <div class="formula-title">NPF Formula:</div>
            NPF = Monthly Sell × NPF Days Remaining ÷ 30<br>
            <small>Where NPF Days Remaining = 30 - (Days between Request Received Date and Actual ACD)</small>
        </div>
    `;
    
    console.log('NPF results displayed successfully');
}

// Validation Functions - FIXED
function validateETFForm(showErrors = false) {
    const errors = [];
    const data = getETFFormData();

    if (!data.agreedCeaseDate) errors.push('Agreed Cease Date is required');
    if (!data.contractEndDate) errors.push('Contract End Date is required');
    if (!data.monthlySell || data.monthlySell <= 0) errors.push('Monthly Sell Amount must be a positive number');

    // Additional validation
    if (data.agreedCeaseDate && data.contractEndDate && new Date(data.agreedCeaseDate) > new Date(data.contractEndDate)) {
        errors.push('Agreed Cease Date cannot be after Contract End Date');
    }

    if (showErrors && errors.length > 0) {
        showErrorMessages('etf', errors);
        return false;
    }

    clearErrors('etf');
    return errors.length === 0;
}

function validateNPFForm(showErrors = false) {
    const errors = [];
    const data = getNPFFormData();

    if (!data.agreedCeaseDate) errors.push('Agreed Cease Date is required');
    if (!data.requestReceivedDate) errors.push('Request Received Date is required');
    if (!data.monthlySell || data.monthlySell <= 0) errors.push('Monthly Sell Amount must be a positive number');

    // Additional validation
    if (data.requestReceivedDate && data.agreedCeaseDate && new Date(data.requestReceivedDate) > new Date(data.agreedCeaseDate)) {
        errors.push('Request Received Date cannot be after Agreed Cease Date');
    }

    if (showErrors && errors.length > 0) {
        showErrorMessages('npf', errors);
        return false;
    }

    clearErrors('npf');
    return errors.length === 0;
}

// Error Handling and Notifications - FIXED
function showError(type, message) {
    showErrorMessages(type, [message]);
}

function showErrorMessages(type, errors) {
    const errorContainer = document.getElementById(`${type}-errors`);
    if (errorContainer) {
        errorContainer.innerHTML = errors.map(error => 
            `<div class="error-message">${error}</div>`
        ).join('');
    }
}

function clearErrors(type) {
    const errorContainer = document.getElementById(`${type}-errors`);
    if (errorContainer) {
        errorContainer.innerHTML = '';
    }
}

function showSuccessNotification(message) {
    const notification = document.getElementById('success-notification');
    if (notification) {
        const messageSpan = notification.querySelector('span');
        if (messageSpan) {
            messageSpan.textContent = message;
        }
        notification.classList.remove('hidden');
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.classList.add('hidden');
            }, 300);
        }, 3000);
    }
}

// Real-time calculation setup - SIMPLIFIED
function setupRealTimeCalculation() {
    // ETF form inputs
    const etfInputs = ['etf-agreed-date', 'etf-contract-date', 'etf-monthly-sell'];
    etfInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', () => {
                if (validateETFForm(false)) {
                    setTimeout(() => {
                        try {
                            calculateETF();
                        } catch (error) {
                            console.log('Real-time ETF calculation skipped');
                        }
                    }, 1000);
                }
            });
        }
    });

    // NPF form inputs
    const npfInputs = ['npf-agreed-date', 'npf-request-date', 'npf-monthly-sell'];
    npfInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', () => {
                if (validateNPFForm(false)) {
                    setTimeout(() => {
                        try {
                            calculateNPF();
                        } catch (error) {
                            console.log('Real-time NPF calculation skipped');
                        }
                    }, 1000);
                }
            });
        }
    });
}

// Make all functions globally accessible
window.switchTab = switchTab;
window.calculateETF = calculateETF;
window.loadETFSample = loadETFSample;
window.clearETFForm = clearETFForm;
window.calculateNPF = calculateNPF;
window.loadNPFSample = loadNPFSample;
window.clearNPFForm = clearNPFForm;
window.exportToCSV = exportToCSV;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing Enhanced ETF & NPF Calculator...');
    
    // Setup real-time calculation
    setupRealTimeCalculation();
    
    // Initialize records counter
    updateRecordsCounter();
    
    console.log('Enhanced application initialized successfully');
});