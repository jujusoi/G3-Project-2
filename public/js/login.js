const signUp = document.querySelector("#signupBtn");

signUp.addEventListener("click", function () {
  location.href = "/register";
});
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registration-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData(form);

    try {
      const response = await fetch("/register", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Registration was successful, redirect to login page or show a success message
        window.location.href = "/login";
      } else {
        // Handle registration error, display an error message, or stay on the registration page
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  });
});
