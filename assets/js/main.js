document.addEventListener('DOMContentLoaded', () => {
    const billInput = document.getElementById('input'); // Enter the total invoice amount.
    const customTipInput = document.getElementById('customTip'); // Custom tip percentage input
    const peopleInput = document.getElementById('people'); // Number of people input
    const totalAmountDisplay = document.querySelector('.calculator-body__result--show-value-tip-amount'); // Display total invoice amount + tip
    const tipAmountPerPersonDisplay = document.querySelector('.calculator-body__result--show-value-total-person'); // Show tips for each person
    const resetButton = document.querySelector('.btn-reset');
    const errorDisplay = document.getElementById('erorr'); // Element to display error messages
    const errorDisplayBill = document.getElementById('erorrBill'); // Element to display error messages

    // Function to calculate tip and total cost
    function calculate() {
        const billAmount = parseFloat(billInput.value); // Converting the invoice input value to a number
        const tipPercentage = parseFloat(customTipInput.value) || 0; // Tip percentage or 0 if not entered
        const numberOfPeople = parseInt(peopleInput.value) || 1; // Number of people or 1 if not entered

        if (billAmount > 0 && billAmount <= 9999 && numberOfPeople > 0) {
            // Calculating the total tip amount
            const totalTipAmount = billAmount * (tipPercentage / 100);
            // Calculate the total cost (invoice + tip)
            const totalAmountWithTip = billAmount + totalTipAmount;
            // Calculating tips for each person
            const tipAmountPerPerson = totalTipAmount / numberOfPeople;

            // Show results on the page
            totalAmountDisplay.textContent = `$${totalAmountWithTip.toFixed(2)}`; // نمایش کل فاکتور + انعام
            tipAmountPerPersonDisplay.textContent = `$${tipAmountPerPerson.toFixed(2)}`; // نمایش انعام برای هر نفر

            errorDisplay.textContent = ''; // Clear error message if inputs are valid
        } else {
            // Reset values if inputs are invalid.
            totalAmountDisplay.textContent = '$0.00'; // Show zero for total invoice + tip
            tipAmountPerPersonDisplay.textContent = '$0.00'; // Show zero for tip per person

            if (numberOfPeople <= 0) {
                errorDisplay.textContent = 'Number less than zero'; // Show error message
            }
        }
    }

    // Function to validate inputs
    function validateInputs() {
        const billAmount = parseFloat(billInput.value);
        const numberOfPeople = parseInt(peopleInput.value);

        if (billAmount <= 0 || billAmount >= 9999) {
            billInput.value = ''; // Clear invalid input
            errorDisplayBill.textContent = 'Enter no less than 1 to 9999.'; // Show error message
            billInput.style.border='2px solid #E17052'
        } else {
            errorDisplayBill.textContent = ''; // Clear error message if valid
            billInput.style.border='2px solid #26C2AE'
        }

        if (numberOfPeople <= 0) {
            peopleInput.vlue='';
            errorDisplay.textContent = 'Can’t be zero'; // Show error message
            peopleInput.style.border='2px solid #E17052'
        } else {
            errorDisplay.textContent = ''; // Clear error message if valid
            peopleInput.style.border='2px solid #26C2AE'
        }
    }

    // Add event for input changes with validation
    billInput.addEventListener('input', () => {
        validateInputs(); // Validate inputs on change
        calculate(); // Recalculate after validation
    });

    customTipInput.addEventListener('input', calculate); // The calculate function is executed when the custom tip percentage changes.

    peopleInput.addEventListener('input', () => {
        validateInputs(); // Validate inputs on change
        calculate(); // Recalculate after validation
    });

    // Add event to tip percentage buttons
    document.querySelectorAll('.container-btn__item').forEach(button => {
        button.addEventListener('click', () => {
            customTipInput.value = ''; // Clear custom input if button is clicked
            const percentage = parseInt(button.textContent); // Get percentage from button text
            customTipInput.value = percentage; // Putting a percentage in a custom input
            // Remove 'active' class from all buttons before adding it to the current button
            document.querySelectorAll('.container-btn__item').forEach(btn => {
                btn.classList.remove('active'); // Remove active class from all buttons
            });

            button.classList.add("active"); // Add active class to the clicked button

            calculate(); // Performing calculations with new percentages
        });
    });

    // Reset button function
    resetButton.addEventListener('click', () => {
        billInput.value = ''; // Clear invoice amount entry
        customTipInput.value = ''; // Clear custom tip percentage entry
        peopleInput.value = ''; // Clear the number of people entry
        totalAmountDisplay.textContent = '$0.00'; // Reset the total invoice amount + tip to zero.
        tipAmountPerPersonDisplay.textContent = '$0.00'; // Reset the tip amount for each person to zero.

        errorDisplay.textContent = ''; // Clear any error messages

        // Remove 'active' class from all buttons when reset is clicked
        document.querySelectorAll('.container-btn__item').forEach(btn => {
            btn.classList.remove('active');
        });
    });
});