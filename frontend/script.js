document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    async function loadTasks() {
        try {
            const res = await fetch("http://localhost:5000/tasks");
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const tasks = await res.json();
            taskList.innerHTML = tasks.map(t => `<li>${t}</li>`).join("");
        } catch (error) {
            console.error("Failed to load tasks:", error);
            alert("Could not load tasks. Please make sure the server is running on port 5000.");
        }
    }

    async function addTask() {
        const task = taskInput.value;
        if (!task) {
            alert("Please enter a task");
            return;
        }
        try {
            const res = await fetch("http://localhost:5000/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ task })
            });
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            taskInput.value = "";
            loadTasks();
        } catch (error) {
            console.error("Failed to add task:", error);
            alert("Failed to add task. Please try again.");
        }
    }

    addTaskBtn.addEventListener('click', addTask);

    loadTasks();
});