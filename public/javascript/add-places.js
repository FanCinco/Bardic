async function newFormHandler(event) {
    event.preventDefault();
  
    const name = document.querySelector('input[name="places-name"]').value;
    const user_id = document.querySelector('input[name="places-user_id"]').value;
  
    const response = await fetch(`/api/places`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        // user_id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/places-tab');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-place').addEventListener('submit', newFormHandler);
