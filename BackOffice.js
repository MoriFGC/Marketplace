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
            <a href="#" class="btn btn-primary" onclick="getId('${item._id}')" >Edit</a>
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
        method: 'POST', // post mi serve per creare un item
        headers: {
            'Authorization': `Bearer ${tokenKey}`, // metto il token per accedere all'api
            "content-type": "application/json", // gli dico che è un json
        },
        body: JSON.stringify(items)
    });
    if (response.ok) { // se response non ha problemi
        alert('Hai creato il prodotto!');
        showItems(); // aggiorno la pagina quando creo il prodotto richiamando la funzione che mi carica le card
    };
}
//------------------------------------------------------------

// creo una funzione per ottenere l'id dell'item e poi modificandolo sciacciando il bottone sulla card

const editItems = async () => {
        // vado a puntare tutti gli input
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const brand = document.getElementById('brand').value;
        const imageUrl = document.getElementById('url').value;
        const price = document.getElementById('price').value;
        const id = document.getElementById('id').value;
    //----------------------------------------------------
    
        // vado a creare le proprietà che staranno dentro all'array
        const  updateItems= {
            name: name,
            description: description,
            brand: brand,
            imageUrl: imageUrl,
            price: price
            };
    
        const response = await fetch( url + id,{
            method: 'PUT', // put serve per modificare il valore delle proprietà
            headers: {
                'Authorization': `Bearer ${tokenKey}`, // metto il token per accedere all'api
                "content-type": "application/json", // gli dico che è un json
            },
            body: JSON.stringify(updateItems)
        });
        if (response.ok) { // se response non ha problemi
            alert('Modifica andata a buon fine!');
            showItems(); // aggiorno la pagina quando modifico il prodotto richiamando la funzione che mi carica le card
        };
};
// -------------------------------------------------------------------------------------------

// creo una funzione per ottenere l'id dell'item e poi eliminandolo sciacciando il bottone sulla card

const deleteItems = async (id) => {
        const response = await fetch( url + id ,{
            method: 'DELETE', // delete serve a eliminare
            headers: {
                'Authorization': `Bearer ${tokenKey}`, // metto il token per accedere all'api
                "content-type": "application/json", // gli dico che è un json
            }  
        });
        if (response.ok) { // se response non ha problemi
            alert('Hai eliminato il prodotto!');
            showItems(); // aggiorno la pagina quando elimino il prodotto richiamando la funzione che mi carica le card
        };
};
// ------------------------------------------------------------------------------------------------

// grazie a questa funzione quando clicco su edit della card mi restituisce nel form i dati della card
// il parametro mi serve per puntare l'id dell'item
const getId = async (idItem) => {
    if (idItem) { // se quando clicco su edit della card è true
        // mi riporta l'id della card insieme al url
        const response = await fetch(url + idItem, {
            headers: {
                'Authorization': `Bearer ${tokenKey}`
            }
        });
    
        const items = await response.json();
        // quello che c'è scritto sulla card me lo ridà nel form
        document.getElementById('name').value = items.name;
        document.getElementById('description').value = items.description;
        document.getElementById('brand').value = items.brand;
        document.getElementById('url').value = items.imageUrl;
        document.getElementById('price').value = items.price;
        // userò l'input nascosto per ottenere anche l'id del prodotto quando cliccherò sull'edit della card
        document.getElementById('id').value = items._id;
        
    };
};