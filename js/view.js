// view.js - shows the generated portfolio.
var id = getId();
document.getElementById('chg').href = 'templates.html?id=' + id;
document.getElementById('edit').href = 'create.html?id=' + id;

async function start() {
  try {
    var p = await getOne(id);
    document.getElementById('frame').srcdoc = buildPortfolio(p);
    document.title = p.full_name;
  } catch (error) {
    document.getElementById('frame').srcdoc = '<p style="font-family:Arial;padding:30px">Portfolio not found.</p>';
  }
}

async function remove() {
  if (confirm('Delete this portfolio?')) {
    await deletePortfolio(id);
    window.location.href = 'manage.html';
  }
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href);
  alert('Link copied!');
}

// Download the portfolio as a web page file (.html) that opens in any browser
function downloadHtml() {
  var html = document.getElementById('frame').srcdoc;
  var file = new Blob([html], { type: 'text/html' });
  var link = document.createElement('a');
  link.href = URL.createObjectURL(file);
  link.download = 'my-portfolio.html';
  link.click();
}

// Open the print window. Choose "Save as PDF" as the destination.
function printPdf() {
  document.getElementById('frame').contentWindow.print();
}

start();