const expenseDataEl = document.querySelector('#expense-data');

async function getExpensesHandler(e) {
    e.preventDefault();

    const trip_id = document.querySelector('#get-expense-trip-select').value.trim();
    const date = document.querySelector('.hasDatepicker').value.trim();

    if (trip_id && date) {
        const response = await fetch(`/api/trips/${trip_id}`)
            .then(dbTripData => {
                if (dbTripData.ok) return dbTripData.json();
            });
        // Formatting the date for comparison
        const dateSplit = date.split('/');
        const moddedDate = `${dateSplit[2]}-${dateSplit[0]}-${dateSplit[1]}`;
 
        const expensesOnDay = response.days.filter(day => day.date === moddedDate);

        // Clear out the box so that the information doesn't pile up
        expenseDataEl.innerHTML = '';
        if (expensesOnDay.length < 1) {
            if (!document.querySelector('#no-data')) {
                const noDataEl = document.createElement('p');
                noDataEl.id = 'no-data';
                noDataEl.textContent = 'There are no expenses on this day!'
                expenseDataEl.appendChild(noDataEl);
            }
        } else {
            expensesOnDay[0].Expenses.forEach(expense => {
                const expenseEl = document.createElement('div');
                const expenseDescriptionEl = document.createElement('p');
                const expenseCostEl = document.createElement('p');

                expenseDescriptionEl.textContent = expense.description;
                expenseCostEl.textContent = expense.cost;
    
                expenseEl.appendChild(expenseDescriptionEl);
                expenseEl.appendChild(expenseCostEl);

                expenseDataEl.appendChild(expenseEl);
            });
        }
    }
}

function showDatehandler(event) {
    // get current text
    var date = $(this)
    .text()
    .trim();
  
    // create new input element
    var dateInput = $("<input>")
    .attr("type", "text")
    .addClass("form-control")
    .val(date);
  
    // swap elements
    $(this).replaceWith(dateInput);
    // enable jquery ui datepicker
    dateInput.datepicker({
      onClose: function() {
        // when calendar is closed, force a "change" event on the `dateInput`
        $(this).trigger("change");
      }
    
    });
    // focus on new Element
    dateInput.trigger("focus");
};

document.querySelector('.day-submit').addEventListener('click', getExpensesHandler);
document.querySelector('.day-lookup').addEventListener('click', showDatehandler);