const { request, response } = require('express');
const express = require('express');

const app = express();
app.use(express.json());

const tasks = [];

app.get('/tasks', (request, response) => {
    return response.json(tasks);
});

app.post('/tasks', (request, response) => {
    const {title, date} = request.body;
    const i = tasks.length;
    const task = {
        id: i,
        title,
        date,
    };

    tasks.push(task);

    return response.json(task);
});

app.put('/tasks/:id', (request, response) => {
    const {id} = request.params;
    const {title, date} = request.body;
    const taskIndex = tasks.findIndex(task => task.id == id);
    if(taskIndex == -1) return response.status(400).json({ error: 'Object not found.'});
    
    tasks[taskIndex].title = title || tasks[taskIndex].title;
    tasks[taskIndex].date = date || tasks[taskIndex].date;
    
    return response.json(tasks[taskIndex]);

});

app.delete('/tasks/:id', (request, response) => {
    const {id} = request.params;
    const {title, date} = request.body;
    const taskIndex = tasks.findIndex(task => task.id == id);
    if(taskIndex == -1) return response.status(400).json({ error: 'Object not found.'});

    tasks.splice(taskIndex, 1);

    return response.status(204).send();

});

app.listen(3333, () => {
    console.log('Backend started ✌')
});