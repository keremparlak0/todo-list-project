//Selecting all elements 
const form = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector(".list-group")//<ul>
const firstCardBody = document.querySelectorAll(".card-body")[0]
const secondCardBody = document.querySelectorAll(".card-body")[1]
const filter = document.querySelector("#filter")
const clearButton = document.querySelector("#clear-todos")


eventListener()

//↓↓↓↓↓↓↓↓ All event listeners ↓↓↓↓↓↓↓↓
function eventListener() {
    form.addEventListener("submit", addTodo)
    document.addEventListener("DOMContentLoaded", loadAllTodosUI())
    secondCardBody.addEventListener("click", deleteTodo)
    filter.addEventListener("keyup", filterTodos)
    clearButton.addEventListener("click", clearAllTodos)
}
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑


function clearAllTodos(e) {
    if (confirm("Tüm todoları silmek istediğinize emin misiniz?")) {
        //arayüzden temizleme ('todoList.innerHTML = ""' de yapılabilir ama yavaş kalıyor)

        while (todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstElementChild)
        }

        //local storage'dan silme
        localStorage.removeItem("todos")//direkt key tarafını siler(kökten çözüm)
    }





    let todos = getTodosFromStorage()

}

function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase()/*search kısmında aramanın 
                                                    büyük küçük harf duyarlılığını kadlırmak için bu kısmı yazdık*/
    const listItems = document.querySelectorAll(".list-group-item")

    listItems.forEach(function (listItem) {
        const text = listItem.textContent.toLowerCase()//↑ ile aynı mantık burada da var
        if (text.indexOf(filterValue) === -1) {//bulamadıysa list item'ları sıfırlarız
            //dinamik css attribute ekle
            listItem.setAttribute("style", "display : none !important") //elementin sayfada var olduğunu biliyoruz ama göstermiyoruz         
        } else {                                                          // !important ile yazdığımız css kodunun bootstrap ile girilen css özelliklerinin önüne geçebiliriz
            listItem.setAttribute("style", "display : block")// Bulunan değerler harici silinir
        }
    })
}

function deleteTodo(e) {
    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove()
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)
        showAlert("success", "Todo başarıyla silindi!")
    }

}

function deleteTodoFromStorage(deleteTodo) {
    let todos = getTodosFromStorage()

    todos.forEach(function (todo, index) {
        if (todo === deleteTodo) {
            todos.splice(index, 1) //o indexten itibaren bir obje sileceğiz
        }
    })

    localStorage.setItem("todos", JSON.stringify(todos))
}

function loadAllTodosUI() { //storage'daki todoların, sayfa yenilenince, kaybolmamasını sağlar. Yani todoları geri yükler
    let todos = getTodosFromStorage()

    todos.forEach((todo) => {
        addTodoToUI(todo)
    });
}

function addTodo(e) {
    //trim fonksiyonu, girdinin başında veya sonunda boşluk varsa siler
    const newTodo = todoInput.value.trim();

    if (newTodo === "") { //todo boşsa
        showAlert("warning", "Lütfen bir todo giriniz!") // showAlert(type, message) 
    }
    else {
        if (compareTodo(newTodo)) {
            showAlert("warning", "Bu todo daha önce girildi")
        } else {
            addTodoToUI(newTodo)
            addTodoToStorage(newTodo)
            showAlert("success", "Todo başarıyla oluşturuldu!")
            console.log()

        }

    }

    //varsayılan özellikleri engeller
    e.preventDefault()
}

function compareTodo(newTodo) {
    const listItems = document.querySelectorAll(".list-group-item")
    let caseCount = 0

    listItems.forEach(function (listItem) {
        const text = listItem.textContent.toLowerCase()
        if (newTodo.toLowerCase() === text) {
            // console.log(text)
            caseCount++
        }

    })
    return caseCount
}


function getTodosFromStorage() { // Storage'dan tüm todoları almak
    let todos

    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    return todos
}

//Todo'ları localstorage'a ekleyen fonksiyon
function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage()

    todos.push(newTodo)

    localStorage.setItem("todos", JSON.stringify(todos))

}

function showAlert(type, message) {
    const alert = document.createElement("div")

    alert.className = `alert alert-${type}`
    alert.textContent = message

    firstCardBody.appendChild(alert)

    //settimeout milisecond 
    setTimeout(function name() {
        alert.remove()
    }, 2000)
}

//Aldığı string değeri arayüze ekleyen fonksiyon
//Dinamik element üretme
function addTodoToUI(newTodo) {
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
    //deneme
}