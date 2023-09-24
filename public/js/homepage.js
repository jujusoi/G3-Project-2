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
    if (target.hasAttribute('data-wish-bookid') && target.classList.contains('star-unfilled')) {
        target.classList.remove('star-unfilled');
        target.classList.add('star-filled');
        const id = target.getAttribute('data-wish-bookid');
        const response = await fetch(`/api/wishlist/${id}`, {
            method: 'POST',
            body: JSON.stringify({ id }),
            headers: { 'Content-Type': 'application/json'},
        });
        if (!response.ok) {
            alert(`Could not save`);
        }
    } else if (target.hasAttribute('data-wish-bookid') && target.classList.contains('star-filled')) {
        target.classList.remove('star-filled');
        target.classList.add('star-unfilled');
        const id = target.getAttribute('data-wish-bookid');
        const response = await fetch(`/api/wishlist/${id}`, {
            method: 'DELETE',
            body: JSON.stringify({ id }),
            headers: { 'Content-Type': 'application/json'},
        });
        if (!response.ok) {
            alert(`Could not delete`);
        }
    }
});

