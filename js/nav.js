// nav.js - the menu shown on every page
   document.getElementById('nav').innerHTML =
     '<nav><a class="logo" href="index.html">&#9998; PortfolioMaker</a><div>' +
     '<a href="index.html">Home</a><a href="create.html">Create</a><a href="manage.html">My Portfolios</a>' +
     '<span id="authLink"><a href="login.html">Login</a></span></div></nav>';

// If the user is logged in, show Logout instead of Login
if (typeof db !== 'undefined' && db) {
  db.auth.getSession().then(function (result) {
    if (result.data.session) {
      document.getElementById('authLink').innerHTML = '<a href="#" onclick="logOut()">Logout</a>';
    }
  });
}