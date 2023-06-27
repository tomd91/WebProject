function deleteUser() {
    var xhr = new XMLHttpRequest();
    var userToDelet = localStorage.getItem('user');
    xhr.open('DELETE', '/users/' + userToDelet, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // Benutzer erfolgreich gelöscht
          window.location.href = '/our-animals.html';
        } else {
          // Fehler beim Löschen des Benutzers
          console.log('Fehler beim Löschen des Benutzers');
        }
      }
    };
    xhr.send();
  }
