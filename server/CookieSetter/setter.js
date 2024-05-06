
class CookieSetter {
    async coockieSetter(req, res) {
        
        const { name, surname } = req.body;
        res.cookie('user', `${name} ${surname}`, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            path: '/'
        });
        res.send('Cookie set successfully');
    }
    async coockieSetHistory(req, res) {
        const path = req.body.path;

        let cookies = req.cookies.historyPath || { path: [] };

        console.log(typeof path);

        if (cookies === null) {
            res.cookie('historyPath', { path: [path] }, {
                maxAge: 24 * 60 * 60 * 1000 * 30,
                httpOnly: true,
                path: '/'
            })
            res.send('Cookie set successfully');
        }else if(cookies.path.length >= 5){
            console.log('cookie is full')
            cookies.path.shift()
            cookies.path.push(path);
            console.log(cookies.path.length);
            res.cookie('historyPath', cookies, {
                maxAge: 24 * 60 * 60 * 1000 * 30,
                httpOnly: true,
                path: '/'
            })
            res.send('Cookie update successfully');
        } 
        else {
            cookies.path.push(path);
            console.log(cookies.path.length);
            res.cookie('historyPath', cookies, {
                maxAge: 24 * 60 * 60 * 1000 * 30,
                httpOnly: true,
                path: '/'
            })
            res.send('Cookie update successfully');
        }
    }
}
module.exports = new CookieSetter

