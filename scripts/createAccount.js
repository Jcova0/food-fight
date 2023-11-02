document.getElementById('createAccountForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
        alert('All fields are required. Please fill in all the fields.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match. Please enter the same password in both fields.');
        return;
    }

    const passwordReq = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordReq.test(password)) {
        alert('Password must contain an uppercase letter, a number, and be at least 8 characters long.');
        return;
    }

    const postData = {
        first_name: firstName,
        last_name: lastName,
        username: username,
        email: email,
        password: password
    };

    fetch('http://76.174.52.44:5000/createUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert('Account created successfully! Redirecting to login page.');
        window.location.href = 'login.html';
    })
    .catch(error => {
        console.error('Error creating user: ', error);
        alert('Error creating user. Please try again later.');
    });
});