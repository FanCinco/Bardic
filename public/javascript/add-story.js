async function storyFormHandler(e) {
    e.preventDefault();
    
    const title = document.querySelector('#story-title').value.trim();
    const startingText = document.querySelector('#story-startingText').value.trim();
    const tripSelectorEl = document.querySelector('#story-trip-id');
    const trip_id = tripSelectorEl.options[tripSelectorEl.selectedIndex].getAttribute('data-trip-id');
    const place_id = tripSelectorEl.options[tripSelectorEl.selectedIndex].getAttribute('data-place-id');

    if (title && startingText && trip_id) {
        const response = await fetch('/api/stories', {
            method: 'post',
            body: JSON.stringify({
                title,
                startingText,
                trip_id,
                place_id
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.story-form button').addEventListener('click', storyFormHandler);