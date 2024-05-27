const nodemailer = require("nodemailer");
const SHA256 = require("crypto");
const auth = require("../Controllers/authentification.controller.js");
// Import NodeMailer (after npm install)


class SMTP {
    
    async sendEmail(req,res) {
        const transponder = await createProvider()
        let randomCode = Math.floor(Math.random() * 999999).toString();
        while (randomCode.length < 6) {
            randomCode = '0' + randomCode
        }
        if(!req.body.email){
            res.sendStatus(400)
            return
        }
        if (req.body.state === 'creation' && !await auth.findUser(req.body.email)) {
            let hash = SHA256.createHash('sha256').update(randomCode).digest('hex');
            console.log(hash)
            console.log(req.body.email)
            res.cookie('sha', hash, {
                maxAge: 2 * 60 * 1000,
                httponly: true,
                path: '/',
            })
            try {
                let registerInfo = await transponder.sendMail({
                    from: '"EXPERT" <EXPERT@gmail.com>',
                    to: req.body.email,
                    subject: "Код подтверждения для регистрации на сайте",
                    html: `
                <h1>Оповещение о получении кода подтверждения регистрации</h1>
                <p>Ваш код регистрации на сайте ${randomCode}</p>
                `,
                });
                res.sendStatus(200)
            }catch (error){
                res.send(error);
            }
        } else if (req.body.state === 'login' && await auth.findUser(req.body.email)) {
            let hash = SHA256.createHash('sha256').update(randomCode).digest('hex');
            console.log(hash)
            console.log(req.body.email)
            res.cookie('sha', hash, {
                maxAge: 30 * 60 * 1000,
                httponly: true,
                path: '/',
            })
            try {
                let info = await transponder.sendMail({
                    from: '"EXPERT" <EXPERT@gmail.com>',
                    to: req.body.email,
                    subject: "Код авторизации",
                    html: `
                <h1>Оповещение о получении кода подтверждения авторизации</h1>
                <p>Ваш код авторизации на сайте ${randomCode}</p>
                `,
                });
                res.sendStatus(200)
            }catch (error){
                res.send(error);
            }
        }else{
            res.sendStatus(400)
        }
    }
}
module.exports = new SMTP()



async function createProvider(){

    return nodemailer.createTransport({
        host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
        port: 465, // Port for SMTP (usually 465)
        secure: true, // Usually true if connecting to port 465
        auth: {
            user: "izmsasha58@gmail.com", // Your email address
            pass: "zskr spri mcfw hfrv", // Password (for gmail, your app password)

        },
    })
}

