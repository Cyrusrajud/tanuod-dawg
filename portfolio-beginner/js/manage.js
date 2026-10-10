// manage.js - list of portfolios with View / Edit / Template / Delete.
async function load() {
  try {
    var all = await getAll();
    document.getElementById('empty').style.display = all.length === 0 ? 'block' : 'none';
    var html = '';
    for (var i = 0; i < all.length; i++) {
      var p = all[i];
      html += '<div class="box">';
      if (p.photo) { html += '<img class="av" src="' + safe(p.photo) + '">'; }
      html += '<span class="badge">' + safe(p.template) + '</span>' +
        '<h3 style="margin-top:8px">' + safe(p.full_name) + '</h3><p>' + safe(p.title) + '</p>' +
        '<div class="acts">' +
        '<a class="btn sm" href="view.html?id=' + p.id + '">View</a>' +
        '<a class="btn sm ghost" href="create.html?id=' + p.id + '">Edit</a>' +
        '<a class="btn sm ghost" href="templates.html?id=' + p.id + '">Template</a>' +
        '<button class="btn sm red" onclick="removeOne(\'' + p.id + '\')">Delete</button>' +
        '</div></div>';
    }
    document.getElementById('list').innerHTML = html;
  } catch (error) {
    document.getElementById('errors').style.display = 'block';
    document.getElementById('errors').textContent = 'Could not load: ' + error.message;
  }
}
async function removeOne(id) {
  if (confirm('Delete this portfolio permanently?')) {
    await deletePortfolio(id);
    load();
  }
}
load();
