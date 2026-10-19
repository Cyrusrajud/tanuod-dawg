// helpers.js - small tools used by all 3 templates.

// Makes text safe to put inside HTML (so typed "<" cannot break the page)
function safe(text) {
  if (text === undefined || text === null) { return ''; }
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Only allow links that start with http
function safeLink(url) {
  if (url && url.indexOf('http') === 0) { return safe(url); }
  return '#';
}

// The profile picture (empty if none was uploaded)
function photoHtml(p) {
  if (p.photo) { return '<img class="ph" src="' + safe(p.photo) + '" alt="Profile picture">'; }
  return '';
}

// Email, phone and address in one line
function contactText(p) {
  var list = [];
  if (p.email) { list.push(safe(p.email)); }
  if (p.phone) { list.push(safe(p.phone)); }
  if (p.address) { list.push(safe(p.address)); }
  return list.join(' &middot; ');
}

// Social links as <a> tags
function linksHtml(p) {
  var html = '';
  var names = ['facebook', 'linkedin', 'github', 'website'];
  for (var i = 0; i < names.length; i++) {
    var url = p.links[names[i]];
    if (url) { html += '<a href="' + safeLink(url) + '" target="_blank">' + names[i] + '</a> '; }
  }
  return html;
}

// Wraps a template's body and style into a complete web page
function wrapPage(p, css, body) {
  return '<!DOCTYPE html><html><head><meta charset="UTF-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>' + safe(p.full_name) + '</title>' +
    '<style>*{box-sizing:border-box;margin:0}body{line-height:1.6}.ph{object-fit:cover}' + css + '</style>' +
    '</head><body>' + body + '</body></html>';
}

// Picks the right template for a portfolio
function buildPortfolio(p) {
  if (p.template === 'modern') { return template2(p); }
  if (p.template === 'creative') { return template3(p); }
  return template1(p);
}
