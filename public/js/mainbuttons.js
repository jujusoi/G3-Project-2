const loginButt = document.querySelector("#loginBtn");
const mainImg = document.querySelector('#readmi-logo');

loginButt.addEventListener('click', async function() {
    const response = await fetch('/logout', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    });
    if (response.ok) {
        location.href = '/login';
    } else {
        return;
    };
});

mainImg.addEventListener('click', async function() {
    const response = await fetch('/home', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    });
    if (response.ok) {
        location.href = '/home';
    };
});