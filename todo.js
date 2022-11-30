//Selecting all elements 
const form = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector(".list-group")
const firstCardBody = document.querySelectorAll(".card-body")[0]
const secondCardBody = document.querySelectorAll(".card-body")[1]
const filter = document.querySelector("#filter")
const clearButton = document.querySelector("#clear-todos")

eventListener()

//All event listeners
function eventListener(){
    form.addEventListener("submit", addTodo)
}

function addTodo(e){
    //trim fonksiyonu, girdinin başında veya sonunda boşluk varsa siler
    const newTodo = todoInput.value.trim();
    addTodoUI(newTodo)



    console.log(newTodo)


    //varsayılan özellikleri engeller
    e.preventDefault()
}

//Aldığı string değeri arayüze ekleyen fonksiyon
//Dinamik element üretme
function addTodoUI(newTodo){
    //List item oluşturma
    const listItem = document.createElement("li")
    
    //Link oluşturma
    const link = document.createElement("a")
    link.href = "#"
    link.className = "delete-item"
    link.innerHTML = "<i class = 'fa fa-remove'></i>"

    listItem.className = "list-group-item d-flex justify-content-between"
    //Text node ekleme
    listItem.appendChild(document.createTextNode(newTodo))
    listItem.appendChild(link)

    // Todo List'e List Item'ı ekleme
    todoList.appendChild(listItem)

    //Todo eklendikten sonra textbox'ı boşaltır
    todoInput.value = ""

}