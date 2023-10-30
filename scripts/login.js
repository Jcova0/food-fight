document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const identifier = document.getElementById('identifier').value;
    const password = document.getElementById('password').value;

    // Send a POST request to the server to authenticate the user
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ identifier, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(`Login successful. Welcome to Food Fights!, ${data.firstName}`);
            window.location.href = 'index.html';
        } else {
            // Authentication failed, display error message
            alert('Invalid credentials. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error authenticating user: ', error);
        alert('Error authenticating user. Please try again later.');
    });
});