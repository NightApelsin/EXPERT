
const express = require('express');
const cors = require('cors');
const path = require('path');
const router = require('./server/Routers/router.js')
const cookieParser = require('cookie-parser');
const fs = require('fs')
const https = require('https')

const PORT = process.env.PORT || 5001;
const server = path.join(__dirname, '/server')
const FrontendPages = path.join(server,'/Frontend');


const app = express();


app.use(cookieParser());
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
app.use('/catalog/:id', express.static(path.join(FrontendPages, '/single_product_page')));
app.use('/api/', router);
app.use('/SMTP/', express.static(path.join(server, '/SMTP')))

// Обработчики GET запросов
//about page
app.get('/about', (req,res)=>{
    res.sendFile(path.join(FrontendPages, '/about/index.html'))
})
//contacts page
app.get('/contacts', (req,res)=>{
    res.sendFile(path.join(FrontendPages, '/contacts/index.html'))
})
//pay-road-map page
app.get('/pay-road-map', (req,res)=>{
    res.sendFile(path.join(FrontendPages, '/pay-road-map/index.html'))
})
//site-map page
app.get('/site-map', (req, res)=>{
    res.sendFile(path.join(FrontendPages, '/site-map/index.html'))
})
//stocks page
app.get('/stocks', (req, res)=>{
    res.sendFile(path.join(FrontendPages, '/stocks/index.html'))
})
//warranty page
app.get('/warranty', (req, res)=>{
    res.sendFile(path.join(FrontendPages, '/warranty/index.html'))
})
//home page
app.get('/', (req, res) => {
    res.sendFile(path.join(FrontendPages, '/index/index.html'));
    let crypto = require('crypto')
    exports.index((req, res)=>{
        res.render('index/index.html', {module: crypto})
    })
});
//policy page
app.get('/policy', (req, res)=>{
    res.sendFile(path.join(FrontendPages, '/policy/index.html'))
})
//privacy page
app.get('/privacy', (req, res)=>{
    res.sendFile(path.join(FrontendPages, '/privacy/index.html'))
})
//catalog page
app.get('/catalog', (req, res) => {
    res.sendFile(path.join(FrontendPages, '/catalog/index.html'));
});
//single product page
app.get('/catalog/:id', (req, res) => {
    res.sendFile(path.join(FrontendPages, '/single_product_page/index.html')); 
});

// Обработчик для несуществующих маршрутов
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(FrontendPages, '/errors/404.html'));
});

// Обработчик ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const httpsOptions = {
    key: fs.readFileSync('./cert.key'),
    cert: fs.readFileSync('./cert.pem')
}
console.log('https://localhost:5001')
https.createServer(httpsOptions, app).listen(PORT)

