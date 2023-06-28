const urlParams = new URLSearchParams(window.location.search);
const animalName = urlParams.get('animalName');

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

const updateSingleAnimalPage = (animal) => {
  const image = document.getElementById('image');
  const animalNameElement = document.getElementById('name');
  const animalAge = document.getElementById('age');
  const animalSex = document.getElementById('sex');
  const animalPersonality = document.getElementById('personality');
  const animalDescription = document.getElementById('description');

  image.src = animal.image;
  animalNameElement.textContent = animal.name;
  animalAge.textContent = animal.age;
  animalSex.textContent = animal.sex;
  animalPersonality.textContent = animal.personality;
  animalDescription.textContent = animal.description;
};

window.addEventListener('DOMContentLoaded', async () => {
  const animal = await fetchAnimalData(animalName);
  if (animal) {
    updateSingleAnimalPage(animal);
  }
});
