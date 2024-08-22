const header = {
    // conteudo que esperamos e aceitamos, pega isso aqui na internet
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

async function getAllApiData(){
    const response = fetch("https://jsonplaceholder.typicode.com/posts",{
        headers: header,
    })
    const result = await response.json;
}