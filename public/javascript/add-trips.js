async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="trips-title"]').value;
  const place_id = document.querySelector('input[name="trips-place_id"]').value;

  const response = await fetch(`/api/trips`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      place_id
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

document.querySelector('.new-trip').addEventListener('submit', newFormHandler);
