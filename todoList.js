let todos = [];
todos = JSON.parse(localStorage.getItem('task')) || [];
const input = document.querySelector('#input');
const ul = document.querySelector('#ul');
const button = document.querySelector('#btn');
todos.forEach(function(task){
 const li = document.createElement('li');
 li.addEventListener('click', function(){
    li.classList.toggle('completed');
     const ftodo = todos.find(t => t.text === task.text);
     if(ftodo){
        ftodo.completed = !ftodo.completed;
        localStorage.setItem('task', JSON.stringify(todos))
       }    
    });
    const delbtn = document.createElement('button');
    delbtn.textContent = '🗑';
    delbtn.style.border = 'none';
    delbtn.style.background = 'transparent';
    delbtn.addEventListener('click', function(event){
        event.stopPropagation();
       todos = todos.filter(t => t.text !== task.text);
        localStorage.setItem('task', JSON.stringify(todos));
        li.remove();
    });
    if(task.completed == true){
        li.classList.add('completed');
    }
    li.textContent = task.text;
    li.appendChild(delbtn);
    ul.appendChild(li);
});
button.addEventListener('click', function(){
   if(input.value.trim() == '' || !input.value){
    alert('write something!');
    return;
   }
    const ctasks = input.value.trim();
    const li = document.createElement('li');
    li.addEventListener('click', function(){
        li.classList.toggle('completed');
        const ftodo = todos.find(t => t.text === ctasks);
        if(ftodo){
        ftodo.completed = !ftodo.completed;
        localStorage.setItem('task', JSON.stringify(todos))
       }
    });
    const delbtn = document.createElement('button');
    delbtn.textContent = '🗑';
    delbtn.addEventListener('click', function(event){
        event.stopPropagation();
        li.remove();
        todos = todos.filter(t => t.text !== ctasks);
        localStorage.setItem('task', JSON.stringify(todos));
    });
    li.textContent = ctasks;
    todos.push({text: ctasks, completed: false});
    localStorage.setItem('task',JSON.stringify(todos));
    ul.appendChild(li);
    li.appendChild(delbtn);
    input.value = '';
});
input.addEventListener('keydown', function(event){
    if(event.key === 'Enter'){
        button.click();
    }
});
