
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
// Show the edit username form and hide other elements

document.querySelector('#editBtn').addEventListener('click', function() {
  document.querySelector('#editUsernameForm').style.display = 'block';
  document.querySelector('#editBtn').style.display = 'none';
  document.querySelector('#dltBtn').style.display = 'none';
});


document.querySelector('#editUsernameForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const newUsername = document.querySelector('#newUsername').value.trim();
  const response = await fetch('/api/users/updateUsername', {
    method: 'PUT',
    body: JSON.stringify({ newUsername }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.querySelector('.fw-bold').textContent = newUsername;
    document.querySelector('#editUsernameForm').style.display = 'none';
    document.querySelector('.fw-bold').style.display = 'block';
    document.querySelector('#editBtn').style.display = 'block';
    document.querySelector('#dltBtn').style.display = 'block';
  } else {
    alert('Failed to update username. Please try again.');
  }
});

document.querySelector('#dltBtn').addEventListener('click', function() {
  const confirmDelete = confirm('Are you sure you want to delete your account? This action cannot be undone.');
  if (confirmDelete) {
    fetch('/api/users/deleteAccount', {
      method: 'DELETE',
    }).then((response) => {
      if (response.ok) {
        alert('Account deleted successfully');
        window.location.href = '/register';
      } else {
        alert('Failed to delete account');
      }
    }).catch((error) => {
      console.error('An error occurred:', error);
      alert('An error occurred while deleting the account');
    });
  }
});
// DELETE request
