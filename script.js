document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    const billInput = document.getElementById('bill-input');
    const peopleInput = document.getElementById('nop-input');
    const tipSelected = document.querySelectorAll('.tip-percent');
    const tipAmountElement = document.querySelector('.result-tip-amount');
    const tipTotalElement = document.querySelector('.result-total');
    const resetBtn = document.getElementById('reset-btn');
    let selectedTipValue; //Variable to store the selected tip percentage

    // Adding event when user typing number immediately
    billInput.addEventListener('input', () => {
        calculateTip()
    })

    // Looping for adding eventlistener when user click percentage 
    tipSelected.forEach(tip => {
        tip.addEventListener('click', () => {
            calculateTip()
            // Variable to store the value from percent button and custom percent
            const tipValue = parseInt(tip.value);
            const tipCustomElement = document.getElementById('tip-custom');

            //Looping for set attribute of tipSelected to false when the other is selected
            tipSelected.forEach(element => {
                element.setAttribute('aria-selected', 'false');
            });

            //Setting attribute of tipSelected to true when tipSelected was clicked
            tip.setAttribute('aria-selected', 'true')

            //Setting selectedTipValue to store tipValue when tipSelected attribute is true and using a new event call input
            if (tip.getAttribute('aria-selected') === 'true') {
                selectedTipValue = tipValue;
                billInput.dispatchEvent(new Event('input'));
            }

            //Setting selectedTipValue to store tipValue when tipCustomElement attribute is true using a new event call input
            if (tipCustomElement.getAttribute('aria-selected') === 'true') {
                tipCustomElement.addEventListener('input', () => {
                    selectedTipValue = tipCustomElement.value;
                    billInput.dispatchEvent(new Event('input'));
                })
            }
        })
    })

    // Adding event when user typing number immediately
    peopleInput.addEventListener('input', () => {
        calculateTip();
    })

    // Create function calculateTip to contain calculate function
    function calculateTip() {
        const billValue = parseFloat(billInput.value);
        const peopleValue = parseInt(peopleInput.value);

        //If billValue equal 0 or billValue is not a number then add the error class to billInput parent element
        if (billValue === 0 || isNaN(billValue)) {
            billInput.parentElement.classList.add('error');
            billInput.previousElementSibling.setAttribute('data-error', "Can’t be zero")
            if (isNaN(billValue)) {
                billInput.previousElementSibling.setAttribute('data-error', "Can't be empty")
            }
        } else {
            billInput.parentElement.classList.remove('error');
        }

        if (peopleValue === 0 || isNaN(peopleValue)) {
            peopleInput.parentElement.classList.add('error');
            peopleInput.previousElementSibling.setAttribute('data-error', "Can’t be zero")

            if (isNaN(peopleValue)) {
                peopleInput.previousElementSibling.setAttribute('data-error', "Can't be empty")
            }
        } else {
            peopleInput.parentElement.classList.remove('error');
        }

        //
        if (billValue === 0 || isNaN(billValue) || peopleValue === 0 || isNaN(peopleValue)) {
            resetBtn.parentElement.setAttribute('data-empty', 'false');
        } else {
            resetBtn.parentElement.setAttribute('data-empty', 'true');
        }

        if (billValue !== 0 && peopleValue !== 0) {
            const tipAmount = ((billValue * selectedTipValue) / 100) / peopleValue;
            const tipTotal = ((billValue / peopleValue) + tipAmount);

            if (!(isNaN(tipAmount) || tipAmount === Infinity)) {
                tipAmountElement.textContent = `$${tipAmount.toFixed(2)}`;
                tipTotalElement.textContent = `$${tipTotal.toFixed(2)}`
            } else {
                tipAmountElement.textContent = `$0.00`;
                tipTotalElement.textContent = `$0.00`;

            }
        } else {
            tipAmountElement.textContent = `$0.00`;
            tipTotalElement.textContent = `$0.00`;
        }
    }

    // Handle reset button when it's gets click it will reloading web page

    resetBtn.addEventListener('click', () => {
        if (resetBtn.parentElement.getAttribute('data-empty') === 'true') {
            location.reload();
        }
    })
})
