function getJSON(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.send();
  xhr.onload = function() {
    try {
      cb(null, JSON.parse(xhr.responseText));
    } catch (e) {
      cb(e);
    }
  };
  xhr.onerror = cb;
}

function getVersionsJSON(cb) {
  getJSON('/versions.json', cb);
}