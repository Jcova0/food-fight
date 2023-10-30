document.addEventListener('DOMContentLoaded', function () {
    const postForm = document.getElementById('postForm');

    postForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        const formData = new FormData(postForm);

        const postData = {};
        formData.forEach(function (value, key) {
            postData[key] = value;
        });

        console.log(postData);
        
        postForm.reset();
    });
});