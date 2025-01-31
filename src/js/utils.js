// Description: Файл для хранения утилитарных функций.
// Dependencies: нет зависимостей

// function getRandomInt(min, max) - функция для получения случайного числа в диапазоне от min до max
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    return Math.floor(Math.random() * (Math.floor(max) - min) + min); // Максимум не включается, минимум включается
};

export { getRandomInt };