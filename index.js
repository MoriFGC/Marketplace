// url endpoint
const url = 'https://striveschool-api.herokuapp.com/api/product/';
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
    items.forEach(item => {
        itemsContainer.innerHTML += `
        <div class=" col-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2 card">
          <img src="${item.imageUrl}" class="card-img-top" alt="${item.name}">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">${item.brand}</p>
            <p class="card-text">${item.description}</p>
            <p class="card-text">${item.price}</p>
            <a href="#" class="btn btn-primary">Edit</a>
          </div>
        </div>
        `
    });

};

showItems()