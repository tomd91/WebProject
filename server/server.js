const express = require("express");
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
const animalmodel = require("./animal-model.js")["animals"];
const app = express();

let users = [
  { username: 'admin', password: 'admin', name: 'Adminstrator' },
  { username: 'user2', password: 'pass2', name: 'Benutzer 2' },
  { username: 'user3', password: 'pass3', name: 'Benutzer 3' }
];

// Parse urlencoded bodies
app.use(bodyParser.json());

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, "files")));


app.get('/animals', (req, res) => {
  res.json(animalmodel)
});  


app.get("/movies", function (req, res) {
  let movies = Object.values(movieModel);
  const queriedGenre = req.query.genre;
  if (queriedGenre) {
    movies = movies.filter((movie) => movie.Genres.indexOf(queriedGenre) >= 0);
  }
  res.send(movies);
});

// Configure a 'get' endpoint for a specific movie
app.get("/movies/:imdbID", function (req, res) {
  const id = req.params.imdbID;
  const exists = id in movieModel;

  if (exists) {
    res.send(movieModel[id]);
  } else {
    res.sendStatus(404);
  }
});

app.put("/movies/:imdbID", function (req, res) {
  const id = req.params.imdbID;
  const exists = id in movieModel;

  movieModel[req.params.imdbID] = req.body;

  if (!exists) {
    res.status(201);
    res.send(req.body);
  } else {
    res.sendStatus(200);
  }
});

app.get("/genres", function (req, res) {
  const genres = [
    ...new Set(Object.values(movieModel).flatMap((movie) => movie.Genres)),
  ];
  genres.sort();
  res.send(genres);
});

/* Task 1.1. Add the GET /search endpoint: Query omdbapi.com and return
   a list of the results you obtain. Only include the properties 
   mentioned in the README when sending back the results to the client */

 app.get("/search", function (req,res) {
  if (!req.query.query) {
    res.sendStatus(400);
    return;
  }

  const query = req.query.query;
  const url = "http://www.omdbapi.com/?s=" + query + "&apikey=d4ec07cd";
  

  http.get(url, response => {
    let data = "";

    response.on("data", (chunk) => {
      data += chunk;
    });
    
    response.on("end", () => {
      const movies = JSON.parse(data).Search.map((movie) => ({
        Title: movie.Title,
        imdbID: movie.imdbID,
        Year: Number(movie.Year)
      }));

      if(movies.length === 0) {
        res.send([]);
        return;
      }

      res.status(200).send(movies);
    });
  });
});

/* Task 2.2 Add a POST /movies endpoint that receives an array of imdbIDs that the
   user selected to be added to the movie collection. Search them on omdbapi.com,
   convert the data to the format we use since exercise 1 and add the data to the
   movie collection. */

   app.post("/movies", function (req, res) {
    if(!req.body) {
      res.sendStatus(400);
      return;
    }
    
    const imdbIDs=req.body;
    let numberOfResponses = 0;

    imdbIDs.forEach(imdbID => {
      http.get("http://www.omdbapi.com/?i=" + imdbID + "&apikey=d4ec07cd", response => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });
      
      response.on("end", () => {
        const movie = JSON.parse(data);
        movieModel[movie.imdbID] = {
          imdbID: movie.imdbID,
          Title: movie.Title,
          Released: new Date(movie.Released).toISOString().slice(0, 10),
          Runtime: movie.Runtime !== "N/A" ? parseInt(movie.Runtime) : null,
          Genres: movie.Genre.split(", "),
          Directors: movie.Director.split(", "),
          Actors: movie.Actors.split(", "),
          Writers: movie.Writer.split(", "),
          Plot: movie.Plot,
          Poster: movie.Poster,
          Metascore: movie.Metascore !== "N/A" ? parseInt(movie.Metascore) : null,
          imdbRating: parseFloat(movie.imdbRating)
        };

        numberOfResponses++;
        if(numberOfResponses===imdbIDs.length) {
          res.sendStatus(200);
        }
      });
    });
  });
});  


/* Task 3.2. Add the DELETE /movies/:imdbID endpoint which removes the movie
   with the given imdbID from the collection. */


  app.delete("/movies/:imdbID", function (req, res){

    const imdbID=req.params.imdbID;

    if(imdbID in movieModel){
      delete movieModel[imdbID];
      res.sendStatus(200);
    }else{
      res.sendStatus(404);
    }
  });
   
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Hier kannst du die Anmeldelogik implementieren
    // Beispiel: Überprüfung der Anmeldedaten
    const user_check = users.find(user => user.username === username && user.password === password);
    if (user_check) {
      res.status(200).json({ message: 'Anmeldung erfolgreich' });
    } else {
      res.status(401).json({ message: 'Anmeldung fehlgeschlagen' });
    }
  });
  
  app.post('/users', (req, res) => {
    const user = req.body;
  
    // Hier kannst du die Logik zur Überprüfung und Speicherung des Benutzers implementieren
    // Beispiel: Überprüfung, ob der Benutzername bereits vorhanden ist
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
  
    // Überprüfe, ob der Benutzer mit der angegebenen ID vorhanden ist
    const userIndex = users.findIndex(user => user.username === userName);
    if (userIndex !== -1) {
      // Benutzer löschen
      users.splice(userIndex, 1);
      res.status(200).json({ message: 'Benutzer gelöscht' });
    } else {
      res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }
  });

  app.put('/users/:username', (req, res) => {
    const { username } = req.params;
    const { password, name } = req.body;
  
    // Überprüfe, ob der Benutzer mit dem angegebenen Benutzernamen vorhanden ist
    const user = users.find(user => user.username === username);
    if (user) {
      // Aktualisiere die Benutzerdaten
      user.password = password !== "" ? password : user.password;
      user.name = name !== "" ? name : user.name;
      res.status(200).json({ message: 'Benutzerdaten aktualisiert', user });
    } else {
      res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }
  });

  app.get('/users/:username/name', (req, res) => {
    const { username } = req.params;
  
    // Überprüfe, ob der Benutzer mit dem angegebenen Benutzernamen vorhanden ist
    const user = users.find(user => user.username === username);
    if (user) {
      res.status(200).json({ name: user.name });
    } else {
      res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }
  });  

app.listen(3000);

console.log("Server now listening on http://localhost:3000/");
