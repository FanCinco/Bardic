const loginBtn = document.querySelector('#login-btn');

window.onScroll = () => {
  loginForm.classList.remove('active');
}

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

    const firstName = document.querySelector('#floatingFirstNameReg').value.trim();
    const lastName = document.querySelector('#floatingLastNameReg').value.trim();
    const email = document.querySelector('#floatingInputReg').value.trim();
    const password = document.querySelector('#floatingPasswordReg').value.trim();

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

    const email = document.querySelector('#floatingInputLog').value.trim();
    const password = document.querySelector('#floatingPasswordLog').value.trim();
  
    if (email && password) {
      login(email, password);
    }
}

loginBtn.addEventListener('click', () =>{
  loginForm.classList.add('active');
});

document.querySelector('#register-form').addEventListener('submit', signupFormHandler);
document.querySelector('#login-form').addEventListener('submit', loginFormHandler);