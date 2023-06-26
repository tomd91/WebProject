function login(event) {
  event.preventDefault(); // Verhindert das automatische Absenden des Formulars

  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  // Erstelle ein JSON-Objekt mit den Benutzerdaten
  var userData = {
    username: username,
    password: password
  };

  // Sende eine POST-Anfrage an den Server
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/login', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // Erfolgreiche Anmeldung
        document.getElementById('message').textContent = 'Anmeldung erfolgreich.';
      } else {
        // Anmeldung fehlgeschlagen
        document.getElementById('message').textContent = 'Anmeldung fehlgeschlagen.';
      }
    }
  };
  xhr.send(JSON.stringify(userData));
}