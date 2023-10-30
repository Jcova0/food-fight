document.addEventListener('DOMContentLoaded', function () {
    const recentPostsList = document.getElementById('recentPostsList');

    // Make an HTTP GET request to retrieve recent posts
    fetch('/data', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(posts => {
        // Handle the retrieved posts and update your HTML to display them
        posts.forEach(post => {
            const listItem = document.createElement('li');
            listItem.textContent = 'Title: ${post.postTitle}, Description: ${post.postDescription}';
            recentPostsList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error retrieving recent posts:', error);
    });
});