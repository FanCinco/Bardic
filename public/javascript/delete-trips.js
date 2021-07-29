async function deleteFormHandler(event) {
    event.preventDefault();
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/trips/${id}`, {
      method: 'DELETE'
    });
  
    if (response.ok) {
      document.location.replace('/places-tab/');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.delete-trips-btn').addEventListener('click', deleteFormHandler);
