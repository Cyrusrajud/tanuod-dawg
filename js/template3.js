// TEMPLATE 3 - CREATIVE: dark theme, name on the left, content on the right.
function template3(p) {
  var css = 'body{font-family:Trebuchet MS,sans-serif;background:#0d0d1a;color:#e8e8f5;display:flex;min-height:100vh}' +
    '.left{width:38%;padding:50px 34px;position:sticky;top:0;height:100vh;background:linear-gradient(180deg,#1b1035,#0d0d1a)}' +
    '.ph{width:170px;height:170px;border-radius:30px;transform:rotate(-6deg);border:4px solid #ff4d94;margin-bottom:26px}' +
    '.left h1{font-size:3rem;line-height:1.05;color:#ff4d94;word-break:break-word}' +
    '.job{color:#ffb84d;font-size:1.2rem;margin:10px 0 20px}.left p{color:#a9a9c8;font-size:.9rem}.left a{display:block;color:#ff4d94;margin-top:6px}' +
    '.right{flex:1;padding:50px 40px}h2{font-size:1.5rem;margin:34px 0 14px;color:#ffb84d}' +
    '.line{border-left:3px dashed #ff4d94;padding-left:20px;margin-bottom:18px}.line a{color:#ff4d94}' +
    '.tag{display:inline-block;border:2px solid #ffb84d;color:#ffb84d;border-radius:8px;padding:2px 12px;margin:0 8px 8px 0}' +
    '@media(max-width:760px){body{flex-direction:column}.left{width:100%;height:auto;position:static}.right{padding:24px}}';

  var body = '<div class="left">' + photoHtml(p) + '<h1>' + safe(p.full_name) + '</h1><div class="job">' + safe(p.title) + '</div>' +
    '<p>' + safe(p.email) + '</p><p>' + safe(p.phone) + '</p><p>' + safe(p.address) + '</p><div style="margin-top:14px">' + linksHtml(p) + '</div></div>';

  body += '<div class="right"><h2>01 / Hello</h2><p style="font-size:1.2rem">' + safe(p.about) + '</p>';

  body += '<h2>02 / Skills</h2>';
  for (var i = 0; i < p.skills.length; i++) { body += '<span class="tag">' + safe(p.skills[i]) + '</span>'; }

  body += '<h2>03 / Projects</h2>';
  for (var j = 0; j < p.projects.length; j++) {
    var pr = p.projects[j];
    body += '<div class="line"><b>' + safe(pr.title) + '</b> <a href="' + safeLink(pr.link) + '" target="_blank">open</a><p>' + safe(pr.description) + '</p></div>';
  }
  body += '<h2>04 / Experience</h2>';
  for (var k = 0; k < p.experience.length; k++) {
    var e = p.experience[k];
    body += '<div class="line"><b>' + safe(e.role) + '</b> at ' + safe(e.company) + '<br>' + safe(e.period) + '<p>' + safe(e.description) + '</p></div>';
  }
  body += '<h2>05 / Education</h2>';
  for (var m = 0; m < p.education.length; m++) {
    var ed = p.education[m];
    body += '<div class="line"><b>' + safe(ed.degree) + '</b><br>' + safe(ed.school) + ' ' + safe(ed.year) + '</div>';
  }
  body += '</div>';
  return wrapPage(p, css, body);
}
