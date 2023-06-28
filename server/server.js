const express = require("express");
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
const animalmodel = require("./animal-model.js")["animals"];


const app = express();

let users = [
  { username: 'admin', password: 'admin', name: 'Adminstrator' }
];

// Parse urlencoded bodies
app.use(bodyParser.json());

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, "files")));


app.get('/animals', (req, res) => {
  res.json(animalmodel)
});  

   
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user_check = users.find(user => user.username === username && user.password === password);
  if (user_check) {
    res.status(200).json({ message: 'Anmeldung erfolgreich' });
  } else {
    res.status(401).json({ message: 'Anmeldung fehlgeschlagen' });
  }
});

app.post('/users', (req, res) => {
  const user = req.body;

  const existingUser = users.find(u => u.username === user.username);
  if (existingUser) {
    res.status(409).json({ message: 'Benutzername bereits vorhanden' });
  } else {
    users.push(user);
    res.status(201).json({ message: 'Benutzer erfolgreich angelegt' });
  }
});

app.delete('/users/:user', (req, res) => {
  const userName = req.params['user'];

  const userIndex = users.findIndex(user => user.username === userName);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(200).json({ message: 'Benutzer gelöscht' });
  } else {
    res.status(404).json({ message: 'Benutzer nicht gefunden' });
  }
});

app.put('/users/:username', (req, res) => {
  const { username } = req.params;
  const { password, name } = req.body;

  const user = users.find(user => user.username === username);
  if (user) {
    user.password = password !== "" ? password : user.password;
    user.name = name !== "" ? name : user.name;
    res.status(200).json({ message: 'Benutzerdaten aktualisiert', user });
  } else {
    res.status(404).json({ message: 'Benutzer nicht gefunden' });
  }
});

app.get('/users/:username/name', (req, res) => {
  const { username } = req.params;

  const user = users.find(user => user.username === username);
  if (user) {
    res.status(200).json({ name: user.name });
  } else {
    res.status(404).json({ message: 'Benutzer nicht gefunden' });
  }
});  

app.listen(3000);

console.log("Server now listening on http://localhost:3000/");
