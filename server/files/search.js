function search() {
  /* Task 1.2: Initialize the searchForm correctly */
  const searchForm = document.querySelector("#search");
  const query = searchForm.querySelector("input[name='query']").value;


  if (searchForm.reportValidity()) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const sectionElement = document.querySelector("section:nth-of-type(2)");

      while (sectionElement.childElementCount > 0) {
        sectionElement.firstChild.remove();
      }

      if (xhr.status === 200) {
        const results = JSON.parse(xhr.responseText);

        /* Task 1.3 Insert the results as specified. Do NOT
           forget to also cover the case in which no results
           are available. 
          */
        
           if (results.length === 0) {
            const p = document.createElement("p");
            p.textContent = "No results for your query '" + query + "' found.";
            sectionElement.appendChild(p);
          } else{
            const form = document.createElement("form");
            results.forEach(movie => {
            const article = document.createElement("article");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = movie.imdbID;
            checkbox.id = movie.imdbID;
            const label = document.createElement("label");
            label.htmlFor = movie.imdbID;
            label.textContent = movie.Title + " (" + movie.Year + ")";
            article.appendChild(checkbox);
            article.appendChild(label);
            form.appendChild(article);
          });
          const button = document.createElement("button");
          button.textContent = "Add selected to collection";
          button.addEventListener("click", addMovies);
          form.appendChild(button);
          sectionElement.appendChild(form);
          }     
        
      }
    };

    /* Task 1.2: Finish the xhr configuration and send the request */
    xhr.open("GET", "/search?query="+query);
    xhr.send();
  }
}

/* Task 2.1. Add a function that you use as an event handler for when
   the button you added above in 1.3. is clicked. In it, call the
   POST /addMovies endpoint and pass the array of imdbID to be added
   as payload. */


function addMovies(event){

  event.preventDefault();

  const form=event.target.form;
  const checked=form.querySelectorAll('input[type="checkbox"]:checked');
  const imdbIDs=Array.from(checked).map((checkbox) => checkbox.id);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/movies");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(imdbIDs));
  
}

window.onload = function () {
  document.getElementById("search").addEventListener("click", () => search());
};
