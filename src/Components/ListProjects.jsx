import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import './ListProjects.css';

const ListProjects = () => {
    const [projects, setProjects] = useState([]);
    const email = sessionStorage.getItem('email');
    useEffect(() => {
        const fetchProjects = async () => {
            const querySnapshot = await getDocs(collection(db, email));
            const projectsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProjects(projectsList);
            // console.log(projectsList);
            // find the number of tasks in each project
            
            // const tasks = projectsList.map(project => project.tasks);
            // const completedTaskCount = tasks.flat().filter(task => task.isCompleted==='completed').length;
            // console.log('completed task count: ' + completedTaskCount.length);
            // console.log(`Total number of tasks: ${tasks.flat().length}`);

        };

        fetchProjects();
        }, [email]);

    return (
        <div className="projects-container">
            <h1 className="projects-header">Projects List</h1>
            <ul className="project-list">
                {projects.map((project) => (
                    <li key={project.id} className="project-item">
                        <span className="project-count">{projects.indexOf(project) + 1}. </span>
                        <Link to={`/project/${project.id}`} className="project-link"><b>{project.name}</b></Link>
                        {project.tasks && (
                            <span className="task-completed-status">
                                {project.tasks.filter(task => task.isCompleted === 'pending').length}/
                                {project.tasks.length} tasks pending
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListProjects;
