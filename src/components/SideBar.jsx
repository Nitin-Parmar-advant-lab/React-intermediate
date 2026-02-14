import Button from "./Button";

export default function SideBar({
    onStartAddProject,
    projects,
    onSelectProject,
    selectedProjectId
}) {
    return (
        <aside className="w-1/3 px-8 py-16 bg-black text-white md:w-72 p-8">
            <h2 className="md:text-xl font-bold mb-8">YOUR PROJECTS</h2>
            <div>
                <Button onClick={onStartAddProject}>+ Add Project</Button>
            </div>
            <ul className="mt-4">
                {projects.map((project) => {
                    let cssCLass= "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800 font-semibold"
                    if(project.id === selectedProjectId) {
                        cssCLass += " bg-stone-800 tet-stone-200"
                    } else {
                        cssCLass += " text-stone-400"
                    }

                    return (
                        <li key={project.id}>
                            <button
                                onClick={() => onSelectProject(project.id)}
                                className={cssCLass}
                            >
                                {project.title}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}
