# Документація застосунку "Weather Forecast UA"

## Огляд

Цей застосунок дозволяє користувачам переглядати прогноз погоди для обласних центрів України. Він автоматично визначає місцезнаходження користувача та відображає прогноз погоди для цього міста. Крім того, користувач може вручну шукати міста та додавати їх у перелік обраних міст для подальшого перегляду.

## Використані технології

- **React.js:** Фреймворк для реалізації користувацького інтерфейсу.
- **Chart.js:** Бібліотека для побудови графіків.
- **Fetch API:** Використовується для взаємодії з API OpenWeatherMap.

## Інструкція з використання

1. **Завантаження сторінки:**
   - При першому завантаженні сторінки застосунок автоматично визначає місцезнаходження користувача та відображає прогноз погоди для цього міста.
   - Якщо автоматичне визначення не вдалось, користувач може вручну шукати місто за допомогою поля з автодоповненням.

2. **Додавання блоків погоди:**
   - Користувач може додати до 5 блоків для відображення прогнозу погоди для різних міст.
   - Для цього необхідно натиснути кнопку "Додати" (+).

3. **Обрані міста:**
   - Максимальна кількість обраних міст - 5.
   - Користувач може додати місто до списку обраних, а також видалити його зі списку.
   - Інформація про обрані міста зберігається у локальному сховищі браузера.
   - В разі наявності міста в переліку обраних на головній сторінці, блок з погодою в цьому місті відображається з зеленим бордером та відсутня кнопка додавання до обраних міст.

4. **Перегляд прогнозу погоди:**
   - Кожен блок відображає прогноз погоди для конкретного міста на поточний день.
   - Користувач може перемикати перегляд між "День/Тиждень", щоб побачити прогноз на декілька днів.
   - Графік температури побудований на основі середньодобової температури.

5. **Додаткові функції:**
   - Можливість перемикання між "День/Ніч" для відображення погоди в різний час доби.
   - Можливість перемикання між українською та англійською мовами.
   - Прелоадери використовуються для відображення процесу завантаження даних з сервера OpenWeatherMap.

## API OpenWeatherMap

Для отримання прогнозу погоди використовується API від OpenWeatherMap.

- **Ендпоінти:**
  - `/weather`: Детальний прогноз погоди на поточний день для конкретного міста.
  - `/forecast5`: Прогноз погоди на 5 днів з інтервалом 3 години.
  
- **Обмеження:**
  - Ліміт запитів може бути обмежений на стороні OpenWeatherMap.
  - Для подальшого використання після досягнення ліміту необхідно зареєструватися, отримати новий ключ та змінити його у конфігураційному файлі.

  -**Link:**
  https://polinasukhorukova.github.io/weather/