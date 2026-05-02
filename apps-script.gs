/**
 * Kassa — Google Sheets Cloud Backup
 *
 * Quraşdırma üçün CLOUD_SETUP.md faylına bax.
 * Aşağıdakı SECRET dəyərini öz təsadüfi açarınla əvəz et.
 */

const SECRET = 'CHANGE_ME_BURAYA_TESADUFI_SOZ_YAZ';

const SHEET_TX = 'Transactions';
const SHEET_SETTINGS = 'Settings';
const TX_HEADERS = ['id', 'type', 'amount', 'note', 'category', 'date', 'resolved', 'fromId'];

function doGet(e) {
  const secret = (e && e.parameter && e.parameter.secret) || '';
  if (secret !== SECRET) return json({ ok: false, error: 'forbidden' });
  return json({ ok: true, state: getState() });
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (body.secret !== SECRET) return json({ ok: false, error: 'forbidden' });
    if (body.action === 'pull') return json({ ok: true, state: getState() });
    if (body.action === 'ping') return json({ ok: true, ping: true });
    if (body.state) {
      saveState(body.state);
      return json({ ok: true, savedAt: new Date().toISOString() });
    }
    return json({ ok: false, error: 'no state' });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function getState() {
  const ss = SpreadsheetApp.getActive();
  const tx = ensureTxSheet(ss);
  const set = ensureSettingsSheet(ss);

  const txData = tx.getDataRange().getValues();
  const transactions = [];
  for (let i = 1; i < txData.length; i++) {
    const r = txData[i];
    if (!r[0]) continue;
    transactions.push({
      id: String(r[0]),
      type: String(r[1]),
      amount: Number(r[2]) || 0,
      note: r[3] ? String(r[3]) : '',
      category: r[4] ? String(r[4]) : null,
      date: r[5] instanceof Date ? r[5].toISOString() : String(r[5]),
      resolved: r[6] === true || r[6] === 'TRUE' || r[6] === 'true',
      fromId: r[7] ? String(r[7]) : null
    });
  }

  const setData = set.getDataRange().getValues();
  let name = 'Fuad';
  let initialBalance = 0;
  for (let i = 1; i < setData.length; i++) {
    if (setData[i][0] === 'name') name = String(setData[i][1] || 'Fuad');
    if (setData[i][0] === 'initialBalance') initialBalance = Number(setData[i][1]) || 0;
  }

  return { name, initialBalance, transactions };
}

function saveState(state) {
  const ss = SpreadsheetApp.getActive();
  const tx = ensureTxSheet(ss);
  const set = ensureSettingsSheet(ss);

  const lastRow = tx.getLastRow();
  if (lastRow > 1) {
    tx.getRange(2, 1, lastRow - 1, TX_HEADERS.length).clearContent();
  }

  if (state.transactions && state.transactions.length) {
    const rows = state.transactions.map(t => [
      t.id || '',
      t.type || '',
      Number(t.amount) || 0,
      t.note || '',
      t.category || '',
      t.date || '',
      !!t.resolved,
      t.fromId || ''
    ]);
    tx.getRange(2, 1, rows.length, TX_HEADERS.length).setValues(rows);
  }

  const setLast = set.getLastRow();
  if (setLast > 1) set.getRange(2, 1, setLast - 1, 2).clearContent();
  set.getRange(2, 1, 3, 2).setValues([
    ['name', state.name || ''],
    ['initialBalance', Number(state.initialBalance) || 0],
    ['lastSync', new Date().toISOString()]
  ]);
}

function ensureTxSheet(ss) {
  let s = ss.getSheetByName(SHEET_TX);
  if (!s) {
    s = ss.insertSheet(SHEET_TX);
    s.getRange(1, 1, 1, TX_HEADERS.length).setValues([TX_HEADERS]).setFontWeight('bold');
    s.setFrozenRows(1);
    s.setColumnWidth(1, 220);
    s.setColumnWidth(2, 100);
    s.setColumnWidth(3, 100);
    s.setColumnWidth(4, 220);
    s.setColumnWidth(5, 120);
    s.setColumnWidth(6, 200);
    s.setColumnWidth(7, 90);
    s.setColumnWidth(8, 220);
  }
  return s;
}

function ensureSettingsSheet(ss) {
  let s = ss.getSheetByName(SHEET_SETTINGS);
  if (!s) {
    s = ss.insertSheet(SHEET_SETTINGS);
    s.getRange(1, 1, 1, 2).setValues([['key', 'value']]).setFontWeight('bold');
    s.setFrozenRows(1);
    s.setColumnWidth(1, 140);
    s.setColumnWidth(2, 280);
  }
  return s;
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
