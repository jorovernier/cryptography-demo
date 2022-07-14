// Insert local storage code below
let user = JSON.parse(window.localStorage.getItem('user'));
console.log(user)

let userInfo = document.createElement('div');
let infoSection = document.getElementById('user-info');
let duckList = document.getElementById('ducks');
let addForm = document.getElementById('add-duck');
let addInput = document.getElementById('add-input');

userInfo.innerHTML = `
    <h2>Username: ${user.username}</h2>
    <h2>Email: ${user.email}</h2>
`;
infoSection.appendChild(userInfo);

function renderDucks(ducks){
    duckList.innerHTML = '';
    for(let i = 0; i < ducks.length; i++){
        let duckImg = document.createElement('img');
        duckImg.src = ducks[i];
        duckImg.setAttribute('class', 'duckimg');
        duckList.appendChild(duckImg);
    }
}

function addDuck(e){
    e.preventDefault()

    let newDuck = {
        duck: addInput.value
    }

    axios.put(`http://localhost:6006/api/ducks/${user.username}`, newDuck).then(res => {
        // Insert local storage code below
        window.localStorage.setItem('user', JSON.stringify(res.data))
        
        renderDucks(res.data.ducks)
        addInput.value = '';
    })
}

addForm.addEventListener('submit', addDuck)

// Uncomment once local storage is set up
renderDucks(user.ducks)