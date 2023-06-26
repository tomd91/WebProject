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
        // Verlinkte Seite 
        localStorage.setItem('user',username)
        window.location.href = '/our-animals.html';
      } else {
        // Anmeldung fehlgeschlagen
        document.getElementById('message').textContent = 'Anmeldung fehlgeschlagen.';
      }
    }
  };
  xhr.send(JSON.stringify(userData));
}

function createUser(event) {
  event.preventDefault(); // Verhindert das automatische Absenden des Formulars

  var newUsername = document.getElementById('newUsername').value;
  var newPassword = document.getElementById('newPassword').value;
  var newName = document.getElementById('newName').value;

  // Erstelle ein JSON-Objekt mit den neuen Benutzerdaten
  var newUser = {
    username: newUsername,
    password: newPassword,
    name: newName
  };

  // Sende eine POST-Anfrage an den Server für die Benutzererstellung
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/users', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 201) {
        // Benutzer erfolgreich erstellt
        document.getElementById('message').textContent = 'Benutzer erfolgreich erstellt.';
        // Setze die Formularfelder zurück
        document.getElementById('newUsername').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('newName').value = '';
      } else {
        // Fehler beim Erstellen des Benutzers
        document.getElementById('message').textContent = 'Fehler beim Erstellen des Benutzers.';
      }
    }
  };
  xhr.send(JSON.stringify(newUser));
}




