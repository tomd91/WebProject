function login(event) {
  event.preventDefault();

  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  var userData = {
    username: username,
    password: password
  };

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/login', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  var promise = new Promise(function(resolve, reject) {
  xhr.onload = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          var response1 = xhr.responseText;
          resolve(response1);
          document.getElementById('message').textContent = 'Anmeldung erfolgreich.';
          localStorage.setItem('user', username)
        } else {
          reject(xhr.status);
          document.getElementById('message').textContent = 'Anmeldung fehlgeschlagen.';
        }
      }
    };
    xhr.send(JSON.stringify(userData));
  });
  
  promise.then(function(response) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/users/${username}/name`);
    xhr.onload = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          const name = response.name;
          localStorage.setItem('name', name)
          window.location.href = '/index.html';

        } else {
          console.error('Fehler beim Abrufen des Namens:', xhr.status);
        }
      }
    };
    xhr.send();
  })

}

function createUser(event) {
  event.preventDefault();

  var newUsername = document.getElementById('newUsername').value;
  var newPassword = document.getElementById('newPassword').value;
  var newName = document.getElementById('newName').value;

  var newUser = {
    username: newUsername,
    password: newPassword,
    name: newName
  };

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/users', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 201) {
        document.getElementById('message').textContent = 'Benutzer erfolgreich erstellt.';
        document.getElementById('newUsername').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('newName').value = '';
      } else {
        document.getElementById('message').textContent = 'Fehler beim Erstellen des Benutzers.';
      }
    }
  };
  xhr.send(JSON.stringify(newUser));
}




