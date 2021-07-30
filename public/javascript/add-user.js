function addUserHandler() {
    const selectEl = document.querySelector('#user-names');
    const selectedOptionEl = selectEl.options[selectEl.selectedIndex];
    const user = selectEl.value.trim();
    const userBoxEl = document.querySelector('#user-box');

    if (user && user !== "And who's going on this trip?") {
        const userListEl = document.createElement('li');
        const userEl = document.createElement('p');

        userEl.textContent = user;
        userEl.setAttribute('data-user-id', selectedOptionEl.getAttribute('data-user-id'));

        // Make sure the same user can't be picked twice. The default option has a value of '', so setting the Select value to '' sets it back to the default option
        selectedOptionEl.setAttribute('disabled', 'disabled');
        selectEl.value = "";


        userListEl.appendChild(userEl);
        userBoxEl.appendChild(userListEl);
    }
}

document.querySelector('#add-user').addEventListener('click', addUserHandler);