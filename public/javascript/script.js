let logoutBtn = document.querySelector('#logout-btn');
let loginBtn = document.querySelector('#login-btn');
let registerBtn = document.querySelector('#register-btn');
let loginForm = document.querySelector('.login-form-container');
let registerForm = document.querySelector('.register-form-container');
let loginFormClose = document.querySelector('#login-form-close');
let registerFormClose = document.querySelector('#register-form-close');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let videoBtn = document.querySelectorAll('.vid-btn');

window.onscroll = () =>{
    logoutBtn.classList.remove('fa-times');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
    registerForm.classList.remove('active');
}

menu.addEventListener('click', () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

logoutBtn.addEventListener('click', () =>{
    logoutBtn.classList.toggle('fa-times');
});

loginBtn.addEventListener('click', () =>{
    loginForm.classList.add('active');
});

registerBtn.addEventListener('click', () =>{
    loginForm.classList.remove('active');
    registerForm.classList.add('active');
});

loginFormClose.addEventListener('click', () =>{
    loginForm.classList.remove('active');
});

registerFormClose.addEventListener('click', () =>{
    registerForm.classList.remove('active');
});

videoBtn.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        document.querySelector('.controls .active').classList.remove('active');
        btn.classList.add('active');
        let src = btn.getAttribute('data-src');
        document.querySelector('#video-slider').src = src;
    });
});

var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    loop:true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
    },
});

var swiper = new Swiper(".brand-slider", {
    spaceBetween: 20,
    loop:true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        450: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 5,
        },
      },
});