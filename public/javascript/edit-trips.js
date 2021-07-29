async function editFormHandler(event) {
    event.preventDefault();
  
    const trip_id = document.querySelector('input[name="trips-trip_id"]').value.trim();
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/trips/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        place_id,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/homepage/');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.edit-trips').addEventListener('submit', editFormHandler);
