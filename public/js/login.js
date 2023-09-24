const signUp = document.querySelector("#steignupBtn");
const loginForm = document.querySelector("#loginSbm");

signUp.addEventListener("click", async function () {
  const response = await fetch("/register", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    location.href = "/register";
  };
});

loginForm.addEventListener('submit', async function(event) {
  event.preventDefault();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();
  const response = await fetch('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    location.href = '/home';
  } else {
    return;
  }
})