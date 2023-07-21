// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

// Create app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create comments
const commentsByPostId = {};

// Handle incoming events
app.post('/events', async(req, res) => {
    const {type, data} = req.body;

    if(type === 'CommentCreated'){
        const {id, content, postId} = data;

        const comments = commentsByPostId[postId] || [];
        comments.push({id, content});
        commentsByPostId[postId] = comments;

        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentModerated',
            data: {id, content, postId, status: 'pending'}
        });
    }

    if(type === 'CommentUpdated'){
        const {id, content, postId, status} = data;
        const comments = commentsByPostId[postId];

        const comment = comments.find(comment => {
            return comment.id === id;
        });

        comment.status = status;

        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentUpdated',
            data: {id, content, postId, status}
        });
    }

    res.send({});
});

// Get comments
app.get('/posts/:id/comments', (req, res) => {
    const comments = commentsByPostId[req.params.id] || [];
    res.send(comments);
});

// Listen to port 4001
app.listen(4001, () => {
    console.log('Listening on 4001');
});