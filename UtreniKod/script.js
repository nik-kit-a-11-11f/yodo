// Текущий код - нужно улучшить!
const addItemButton = document.querySelector('.add-item-button');
const addItemInput = document.querySelector('.add-item-input');
const orderList = document.querySelector('.order-list');

// Функция для добавления товара в заказ
function addItemToOrder() {
    const itemName = addItemInput.value.trim();
    
    if (itemName === '') {
        alert('Пожалуйста, введите название товара');
        return;
    }
    
    const listItem = document.createElement('li');
    listItem.className = 'order-item';
    listItem.textContent = itemName;
    orderList.appendChild(listItem);
    
    // Очищаем поле ввода
    addItemInput.value = '';
    
    // Возвращаем фокус на поле ввода для быстрого ввода следующего товара
    addItemInput.focus();
}

// Текущий обработчик - работает только по клику на кнопку
addItemButton.addEventListener('click', addItemToOrder);

// TODO: Перенести обработчик на событие submit формы
// 1. Найти форму по классу .add-item-form
// 2. Добавить обработчик события 'submit'
// 3. В обработчике предотвратить стандартное поведение формы
// 4. Вызывать функцию addItemToOrder()
// 5. Убедиться, что добавление работает по нажатию Enter

// TODO: Убедиться, что поле ввода очищается после добавления товара
