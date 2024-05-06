(async function () {
    let user = {
        name: 'John',
        surname: 'krya'
    };
    console.log(user);

    const response = await fetch('/api/cookie', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    const result = await response.text();
    console.log(result);
})();