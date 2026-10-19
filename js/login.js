// login.js - the login page.
function showMessage(text) {
  var box = document.getElementById('errors');
  box.style.display = 'block';
  box.textContent = text;
}

async function doLogin() {
  var email = document.getElementById('email').value.trim();
  var password = document.getElementById('password').value;
  if (email === '' || password === '') { showMessage('Please enter your email and password.'); return; }
  try {
    await logIn(email, password);
    window.location.href = 'manage.html';
  } catch (error) {
    showMessage('Login failed: ' + error.message);
  }
}

async function doSignUp() {
  var email = document.getElementById('email').value.trim();
  var password = document.getElementById('password').value;
  if (email === '' || password.length < 6) { showMessage('Enter an email and a password of at least 6 characters.'); return; }
  try {
    var data = await signUp(email, password);
    if (data.session) {
      window.location.href = 'manage.html';      // logged in right away
    } else {
      showMessage('Account created. Check your email to confirm it, then log in.');
    }
  } catch (error) {
    showMessage('Sign up failed: ' + error.message);
  }
}