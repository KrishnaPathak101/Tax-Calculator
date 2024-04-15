const grossIncome = document.getElementById("grossIncome");
const extraIncome = document.getElementById("extraIncome");
const deductions = document.getElementById("deductions");
const age = document.getElementById("age");
const form = document.getElementById("taxForm");
const submitbtn = document.getElementsByClassName("btn btn-primary");
const grossIncomeError = document.getElementById("grossIncomeError");
const extraIncomeError = document.getElementById("extraIncomeError");
const deductionsError = document.getElementById("deductionsError");
const ageError = document.getElementById("ageError");
const ageerrortooltip = document.getElementById("ageErrorTooltip");
const grossIncomeTooltip = document.getElementById("grossIncomeTooltip");
const extraIncomeTooltip = document.getElementById("extraIncomeTooltip");
const deductionsTooltip = document.getElementById("deductionsTooltip");

function showErrorIcon(errorIcon, message, tooltip) {
    errorIcon.style.display = 'block';
    tooltip.textContent = message;
}

function hideErrorIcon(errorIcon) {
    errorIcon.style.display = 'none';
}

let hasValidationErrors = false; // Flag to track validation errors

// Event listeners for input fields
grossIncome.addEventListener('input', () => {
    const inputValue = parseFloat(grossIncome.value);
    if (isNaN(inputValue)) {
        showErrorIcon(grossIncomeError, "Please enter a valid number", grossIncomeTooltip);
        hasValidationErrors = true;
    } else if (inputValue < 100000) {
        showErrorIcon(grossIncomeError, "Income should be more than 1 lakh", grossIncomeTooltip);
        hasValidationErrors = true;
    } else if (inputValue > 80000000) {
        showErrorIcon(grossIncomeError, "Income should not exceed 8 crores", grossIncomeTooltip);
        hasValidationErrors = true;
    } else {
        hideErrorIcon(grossIncomeError);
        hasValidationErrors = false;
    }
});

extraIncome.addEventListener('input', () => {
    const inputValue = parseFloat(extraIncome.value);
    if (isNaN(inputValue)) {
        showErrorIcon(extraIncomeError, "Please enter a valid number", extraIncomeTooltip);
        hasValidationErrors = true;
    } else if (inputValue < 0) {
        showErrorIcon(extraIncomeError, "Income should be non-negative", extraIncomeTooltip);
        hasValidationErrors = true;
    } else if (inputValue > 80000000) {
        showErrorIcon(extraIncomeError, "Income should not exceed 8 crores", extraIncomeTooltip);
        hasValidationErrors = true;
    } else if (inputValue < 500) {
        showErrorIcon(extraIncomeError, "Extra Income should be above 500", extraIncomeTooltip);
    }
     else {
        hideErrorIcon(extraIncomeError);
        hasValidationErrors = false;
    }
});

deductions.addEventListener('input', () => {
    const inputValue = parseFloat(deductions.value);
    if (isNaN(inputValue)) {
        showErrorIcon(deductionsError, "Please enter a valid number", deductionsTooltip);
        hasValidationErrors = true;
    } else if (inputValue < 0) {
        showErrorIcon(deductionsError, "Deductions should be non-negative", deductionsTooltip);
        hasValidationErrors = true;
    } else if (inputValue > 8000000) {
        showErrorIcon(deductionsError, "Deductions should not exceed 6 crors", deductionsTooltip);
        hasValidationErrors = true;
    } else {
        hideErrorIcon(deductionsError);
        hasValidationErrors = false;
    }
});

age.addEventListener('change', () => {
    hideErrorIcon(ageError);
    hasValidationErrors = false;
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const ageValue = age.value;
    const grossIncomeValue = grossIncome.value;
    const deductionsValue = deductions.value ? parseFloat(deductions.value) : 0;

    // Check if age value is selected
    if (ageValue === '') {
        showErrorIcon(ageError, "Please select age group.");
    } else {
        hideErrorIcon(ageError);
    }

    // Check if gross income value is entered
    if (grossIncomeValue === '') {
        showErrorIcon(grossIncomeError, "Please enter gross income.");
    } else {
        hideErrorIcon(grossIncomeError);
    }
    if (!grossIncomeValue || grossIncomeValue < 100000) {
        showErrorIcon(grossIncomeError, "Gross income should be 100000 or above to calculate tax", grossIncomeTooltip);
        return; // Stop further processing if gross income is below 100000
    } else {
        hideErrorIcon(grossIncomeError);
    }
    
    // Check if deductions are equal to gross income
    if (deductionsValue === parseFloat(grossIncomeValue)) {
        showErrorIcon(deductionsError, "Deductions cannot be equal to gross income. Please adjust.");
        submitbtn.disabled = true; // Disable the submit button
        return; // Prevent further processing
    } else {
        hideErrorIcon(deductionsError);
        submitbtn.disabled = false; // Enable the submit button
    }

    // Calculate tax only if all fields are filled and deductions are valid
    if (grossIncome.value && age.value && deductionsValue !== parseFloat(grossIncomeValue)) {
        calculateTax();
    }
});





function calculateTax() {
    const grossIncomeValue = parseFloat(grossIncome.value);
    const extraIncomeValue = extraIncome.value ? parseFloat(extraIncome.value) : 0; // Check if extra income is provided, if not, use 0
    const deductionsValue = deductions.value ? parseFloat(deductions.value) : 0; // Check if deductions are provided, if not, use 0
    const ageValue = age.value;

    let netIncome;
    if (extraIncomeValue === 0 && deductionsValue === 0) {
        netIncome = grossIncomeValue; // If no extra income and deductions are provided, net income is equal to gross income
    } else {
        netIncome = grossIncomeValue + extraIncomeValue - deductionsValue; // Otherwise, calculate net income
    }

    let tax = 0;
    let taxableAmount = 0;
    if (netIncome > 800000) { // Check if net income exceeds 8 Lakhs
        taxableAmount = netIncome - 800000; // Calculate taxable amount
        if (ageValue === "under40") {
            tax = taxableAmount * 0.3; // Apply tax rate for age < 40
        } else if (ageValue ==="40to60") {
            tax = taxableAmount * 0.4; // Apply tax rate for age ≥ 40 but < 60
        } else {
            tax = taxableAmount * 0.1; // Apply tax rate for age ≥ 60
        }
    } else {
        document.getElementById("overallIncomeDisplay").textContent = " Your Overall Income Will be: ₹" + netIncome + " No Tax Deduction Required";
        return  $('#taxResultModal').modal('show');;
    }

    const overallIncome = netIncome - tax;

    // Update modal content
    document.getElementById("overallIncomeDisplay").textContent = " Your Overall Income Will be: ₹" + overallIncome.toFixed(2) + " After Tax Deductions";

    // Show the modal
    $('#taxResultModal').modal('show');
}




