const registeredUsers = [
    { username: 'froggy', password: 'infinite@loop' },
    { username: 'beary', password: 'hibernation25' }
]

let loggedInUser

let $container
let $loginForm
let $gameForm

document.addEventListener('DOMContentLoaded', () => {
    $container = document.getElementById('container')
    $loginForm = document.getElementById('loginForm')
    $gameForm = document.getElementById('gameForm')

    $container.style.display = 'block'
    $gameForm.style.display = 'block'
});

function score(e) {
    e.preventDefault()

    let rolls = document.getElementById('rolls').value.split(",").map((roll) => parseInt(roll))

    let score = getScore(rolls)

    console.log(score)
}

function getScore(rolls) {
    let score = 0;
    let roll = 0;

    for (let frames = 1; frames <= 10; frames++) {
      if (rolls[roll] == 10) {
        score += 10 + (rolls[roll + 1] || 0) + (rolls[roll + 2] || 0)
        roll++;
      } else if (rolls[roll] + rolls[roll + 1] == 10) {
        score += 10 + rolls[roll + 2];
        roll += 2;
      } else {
        score += rolls[roll] + (rolls[roll + 1] || 0);
        roll += 2;
      }
    }

    return score
}

function login(e) {
    e.preventDefault();

    let username = document.getElementById('username').value
    let password = document.getElementById('password').value

    let user = getUserByUsername(username)

    if (!user) {
        alert('Sorry, we did not find your user account')
        return
    }

    if (user.password !== password) {
        alert('Sorry, your username and password do not match your user account')
        return
    }

    loggedInUser = user

    $loginForm.style.display = 'none'
    $gameForm.style.display = 'block'
}

function getUserByUsername(username) {
    let foundUser = null;

    registeredUsers.forEach((user) => {
        if (user.username === username) {
            foundUser = user
        }
    })

    return foundUser
}
