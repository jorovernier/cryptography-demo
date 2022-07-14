const loginForm = document.getElementById('login-form');
const regForm = document.getElementById('reg-form');

function login(e){
    e.preventDefault();

    let username = document.getElementById('l-username');
    let password = document.getElementById('l-password');

    let loggingIn = {
        username: username.value,
        password: password.value
    }

    axios.post('http://localhost:6006/api/login', loggingIn).then(res => {
        // Insert local storage code below
        console.log(res.data)
        window.localStorage.setItem('user', JSON.stringify(res.data))
        location.href = 'http://127.0.0.1:5500/public/duckdash.html'
    })
}

function register(e){
    e.preventDefault()

    let username = document.getElementById('r-username');
    let email = document.getElementById('r-email');
    let password = document.getElementById('r-password');

    let newUser = {
        username: username.value,
        email: email.value,
        password: password.value
    }

    axios.post('http://localhost:6006/api/register', newUser).then(res => {
        let message = document.createElement('h2');
        message.textContent = res.data;
        message.style.margin = '10px';
        regForm.appendChild(message);

        username.value = '';
        email.value = '';
        password.value = '';
    })
}

loginForm.addEventListener('submit', login)
regForm.addEventListener('submit', register)