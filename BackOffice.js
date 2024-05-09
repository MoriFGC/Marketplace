// url endpoint
const url = 'https://striveschool-api.herokuapp.com/api/product/';
// token key
const tokenKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNiOTVmMGIxYzc3ZjAwMTUwNjgzZGMiLCJpYXQiOjE3MTUxODEwNDEsImV4cCI6MTcxNjM5MDY0MX0.slxBXijhwxQb7yD9pMOQQCP77To-6WUsp-UXVwTF9nc';
//------------------------------------------------------


// creo una funzione asincrona per ottenere i dati dell'endpoint
async function fetchItems() {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${tokenKey}`
            }
        });
        const products = await response.json()
        products.forEach((product) => {
            console.log(product);
        })
    } catch (error) {
        console.error(error);
    }
}

fetchItems()
//----------------------------------------------------------

//creo una funzione per postare gli utenti nell'array

async function postItems() {

    // vado a puntare tutti gli input
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const brand = document.getElementById('brand').value;
    const imageUrl = document.getElementById('url').value;
    const price = document.getElementById('price').value;
//----------------------------------------------------

    // vado a creare le proprietà che staranno dentro all'array
    const items = {
        name: name,
        description: description,
        brand: brand,
        imageUrl: imageUrl,
        price: price
        };

    const response = await fetch( url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${tokenKey}`,
            "content-type": "application/json",
        },
        body: JSON.stringify(items)
    });
    
    console.log(response);
}

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