import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import TaskList from './TaskList';
import { FaEdit, FaTrash } from 'react-icons/fa';  // Import trash icon
import './ProjectDetails.css';
import Navbar from './Navbar';

const ProjectDetails = () => {
    var email = sessionStorage.getItem('email');
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [isEditingProject, setIsEditingProject] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjectDetails = async () => {
            const docRef = doc(db, email, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setProject(docSnap.data());
                setNewProjectName(docSnap.data().name);
            } else {
                console.log("No such document!");
            }
        };

        fetchProjectDetails();
    }, [email, id]);

    const handleSaveProjectName = async () => {
        if (newProjectName.trim()) {
            try {
                const projectRef = doc(db, email, id);
                await updateDoc(projectRef, { name: newProjectName });
                alert('Project name updated successfully!');
                setIsEditingProject(false);
            } catch (error) {
                console.error('Error updating project name: ', error);
            }
        } else {
            alert('Project name cannot be empty!');
        }
    };

    const handleDelete = async () => {
        try {
            const docRef = doc(db, email, id);
            await deleteDoc(docRef);
            alert('Project deleted successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error deleting project: ', error);
        }
    };

    return (
        <div className="project-details-container">
            <Navbar />
            {project ? (
                <>
                    <div className="project-info">
                        <div className="project-title">
                            {isEditingProject ? (
                                <>
                                    <input
                                        type="text"
                                        value={newProjectName}
                                        onChange={(e) => setNewProjectName(e.target.value)}
                                        placeholder="New project name"
                                        className="project-name-input"
                                    />
                                    <button className="save-button" onClick={handleSaveProjectName}>Save</button>
                                    <button className="cancel-button" onClick={() => setIsEditingProject(false)}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    {project.name}
                                    <div className="actions">
                                        <FaEdit
                                            className="edit-icon"
                                            onClick={() => setIsEditingProject(true)}
                                        />
                                        <FaTrash
                                            className="delete-icon"
                                            onClick={handleDelete}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="project-date"><strong>Date:</strong> {project.createdAt}</div>
                    </div>
                    {/* <p className="project-info"><strong>Description:</strong> {project.description}</p> */}

                    <div className="task-list-container">
                        <TaskList
                            projectId={id}
                            tasks={project.tasks || []}
                            projectName={newProjectName}
                            setProjectName={setNewProjectName}
                        />
                    </div>
                </>
            ) : (
                <p>Loading project details...</p>
            )}
        </div>
    );
};

export default ProjectDetails;
