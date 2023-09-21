const loginButt = document.querySelector("#loginBtn");
const homeBtn = document.querySelector("#homeBtn");
const dashBtn = document.querySelector('#dashboardBtn');
const mainImg = document.querySelector('#readmi-logo');

homeBtn.addEventListener('click', function() {
    location.href = '/home';
});

loginButt.addEventListener('click', function() {
    location.href = '/logout';
});

dashBtn.addEventListener('click', function() {
    location.href = '/dashboard';
});

mainImg.addEventListener('click', function() {
    location.href = '/home';
});