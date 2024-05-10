// url endpoint
const url = 'https://striveschool-api.herokuapp.com/api/product/';
// token key
const tokenKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNiOTVmMGIxYzc3ZjAwMTUwNjgzZGMiLCJpYXQiOjE3MTUxODEwNDEsImV4cCI6MTcxNjM5MDY0MX0.slxBXijhwxQb7yD9pMOQQCP77To-6WUsp-UXVwTF9nc';
//------------------------------------------------------


// grazie a questa funzione mostrerò tutti gli item in pagina
const showItems = async () => {

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${tokenKey}`
        }
    });

    const items = await response.json();
    itemsContainer.innerHTML = ''; // svuoto html ogni volta che richiamo la funzione
    items.forEach(item => {
        itemsContainer.innerHTML += `
        <div class=" col-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2 card">
          <img src="${item.imageUrl}" class="card-img-top" alt="${item.name}">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">Brand: ${item.brand}</p>
            <p class="card-text">Description: ${item.description}</p>
            <p class="card-text">${item.price}$</p>
            <a href="#" class="btn btn-primary" onclick="editItems('${item._id}')" >Edit</a>
            <a href="#" class="btn btn-danger" onclick="deleteItems('${item._id}')" >Remove</a>
          </div>
        </div>
        `
    });

};

showItems()
//----------------------------------------------------------

//creo una funzione per postare gli utenti nell'array

const postItems = async () => {

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
    if (response.ok) { // se response non ha problemi
        alert('Hai creato il prodotto!');
        showItems();
    };
}
//------------------------------------------------------------

// creo una funzione per ottenere l'id dell'item e poi modificandolo sciacciando il bottone sulla card

const editItems = async (id) => {
    console.log(id);
        // vado a puntare tutti gli input
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const brand = document.getElementById('brand').value;
        const imageUrl = document.getElementById('url').value;
        const price = document.getElementById('price').value;
    //----------------------------------------------------
    
        // vado a creare le proprietà che staranno dentro all'array
        const  updateItems= {
            name: name,
            description: description,
            brand: brand,
            imageUrl: imageUrl,
            price: price
            };
    
        const response = await fetch( url + id ,{
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${tokenKey}`,
                "content-type": "application/json",
            },
            body: JSON.stringify(updateItems)
        });
        if (response.ok) { // se response non ha problemi
            alert('Modifica andata a buon fine!');
            showItems();
        };
};
// -------------------------------------------------------------------------------------------

// creo una funzione per ottenere l'id dell'item e poi eliminandolo sciacciando il bottone sulla card

const deleteItems = async (id) => {
        const response = await fetch( url + id ,{
            method: 'DELETE', // delete serve a eliminare
            headers: {
                'Authorization': `Bearer ${tokenKey}`,
                "content-type": "application/json",
            }  
        });
        if (response.ok) { // se response non ha problemi
            alert('Hai eliminato il prodotto!');
            showItems();
        };
};