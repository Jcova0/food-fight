document.addEventListener('DOMContentLoaded', function() {
    const leaderboardDiv = document.getElementById('leaderboard');
    const filterSelect = document.getElementById('filterSelect');

    // console.log(leaderboardDiv)

    function displayPosts(posts) {
        console.log("dispalay function has recieved: ", posts)

        leaderboardDiv.innerHTML = '';
        posts.forEach(post => {
            // console.log(post)
            const postDiv = document.createElement("div");
            postDiv.className = 'post grow';
            postDiv.id = post.post_id;
            postDiv.innerHTML = `
                <img src="uploads/${post.image_url}" alt="${post.title}">
                <div class="post-info">
                    <h3>${post.title}</h3>
                    <h7>${post.caption}</h7>
                </div>
                           
                <div class="post-control">
                    <div class="vote-buttons">
                        <button type="upvote" id="upvote" onClick="upvote(${post.post_id})" class="btn btn-success btn-lg">Eat</button>
                        <p class="rating">${post.rating}</p>
                        <button type="downvote" class="btn btn-danger btn-lg" onClick="downvote(${post.post_id})">Yeet</button>
                    </div>
                    <div class="comment-button">
                        <button type="comment" class="btn btn-info">Comment</button>
                    </div>
                </div>
            `; //removed:     <p>${post.content}</p> <p>Comments: ${post.comments}</p>
            leaderboardDiv.appendChild(postDiv);
        });
    }

    function fetchAndDisplayPosts(filterBy) {
        fetch(`http://76.174.52.44:5000/getPosts`)
            .then(response => response.json())
            .then(posts => {
                // console.log("These are the posts:", posts)
                posts.sort((a, b) => b[filterBy] - a[filterBy]);
                displayPosts(posts);
            })
            .catch(error => {
                console.error('Error fetching posts: ', error);
                alert('Error fetching posts. Please try again later.');
            });
    }

    fetchAndDisplayPosts('rating');


    filterSelect.addEventListener('change', function() {
        const selectedFilter = filterSelect.value;
        fetchAndDisplayPosts(selectedFilter);
    });
});