const bookClick = document.querySelector("#book-table-ting");

bookClick.addEventListener("click", function (event) {
  const target = event.target;
  if (target.hasAttribute("data-bookid")) {
    const id = target.getAttribute("data-bookid");
    location.href = `/home/books/${id}`;
  } else {
    return;
  }
});

bookClick.addEventListener("click", async function (event) {
  const target = event.target;
  if (target.hasAttribute("data-wishlist")) {
    const id = target.getAttribute("data-wishlist");
    const response = await fetch(`/api/userwishlist/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      window.location.reload();
    }
  } else {
    return;
  }
});

// Edit Username
$("#editBtn").click(function () {
  // Show the edit username form and hide other elements
  $("#editUsernameForm").show();
  $("#editBtn").hide();
  $("#dltBtn").hide();
});

$("#editUsernameForm").submit(async function (event) {
  event.preventDefault();
  const newUsername = $("#newUsername").val();

  //  PUT request to update the username
  const response = await fetch("/api/users/updateUsername", {
    method: "PUT",
    body: JSON.stringify({ newUsername }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    // Update the user's username
    $(".fw-bold").text(newUsername);

    // Hide the form and show the username display
    $("#editUsernameForm").hide();
    $(".fw-bold").show();
    $("#editBtn").show();
    $("#dltBtn").show();
  } else {
    // Handle error
    alert("Failed to update username. Please try again.");
  }
});

// DELETE request
$("#dltBtn").click(function () {
  const confirmDelete = confirm(
    "Are you sure you want to delete your account? This action cannot be undone."
  );

  if (confirmDelete) {
    fetch("/api/users/deleteAccount", {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          alert("Account deleted successfully");

          // Redirect page to sign up
          window.location.href = "/register"; //
        } else {
          alert("Failed to delete account");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        alert("An error occurred while deleting the account");
      });
  }
});
