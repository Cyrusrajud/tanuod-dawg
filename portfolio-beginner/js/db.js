// db.js - everything that talks to the Supabase database.
// The table is called "portfolios" (see supabase.sql).

// Connect to Supabase. If config.js is wrong, show a message that says what to fix.
var db;
try {
  var url = String(SUPABASE_URL).trim();
  var key = String(SUPABASE_KEY).trim();

  if (url.indexOf('https://') !== 0 || url.indexOf('.supabase.co') < 0) {
    throw new Error('The URL is wrong. It must look like https://abcdxyz.supabase.co');
  }
  if (key.length < 20 || key.indexOf('YOUR_') === 0) {
    throw new Error('The key is missing or still says YOUR_... Paste your public key.');
  }
  db = supabase.createClient(url, key);
} catch (error) {
  alert('Supabase is not connected.\n\n' + error.message + '\n\nFix it in js/config.js, save, and refresh (Ctrl+Shift+R).');
}

// Get the id from the page address, e.g. view.html?id=123  ->  "123"
function getId() {
  var params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// RETRIEVE: get all portfolios
async function getAll() {
  var result = await db.from('portfolios').select('*').order('created_at', { ascending: false });
  if (result.error) { throw result.error; }
  return result.data;
}

// RETRIEVE: get one portfolio by id
async function getOne(id) {
  var result = await db.from('portfolios').select('*').eq('id', id).single();
  if (result.error) { throw result.error; }
  return result.data;
}

// ADD a new portfolio. Returns the saved row (it contains the new id).
async function addPortfolio(info) {
  var result = await db.from('portfolios').insert(info).select().single();
  if (result.error) { throw result.error; }
  return result.data;
}

// EDIT an existing portfolio
async function updatePortfolio(id, info) {
  var result = await db.from('portfolios').update(info).eq('id', id);
  if (result.error) { throw result.error; }
}

// Save the chosen template: "simple", "modern" or "creative"
async function saveTemplate(id, templateName) {
  var result = await db.from('portfolios').update({ template: templateName }).eq('id', id);
  if (result.error) { throw result.error; }
}

// DELETE a portfolio
async function deletePortfolio(id) {
  var result = await db.from('portfolios').delete().eq('id', id);
  if (result.error) { throw result.error; }
}