import { headerBuilder, footerBuilder } from "./framwork.js";


// Retrieve the animal name from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const animalName = urlParams.get('animalName');

// Fetch animal data based on the provided name
const fetchAnimalData = async (name) => {
  try {
    const response = await fetch('/animals');
    const data = await response.json();
    const animal = Object.values(data).find(
      (animal) => animal.name.toLowerCase() === name.toLowerCase()
    );
    return animal;
  } catch (error) {
    console.error('Error:', error);
  }
};

// Update the single animal page with the retrieved data
const updateSingleAnimalPage = (animal) => {
  const image = document.getElementById('image');
  const animalNameElement = document.getElementById('name');
  const animalAge = document.getElementById('age');
  const animalSex = document.getElementById('sex');
  const animalDescription = document.getElementById('description');

  image.src = animal.image;
  animalNameElement.textContent = animal.name;
  animalAge.textContent = animal.age;
  animalSex.textContent = animal.sex;
  animalDescription.textContent = animal.description;
};

// Fetch and update animal data on page load
window.addEventListener('DOMContentLoaded', async () => {
  const animal = await fetchAnimalData(animalName);
  if (animal) {
    updateSingleAnimalPage(animal);
  }
});
