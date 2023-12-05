document.querySelector(".search-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const searchTerm = document.querySelector('input[name="searchTerm"]').value;
  
    fetch("/buscar-articulos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchTerm }),
    })
      .then((response) => response.json())
      .then((data) => {
        const searchResults = document.getElementById("searchResults");
        searchResults.innerHTML = " ";
  
        if (data.length > 0) {
          data.forEach((article) => {
            const articleElement = document.createElement("div");
            articleElement.textContent = article.title;
            searchResults.appendChild(articleElement);
          });
        } else {
          searchResults.textContent = "No se encontraron resultados";
        }
      })
      .catch((error) => console.error("Error al buscar artículos:", error));
  });