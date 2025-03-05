// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Create comments array
const comments = [
  { username: 'Todd', comment: 'lol that is so funny', upvotes: 0 },
  { username: 'Skyler', comment: 'I like turtles', upvotes: 0 },
  { username: 'Sk8erBoi', comment: 'Plz delete this', upvotes: 0 },
  { username: 'Ada', comment: 'rofl', upvotes: 0 },
  { username: 'Evan', comment: 'that is so 2008', upvotes: 0 }
];

// Get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Get comment by username
app.get('/comments/:username', (req, res) => {
  const user = req.params.username;
  const comment = comments.find(c => c.username === user);
  res.json(comment);
});

// Post a new comment
app.post('/comments', (req, res) => {
  const newComment = req.body;
  comments.push(newComment);
  res.status(201).json(newComment);
});

// Upvote a comment
app.put('/comments/:username/upvote', (req, res) => {
  const user = req.params.username;
  const comment = comments.find(c => c.username === user);
  comment.upvotes++;
  res.status(200).json(comment);
});

// Delete a comment
app.delete('/comments/:username', (req, res) => {
  const user = req.params.username;
  const commentIndex = comments.findIndex(c => c.username === user);
  comments.splice(commentIndex, 1);
  res.status(204).send();
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});