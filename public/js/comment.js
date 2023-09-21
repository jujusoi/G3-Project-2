const submitBtn = document.querySelector('#comment-submitBtn');
const rankingThing = document.querySelector('#selection');

submitBtn.addEventListener('click', async function(event){
    event.preventDefault();
    const ratingVal = document.querySelector('#rating-input').value;
    const descVal = document.querySelector('#comment-desc').value;
    const bookVal = document.querySelector('#book-title').getAttribute('data-bookid');
    if (ratingVal && descVal && bookVal && ratingVal <= 5 && ratingVal >= 1) {
        const response = await fetch(`/api/reviews/`, {
            method: 'POST',
            body: JSON.stringify({ ratingVal, descVal, bookVal }),
            headers: { 'Content-Type': 'application/json'},
        });
        if (response.ok) {
            const response2 = await fetch(`/api/reviews/${bookVal}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json '},
            });
            if (response2.ok) {
                location.reload();
            } else {
                alert(`Could not update book rating`);
            }
        } else {
            alert('Could not post comment!');
        };
    };
});

rankingThing.addEventListener('click', async function(event){
    const target = event.target;
    if (target.hasAttribute('data-reviewId')) {
        const bookVal = document.querySelector('#book-title').getAttribute('data-bookid');
        const reviewId = target.getAttribute('data-reviewId');
        const response = await fetch(`/api/reviews/${bookVal}`, {
            method: 'DELETE',
            body: JSON.stringify({ reviewId }),
            headers: { 'Content-Type': 'application/json '},
        });
        if (response.ok) {
            location.reload();
        }
    }
});