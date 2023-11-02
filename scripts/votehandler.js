
function upvote(id){
  
    const data ={ 
         postId:id
    };

  
    
    fetch(`http://76.174.52.44:5000/upvote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          console.log('Post Upvoted:', data);
        //   alert('Your vote has been counted!');
          window.location.href = 'leaderboards.html';
        })
        .catch(error => {
          console.error('Error:', error);
           alert('Error updating post ratings. Please try again later.');
        });

};

function downvote(id){
    const data ={ 
        postId:id
     };
   
   fetch(`http://76.174.52.44:5000/downvote`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(data)
     })
       .then(response => response.json())
       .then(data => {
         console.log('Post Upvoted:', data);
        //  alert('Your vote has been counted!');
         window.location.href = 'leaderboards.html';
       })
       .catch(error => {
         console.error('Error:', error);
          alert('Error updating post ratings. Please try again later.');
       });

};
