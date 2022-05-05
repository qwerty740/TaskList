// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  document.addEventListener('DOMContentLoaded' ,getTasks);  // firesup when DOM is loaded
  // Add task event
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', deleteTask);
  clearBtn.addEventListener('click', clearTask);
  filter.addEventListener('keyup',filterTask);
}
// get task from localstorage
  function getTasks(){
    let tasks;   
  if(localStorage.getItem('tasks') === null){ 
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));  // else set already stored items in tasks key to the tasks variable
  }

  tasks.forEach(function(task) {

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(task));
  
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);
  
  taskList.appendChild(li);


  });



  }
// Add TaskTask
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
  }

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));
  
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);
  
  taskList.appendChild(li);

  // store on local storage

  storeInLocalStorage(taskInput.value);


  taskInput.value = "";

  

  e.preventDefault();
}

//store task
function storeInLocalStorage(newTask){
  let tasks;   
  if(localStorage.getItem('tasks') === null){  //see if tasks key is already in local storage or not
    tasks = [];   // if not first declare tasks as empty array 
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));  // else set already stored items in tasks key to the tasks variable
  }

   tasks.push(newTask);  // then puch a newTask to tasks

   localStorage.setItem('tasks' , JSON.stringify(tasks));  
   // then setItem to 'tasks' key the whole new update tasks variable containg all lists after converting array object to string as localstorage accept string as all values are stored as a complete one string for that key
  //then to get values as object we use JSON.parse(....) and stringify to add as a string

}


// delete a task;

function deleteTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    e.target.parentElement.parentElement.remove();

   // remove from LS
   removeTaskFromLS(e.target.parentElement.parentElement);
   
    


    
  }


  e.preventDefault;

}

function removeTaskFromLS(taskItem){
  
  let tasks;   
  if(localStorage.getItem('tasks') === null){  
      tasks = [];    
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));  // else set already stored items in tasks key to the tasks variable
  }

  tasks.forEach(function(task , index){
    if(taskItem.textContent === task){
      tasks.splice(index,1);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
  });


}

//clear All task
function clearTask(e){
  if(confirm('Are you sure?')) {
    taskList.innerHTML ='';
    
    localStorage.clear();
  }

  e.preventDefault();
}

//filter tasks
function filterTask(e) {
 const text = e.target.value.toLowerCase();
 document.querySelectorAll('.collection-item').forEach(
   function (task){
     const item = task.firstChild.textContent.toLowerCase();
     if(item.indexOf(text) !=-1){
       task.style.display = 'block';
     } else{
       task.style.display = 'none';
     }
   });

}