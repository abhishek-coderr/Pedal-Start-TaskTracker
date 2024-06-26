const express = require('express');
const { ConnecttoDB } = require('./DBConnect');
const cors = require('cors')
const tasks_Schema = require('./models/tasks_schema');
const app = express();
app.use(express.json());
app.use(cors())

ConnecttoDB('mongodb+srv://abhishek1029sain:abhishek10@cluster0.lawks9g.mongodb.net/TaskTracker').then(async() => {
    console.log('DB connected');
}).catch(err=>console.log(err))

app.post('/addtask',async (req,res)=>{
    const { title, description, date } = req.body.taskData;

    const existingTask = await tasks_Schema.findOne({ taskTitle: title });
    if (existingTask) {
        return res.json({ message: 'Task already exists' });
    }


    const lastTask = await tasks_Schema.findOne().sort({ taskID: -1 });
    const newTaskID = lastTask ? lastTask.taskID + 1 : 1;

    await tasks_Schema.create({
        taskID: newTaskID,
        taskTitle: title,
        taskDescription: description,
        taskDueDate: date
    }).then((result)=>{
        console.log(result);
        res.json({message: 'new task added'})
    })
})

app.get('/getAllTasks',async (req,res)=>{
    await tasks_Schema.find().then((result)=>{
        res.json(result)
        console.log(result);
    })

})

app.post('/deleteTask',async (req,res)=>{
    const { taskID } = req.body
    await tasks_Schema.findOneAndDelete({taskID: taskID}).then((result)=>{
        console.log(result);
        res.json({message: 'task deleted'})
    })
})

app.post('/updateTaskStatus',async (req,res)=>{
    const { taskID } = req.body
    await tasks_Schema.findOneAndUpdate(
        {taskID: taskID},
        {taskStatus: true},
        {new: true}
    ).then((result)=>{
        console.log(result);
        res.json({message: 'task marked completed, you an delete it now'})
    })
})

app.listen(8000,()=>{
    console.log("Server is running on port 8000")
})