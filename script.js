"strict mode"


//declaring the required variables::
const addTaskInput = document.getElementById('Add-task-input');
const addTaskBtn = document.getElementById('Add-task-btn');
const listSection = document.querySelector('.list-section');

let taskArr = [];
let userData;

window.onload = showTask();

addTaskInput.oninput = () => {
    let userData = addTaskInput.value; //accessing userdata
    if (userData.trim() != 0){
        addTaskBtn.classList.add('active');
    }else{
        addTaskBtn.classList.remove('active');
    }
}

//When user clicks on the add button::

addTaskBtn.addEventListener('click', function(){
    let userData = addTaskInput.value;
    let getlocalStorage = localStorage.getItem("New Task"); //getting the task entered by the user
    if (getlocalStorage == null){
        taskArr = []; //creating ampty array
    }else{
        taskArr = JSON.parse(getlocalStorage);
    }
    taskArr.push(userData);
    localStorage.setItem("New Task", JSON.stringify(taskArr)); //transforming js object into JSON string format
    showTask();
    addTaskBtn.classList.remove('active');

})

//creating a function to show the tasks::

function showTask(){
    let userData = addTaskInput.value;
    let getlocalStorage = localStorage.getItem("New Task");
    if (getlocalStorage == null){
        taskArr = [];
    }else{
        taskArr = JSON.parse(getlocalStorage);
    }

    // IF there are no tasks remaining in the section
    if (taskArr.length == 0){
        listSection.innerText = "You do not have any Pending Tasks!";  
        listSection.classList.add('NewHead');
    }else{
        listSection.classList.remove('NewHead');
    }

    let newListRow = '';
    taskArr.forEach((element, index) => {
        newListRow +=
         `<div class="list">
            <input class="todo-task" id="theTask" value = "${element}" readonly/>
            <div class="task-features">
                <i class="material-symbols-outlined editing" id="edit" onclick = "editTask(${index})">edit</i>
                <i class="material-symbols-outlined" id="tick" onclick = "checkedTask(${index})">check_box</i>
                <i class="material-symbols-outlined" id="delete" onclick = "deleteTask(${index})";>delete</i>
            </div>
        </div>`;
        listSection.innerHTML = newListRow;
        addTaskInput.value = "";
     
    });

}


function editTask(index) {
    let getlocalStorage = localStorage.getItem("New Task");
    taskArr = JSON.parse(getlocalStorage);
    const classListCont = document.querySelectorAll(".list");
    if (classListCont[index].lastElementChild.firstElementChild.innerText == "edit"){
        classListCont[index].firstElementChild.removeAttribute("readonly", "readonly");
        classListCont[index].firstElementChild.classList.add('focus');
        classListCont[index].firstElementChild.focus();
        classListCont[index].lastElementChild.firstElementChild.innerHTML = "save";
    }else{
        classListCont[index].firstElementChild.setAttribute("readonly", "readonly");
        classListCont[index].firstElementChild.classList.remove('focus');
        classListCont[index].lastElementChild.firstElementChild.innerHTML = "edit";
    }
    taskArr[index] = classListCont[index].firstElementChild.value;
    localStorage.setItem("New Task", JSON.stringify(taskArr)); //transforming js object into JSON string format

}

let flag = false;
function checkedTask(index){

    const classListCont = document.querySelectorAll('.list');
    if (flag == false){
        classListCont[index].firstElementChild.classList.add('decorate');
        flag = true;
    }else{
        classListCont[index].firstElementChild.classList.remove('decorate');
        flag = false;
    }

}


function deleteTask(index){

    let getlocalStorage = localStorage.getItem("New Task");
    taskArr = JSON.parse(getlocalStorage);
    taskArr.splice(index, 1);
    localStorage.setItem("New Task", JSON.stringify(taskArr)); //transforming js object into JSON string format
    showTask(); 
}




