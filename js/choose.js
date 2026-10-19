// choose.js - template selection page: shows the 3 templates using the user's data.
var id = getId();
var names = ['simple', 'modern', 'creative'];
var descriptions = ['Clean and professional', 'Cards and colors', 'Dark and bold'];

async function start() {
  try {
    var p = await getOne(id);
    var box = document.getElementById('tpls');
    for (var i = 0; i < names.length; i++) {
      var card = document.createElement('div');
      card.className = 'tpl';
      card.innerHTML = '<h2>' + names[i] + '</h2><small>' + descriptions[i] + '</small>' +
        '<div class="thumb"><iframe></iframe></div><button class="btn">Use ' + names[i] + '</button>';
      p.template = names[i];                                   // show it in this template
      card.querySelector('iframe').srcdoc = buildPortfolio(p);
      card.querySelector('button').onclick = makeChooser(names[i]);
      box.appendChild(card);
    }
  } catch (error) {
    document.getElementById('errors').style.display = 'block';
    document.getElementById('errors').textContent = 'Could not load: ' + error.message;
  }
}
// Returns a function that saves the chosen template then opens the portfolio
function makeChooser(name) {
  return async function () {
    await saveTemplate(id, name);
    window.location.href = 'view.html?id=' + id;
  };
}
start();
