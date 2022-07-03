(function() {

  // Создаем пустой массив.
  let todoArray = [];

  //создаем и вовзращаем заголовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  //создаем и возвращаем форму для создания дела
  function createTodoItemForm() {
    let form = document.createElement('form'); // <form>
    let input = document.createElement('input'); // <input>
    let buttonWrapper = document.createElement('div'); // <div>
    let button = document.createElement('button'); // <button>

    form.classList.add('input-group', 'mb-3'); // <form class="input-group mb-3">
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.disabled = !input.value.length; // Устанавливать кнопке "Добавить дело" атрибут disabled, когда input пуст.
    // Вешаем слушателя на input, при появлении хоть одного символа в поле убираем атрибут disabled у кнопки
    input.addEventListener('input', () => {
      button.disabled = !input.value.length;
    });
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';

    buttonWrapper.append(button);
    // <div>
    //   <button></button>
    // </div>
    form.append(input);
    //<form>
    //  <input></input>
    //</form>
    form.append(buttonWrapper);
    //<form>
    //  <div>
    //    <button></button>
    //  </div>
    //</form>

    return {
      form,
      input,
      button,
    };
  }

  //создаем о возвращаем список элементов
  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  function createTodoItem(name) {
    let item = document.createElement('li');
    //кнопки помещаем в элемент, который красиво покажет их в одной группе
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    let randomIdItem = Math.round(Math.random() * 250);
    item.id = randomIdItem; // Присваеваем ID нашему элементу списка <li>

    //устанавливаем стили для элемента списка, а так же для размещения кнопок в его правой части с помсощью flex
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    //вкладываем кнопки в отдельный элемент, что бы они объединились в один блок
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    //приложению нужен доступ к самому элементу и кнопкам, что бы обабатывать собатия нажатия
    return {
      item,
      doneButton,
      deleteButton,
      buttonGroup,
    };
  }

  function changeItemDone(arr, item) {
    arr.map(obj => { // Пробегаемся по массиву
        if (obj.id === item.id & obj.done === false) { // Если наш объект с присвоенным ID равен <li id="obj.id"> и если у объекта значение done равно false
            obj.done = true; // тогда выполнить код: присовить значению done = true
        } else if (obj.id === item.id & obj.done === true) { // Если наш объект с присвоенным ID равен <li id="obj.id"> и если у объекта значение done равно true
            obj.done = false; // тогда выполнить код: присовить значению done = false
        }
    });
  }

  // Вешаем слушателя события по клику на кнопку doneButton(готово)
  function completeTodoItem(item, btn) { // Создаем два аргумента. item - наша li-ка и кнопка btn.
      btn.addEventListener('click', () => { // на кнопку вешаем событие click
          todoArray = JSON.parse(localStorage.getItem(key)); // получаем в пустой массив todoArray с парсингом в формате JSON строки, которые получаем из локального хранилища с ключём key
          item.classList.toggle('list-group-item-success'); // Если мы произвели клик на кнопку(готово) добавляем класс <li> и вся строчка окрашивается в зеленый.
          changeItemDone(todoArray, item); // Это необходимо для того, чтобы значения done менялись у наших <li>.

          localStorage.setItem(key, JSON.stringify(todoArray)); // Записываем в локальное хранилище ключ(key) и его значение(value) - наш массив todoArray с преобразованием в строки
      });
  }

  // Вешаем слушателя события по клику на кнопку deleteButton(удалить)
  function deleteTodoItem(item, btn) { // Создаем два аргумента. item - наша li-ка и кнопка btn.
      btn.addEventListener('click', () => { // на кнопку вешаем событие click
          if (confirm('Вы уверены?')) { // Проводим проверку, когда пользователь хочет удалить элемент из списка. По дефолту confirm имеет true/false
              todoArray = JSON.parse(localStorage.getItem(key)); // получаем в пустой массив todoArray с парсингом в формате JSON строки, которые получаем из локального хранилища с ключём key

              let newList = todoArray.filter(obj => obj.id !== item.id); // Создаем новую переменную в которой наш массив фильтруется и записывается в новую переменную newlist.
              // obj - коллбэк если элемент массива вернет true, тогда он останется в массиве, если же он вернет false, то удалится из массива
              // obj.id - присвоенный ID в локальном хранилище строго не равен <li id="obj.id">
              localStorage.setItem(key, JSON.stringify(newList)); // записываем в ключ(key) новую переменную в которой записываем отфильтрованныые элементы списка. (удалим элемент из хранилища)
              item.remove();
          }
      });
  }

  function createTodoApp(container, title = 'Список дел', key) {

    let todoAppTitle = createAppTitle(title); // Инициализуем в наше приложение Заголовок(Мои дела, Дела мамы, Дела папы).
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    container.append(todoAppTitle); // Добавляем в container заголовок.
    container.append( todoItemForm.form);
    container.append(todoList);

    if (localStorage.getItem(key)) { // Если в хранилище есть ключи, забираем их.
      todoArray = JSON.parse(localStorage.getItem(key));

      for (let obj of todoArray) { // Проходим по массиву todoArray
          let todoItem = createTodoItem(todoItemForm.input.value); // Создаем элементы списка item, buttonGroup.

          todoItem.item.textContent = obj.name; // Из хранилища берем и добавляем в наш item элемент.
          todoItem.item.id = obj.id; // Так же из хранилища берем ID элемента и отдаем его <li>.

          if (obj.done == true) {  // Тут проводим проверку на true/false из нашего хранилища. Если элемент из хранилища будет равен true - закрашиваем <li> в зеленый цвет.
              todoItem.item.classList.add('list-group-item-success');
          } else {
              todoItem.item.classList.remove('list-group-item-success'); // Иначе удаляем класс готовности.
          }

          completeTodoItem(todoItem.item, todoItem.doneButton); // Инициализируем наши элементы списка, а именно <li> кнопку готово.
          deleteTodoItem(todoItem.item, todoItem.deleteButton); // Инициализируем наши элементы списка, а именно <li> кнопку удалить.

          todoList.append(todoItem.item); // К нашему списку добавляем item(<li>)
          todoItem.item.append(todoItem.buttonGroup); // К нашему списку добавляем кнопки (готово, удалить)
      }
    }

    //браузер создает событие submit на форме по нажатию на enter или на кнопку создания дела
    todoItemForm.form.addEventListener('submit', function(e) {

      //эта строчка необходима, чтобы предотвратить стандартное действие браузера. В данном случае мы не хотим, что бы страница перегружалась при отправке формы
      e.preventDefault();

      //игнорируем создание элемента, если пользователь ничего не ввел в поле
      if (!todoItemForm.input.value) {
        return;
      }

      let todoItem = createTodoItem(todoItemForm.input.value);

      completeTodoItem(todoItem.item, todoItem.doneButton); // Инициализируем наши элементы списка, а именно <li> кнопку готово.
       deleteTodoItem(todoItem.item, todoItem.deleteButton); // Инициализируем наши элементы списка, а именно <li> кнопку удалить.

       let localStorageData = localStorage.getItem(key); // В новую переменную получаем ключи из key

        if (localStorageData == null) { // если в новой переменной ничего нет, то данные берем из нашего масива todoArray
            todoArray = [];
        } else { // Иначе берем данные из localStorageData
            todoArray = JSON.parse(localStorageData);
        }

        // Создаем наше хранилище itemObj в котором будет = name, id, done
        let createItemObj = (arr) => {
          let itemObj = {}; // пустой объект в который будем записывать
          itemObj.name = todoItemForm.input.value; // Где name будет равен item
          itemObj.id = todoItem.item.id; // где ID будет равен item.id
          itemObj.done = false; // создаем дефолтное значени false для каждого нового элемента

          arr.push(itemObj); // пушим в arr наши данные
      }
      createItemObj(todoArray); //Инициалузируем выше наше хранилище.
      localStorage.setItem(key, JSON.stringify(todoArray));

      todoList.append(todoItem.item); // добавляем в список элементы.
      todoItemForm.input.value = ''; // Когда добавим дело в список - обнулить input
  });

      //добавляем обработчики на кнопки
      todoItem.doneButton.addEventListener('click', function() {
        todoItem.item.classList.toggle('list-group-item-success');
      });

      todoItem.deleteButton.addEventListener('click', function() {
        if (confirm('Вы уверены?')) {
          todoItem.item.remove();
        }
      });
  }

  window.createTodoApp = createTodoApp;
})();
