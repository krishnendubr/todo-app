// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
// import { db } from './firebase';
// import TaskList from './TaskList';
// import { FaEdit, FaTrash } from 'react-icons/fa';  // Import trash icon
// import './ProjectDetails.css';
// import Navbar from './Navbar';

// const ProjectDetails = () => {
//     var email = sessionStorage.getItem('email');
//     const { id } = useParams();
//     const [project, setProject] = useState(null);
//     const [isEditingProject, setIsEditingProject] = useState(false);
//     const [newProjectName, setNewProjectName] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchProjectDetails = async () => {
//             const docRef = doc(db, email, id);
//             const docSnap = await getDoc(docRef);

//             if (docSnap.exists()) {
//                 setProject(docSnap.data());
//                 setNewProjectName(docSnap.data().name);
//             } else {
//                 console.log("No such document!");
//             }
//         };

//         fetchProjectDetails();
//     }, [email, id]);

//     const handleSaveProjectName = async () => {
//         if (newProjectName.trim()) {
//             try {
//                 const projectRef = doc(db, email, id);
//                 await updateDoc(projectRef, { name: newProjectName });
//                 alert('Project name updated successfully!');
//                 setIsEditingProject(false);
//             } catch (error) {
//                 console.error('Error updating project name: ', error);
//             }
//         } else {
//             alert('Project name cannot be empty!');
//         }
//     };

//     const handleDelete = async () => {
//         try {
//             const docRef = doc(db, email, id);
//             await deleteDoc(docRef);
//             alert('Project deleted successfully!');
//             navigate('/');
//         } catch (error) {
//             console.error('Error deleting project: ', error);
//         }
//     };

//     return (
//         <div className="project-details-container">
//             <Navbar />
//             {project ? (
//                 <>
//                     <div className="project-info">
//                         <div className="project-title">
//                             {isEditingProject ? (
//                                 <>
//                                     <input
//                                         type="text"
//                                         value={newProjectName}
//                                         onChange={(e) => setNewProjectName(e.target.value)}
//                                         placeholder="New project name"
//                                         className="project-name-input"
//                                     />
//                                     <button className="save-button" onClick={handleSaveProjectName}>Save</button>
//                                     <button className="cancel-button" onClick={() => setIsEditingProject(false)}>Cancel</button>
//                                 </>
//                             ) : (
//                                 <>
//                                     {project.name}
//                                     <div className="actions">
//                                         <FaEdit
//                                             className="edit-icon"
//                                             onClick={() => setIsEditingProject(true)}
//                                         />
//                                         <FaTrash
//                                             className="delete-icon"
//                                             onClick={handleDelete}
//                                         />
//                                     </div>
//                                 </>
//                             )}
//                         </div>
//                         <div className="project-date"><strong>Date:</strong> {project.createdAt}</div>
//                     </div>
//                     {/* <p className="project-info"><strong>Description:</strong> {project.description}</p> */}

//                     <div className="task-list-container">
//                         <TaskList
//                             projectId={id}
//                             tasks={project.tasks || []}
//                             projectName={newProjectName}
//                             setProjectName={setNewProjectName}
//                         />
//                     </div>
//                 </>
//             ) : (
//                 <p>Loading project details...</p>
//             )}
//         </div>
//     );
// };

// export default ProjectDetails;


import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import TaskList from './TaskList';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { saveAs } from 'file-saver'; // For file export
import './ProjectDetails.css';
import Navbar from './Navbar';

const ProjectDetails = () => {
    const email = sessionStorage.getItem('email');
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
                console.log('No such document!');
            }
        };

        fetchProjectDetails();
    }, [email, id]);

    const handleSaveProjectName = async () => {
        if (newProjectName.trim()) {
            try {
                const projectRef = doc(db, email, id);
                await updateDoc(projectRef, { name: newProjectName });
                // alert('Project name updated successfully!');
                console.log('Project name updated successfully!');
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
            // alert('Project deleted successfully!');
            console.log('Project deleted successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error deleting project: ', error);
        }
    };

    const handleExportMarkdown = () => {
        const tasks = project.tasks || [];
        const completedTasks = tasks.filter((task) => task.isCompleted === 'completed');
        const pendingTasks = tasks.filter((task) => task.isCompleted === 'pending');

        // Construct Markdown content
        let markdownContent = `# ${project.name}\n\n`;
        markdownContent += `**Summary:** ${completedTasks.length} / ${tasks.length} completed\n\n`;

        markdownContent += `## Section 1: Pending Tasks\n`;
        pendingTasks.forEach((task) => {
            markdownContent += `- [ ] **${task.title}**: ${task.description}\n`;
        });

        markdownContent += `\n## Section 2: Completed Tasks\n`;
        completedTasks.forEach((task) => {
            markdownContent += `- [x] **${task.title}**: ${task.description}\n`;
        });

        // Save the Markdown file
        const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
        saveAs(blob, `${project.name.replace(/\s+/g, '_')}.md`);
    };

    return (
        <div className="project-details-container">
            <Navbar />
            {project ? (
                <>
                    <div className="project-info">
                        <div className="project-title-and-export">
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
                                        <button className="save-button" onClick={handleSaveProjectName}>
                                            Save
                                        </button>
                                        <button
                                            className="cancel-button"
                                            onClick={() => setIsEditingProject(false)}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {project.name}
                                        <div className="actions">
                                            <FaEdit
                                                className="edit-icon"
                                                onClick={() => setIsEditingProject(true)}
                                            />
                                            <FaTrash className="delete-icon" onClick={handleDelete} />
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="project-export-button">
                                <button className="export-btn" onClick={handleExportMarkdown}>
                                    Export
                                </button>
                            </div>
                        </div>
                        <div className="project-date">
                            <strong>Date:</strong> {project.createdAt}
                        </div>
                        
                    </div>
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
