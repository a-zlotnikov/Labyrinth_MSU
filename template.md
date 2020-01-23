## Front

#Структура:
1. Public - не изменялся
2. Src
    1. App.js - корневой див завернут в hoc объект для дальнейшей верстки
    2. Index.js - содержит модули для redux
    3. Layout - содержит компонент hoc
    4. Сomponents - кнопки, инпуты и т.д.
    5. Containers - формы
3. Store - содержит небольшой пример redux для большого проекта

#Какие модули установлены:
"node-sass"
"react"
"react-dom"
"react-redux"
"react-router-dom"
"react-scripts"
"redux"
"redux-thunk"

dev:
    "eslint"
    "eslint-config-airbnb"
    "eslint-plugin-import"
    "eslint-plugin-jsx-a11y"
    "eslint-plugin-react"
    "eslint-plugin-react-hooks"

## Back

#Структура:
1. Middleware
    1. Auth.js - отвечает за очистку сессии и куки, а также за проверку пользователя
    2. Db-connect.js - подключение к базе данных
    3. error-handlers - обработка ошибок
    4. Index.js - подключаемые модули
2. Public - не изменялся
3. Routes - не изменялся
4. App.js - роуты (глобальные)
5. Server.js - запуск сервера

#Какие модули установлены:
"bcryptjs"
"cookie-parser"
"debug"
"express"
"express-session"
"mongoose":
"morgan"
"session-file-store"

dev:
    "eslint",
    "eslint-config-airbnb"
    "eslint-plugin-import"
    "eslint-plugin-jsx-a11y"
    "eslint-plugin-react"
    "eslint-plugin-react-hooks"
    "nodemon"

## Eslint
Прошу всех установить Eslint и мучиться, от этого будет зависеть качество нашего кода
Гайд по установке:

В папке с проектом устанавливаем сам Eslint:
npm install eslint --save-dev
# or
yarn add eslint --dev

Также в папке проекта устанавливаем конфигурации Eslint’a:
npx eslint --init

В визарде отвечаем на вопросы:

1. To check syntax, find problems, and enforce code style
2. JavaScript
3. React
4. N
5. Если это фронт выбираем Browser, если это бэк выбираем Node
6. Use a popular style guide
7. Airbnb
8. JavaScript
9. Y

### PS что бы проще жилось
В настройках WebStorm:
Editor -> Code Style -> JavaScript -> Set from… -> Google JavaScript Style Guide
