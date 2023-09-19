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
