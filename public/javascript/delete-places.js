async function deleteFormHandler(event) {
    event.preventDefault();
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/places/${id}`, {
      method: 'DELETE'
    });
  
    if (response.ok) {
      document.location.replace('/places-tab/');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.delete-places-btn').addEventListener('click', deleteFormHandler);
