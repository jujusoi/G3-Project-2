const searchBar = document.querySelector('#searchbar');

const searchBtn = document.querySelector('#main-searchBtn');

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