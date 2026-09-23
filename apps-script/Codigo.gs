// Cole este código em: Planilha → Extensões → Apps Script
// Depois: Implantar → Nova implantação → App da Web
//   Executar como: Eu · Quem pode acessar: Qualquer pessoa

var NOME_ABA = 'registro de ações comerciais';

function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = acharAba(ss, NOME_ABA);
  if (!sheet) return responder({ error: 'Aba "' + NOME_ABA + '" não encontrada' }, e);
  var tz = ss.getSpreadsheetTimeZone();
  var data = sheet.getDataRange().getValues().map(function (row) {
    return row.map(function (v) {
      return Object.prototype.toString.call(v) === '[object Date]' ? Utilities.formatDate(v, tz, 'dd/MM/yyyy') : v;
    });
  });
  return responder({ data: data, atualizado: new Date().toISOString() }, e);
}

// Acha a aba ignorando maiúsculas, acentos e espaços extras
function acharAba(ss, nome) {
  var alvo = normalizar(nome), abas = ss.getSheets(), i;
  for (i = 0; i < abas.length; i++) if (normalizar(abas[i].getName()) === alvo) return abas[i];
  for (i = 0; i < abas.length; i++) if (normalizar(abas[i].getName()).indexOf('registro de acoes') === 0) return abas[i];
  return null;
}

function normalizar(s) {
  return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim();
}

// JSON normal, ou JSONP quando a página pede ?callback=
function responder(obj, e) {
  var json = JSON.stringify(obj);
  var cb = e && e.parameter && e.parameter.callback;
  if (cb && /^[\w$]+$/.test(cb)) {
    return ContentService.createTextOutput(cb + '(' + json + ')').setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}
