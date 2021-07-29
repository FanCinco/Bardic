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

function newFormHandler(event) {
  // add here code to work with the info from place/cost/date
  document.querySelector('.expense-description').value = '';
  document.querySelector('.expense-cost-input').value = '';
  window.alert("Expense Submited");
}

function newDateHandler(event) {
  window.alert("hola");
  
}
document.querySelector('.expense-day').addEventListener('click', showDatehandler);
document.querySelector('.expense-submit').addEventListener('click', newFormHandler);
document.querySelector('.day-lookup').addEventListener('click', showDatehandler);
document.querySelector('.day-submit').addEventListener('click', newDateHandler);
