// al caricamento della pagina succedono cose
window.onload = () => {
    const newUrl = new URLSearchParams(location.search);
    const id = newUrl.get("id");

// url endpoint
const url = 'https://striveschool-api.herokuapp.com/api/product/' + id;
// token key
const tokenKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNiOTVmMGIxYzc3ZjAwMTUwNjgzZGMiLCJpYXQiOjE3MTUxODEwNDEsImV4cCI6MTcxNjM5MDY0MX0.slxBXijhwxQb7yD9pMOQQCP77To-6WUsp-UXVwTF9nc';
//------------------------------------------------------
// vado a puntare il container dei item
const itemsContainer = document.getElementById('itemsContainer');

// grazie a questa funzione mostrerò tutti gli item in pagina
const showItems = async () => {

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${tokenKey}`
        }
    });
    

    const items = await response.json();
    console.log(items);
    itemsContainer.innerHTML = `
        <div class="card-style col-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2 card bg-dark text-light">
          <img src="${items.imageUrl}" class="card-img-top" alt="${items.name}">
          <div class="card-body">
            <h5 class="card-title">${items.name}</h5>
            <p class="card-text">${items.brand}</p>
            <p class="card-text">${items.description}</p>
            <p class="card-text">${items.price}</p>
            <a href="details.html" class="btn btn-primary">Details</a>
          </div>
        </div>
        `

};

showItems()
}