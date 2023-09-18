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

// clear filter button
const bookSearchForm = document.getElementById("bookSearchForm");
const clearFiltersButton = document.getElementById("clearFilters");

// Function to clear form fields
function clearFilters() {
  // Reset the form to its initial state
  bookSearchForm.reset();
}

// Attach a click event listener to the clear button
clearFiltersButton.addEventListener("click", clearFilters);
