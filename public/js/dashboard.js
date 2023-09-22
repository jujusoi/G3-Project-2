const bookClick = document.querySelector('#book-table-ting');


bookClick.addEventListener('click', function(event) {
    const target = event.target;
    if (target.hasAttribute('data-bookid')) {
        const id = target.getAttribute('data-bookid');
        location.href = `/home/books/${id}`;
    } else {
        return;
    };
});

bookClick.addEventListener('click', async function(event) {
    const target = event.target;
    if (target.hasAttribute('data-wishlist')) {
        const id = target.getAttribute('data-wishlist');
        const response = await fetch(`/api/userwishlist/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'},
        });
        if (response.ok) {
            window.location.reload();
        }
    } else {
        return;
    };
});