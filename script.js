document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    const billInput = document.getElementById('bill-input');
    const peopleInput = document.getElementById('nop-input');
    const tipSelected = document.querySelectorAll('.tip-percent');
    const tipAmountElement = document.querySelector('.result-tip-amount');
    const tipTotalElement = document.querySelector('.result-total');
    const resetBtn = document.getElementById('reset-btn');
    let selectedTipValue;


    billInput.addEventListener('input', () => {
        calculateTip()

    })

    tipSelected.forEach(tip => {
        tip.addEventListener('click', () => {
            calculateTip()
            const tipValue = parseInt(tip.value);
            const tipCustomElement = document.getElementById('tip-custom');

            tipSelected.forEach(element => {
                element.setAttribute('aria-selected', 'false');
            });

            tip.setAttribute('aria-selected', 'true')

            if (tip.getAttribute('aria-selected') === 'true') {
                selectedTipValue = tipValue
            }

            if (tipCustomElement.getAttribute('aria-selected') === 'true') {
                tipCustomElement.addEventListener('input', () => {
                    selectedTipValue = tipCustomElement.value;
                    billInput.dispatchEvent(new Event('input'));
                })
            } else {
                billInput.dispatchEvent(new Event('input'));
            }
        })
    })

    peopleInput.addEventListener('input', () => {
        calculateTip();
    })

    function calculateTip() {
        const billValue = parseFloat(billInput.value);
        const peopleValue = parseInt(peopleInput.value);

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

        if(billValue === 0 || isNaN(billValue) || peopleValue === 0 || isNaN(peopleValue)) {
            resetBtn.parentElement.setAttribute('data-empty', 'false');
        } else {
            resetBtn.parentElement.setAttribute('data-empty', 'true');
        }

        if (billValue !== 0 && peopleValue !== 0) {
            const tipAmount = ((billValue * selectedTipValue) / 100) / peopleValue;
            const tipTotal = ((billValue / peopleValue) + tipAmount);
            // resetBtn.parentElement.setAttribute('data-empty', 'true');

            if (isNaN(tipAmount) || tipAmount === Infinity) {
                tipAmountElement.textContent = `$0.00`;
                tipTotalElement.textContent = `$0.00`;
            } else {
                tipAmountElement.textContent = `$${tipAmount.toFixed(2)}`;
                tipTotalElement.textContent = `$${tipTotal.toFixed(2)}`
            }
        } else {
            tipAmountElement.textContent = `$0.00`;
            tipTotalElement.textContent = `$0.00`;
        }
    }

    resetBtn.addEventListener('click', () => {
        if (resetBtn.parentElement.getAttribute('data-empty') === 'true') {
            location.reload();

        }
    })
})
