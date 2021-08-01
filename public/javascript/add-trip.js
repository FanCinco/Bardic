function getPlaceID(name) {
    return fetch('/api/places', {
        method: 'post',
        body: JSON.stringify({ name: name.toLowerCase() }),
        headers: { 'Content-Type': 'application/json '}
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
    })
    .then(data => data.id);
}

async function addTripHandler(e) {
    e.preventDefault();

    const title = document.querySelector('input[id="trip-title"]').value.trim();
    const name = document.querySelector('input[id="place-name"]').value.trim();
    // This is an array of each <p> element containing chosen users
    const usersElArray = Array.from(document.querySelector('#user-box').children).map(userEl => userEl.children[0]);
    // If the user didn't select anyone to go on the trip, we have to set this value false
    const user_ids = usersElArray.map(userEl => parseInt(userEl.getAttribute('data-user-id')));

    if (title && name && user_ids) {
        // First, we have to check if the place is already in the database and, if not, add it! Either way, we need its id value to create the place_id in the trip
        const placeResponse = await fetch('/api/places')
            .then(dbPlaceData => dbPlaceData.json());

        const alreadyInDB = placeResponse.some(place => name.toLowerCase() === place.name.toLowerCase());

        // This is a ternary operator. It's saying that depending on whether or not the place_id is already in the database, place_id is either the id of the existing entry for that place, or we use a function to make a new entry and take the id generated for it
        const place_id = alreadyInDB ? 
            placeResponse[placeResponse.findIndex(place => place.name === name.toLowerCase())].id 
            : 
            await getPlaceID(name);
        // Look, I get that this is probably the slowest function there ever was, okay? So many awaits...
        console.log(title, place_id, user_ids);
        const response = await fetch('/api/trips', {
            method: 'post',
            body: JSON.stringify({
                title,
                place_id,
                user_ids
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            // document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#create-trip-form').addEventListener('submit', addTripHandler);