document.addEventListener('DOMContentLoaded', function() {
    const leaderboardDiv = document.getElementById('leaderboard');
    const filterSelect = document.getElementById('filterSelect');

    function displayPosts(posts) {
        leaderboardDiv.innerHTML = '';
        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.className = 'post';
            postDiv.innerHTML = `
                <h3>${post.title}</h3>
                <p>Rating: ${post.rating}</p>
                <p>Comments: ${post.comments}</p>
                <p>${post.content}</p>
            `;
            leaderboardDiv.appendChild(postDiv);
        });
    }

    function fetchAndDisplayPosts(filterBy) {
        fetch(`/posts?filter=${filterBy}`)
            .then(response => response.json())
            .then(posts => {
                posts.sort((a, b) => b[filterBy] - a[filterBy]);
                displayPosts(posts);
            })
            .catch(error => {
                console.error('Error fetching posts: ', error);
                alert('Error fetching posts. Please try again later.');
            });
    }

    fetchAndDisplayPosts('ratings');

    filterSelect.addEventListener('change', function() {
        const selectedFilter = filterSelect.value;
        fetchAndDisplayPosts(selectedFilter);
    });
});