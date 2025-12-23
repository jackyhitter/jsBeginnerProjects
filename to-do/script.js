// alert("hii there!");

document.addEventListener('DOMContentLoaded', ()=>{
    //load css file dynamically
    document.getElementById("loadStyle").addEventListener("click", () => {
        const existingStyle = document.querySelector('#dynamic-style')
        if(!existingStyle)
        {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "styles.css";
            link.id = 'dynamic-style';
            document.head.appendChild(link);
            console.log("Style loaded");
            console.log(link);
        }
        else{
            existingStyle.remove();
            setTimeout(() => {
                alert('Style removed successfully');
            }, 100);
        }
    });

    const todoInput = document.getElementById("todo-input");
    const addButton = document.getElementById('add-task-btn');
    const todoList = document.getElementById('todo-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        
    //render the existing tasks
    tasks.forEach(element => {rendertasks(element);});

    function savetasks(){
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    addButton.addEventListener('click', ()=>{
        const taskText = todoInput.value.trim();
        if(taskText ==="") return;

        const newtask = {
            id : Date.now(),
            text : taskText,
            completed : false
        };
        tasks.push(newtask);
        savetasks();
        rendertasks(newtask);
        todoInput.value = "";
        console.log(tasks);
    });

    function rendertasks(task){
        const li = document.createElement('li');
        li.id = task.id;
        if(task.completed) li.classList.add('completed');
        li.innerHTML = `
        <span>${task.text}</span>
        <button>delete</button>
        `;
        li.addEventListener('click', (e)=>{
            if(e.target.tagName == "BUTTON") return;
            task.completed = !task.completed;
            li.classList.toggle('completed');
            savetasks();
            console.log(e);
        })
        li.querySelector('button').addEventListener('click', (e)=>{
            e.stopPropagation();
            tasks = tasks.filter((t)=> t.id !== task.id);
            li.remove();
            savetasks();
        })
        todoList.appendChild(li);
    }
})


