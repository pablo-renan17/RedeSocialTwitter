const header = {
    // conteudo que esperamos e aceitamos, pega isso aqui na internet
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

function criarEventoDeCliqueMenu(){
    const menu = document.querySelector("#X-icon");
    menu.addEventListener("click",()=>{
        window.location.href = "/index.html";
    })
}
criarEventoDeCliqueMenu();

async function getAllApiData(){
    const response = await fetch("https://jsonplaceholder.typicode.com/posts",{
        headers: header,
    })
    const result = await response.json()
    console.log(result);
    localStorage.setItem("posts",JSON.stringify(result));
    montarPosts(result);
}

function procurar(){
    const caixaDeTexto = document.querySelector("#caixa-de-texto");
    const posts = JSON.parse(localStorage.getItem("posts"));

    caixaDeTexto.addEventListener("input",(event)=>{
       
        const filtrada = posts.filter((post)=>{
            
            return post.body.toLowerCase().includes(event.target.value.toLowerCase()) || post.title.toLowerCase().includes(event.target.value.toLowerCase())
        })
        console.log(filtrada,"filter")
        montarPosts(filtrada)
    })
}

function montarPosts(result){
    const postsUl = document.querySelector("#posts");
    postsUl.innerHTML = "";
    result.forEach(post => {
        postsUl.insertAdjacentHTML("beforeend",`
            <li>
                <div class="li-header">
                    <svg xmlns="http://www.w3.org/2000/svg" width="5vh" height="5vh" fill="white" class="bi bi-person" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                    </svg>
                    <p>User ${post.userId}</p>
                </div>
                <div class="li-body">
                    <p class="li-title">${post.title}</p>
                    <p>${post.body}</p>
                </div>
                <div class="li-footer d-flex">
                    <p id="mostrar-comentarios-${post.id}">
                        Mostrar mais comentários...
                    </p>
                </div>
            </li>
            `)
            const btn = document.querySelector(`#mostrar-comentarios-${post.id}`);
            btn.addEventListener("click",()=>{
                localStorage.setItem("postId", post.id);
                window.location.href = "/comentario.html";
            })
    });
}
getAllApiData();
procurar();