const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNjZWFhMDgxODQ0MjAwMTUzNzU3ODQiLCJpYXQiOjE3MTUyNzc1ODksImV4cCI6MTcxNjQ4NzE4OX0.zhkepV-JOskzzFIHMSK2qmCSiLa7CwDEDC3GBTij0fE";



fetch(apiUrl, {
    method: "GET",
    headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
    },
})
.then((response) => {
    if(!response.ok) {
    throw new Error("Network non okay");
    }
    return response.json();
    })
    .then((data) => {
    console.log(data);
    })
    .catch((error) => {
    console.log("errore:", error)
})



