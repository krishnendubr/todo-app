import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import './AddProject.css';

function AddProject() {
    const [projectName, setProjectName] = useState('');

    // Function to format date in dd/mm/yyyy format
    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleAddProject = async () => {
        const email = sessionStorage.getItem('email');
        if (projectName.trim()) {
            try {
                // Get the current date in dd/mm/yyyy format
                const currentDate = formatDate(new Date());

                // Add project to Firestore
                await addDoc(collection(db, email), {
                    name: projectName,
                    createdAt: currentDate,  // Save the formatted date in Firestore
                });
                
                setProjectName('');
                window.location.reload();
            } catch (error) {
                console.error('Error adding project: ', error);
            }
        } else {
            alert('Project name cannot be empty');
        }
    };

    return (
        <div>
            <h3>Add New Project</h3>
            <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
                className="add-project-input"
            />
            <button onClick={handleAddProject} className="add-project-button">Add</button>
        </div>
    );
}

export default AddProject;
