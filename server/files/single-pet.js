// URL-Parameter analysieren
const urlParams = new URLSearchParams(window.location.search);
const animalId = urlParams.get('animalId');

// Tierobjekt anhand der animalId finden
const animal = animals[animalId];

// Attribute des Tierobjekts in die Seite einfügen
const imageElement = document.getElementById('image');
imageElement.src = animal.image;
imageElement.alt = animal.name;

const petNameElement = document.getElementById('pet-name');
petNameElement.textContent = animal.name;

const petAgeElement = document.getElementById('pet-age');
petAgeElement.textContent = animal.age;

const petSexElement = document.getElementById('pet-sex');
petSexElement.textContent = animal.sex;

const petDescriptionElement = document.getElementById('pet-description');
petDescriptionElement.textContent = animal.description;
