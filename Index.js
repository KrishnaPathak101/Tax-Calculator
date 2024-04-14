const grossIncome = document.getElementById("grossIncome");
const extraIncome = document.getElementById("extraIncome");
const deductions = document.getElementById("deductions");
const age = document.getElementById("age");
const form = document.getElementById("taxForm");
const submitbtn = document.getElementsByClassName("btn btn-primary");
const grossIncomeError = document.getElementById("grossIncomeError");
const extraIncomeError = document.getElementById("extraIncomeError");
const deductionsError = document.getElementById("deductionsError");

function showErrorIcon(errorIcon) {
    errorIcon.style.display = 'block';
}

function hideErrorIcon(errorIcon) {
    errorIcon.style.display = 'none';
}

// Event listeners for input fields
grossIncome.addEventListener('input', () => {
    const inputValue = grossIncome.value;
    if (isNaN(inputValue)) {
        showErrorIcon(grossIncomeError);
    } else {
        hideErrorIcon(grossIncomeError);
    }
});

extraIncome.addEventListener('input', () => {
    const inputValue = extraIncome.value;
    if (isNaN(inputValue)) {
        showErrorIcon(extraIncomeError);
    } else {
        hideErrorIcon(extraIncomeError);
    }
});

deductions.addEventListener('input', () => {
    const inputValue = deductions.value;
    if(inputValue){
        if (isNaN(inputValue)) {
            showErrorIcon(deductionsError);
        } else {
            hideErrorIcon(deductionsError);
        }
    } else {
        inputValue = 0;
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



form.addEventListener('submit', (event) => {
    event.preventDefault();
    calculateTax();
});

