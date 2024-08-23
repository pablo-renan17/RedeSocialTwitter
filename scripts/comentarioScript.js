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

async function getApiPost(){
    const postId = localStorage.getItem("postId");
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        headers: header,
    });
    const result = await response.json();
    console.log(result);
    const postsUl = document.querySelector("#posts");
    postsUl.insertAdjacentHTML("beforeend",`
        <li class="posts-li">
            <div class="li-header">
                <svg xmlns="http://www.w3.org/2000/svg" width="5vh" height="5vh" fill="white" class="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                </svg>
                <p>User ${result.userId}</p>
            </div>
            <div class="li-body">
                <p class="li-title">${result.title}</p>
                <p>${result.body}</p>
            </div>
            <ul class="li-footer d-flex">
                <p id="mostrar-comentarios">
                    Comentarios:
                </p>
            </ul>
        </li>
        `)
    getApiPostComentarios(header, postId)
}
getApiPost()

async function getApiPostComentarios(header, postId){
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`,{
        headers: header
    });
    const result = await response.json();
    result.forEach((comment)=>{
        const liFooter = document.querySelector(".li-footer");
        liFooter.insertAdjacentHTML("beforeend",`
            <li class="comentario-li">
                <div class="">
                    Email: ${comment.email}
                    <br>
                    ${comment.name}
                </div>
                <br>
                <div class="">
                    ${comment.body}
                </div>
            </li>
            `)
    })
}