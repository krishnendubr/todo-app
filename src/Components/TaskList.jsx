import { useState } from 'react';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from './firebase';
// import { useNavigate } from 'react-router-dom';
import TaskCard from './TaskCard';  // Import the new TaskCard component
// import Navbar from './Navbar';  // Import the Navbar component
import './TaskList.css';

const TaskList = ({ projectId, tasks, setProjectName }) => {
    const [newTask, setNewTask] = useState({ title: '', description: '', isCompleted: 'pending' });
    const [isEditing, setIsEditing] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    // const navigate = useNavigate();
    const email = sessionStorage.getItem('email');

    const handleTaskChange = (e) => {
        const { name, value } = e.target;
        setNewTask({
            ...newTask,
            [name]: value,
        });
    };

    const getCurrentDate = () => {
        const today = new Date();
        const day = ("0" + today.getDate()).slice(-2); // Format day
        const month = ("0" + (today.getMonth() + 1)).slice(-2); // Format month (0-based index, so add 1)
        const year = today.getFullYear(); // Get full year
    
        return `${day}/${month}/${year}`; // Return formatted date (dd/mm/yyyy)
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (newTask.title.trim() && newTask.description.trim()) {
            try {
                const projectRef = doc(db, email, projectId);
                const taskWithDate = { ...newTask, date: getCurrentDate() }; // Add date to task
                await updateDoc(projectRef, {
                    tasks: arrayUnion(taskWithDate),
                });
                setNewTask({ title: '', description: '', isCompleted: 'pending' });
                // alert('Task added successfully!');
                console.log('task added');
                window.location.reload();
                // navigate(`/project/${projectId}`);  // Redirect to project details page
                
                
            } catch (error) {
                console.error('Error adding task: ', error);
            }
            // navigate(`/project/${projectId}`);  // Redirect to project details page
            // console.log(projectId);
        } else {
            alert('Please fill in both title and description for the task.');
        }
    };

    const toggleTaskStatus = async (task) => {
        const newStatus = task.isCompleted === 'pending' ? 'completed' : 'pending';
        try {
            const taskRef = doc(db, email, projectId);
            const updatedTasks = tasks.map((t) =>
                t.title === task.title ? { ...t, isCompleted: newStatus } : t
            );
            await updateDoc(taskRef, { tasks: updatedTasks });
            // alert(`Task marked as ${newStatus}!`);
            console.log(`Task marked as ${newStatus}!`);
            window.location.reload();
        } catch (error) {
            console.error('Error updating task status: ', error);
        }
    };

    const handleDeleteTask = async (task) => {
        try {
            const taskRef = doc(db, email, projectId);
            const updatedTasks = tasks.filter((t) => t.title !== task.title);
            await updateDoc(taskRef, { tasks: updatedTasks });
            // alert('Task deleted successfully!');
            console.log('task deleted');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting task: ', error);
        }
    };

    const handleEditTask = (task) => {
        setIsEditing(true);
        setEditingTask(task);
        setNewTask({ title: task.title, description: task.description, isCompleted: task.isCompleted });
    };

    const handleSaveTask = async (e) => {
        e.preventDefault();
        if (newTask.title.trim() && newTask.description.trim()) {
            try {
                const taskRef = doc(db, email, projectId);
                const updatedTasks = tasks.map((t) =>
                    t.title === editingTask.title ? { ...t, ...newTask } : t
                );
                await updateDoc(taskRef, { tasks: updatedTasks });
                // alert('Task updated successfully!');
                console.log('task updated');
                setIsEditing(false);
                setEditingTask(null);
                setNewTask({ title: '', description: '', isCompleted: 'pending' });
                window.location.reload();
            } catch (error) {
                console.error('Error updating task: ', error);
            }
        } else {
            alert('Please fill in both title and description for the task.');
        }
    };

    // Calculate the summary
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.isCompleted === 'completed').length;
    // const pendingTasks = totalTasks - completedTasks;

    return (
        <div className="task-container">
            <div className="task-summary">
                <b>Task Summary: </b>
                {completedTasks}/{totalTasks} tasks completed
                <div className="task-list">
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.title}
                            task={task}
                            onEdit={handleEditTask}
                            onDelete={handleDeleteTask}
                            onToggleStatus={toggleTaskStatus}
                        />
                    ))}
                </div>
            </div>
                

            <div className="add-or-edit-task-form">
                <div className="form-card">
                    <h2>{isEditing ? 'Edit Task' : 'Add Task'}</h2>
                    <form onSubmit={isEditing ? handleSaveTask : handleAddTask}>
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                name="title"
                                value={newTask.title}
                                onChange={handleTaskChange}
                                placeholder="Task title"
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={newTask.description}
                                onChange={handleTaskChange}
                                placeholder="Task description"
                            />
                        </div>
                        <div className="form-group">
                            <label>Completion Status:</label>
                            <div className="status-options">
                                <input
                                    type="radio"
                                    id="pending"
                                    name="isCompleted"
                                    value="pending"
                                    checked={newTask.isCompleted === 'pending'}
                                    onChange={handleTaskChange}
                                />
                                <label htmlFor="pending">Pending</label>
                                <input
                                    type="radio"
                                    id="completed"
                                    name="isCompleted"
                                    value="completed"
                                    checked={newTask.isCompleted === 'completed'}
                                    onChange={handleTaskChange}
                                />
                                <label htmlFor="completed">Completed</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="submit-btn">{isEditing ? 'Save Task' : 'Add Task'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TaskList;
