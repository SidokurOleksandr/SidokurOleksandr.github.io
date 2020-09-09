const doc=document;
const storage = window.localStorage;
const modal=doc.querySelector('.modal');
const login=doc.querySelector('.login');
const todo=doc.querySelector('.todo__tasks');
const modalCont=doc.querySelector('.modal__content');

const logForm=doc.forms.loginForm;
const addForm=doc.forms.addTask;

const email=logForm.elements.email;
const pass=logForm.elements.pass;
const addInput=addForm.elements.taskText;

const logErr=doc.querySelectorAll('.login__err');
const empty=doc.querySelector('.empty');

const taskEdit=doc.querySelectorAll('.task__edit');
const taskDone=doc.querySelectorAll('.task__btn_checked');
const taskDelete=doc.querySelectorAll('.task__delete');
let tasks=[];

function add(){
    if(addInput.value.trim().length===0) return showModal('empty');
    const task={
        id: tasks.length,
        date: Date.now(),
        text: addInput.value,
        completed: false,
        priority:1
    };
    addInput.value="";
    tasks.push(task);
    save();
    render();
}

function showModal(caller,id){
    const heading=doc.querySelector('.modal__heading');
    const negative=doc.getElementById('no');
    const positive=doc.getElementById('yes');
    const changeText=doc.getElementById('modal__main');
    modal.style.display = "block";
    switch (caller){
        case 'delete':
            heading.innerHTML='Delete item?';
            negative.value='NO';
            positive.value='YES';
            positive.style.display='inline-block';
            changeText.style.display='none';
            positive.onclick=()=>deleteTask(id);
            break;
        case 'edit':
            heading.innerHTML='Edit text';
            negative.value='CANCEL';
            positive.value='SAVE';
            positive.style.display='inline-block';
            changeText.style.display='block';

            changeText.oninput=()=>{changeText.value.trim().length>0 ? positive.disabled=false : positive.disabled=true;
                positive.onclick=()=>{
                    changeTask(id,changeText.value);
                    changeText.value='';
                };
            };

            break;
        case 'empty':
            heading.innerHTML='The task is empty!';
            negative.value='Ok';
            positive.style.display='none';
            changeText.style.display='none';
            break;
    }
    window.addEventListener('click',(event)=>event.target === modal || event.target === negative ||
    event.target === positive ? modal.style.display = "none" : modal.style.display);
}

function changeTask(id,newText){
    tasks[id].date=Date.now();
    tasks[id].text=newText;
    save();
    render();
}

function changePr(id,op){
    let pr=tasks[id].priority;
    op==='up' ? tasks[id].priority=pr+1 :
        tasks[id].priority=pr-1;
    save();
    render();
}
function done(id){
    tasks[id].completed = !tasks[id].completed;
    save();
    render();
}

function deleteTask(id){
    tasks.splice(id,1);
    save();
    render();
}

function render(preTasks=tasks){
    todo.innerHTML='';
    if(preTasks.length>0){
        empty.style.display='none';
        preTasks.forEach((task)=>{
            todo.appendChild(template(task));


            /*

            taskDelete[task.id].addEventListener('click',()=>{
                showModal('delete',task.id);
            });
            taskDone[task.id].addEventListener('click',()=>{
                showModal('done',task.id);
            });
            * */
        });


    }else{
        empty.style.display='block';
    }


}
function showDate(myDate){

    function addZero(timeNumber){
        if(timeNumber<10){
            return '0'+timeNumber;
        } else return timeNumber;
    }
    const date=new Date;
    date.setTime(myDate);
    const year=date.getFullYear();
    const month= addZero(date.getMonth()+1);
    const day= addZero(date.getDate());
    const hour= addZero(date.getHours());
    const minutes= addZero(date.getMinutes());

    return day+'.'+month+'.'+year+'<br>'+hour+":"+minutes;
}

function template(item){
    let task=doc.createElement('li');
    task.classList.add('task');
    task.setAttribute('id',item.id);
    const template=`<div class="task__date">${showDate(item.date)}</div>
                <div class="task__priority">${item.priority}</div>
                <div class="task__arrows">
                    <i  class="material-icons">keyboard_arrow_up</i>
                    <i  class="material-icons">keyboard_arrow_down</i>
                </div>
                <div class="task__text">${item.text}</div>
                <div class="task__operations">
                    <div class="task__btn task__btn_green task__edit"><i class="material-icons">edit</i></div>
                    <div class="task__btn task__btn_checked task__done"><i class="material-icons">done</i></div>
                    <div class="task__btn task__delete"><i class="material-icons">delete</i></div>
                </div>`;
    task.innerHTML+=template;
    if(task.completed) task.classList.add('task_done');

    return task;
}

function load(){
    const storedTasks = storage.getItem('tasks');
    tasks = storedTasks ? JSON.parse(storedTasks) : [];

}
function save(){
    const saveData = JSON.stringify(tasks);
    storage.setItem('tasks', saveData);
}


window.addEventListener('load', function () {

    logForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        if(email.value==='testuser@todo.com' && pass.value==='12345678'){
            login.hidden=true;
            modal.hidden=true;

        }else if(email.value!=='testuser@todo.com' && pass.value==='12345678'){
            logErr[0].hidden=false;
            logErr[1].hidden=true;
        }else if(email.value==='testuser@todo.com' && pass.value!=='12345678'){
            logErr[0].hidden=true;
            logErr[1].hidden=false;
        }else{
            logErr[0].hidden=false;
            logErr[1].hidden=false;
        }
    });

    addForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        add();
    });
console.log(taskEdit);
    /*
    prUp.onclick=()=>compFn('priority',false);
    prDown.onclick=()=>compFn('priority',true);
    dateUp.onclick=()=>compFn('date',false);
    dateDown.onclick=()=>compFn('date',true);
    search.onkeydown=(e)=>{if(e.keyCode===13) searchTask() };
    */
    load();
    render();
});
