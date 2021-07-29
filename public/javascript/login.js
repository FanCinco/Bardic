const login = async (email, password) => {
  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
}

async function signupFormHandler(event) {
    event.preventDefault();

    const firstName = document.querySelector('#floatingFirstName').value.trim();
    const lastName = document.querySelector('#floatingLastName').value.trim();
    const email = document.querySelector('input[type="email"]').value.trim();
    const password = document.querySelector('input[type="password"]').value.trim();

    if (firstName && lastName && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (response.ok) {
            login(email, password)
        } else {
            alert(response.statusText);
        }
    }
}

async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('input[type="email"]').value.trim();
    const password = document.querySelector('input[type="password"]').value.trim();
  
    if (email && password) {
      login(email, password);
    }
  }

document.querySelector('#signup-btn').addEventListener('click', signupFormHandler);
document.querySelector('#login-btn').addEventListener('click', loginFormHandler);