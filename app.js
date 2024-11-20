const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files like CSS
app.set('view engine', 'ejs');

let tasks = [];

// Home route
app.get('/', (req, res) => {
    res.render('index', { tasks });
});

// Add a new task
app.post('/add', (req, res) => {
    const task = req.body.task;
    if (task) tasks.push(task);
    res.redirect('/');
});

// Delete a task
app.post('/delete', (req, res) => {
    const taskIndex = req.body.taskIndex;
    if (taskIndex >= 0 && taskIndex < tasks.length) {
        tasks.splice(taskIndex, 1);
    }
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Fancy To-Do List app listening at http://localhost:${port}`);
});
