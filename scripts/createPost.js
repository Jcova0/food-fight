document.addEventListener('DOMContentLoaded', function () {
    const postForm = document.getElementById('postForm');

    postForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        const formData = new FormData(postForm);

        const postData = {};
        formData.forEach(function (value, key) {
            postData[key] = value;
        });

        // Send the form data to your server
        sendDataToServer(postData);

        postForm.reset();
    });

    function sendDataToServer(data) {
        fetch('/data', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(post => {
            console.log('Server response:', post);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});