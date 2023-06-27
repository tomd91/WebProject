// Retrieve the cat-facts-text element
const catFactsText = document.getElementById('cat-facts-text');

// Fetch a random cat fact from the Cat Facts API
fetch('https://catfact.ninja/fact?max_length=350')
  .then(response => response.json())
  .then(data => {
    // Extract the fact text from the API response
    const fact = data.fact;

    // Update the content of the cat-facts-text element with the retrieved fact
    catFactsText.textContent = fact;
  })
  .catch(error => {
    // Handle any errors that occur during the API request
    console.error('Error:', error);
    catFactsText.textContent = 'Failed to retrieve cat facts.';
  });
