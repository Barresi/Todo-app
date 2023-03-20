// Запись DOM обьектов в переменные

const inputTask = document.querySelector('.Todos__input');
const inputBtn = document.querySelector('.Todos__button');
const tasksList = document.querySelector('.Todos__tasks');
const deleteBtn = document.querySelector('.task__btn-delete');
const counterItemsLeft = document.querySelector('#counter');

let localStorageArray = [];      // массив для local storage
let counter = 0;                 // счетчик для item left

// Проверка на наличие данных в local storage

function checkLocalStorage() {
      if (localStorage.getItem('localStorageArray')) {
            localStorageArray = JSON.parse(localStorage.getItem('localStorageArray'))
            localStorageArray.forEach((item, index, array) => {
                  let comleteStatus;
                  if (item.comleted) {
                        comleteStatus = 'complete';
                        counter--;
                  }
                  let newElement = `
                  <li class="Todos__task task ${comleteStatus}" id="${item.id}">
                        <a class="task__btn-complete" data-action="done"><img src="images/checkmark.svg" alt=""></a>
                        <div class="task__text">${item.text}</div>
                        <a class="task__btn-delete" data-action="delete"><img src="images/close-btn.svg" alt=""></a>
                  </li> 
                  `;
                  tasksList.insertAdjacentHTML('afterbegin', newElement);
      
                  counterItemsLeft.textContent = ++counter;
            });
      }
}

checkLocalStorage()

// Добавление задачи, запись в массив для ls, увеличение счетчика на 1

function addTask() {
      if (inputTask.value) {

            // Добавляем задачу

            let id = Date.now();
            let inputValue = inputTask.value;
            let newElement = `
            <li class="Todos__task task" id="${id}">
                  <a class="task__btn-complete" data-action="done"><img src="images/checkmark.svg" alt=""></a>
                  <div class="task__text">${inputValue}</div>
                  <a class="task__btn-delete" data-action="delete"><img src="images/close-btn.svg" alt=""></a>
            </li> 
            `;
            tasksList.insertAdjacentHTML('afterbegin', newElement);

            inputTask.value = '';

            // + 1 к счетчику


            counterItemsLeft.textContent = ++counter;

            // Запись в массив

            localStorageArray.push({
                  text: inputValue,
                  id: id,
                  comleted: false,
            });

            // Cохранение в Local Storage

            localStorage.setItem('localStorageArray', JSON.stringify(localStorageArray));
      }
}

// Слушатель событий удаления и выполнения задач

tasksList.addEventListener('click', function(e) {
 
      deleteTask(e);

      doneTask(e);

})

// Ввод данных при нажатии Enter

document.addEventListener('keyup', function (event) {
      if (event.code === 'Enter') {
            addTask();
      }
})

// Удаление задачи

function deleteTask (e) {
      if (e.target.dataset.action === 'delete') {
            (e.target).closest('.task').remove();
            localStorageArray.splice((localStorageArray.findIndex(item => item.id == (e.target).closest('.task').id)), 1);

            if (!((e.target).closest('.task').classList.contains('complete'))) {
                  counterItemsLeft.textContent = --counter;
            }
      };
      localStorage.setItem('localStorageArray', JSON.stringify(localStorageArray));
}

// Отметка задачи

function doneTask(e) {
      if (e.target.dataset.action === 'done') {
            if (((e.target).closest('.task')).classList.contains('complete')) {
                  ((e.target).closest('.task')).classList.remove('complete');
                  localStorageArray.forEach(item => {
                        if (item.id == ((e.target).closest('.task')).id) {
                              item.comleted = false;
                        }
                  });
                  counterItemsLeft.textContent = ++counter;
            } else {
                  ((e.target).closest('.task')).classList.add('complete');
                  localStorageArray.forEach(item => {
                        if (item.id == ((e.target).closest('.task')).id) {
                              item.comleted = true;
                        }
                  });
                  counterItemsLeft.textContent = --counter;
            }
      };
      localStorage.setItem('localStorageArray', JSON.stringify(localStorageArray));
}

// Чистим отмеченные задачи

function clearCompleted () {
      for (let i = 0; i < localStorageArray.length; i++) {
            if (localStorageArray[i].comleted === true) {
                  let element = document.getElementById(localStorageArray[i].id);
                  element.remove();
                  localStorageArray.splice(i, 1);
                  i--;
            }
      }
      localStorage.setItem('localStorageArray', JSON.stringify(localStorageArray));
}