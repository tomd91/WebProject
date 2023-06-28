fetch('/animals')
  .then(response => response.json())
  .then(data => {
    const imageGrid = document.getElementById('image-grid');

    function displayFilteredAnimals() {
      const speciesFilter = document.getElementById('species').value;
      const ageFilter = document.getElementById('age').value;
      const sexFilter = document.getElementById('sex').value;

      imageGrid.innerHTML = ''; 

      const filteredAnimals = Object.values(data).filter(animal => {
        if (speciesFilter !== 'all' && animal.species !== speciesFilter) {
          return false;
        }

        if (ageFilter !== 'all') {
          const ageRange = ageFilter.split('-');
          const minAge = parseInt(ageRange[0]);
          const maxAge = parseInt(ageRange[1]);
          const animalAge = parseInt(animal.age);

          if (animalAge < minAge || animalAge > maxAge) {
            return false;
          }
        }

        if (sexFilter !== 'all' && animal.sex !== sexFilter) {
          return false;
        }

        return true;
      });

      filteredAnimals.forEach(animal => {
        const link = document.createElement('a');
        link.href = `single-pet.html?animalName=${encodeURIComponent(animal.name)}`;

        const image = document.createElement('img');
        image.src = animal.image;

        link.appendChild(image);
        imageGrid.appendChild(link);
      });
    }

    const speciesFilter = document.getElementById('species');
    const ageFilter = document.getElementById('age');
    const sexFilter = document.getElementById('sex');

    speciesFilter.addEventListener('change', displayFilteredAnimals);
    ageFilter.addEventListener('change', displayFilteredAnimals);
    sexFilter.addEventListener('change', displayFilteredAnimals);

    displayFilteredAnimals();
  })
  .catch(error => {
    console.error('Error:', error);
  });
