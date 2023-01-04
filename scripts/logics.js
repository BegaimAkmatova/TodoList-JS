let localData = JSON.parse(localStorage.getItem('todos'))
let data = localData ? [...localData] : []   // mini data base

const createTodoItem = ({ 
    id, 
    task, 
    deadline,
    done
}) => {
    let li = document.createElement("li");

    let deleteBtn = document.createElement("img");
    deleteBtn.id = `${id}`; // задаем уникальный айди
    deleteBtn.className = "deleteBtn"
    deleteBtn.src = "./images/image (1).png";
    deleteBtn.addEventListener("click", onDelete);

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", onDone);
    checkbox.checked = done
    checkbox.setAttribute('unId', id) // also setting unique id

    let txt = document.createTextNode(`${deadline} ${task}`);
    let label = document.createElement("label");
    label.className = done && 'taskDone';
    label.append(txt);

    li.append(label);
    li.append(checkbox);
    li.append(deleteBtn);
    list.append(li);
  };

  function renderTodos() {
    list.innerHTML = '';
    data.map((todoItem) => {
      createTodoItem(todoItem)
    })
  }

  let last_id = localData && localData.length && localData[localData.length -1].id + 1;
  let counter = localData ? last_id : 0;
  
  function onAdd() {
    let newTask = textIn.value;
    if (newTask !== "") {
      textIn.value = "";
      data.push({
        id: counter++,
        task: newTask,
        deadline: dateInput.value,
        done: false  // checkbox
      })

      localStorage.setItem('todos', JSON.stringify(data))
      renderTodos()
    } else {
      alert('For create a new todo type smth!')
    }
  }
  
  function onDelete(e) {
    //console.log(e.target.id) // String болуп келди аны Number ге айландырабыз
    let currentId = Number(e.target.id)
    let filteredArray = data.filter(el => el.id !== currentId)
    //console.log(filteredArray)
    data = filteredArray;
    localStorage.setItem('todos', JSON.stringify(data))
    renderTodos();
  }
  
  function onDone(e) {
    let currentId = Number(e.target.getAttribute('unId'))
    let modifiedArray = data.map(el => {
      if(el.id === currentId) {
        el.done = !el.done
      }
      return el
    })

    data = modifiedArray
    localStorage.setItem('todos', JSON.stringify(data))
    renderTodos()
  }

  // set a function
addBtn.addEventListener("click", onAdd);

textIn.addEventListener("keyup", (e) => {
  if(e.key === "Enter") {
    onAdd();
  }
})
renderTodos()

