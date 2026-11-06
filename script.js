
let selectedCalculator = "";

// Select calculator
function showCalculator(type) {
    selectedCalculator = type;

    const title = document.getElementById("calculator-title");
    const timeLabel = document.getElementById("time-label");
    const timeInput = document.getElementById("time");
    const result = document.getElementById("result");

    result.innerHTML = "";

    if (type === "simple") {
        title.textContent = "Simple Interest Calculator";
        timeLabel.textContent = "Time (Years)";
        timeInput.placeholder = "Enter years";
    }

    else if (type === "compound") {
        title.textContent = "Compound Interest Calculator";
        timeLabel.textContent = "Time (Years)";
        timeInput.placeholder = "Enter years";
    }

    else if (type === "emi") {
        title.textContent = "EMI Calculator";
        timeLabel.textContent = "Loan Duration (Months)";
        timeInput.placeholder = "Enter months";
    }

    document.getElementById("calculator").scrollIntoView({
        behavior: "smooth"
    });
}


// Format Indian Rupees
function money(value) {
    return "₹" + value.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}


// Main calculation function
function calculate() {

    const pInput = document.getElementById("principal").value;
    const rInput = document.getElementById("rate").value;
    const tInput = document.getElementById("time").value;

    const p = Number(pInput);
    const r = Number(rInput);
    const t = Number(tInput);

    const result = document.getElementById("result");

    // Check calculator selection
    if (selectedCalculator === "") {
        result.textContent = "Please select a calculator first.";
        return;
    }

    // Check empty fields
    if (pInput === "" || rInput === "" || tInput === "") {
        result.textContent = "Please fill in all fields.";
        return;
    }

    // Check valid numbers
    if (
        !Number.isFinite(p) ||
        !Number.isFinite(r) ||
        !Number.isFinite(t) ||
        p <= 0 ||
        r < 0 ||
        t <= 0
    ) {
        result.textContent =
            "Enter a positive amount, a non-negative rate and valid time.";
        return;
    }

    // SIMPLE INTEREST
    if (selectedCalculator === "simple") {

        const interest = (p * r * t) / 100;
        const total = p + interest;

        result.innerHTML = `
            <h3>Simple Interest Result</h3>
            <p>Principal Amount: ${money(p)}</p>
            <p>Interest Rate: ${r}%</p>
            <p>Time: ${t} Years</p>
            <hr>
            <p>Simple Interest: ${money(interest)}</p>
            <h3>Total Amount: ${money(total)}</h3>
        `;
    }

    // COMPOUND INTEREST
else if (selectedCalculator === "compound") {

    const amount = p * Math.pow(1 + r / 100, t);
    const interest = amount - p;

    result.innerHTML = `
        <h3>Compound Interest Result</h3>
        <p>Principal Amount: ${money(p)}</p>
        <p>Interest Rate: ${r}%</p>
        <p>Time: ${t} Years</p>
        <hr>
        <p>Compound Interest: ${money(interest)}</p>
        <h3>Total Amount: ${money(amount)}</h3>
    `;
}
    // EMI CALCULATOR
    else if (selectedCalculator === "emi") {

        if (!Number.isInteger(t)) {
            result.textContent =
                "Loan duration must be a whole number of months.";
            return;
        }

        const monthlyRate = r / 12 / 100;

        let emi;

        if (monthlyRate === 0) {
            emi = p / t;
        }

        else {
            const factor = Math.pow(1 + monthlyRate, t);

            emi = (p * monthlyRate * factor) / (factor - 1);
        }

        const totalPayment = emi * t;
        const totalInterest = totalPayment - p;

        result.innerHTML = `
            <h3>EMI Calculation Result</h3>
            <p>Loan Amount: ${money(p)}</p>
            <p>Yearly Interest Rate: ${r}%</p>
            <p>Loan Duration: ${t} Months</p>
            <hr>
            <p>Monthly EMI: ${money(emi)}</p>
            <p>Total Interest: ${money(totalInterest)}</p>
            <h3>Total Payment: ${money(totalPayment)}</h3>
        `;
    }
}
