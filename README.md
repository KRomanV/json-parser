# 🚀 Json-parser

## 📖 Описание
Json-parser — это веб-приложение для просмотра задач в виде дерева с фильтрации по веткам и бесконечной прокрутки (infinite scroll).

## 🛠️ Технологии
- **React** (с TypeScript)
- **@patternfly/react-core** (для TreeView)
- **Axios** (для работы с API)
- **InfiniteScroll** (для плавной подгрузки данных)

## 🔧 Установка и запуск локально

1. **Клонируйте репозиторий:**
   ```sh
   git clone https://github.com/your-username/task-tree-viewer.git
   cd json-parser
   ```

2. **Установите зависимости:**
   ```sh
   npm install
   ```

3. **Запустите приложение:**
   ```sh
   npm start
   ```
   Приложение будет доступно по адресу `http://localhost:3000`

## 🔗 API
Используется API `https://rdb.altlinux.org/api/site/tasks_history` для получения списка задач и веток.


## 📝 TODO
- [ ] Доработка поиска


