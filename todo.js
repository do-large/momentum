const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';
let toDos = [];

function deleteToDo(evnet){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);

    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);

    });//하나하나의 요소를 필터로 걸러서 결과값이 ture인 애들만으로 새로운 배열을 만든다

    toDos = cleanToDos;

    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    //localstorage에 저장될때는 string으로 저장된다 그래서 바꿔서저장해줘야됨
    //JSON.stringify > 자바스크립트object를 string으로 바꿔줌
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText="❌";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length +1;

    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id= newId;

    toDoList.appendChild(li);
    const toDoObj = {
        text:text,
        id : newId
    }
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.innerText="";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos); // string을 object로 변경
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        })
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();