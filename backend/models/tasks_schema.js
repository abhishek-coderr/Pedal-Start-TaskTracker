const mongoose=require('mongoose')

const taskSchema = new mongoose.Schema({
    taskID: {
        type: Number,
        required: true,
        unique: true 
    },
    taskTitle:{
        type: String,
        required: true,
    },
    taskDescription: {
        type: String,
        trim: true,
    },
    taskDueDate:{
        type: Date,
    },
    taskStatus:{
        type: Boolean,
        default: false
    }
});


const tasks_Schema = mongoose.model('tasks', taskSchema);

module.exports = tasks_Schema;
