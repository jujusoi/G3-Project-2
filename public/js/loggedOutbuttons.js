const loginButt = document.querySelector("#loginBtn");

const registerBtn = document.querySelector("#signupBtn");

const homeBtn = document.querySelector("#homeBtn");
const mainImg = document.querySelector('#readmi-logo');

mainImg.addEventListener('click', function() {
    location.href = '/home';
});

loginButt.addEventListener('click', function() {
    location.href = '/login';
});

registerBtn.addEventListener('click', function() {
    location.href = '/register';
});

homeBtn.addEventListener('click', function() {
    location.href = '/home';
});