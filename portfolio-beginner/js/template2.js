// TEMPLATE 2 - MODERN: colorful banner with cards.
function template2(p) {
  var css = 'body{font-family:Segoe UI,Arial,sans-serif;background:#eef2ff;color:#1e293b}' +
    '.top{background:linear-gradient(135deg,#2563eb,#7c3aed);color:#fff;padding:50px 20px 80px;text-align:center}' +
    '.ph{width:130px;height:130px;border-radius:50%;border:5px solid #fff;margin-bottom:10px}' +
    '.top a{color:#fff;background:rgba(255,255,255,.25);border-radius:20px;padding:3px 14px;margin:8px 3px 0;display:inline-block;text-decoration:none}' +
    '.cards{max-width:1000px;margin:-50px auto 40px;padding:0 18px;display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:18px}' +
    '.card{background:#fff;border-radius:16px;padding:22px;border-top:5px solid #2563eb;box-shadow:0 4px 14px rgba(0,0,0,.08)}' +
    '.wide{grid-column:1/-1}.card h2{color:#2563eb;font-size:1.1rem;margin-bottom:10px}' +
    '.chip{display:inline-block;background:#dbeafe;color:#1d4ed8;border-radius:20px;padding:3px 14px;margin:0 5px 6px 0}' +
    '.mini{background:#f1f5f9;border-radius:10px;padding:12px;margin-bottom:10px}';

  var body = '<div class="top">' + photoHtml(p) + '<h1>' + safe(p.full_name) + '</h1><p>' + safe(p.title) + '</p>' +
    '<p>' + contactText(p) + '</p>' + linksHtml(p) + '</div><div class="cards">';

  body += '<div class="card wide"><h2>About Me</h2><p>' + safe(p.about) + '</p></div>';

  body += '<div class="card"><h2>Skills</h2>';
  for (var i = 0; i < p.skills.length; i++) { body += '<span class="chip">' + safe(p.skills[i]) + '</span>'; }
  body += '</div>';

  body += '<div class="card"><h2>Education</h2>';
  for (var j = 0; j < p.education.length; j++) {
    var ed = p.education[j];
    body += '<div class="mini"><b>' + safe(ed.degree) + '</b><br>' + safe(ed.school) + ' ' + safe(ed.year) + '</div>';
  }
  body += '</div>';

  body += '<div class="card wide"><h2>Experience</h2>';
  for (var k = 0; k < p.experience.length; k++) {
    var e = p.experience[k];
    body += '<div class="mini"><b>' + safe(e.role) + '</b> at ' + safe(e.company) + '<br>' + safe(e.period) + '<p>' + safe(e.description) + '</p></div>';
  }
  body += '</div>';

  body += '<div class="card wide"><h2>Projects</h2>';
  for (var m = 0; m < p.projects.length; m++) {
    var pr = p.projects[m];
    body += '<div class="mini"><b>' + safe(pr.title) + '</b> <a href="' + safeLink(pr.link) + '" target="_blank">View</a><p>' + safe(pr.description) + '</p></div>';
  }
  body += '</div></div>';
  return wrapPage(p, css, body);
}
