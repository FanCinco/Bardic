function getDayID(date, trip_id) {
    return fetch('/api/days', {
        method: 'post',
        body: JSON.stringify({
            date, 
            trip_id
        }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => {
            if (response.ok) return response.json();
        })
        .then(data => data.id);
}

async function expenseFormHandler(e) {
    e.preventDefault();

    const description = document.querySelector('#expense-description').value.trim();
    const cost = document.querySelector('#expense-cost').value.trim();
    const trip_id = document.querySelector('#trip-select').value;
    const date = document.querySelector('.hasDatepicker').value;

    if (description && cost && trip_id && date) {
        const tripResponse = await fetch(`api/trips/${trip_id}`)
            .then(tripData => tripData.json());

        // Formatting the date for comparison
        const dateSplit = date.split('/');
        const moddedDate = `${dateSplit[2]}-${dateSplit[0]}-${dateSplit[1]}`;
 
        const alreadyInDB = tripResponse.days.some(day => day.date === moddedDate);

        // Ternary operator. It's assigning trip_id based on whether or not it's in the database already for that trip. If it is, it's the same id as the existing date. If not, a new entry is made
        const day_id = alreadyInDB ?
            tripResponse.days[tripResponse.days.findIndex(day => day.date === moddedDate)].id
            :
            await getDayID(moddedDate, trip_id);

        // Now that we have a day_id, we can actually create an expense in the database
        const expenseResponse = await fetch('api/expenses', {
            method: 'post',
            body: JSON.stringify({
                description,
                cost,
                day_id
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (expenseResponse.ok) {
            document.location.reload();
        } else {
            alert(expenseResponse.statusText);
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

document.querySelector('#create-expense-form').addEventListener('submit', expenseFormHandler);
document.querySelector('#expense-day').addEventListener('click', showDatehandler);