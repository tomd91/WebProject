function deleteUser() {
    var xhr = new XMLHttpRequest();
    var userToDelet = localStorage.getItem('user');
    xhr.open('DELETE', '/users/' + userToDelet, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          userLogout();
          window.location.href = '/index.html';
        } else {
          console.log('Fehler beim Löschen des Benutzers');
        }
      }
    };
    xhr.send();
  }

  function updateUser(event) {
    event.preventDefault();

    var newPassword = document.getElementById('password').value;
    var newName = document.getElementById('name').value;

    var username = localStorage.getItem('user');

    var userData = {
        password: newPassword,
        name: newName
    };
  
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `/users/${username}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        console.log(response);
        showUserList();
        } else {
        console.error('Fehler beim Aktualisieren des Benutzers:', xhr.status);
        }
    }
    };
    xhr.send(JSON.stringify(userData));
}

function userLogout() {
    localStorage.setItem('user', '')
    localStorage.setItem('name', '')
    window.location.href = '/login.html'
}

