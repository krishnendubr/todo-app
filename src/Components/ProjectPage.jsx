import { useState, useEffect } from 'react';
import { db } from './firebase'; // Firebase initialization
import TaskList from './TaskList'; // TaskList component

const ProjectPage = ({ projectId }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Fetch tasks from Firestore
        const fetchTasks = async () => {
            const projectRef = doc(db, 'projects', projectId);
            const projectDoc = await getDoc(projectRef);
            if (projectDoc.exists()) {
                setTasks(projectDoc.data().tasks || []);
            }
        };

        fetchTasks();
    }, [projectId]);

    return (
        <div>
            <TaskList projectId={projectId} tasks={tasks} setTasks={setTasks} />
        </div>
    );
};

export default ProjectPage;
