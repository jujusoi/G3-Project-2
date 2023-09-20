const submitBtn = document.querySelector('#comment-submitBtn');

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
})