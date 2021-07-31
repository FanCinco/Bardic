async function expenseFormHandler(e) {
    e.preventDefault();

    const description = document.querySelector('#expense-description').value.trim();
    const cost = document.querySelector('#expense-cost').value.trim();
    
    console.log(description, cost);
    
}

document.querySelector('form').addEventListener('submit', expenseFormHandler);