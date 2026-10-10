// TEMPLATE 1 - SIMPLE: white page, centered, classic fonts.
function template1(p) {
  var css = 'body{font-family:Georgia,serif;color:#222;max-width:740px;margin:0 auto;padding:50px 22px}' +
    'header{text-align:center;border-bottom:2px solid #222;padding-bottom:22px}' +
    '.ph{width:120px;height:120px;border-radius:50%;margin-bottom:12px}' +
    'h1{font-size:2.3rem}header a{color:#222;margin:0 6px}section{margin-top:30px}' +
    'h2{font-size:.95rem;letter-spacing:3px;text-transform:uppercase;border-bottom:1px solid #ccc;padding-bottom:5px;margin-bottom:12px}' +
    '.item{margin-bottom:14px}.skill{display:inline-block;border:1px solid #222;padding:1px 12px;margin:0 6px 6px 0}';

  var body = '<header>' + photoHtml(p) + '<h1>' + safe(p.full_name) + '</h1><p>' + safe(p.title) + '</p>' +
    '<p>' + contactText(p) + '</p><p>' + linksHtml(p) + '</p></header>';

  body += '<section><h2>About Me</h2><p>' + safe(p.about) + '</p></section>';

  if (p.experience.length > 0) {
    body += '<section><h2>Experience</h2>';
    for (var i = 0; i < p.experience.length; i++) {
      var e = p.experience[i];
      body += '<div class="item"><b>' + safe(e.role) + '</b>, ' + safe(e.company) + ' (' + safe(e.period) + ')<p>' + safe(e.description) + '</p></div>';
    }
    body += '</section>';
  }
  if (p.education.length > 0) {
    body += '<section><h2>Education</h2>';
    for (var j = 0; j < p.education.length; j++) {
      var ed = p.education[j];
      body += '<div class="item"><b>' + safe(ed.degree) + '</b>, ' + safe(ed.school) + ' (' + safe(ed.year) + ')</div>';
    }
    body += '</section>';
  }
  body += '<section><h2>Skills</h2>';
  for (var k = 0; k < p.skills.length; k++) { body += '<span class="skill">' + safe(p.skills[k]) + '</span>'; }
  body += '</section>';

  if (p.projects.length > 0) {
    body += '<section><h2>Projects</h2>';
    for (var m = 0; m < p.projects.length; m++) {
      var pr = p.projects[m];
      body += '<div class="item"><b>' + safe(pr.title) + '</b> <a href="' + safeLink(pr.link) + '" target="_blank">link</a><p>' + safe(pr.description) + '</p></div>';
    }
    body += '</section>';
  }
  return wrapPage(p, css, body);
}
