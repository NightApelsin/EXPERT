const express = require('express');
const cors = require('cors');
const router = require('./server/Routers/router.js')
const cookieParser = require('cookie-parser');
const fs = require('fs')
const https = require('https')
const PORT = process.env.PORT || 3000;
const path = require('path');
const server = path.join(__dirname, '/server')
const FrontendPages = path.join(server,'/Frontend');

const app = express();
const Session = require('express-session');
const SessionStorage = require('./server/Database/db_sessionStorage.js')
const PgStore = require('connect-pg-simple')(Session);


let http = require('http');
let servere = http.createServer();




app.use(Session({
    store: new PgStore({
        pool: SessionStorage,
        createTableIfMissing: true,
        schemaName: 'public',
        tableName: 'sessions'
    }),
    secret: '2d6+8',
    resave: true,
    saveUninitialized: true
}));


app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
// Используем CORS middleware
app.use(cors());

// Поддержка JSON-парсинга для запросов
app.use(express.json());

// Раздача статических файлов
app.use(express.static(FrontendPages));

// Маршруты до папок различных страниц
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
    res.cookies
    res.sendFile(path.join(FrontendPages, '/index/index.html'));
});
//create account page
app.get('/createAccount', (req, res) => {
    res.sendFile(path.join(FrontendPages, '/createAccount/index.html'));
})
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
//profile page
app.get('/profile', (req, res) => {
    
    res.sendFile(path.join(FrontendPages, '/profile/index.html'))
})

// Обработчик для несуществующих маршрутов
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(FrontendPages, '/errors/404.html'));
});

// Обработчик внутренних ошибок сервера
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// const httpsOptions = {
//     key: fs.readFileSync('./cert.key'),
//     cert: fs.readFileSync('./cert.pem')
// }
// console.log('https://localhost:5001')
// https.createServer(httpsOptions, app).listen(PORT)


app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}\nsite link http://localhost:${PORT}`);
})

