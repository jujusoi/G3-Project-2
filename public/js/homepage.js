const bookClick = document.querySelector('#book-table-ting');
const loginButt = document.querySelector("#loginBtn");
const registerBtn = document.querySelector("#signupBtn");
const searchBar = document.querySelector('#searchbar');
const searchBtn = document.querySelector('#main-searchBtn');

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
        if (response.ok) {
            console.log(`Sent req`);
        } else {
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
        if (response.ok) {
            console.log(`Sent req`);
        } else {
            alert(`Could not delete`);
        }
    }
});

loginButt.addEventListener('click', function() {
    location.href = '/login';
});

registerBtn.addEventListener('click', function() {
    location.href = '/register';
});

searchBar.addEventListener('click', function(event) {
    const target = event.target;
    if (target.tagName === 'BUTTON' && target.classList.contains('genre-item')) {
        const val = target.textContent;
        if (val) {
            const selection = document.querySelector('.genre-button');
            selection.innerHTML = val;
        }
    } else if (target.tagName === 'BUTTON' && target.classList.contains('star-item')) {
        const val = target.textContent;
        if (val) {
            const selection = document.querySelector('.star-button');
            selection.innerHTML = val;
        }
    }
});

searchBtn.addEventListener('click', async function(event) {
    event.preventDefault();
    console.log(`${document.querySelector('#main-searchBar').value}, ${document.querySelector('.genre-button').textContent}, ${document.querySelector('.star-button').textContent}`);
    let starVal = document.querySelector('.star-button').textContent;
    starVal = starVal.replace('★', '');
    const searchVal = document.querySelector('#main-searchBar').value;
    const genreVal = document.querySelector('.genre-button').textContent;

    if (genreVal === 'Genre') {
        console.log('NOT ALLOWED!!');
    }

    const url = new URL('/home/search', window.location.href);
    url.searchParams.append('genreVal', genreVal);
    url.searchParams.append('searchVal', searchVal);
    url.searchParams.append('starVal', starVal);
    window.location.href = `/home/search/${url.search}`;
});