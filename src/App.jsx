import SideBar from "./components/SideBar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import { useState } from "react";
import SelectedPRoject from "./components/SelectedProject.jsx";

function App() {
    const [projectState, setProjectsState] = useState({
        selectedProjectId: undefined,
        projects: [],
        tasks: [],
    });

    function handleAddTaks(text) {
        setProjectsState((prevState) => {
            const newTask = {
                text:text,
                projectId: prevState.selectedProjectId,
                id: Math.random(),
            };
            return {
                ...prevState,
                tasks: [newTask, ...prevState.tasks]
            };
        });
    }
    function handleDeleteTask(id) {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                tasks: prevState.tasks.filter((task) => {
                    return task.id !== id
                }),
            };
        });
    }

    function handleSelectProject(id) {
        setProjectsState((prevState) => {
            return { ...prevState, selectedProjectId: id };
        });
    }

    function handleStartAddProject() {
        setProjectsState((prevState) => {
            return { ...prevState, selectedProjectId: null };
        });
    }

    function handleCancel() {
        setProjectsState((prevState) => {
            return { ...prevState, selectedProjectId: undefined };
        });
    }

    function handleAddProject(projectDate) {
        setProjectsState((prevState) => {
            const newProject = {
                ...projectDate,
                id: Math.random(),
            };
            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: [...prevState.projects, newProject],
            };
        });
    }

    function handleDeleteProject() {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: prevState.projects.filter((project) => {
                    return project.id !== prevState.selectedProjectId;
                }),
            };
        });
    }

    const selectedProject = projectState.projects.find(
        (project) => project.id === projectState.selectedProjectId,
    );

    let content = (
        <SelectedPRoject
            project={selectedProject}
            onDelete={handleDeleteProject}
            onAddTask={handleAddTaks}
            onDeleteTask={handleDeleteTask}
            tasks={projectState.tasks}
        />
    );

    if (projectState.selectedProjectId === null) {
        content = (
            <NewProject onAdd={handleAddProject} onCancel={handleCancel} />
        );
    } else if (projectState.selectedProjectId === undefined) {
        content = (
            <NoProjectSelected onStartAddProject={handleStartAddProject} />
        );
    }

    return (
        <main className="h-screen flex gap-8 ">
            <SideBar
                onStartAddProject={handleStartAddProject}
                projects={projectState.projects}
                onSelectProject={handleSelectProject}
                selectedProjectId={projectState.selectedProjectId}
            />
            {content}
        </main>
    );
}

export default App;
