document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const identifier = document.getElementById('identifier').value;
    const password = document.getElementById('password').value;

    const loginInfo = {
        identifier: identifier,
        password: password
    };

    // Send a POST request to the server to authenticate the user
    fetch('hhttp://76.174.52.44:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
    })
    .then(response => response.json())
    .then(data => {
        if (!data.empty) {
            alert(`Login successful. Welcome to Food Fights ${data.username}!`);
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