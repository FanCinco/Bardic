let logoutBtn = document.querySelector('#logout-btn');

window.onscroll = () =>{
    logoutBtn.classList.remove('fa-times');
}

async function logout() {
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}


logoutBtn.addEventListener('click', () =>{
    logoutBtn.classList.toggle('fa-times');
});

document.querySelector('#logout-btn').addEventListener('click', logout);