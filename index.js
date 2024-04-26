const express = require('express');
const cors = require('cors');
const path = require('path');
const router = require('./server/Routers/router.js')


const PORT = process.env.PORT || 5480;
const server = path.join(__dirname, '/server')
const FrontendPages = path.join(server,'/Frontend');


const app = express();

// Используем CORS middleware
app.use(cors());

// Поддержка JSON-парсинга для запросов
app.use(express.json());

// Раздача статических файлов
app.use(express.static(FrontendPages));

// Маршруты для различных страниц
app.use('/source', express.static(path.join(FrontendPages, '/source')));
app.use('/', express.static(path.join(FrontendPages, '/index')));
app.use('/catalog', express.static(path.join(FrontendPages, '/catalog')));
app.use('/api/', router);

// Обработчики GET запросов
app.get('/', (req, res) => {
    res.sendFile(path.join(FrontendPages, '/index/index.html'));
});

app.get('/catalog', (req, res) => {
    res.sendFile(path.join(FrontendPages, '/catalog/index.html'));
});

app.get('/catalog/:id', (req, res) => {
    res.sendFile(path.join(FrontendPages, '/single_product_page/index.html')); 
});

// Обработчик для несуществующих маршрутов
app.use((req, res, next) => {
    res.status(404).send("Page not found!");
});

// Обработчик ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
}); 