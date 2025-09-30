async function loadTasks(){
    const res= await fetch("http://localhost:3000/tasks");
    const tasks= await res.json();
    document.getElementById("taskList").innerHTML=tasks.map(t => `<li>${t}</li>`).join("");
}

async function addTask(){
    const task =document.getElementById("taskInput").value;
    if(!task) return alert("Please enter a task");
    await fetch("http://localhost:3000/tasks",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({task})
    });
    document.getElementById("taskInput").value="";
    loadTasks();
}

loadTasks();
