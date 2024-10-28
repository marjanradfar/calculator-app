document.addEventListener('DOMContentLoaded', () => {
    const billInput = document.getElementById('input'); // Enter the total invoice amount.
    const customTipInput = document.getElementById('customTip'); // Custom tip percentage input
    const peopleInput = document.getElementById('people'); // Custom tip percentage input
    const totalAmountDisplay = document.querySelector('.calculator-body__result--show-value-tip-amount'); // Display total invoice amount + tip
    const tipAmountPerPersonDisplay = document.querySelector('.calculator-body__result--show-value-total-person'); // Show tips for each person
    const resetButton = document.querySelector('.btn-reset');

    // Function to calculate tip and total cost
    function calculate() {
        const billAmount = parseFloat(billInput.value); // Converting the invoice input value to a number
        const tipPercentage = parseFloat(customTipInput.value) || 0; // Tip percentage or 0 if not entered
        const numberOfPeople = parseInt(peopleInput.value) || 1; // Number of people or 1 if not entered

        if (billAmount > 0 && numberOfPeople > 0) {
            // Calculating the total tip amount
            const totalTipAmount = billAmount * (tipPercentage / 100);
            // Calculate the total cost (invoice + tip)
            const totalAmountWithTip = billAmount + totalTipAmount;
            // Calculating tips for each person
            const tipAmountPerPerson = totalTipAmount / numberOfPeople;

            // Show results on the page
            totalAmountDisplay.textContent = `$${totalAmountWithTip.toFixed(2)}`; // نمایش کل فاکتور + انعام
            tipAmountPerPersonDisplay.textContent = `$${tipAmountPerPerson.toFixed(2)}`; // نمایش انعام برای هر نفر
        } else {
            // Reset values if inputs are invalid.
            totalAmountDisplay.textContent = '$0.00'; // Show zero for total invoice + tip
            tipAmountPerPersonDisplay.textContent = '$0.00'; // Show zero for tip per person
        }
    }

    // Add event for input changes
    billInput.addEventListener('input', calculate); // When the factor value changes, the calculate function is executed.
    customTipInput.addEventListener('input', calculate); //  The calculate function is executed when the custom tip percentage changes.
    peopleInput.addEventListener('input', calculate); // When the number of people changes, the calculate function is executed.

    // Add event to tip percentage buttons
    document.querySelectorAll('.container-btn__item').forEach(button => {
        button.addEventListener('click', () => {
            customTipInput.value = ''; // Clear custom input if button is clicked
            const percentage = parseInt(button.textContent); //Get percentage from button text
            customTipInput.value = percentage; // Putting a percentage in a custom input
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
    });
});