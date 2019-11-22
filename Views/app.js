const axios = require('axios')

function getPost() {
    axios
        .get('localhost:9000/post?_limit=10')
        .then(res => showPost(res))
        .catch(err => console.log(err));
}

function addPost() {
    axios
        .post('localhost:9000/post/', {
            topik : "GATAU",
            user_id : '2',
            title : "GATAU JUGA",
            text : document.getElementById("message").value
        })
        .then()
        .catch(err => console.error(err))
}

function showPost(res) {

}

function deletePost(id_post) {
    axios
        .delete('localhost:9000/post' + id_post)
        .then()
        .catch(err => console.err(err))
}

function addLikes(id_post) {
    axios
        .put('local:9000/post/like' + id_post)
        .then()
        .catch(err => console.err(err))
}

function filterPost(topik) {
    axios
        .get('localhost:9000/filter', {
            "topik": topik
        })
        .then()
        .catch(err => console.err(err))

}

function performNewPost (e) {
    var resultElement = document.getElementById('');
    var postTopic = document.getElementById('').value;
    var postTitle = document.getElementById('').value;
    var postText = document.getElementById('').value;
}

/**** EVENT LISTENER ****/ 

document.getElementById('').addEventListener('submit', performNewPost);
document.getElementById('').addEventListener('click', addPost);
document.getElementById('').addEventListener('click', deletePost);
document.getElementById('').addEventListener('click', addLikes);
document.getElementById('').addEventListener('submit', filterPost);