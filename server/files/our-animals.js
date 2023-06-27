fetch('/animals')
  .then(response => response.json())
  .then(data => {
    const imageGrid = document.getElementById('image-grid');

    // Iterate over the animal data
    for (const animalKey in data) {
      if (data.hasOwnProperty(animalKey)) {
        const animal = data[animalKey];

        // Create a new image element
        const image = document.createElement('img');
        image.src = animal.image;

        // Append the image element to the image grid
        imageGrid.appendChild(image);
      }
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
