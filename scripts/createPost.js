document.addEventListener('DOMContentLoaded', function () {
    const postForm = document.getElementById('postForm');

    postForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        const postDescription = document.getElementById('postDescription').value;
        const postTitle = document.getElementById('postTitle').value;      
        const postImageInput = document.getElementById('postImageInput');

        // Get the file from the input field
        const postImage = postImageInput.files[0];

       
        const formData = new FormData();
        // formData.append('user_id', userId); // userId should be defined, but we dont have authentication.. rip
        formData.append('postTitle', postTitle);
        formData.append('postDescription', postDescription);
        formData.append('postImage', postImage); // Append the file to the form data


        // Send the form data to your server
        sendImageToServer(formData);

        postForm.reset();
    });

    // function sendDataToServer(postData) {
    //     fetch('http://localhost:5000/createPost', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(postData)
    //     })
    //     .then(response => response.json())
    //     .then(post => {
    //         console.log('Server response:', post);
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //     });
    // }

    function sendImageToServer(formData){
        //send the file to the other server
        fetch('http://localhost:5000/createPostImage',{
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(post => {
            console.log('Server response:', post);
            alert("Out of the frying pan, into the fire!")
            window.location.href = 'leaderboards.html';
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});