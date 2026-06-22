let todos = JSON.parse(localStorage.getItem('task')) || []; 

const input = document.querySelector('#input'); 
const ul = document.querySelector('#ul'); 
const button = document.querySelector('#btn'); 

function saveToLocalStorage() {
    localStorage.setItem('task', JSON.stringify(todos));
}

function renderTask(task) { 
    const li = document.createElement('li'); 
    li.textContent = task.text; 
    
    if(task.completed) { 
        li.classList.add('completed'); 
    } 
    
    li.addEventListener('click', function() { 
        li.classList.toggle('completed'); 
        task.completed = !task.completed; 
        saveToLocalStorage();
    }); 
    
    const delBtn = document.createElement('button'); 
    delBtn.textContent = '🗑'; 
    delBtn.style.border = 'none'; 
    delBtn.style.background = 'transparent'; 
    
    delBtn.addEventListener('click', function(event) { 
        event.stopPropagation(); 
        todos = todos.filter(t => t.text !== task.text); 
        saveToLocalStorage(); 
        li.remove(); 
    }); 
    
    li.append(delBtn); 
    ul.append(li); 
} 

todos.forEach(function(task) { 
    renderTask(task); 
}); 

button.addEventListener('click', function(){ 
    const ctasks = input.value.trim();
    
    if(ctasks === ''){ 
        alert('write something!'); 
        return; 
    } 
    
    const newTask = { text: ctasks, completed: false };
    
    todos.push(newTask); 
    saveToLocalStorage(); 
    
    renderTask(newTask); 
    
    input.value = ''; 
}); 

input.addEventListener('keydown', function(event){ 
    if(event.key === 'Enter'){ 
        button.click(); 
    } 
});

