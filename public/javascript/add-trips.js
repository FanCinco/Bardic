async function newFormHandler(event) {
    event.preventDefault();
  
    const trip_id = document.querySelector('input[name="trips-trip_id"]').value;
    const user_id = document.querySelector('input[name="trips-user_id"]').value;
  
    const response = await fetch(`/api/trips`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        place_id,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/homepage');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-trip').addEventListener('submit', newFormHandler);
