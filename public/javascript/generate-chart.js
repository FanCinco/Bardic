const chartBoxEl = document.querySelector('#chart');

const chartMakerHandler = async () => {
    const trip_id = document.querySelector('#trip-select').value;

    if (trip_id) {
        const response = await fetch(`/api/trips/${trip_id}`)
            .then(dbTripData => {
                if (dbTripData.ok) return dbTripData.json();
            });
        // Clear the chart box and get 
        chartBoxEl.innerHTML = '';
        const expenseChartEl = document.createElement('canvas');
        expenseChartEl.id = 'expenseChart';
        chartBoxEl.appendChild(expenseChartEl);
        // Chart.js stuff below.
        const ctx = expenseChartEl.getContext('2d');
        const expenseChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: response.days.map(day => day.date),
                datasets: [{
                    label: `Expenses by Day: ${response.title}`,
                    data: response.days.map(day => {
                        let totalExpenses = 0;
                        day.Expenses.forEach(expense => totalExpenses += parseFloat(expense.cost));
                        return totalExpenses;
                    }),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1                    
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Cost ($)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Date (YYYY-MM-DD)'
                        }
                    }
                }
            }
        });
    }
}

document.querySelector('#trip-select').addEventListener('change', chartMakerHandler);