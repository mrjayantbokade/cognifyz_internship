document.getElementById('registrationForm').onsubmit = function (event) {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var btn = document.getElementById('btn');

    if (email === '') {
        alert('Please enter your email.');
        event.preventDefault();
        return;
    }

    if (!password.match(/[a-zA-Z]/) || !password.match(/[0-9]/)) {
        alert('Password must contain both letters and numbers.');
        event.preventDefault();
        btn.style.backgroundColor = 'red';
        return;
    }

};
