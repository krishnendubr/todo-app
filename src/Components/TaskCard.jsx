import { FaEdit, FaCheck, FaTrashAlt, FaTimes } from 'react-icons/fa';
import './TaskCard.css';  // Add the CSS file

const TaskCard = ({ task, onEdit, onDelete, onToggleStatus }) => {
    return (
        <div className="task-card">
            <div className="task-card-header">
                <h5>{task.title}</h5>
                <span className={`status ${task.isCompleted === 'pending' ? 'pending' : 'completed'}`}>
                    {task.isCompleted === 'pending' ? 'Pending' : 'Completed'}
                </span>
            </div>
            <p><strong>Description:</strong> {task.description}</p>
            <p><strong>Date:</strong> {task.date}</p>
            <div className="task-card-actions">
                <button onClick={() => onToggleStatus(task)} className="toggle-status-btn">
                    {task.isCompleted === 'pending' ? <FaCheck size={20} color="green" /> : <FaTimes size={20} color="red" />}
                </button>
                <button onClick={() => onEdit(task)} className="edit-btn">
                    <FaEdit size={20} />
                </button>
                <button onClick={() => onDelete(task)} className="delete-btn">
                    <FaTrashAlt size={20} color="red" />
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
