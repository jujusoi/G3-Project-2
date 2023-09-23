const loginButt = document.querySelector("#loginBtn");
const dashBtn = document.querySelector('#dashboardBtn');
const mainImg = document.querySelector('#readmi-logo');


loginButt.addEventListener('click', function() {
    location.href = '/logout';
});

dashBtn.addEventListener('click', function() {
    location.href = '/dashboard';
});

mainImg.addEventListener('click', function() {
    location.href = '/home';
});