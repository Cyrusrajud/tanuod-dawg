// create.js - the information form (used for both adding and editing).

var editId = getId();   // if the address has ?id=..., we are editing
var photoData = '';     // the profile picture, stored as text

function $(id) { return document.getElementById(id); }

// The boxes shown for each repeatable section: [field name, label, bigBox?]
var FIELDS = {
  education:  [['school', 'School / University'], ['degree', 'Degree'], ['year', 'Year']],
  experience: [['company', 'Company'], ['role', 'Role'], ['period', 'Period (e.g. 2022-2024)'], ['description', 'Description', true]],
  projects:   [['title', 'Project title'], ['link', 'Link (https://...)'], ['description', 'Description', true]]
};

// Add one group of boxes (one school, one job, or one project)
function addRow(kind, values) {
  values = values || {};
  var row = document.createElement('div');
  row.className = 'row';
  var html = '<button class="x" onclick="this.parentNode.remove()">&times;</button>';
  for (var i = 0; i < FIELDS[kind].length; i++) {
    var f = FIELDS[kind][i];
    html += '<label>' + f[1] + '</label>';
    if (f[2]) { html += '<textarea rows="2" data-name="' + f[0] + '"></textarea>'; }
    else { html += '<input data-name="' + f[0] + '">'; }
  }
  row.innerHTML = html;
  var boxes = row.querySelectorAll('[data-name]');
  for (var j = 0; j < boxes.length; j++) {
    boxes[j].value = values[boxes[j].getAttribute('data-name')] || '';
  }
  $(kind).appendChild(row);
}

// Read all groups of one section into a list, e.g. all schools
function readRows(kind, mustHave) {
  var list = [];
  var rows = $(kind).children;
  for (var i = 0; i < rows.length; i++) {
    var item = {};
    var boxes = rows[i].querySelectorAll('[data-name]');
    for (var j = 0; j < boxes.length; j++) {
      item[boxes[j].getAttribute('data-name')] = boxes[j].value.trim();
    }
    if (item[mustHave]) { list.push(item); }   // skip empty groups
  }
  return list;
}

// When a picture is chosen: shrink it (max 300px) so it is small to store
$('photo').onchange = function () {
  var file = this.files[0];
  if (!file) { return; }
  var reader = new FileReader();
  reader.onload = function () {
    var img = new Image();
    img.onload = function () {
      var scale = Math.min(1, 300 / Math.max(img.width, img.height));
      var canvas = document.createElement('canvas');
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      photoData = canvas.toDataURL('image/jpeg', 0.8);
      showPhoto();
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
};
function showPhoto() {
  $('photoPrev').src = photoData;
  $('photoPrev').style.display = photoData ? 'block' : 'none';
}

// Collect everything typed in the form
function readForm() {
  var skills = [];
  var parts = $('skills').value.split(',');
  for (var i = 0; i < parts.length; i++) {
    if (parts[i].trim() !== '') { skills.push(parts[i].trim()); }
  }
  return {
    full_name: $('full_name').value.trim(),
    title: $('title').value.trim(),
    email: $('email').value.trim(),
    phone: $('phone').value.trim(),
    address: $('address').value.trim(),
    about: $('about').value.trim(),
    photo: photoData,
    skills: skills,
    education: readRows('education', 'school'),
    experience: readRows('experience', 'company'),
    projects: readRows('projects', 'title'),
    links: {
      facebook: $('facebook').value.trim(),
      linkedin: $('linkedin').value.trim(),
      github: $('github').value.trim(),
      website: $('website').value.trim()
    }
  };
}

// Check the form. Returns a list of problems (empty list = OK)
function checkForm(info) {
  var problems = [];
  if (info.full_name === '') { problems.push('Full name is required'); }
  if (info.email.indexOf('@') < 1 || info.email.indexOf('.') < 0) { problems.push('Please enter a valid email'); }
  if (info.about.length < 20) { problems.push('About me needs at least 20 characters'); }
  if (info.skills.length === 0) { problems.push('Add at least one skill'); }
  for (var name in info.links) {
    var url = info.links[name];
    if (url !== '' && url.indexOf('http') !== 0) { problems.push(name + ' link must start with http:// or https://'); }
  }
  return problems;
}
function showProblems(list) {
  var html = '';
  for (var i = 0; i < list.length; i++) { html += '<li>' + list[i] + '</li>'; }
  $('errors').innerHTML = '<ul>' + html + '</ul>';
  $('errors').style.display = list.length > 0 ? 'block' : 'none';
  if (list.length > 0) { window.scrollTo(0, 0); }
}

// Save button
async function save() {
  var info = readForm();
  var problems = checkForm(info);
  showProblems(problems);
  if (problems.length > 0) { return; }
  $('saveBtn').disabled = true;
  try {
    if (editId) {
      await updatePortfolio(editId, info);
      window.location.href = 'view.html?id=' + editId;
    } else {
      var saved = await addPortfolio(info);
      window.location.href = 'templates.html?id=' + saved.id;   // next step: choose template
    }
  } catch (error) {
    showProblems(['Could not save: ' + error.message]);
    $('saveBtn').disabled = false;
  }
}

// When the page opens: empty form, or fill the form if editing
async function start() {
  if (!editId) { addRow('education'); addRow('experience'); addRow('projects'); return; }
  $('heading').textContent = 'Edit your information';
  $('saveBtn').textContent = 'Save Changes';
  try {
    var p = await getOne(editId);
    $('full_name').value = p.full_name || '';
    $('title').value = p.title || '';
    $('email').value = p.email || '';
    $('phone').value = p.phone || '';
    $('address').value = p.address || '';
    $('about').value = p.about || '';
    $('skills').value = p.skills.join(', ');
    $('facebook').value = p.links.facebook || '';
    $('linkedin').value = p.links.linkedin || '';
    $('github').value = p.links.github || '';
    $('website').value = p.links.website || '';
    photoData = p.photo || '';
    showPhoto();
    for (var i = 0; i < p.education.length; i++) { addRow('education', p.education[i]); }
    for (var j = 0; j < p.experience.length; j++) { addRow('experience', p.experience[j]); }
    for (var k = 0; k < p.projects.length; k++) { addRow('projects', p.projects[k]); }
  } catch (error) { showProblems(['Could not load portfolio: ' + error.message]); }
}
  requireLogin().then(function (ok) { if (ok) { start(); } });
