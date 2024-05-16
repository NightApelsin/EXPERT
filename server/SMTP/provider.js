const nodemailer = require("nodemailer");
const SHA256 = require("crypto");
// Import NodeMailer (after npm install)


class SMTP {
    
    async sendEmail(req,res) {
        const transponder = await createProvider()
        let randomCode = Math.floor(Math.random() * 999999).toString();
        while (randomCode.length < 6) {
            randomCode = '0' + randomCode
        }
        let hash = SHA256.createHash('sha256').update(randomCode).digest('hex');
        console.log(hash)
        console.log(req.body.email)
        
        let info = await transponder.sendMail({
            from: '"EXPERT" <EXPERT@gmail.com>',
            to: req.body.email,
            subject: "Код авторизации",
            html: `
    <h1>Оповещение о получении кода подтверждения авторизации</h1>
    <p>Ваш код авторизации на сайте ${randomCode}</p>
    `,
        });
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
