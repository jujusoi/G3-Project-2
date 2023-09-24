const loginButt = document.querySelector("#loginBtn");

const registerBtn = document.querySelector("#signupBtn");

const mainImg = document.querySelector('#readmi-logo');

mainImg.addEventListener('click', async function() {
    const response = await fetch('/home', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    });
    if (response.ok) {
        location.href = '/home';
    };
});

loginButt.addEventListener('click', async function() {
    const response = await fetch('/login', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    });
    if (response.ok) {
        location.href = '/login';
    };
});

registerBtn.addEventListener('click', async function() {
    const response = await fetch("/register", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        location.href = "/register";
    };
});
