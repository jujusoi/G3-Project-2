const dashBtn = document.querySelector('#dashboardBtn');

dashBtn.addEventListener('click', async function() {
    const response = await fetch('/dashboard', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    });
    if (response.ok) {
        location.href = '/dashboard';
    };
});
