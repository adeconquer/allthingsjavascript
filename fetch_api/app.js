document.querySelector('#button1').addEventListener('click', getText);

function getText() {
    fetch('test.txt')
        .then(function(res) { return res.text() })
        .then(function(data) {
            console.log(data);
            document.querySelector('#output').innerHTML = data
        })
        .catch(function(err) { console.log(err) })
}

// Get Local JSON data
document.querySelector('#button2').addEventListener('click', getJSON);

function getJSON() {
    fetch('post.json')
        .then(function(res) { return res.json() })
        .then(function(data) {
            console.log(data);
            let output = ''
            data.forEach(function(post) {
                output += `<li>${post.title}</li>`
            });
            document.querySelector('#output').innerHTML = output
        })
        .catch(function(err) { console.log(err) })
}

// Get External API data
document.querySelector('#button3').addEventListener('click', getExternal);

function getExternal() {
    fetch('https://api.github.com/users')
        .then(function(res) { return res.json() })
        .then(function(data) {
            console.log(data.ok);
            // if (data.ok) {

            // }
            let output = ''
            data.forEach(function(user) {
                output += `<li>${user.login}</li>`
            });
            document.querySelector('#output').innerHTML = output
        })
        .catch(function(err) { console.log(err) })
}