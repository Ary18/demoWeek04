/* jshint esversion :6 */
/* global $ */

window.addEventListener('load',function(){
    "use strict";
    pageLoad();
});

function pageLoad(){
    
    getJsonPosts.then(function(post){
        for(let i = 0; i<post.length; i++){

            const section = document.getElementById('sezione');
            const article = document.createElement('article');

            const p = document.createElement('p');
            const h4 = document.createElement('h4');

            const content = post[i].body;
            const title = post[i].title;
            const userIdPost = post[i].userId;

            const name = document.createElement('p');

            p.innerHTML = content; // body del post
            h4.innerHTML = title;
            
            addTitle(title,article);
            addAuthor(name,userIdPost);
            article.appendChild(name);

            addButton(h4,p,article);
            section.appendChild(article);
            const modificaBtn = document.createElement('button');
        }
    });
}

function addTitle(title,divArticle){
    const h2 = document.createElement('h2');
    h2.innerHTML = title;
    divArticle.appendChild(h2);
}
function addAuthor(p,userIdPost){
    getJsonUsers.then(function(user){
        const userInfo = user.find(user=> user.id === userIdPost);
        p.innerHTML = `Scritto da: ${userInfo.name}`;
     });
}
function addButton(title,body,article){
    const button = document.createElement('button');
    button.innerHTML = 'Visualizza';
    button.setAttribute('class','btn btn-success');
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#modalContent');

    article.appendChild(button);

    button.addEventListener('click', function(event){
        $('.modal-title').html(title);
        $('.modal-body').html(body);
        addButtonElimina(article);
    });
}

function addButtonElimina(article){
    const eliminaBtn = document.createElement('button');
    eliminaBtn.innerHTML = 'Elimina';
    eliminaBtn.setAttribute('class','btn btn-danger');
    $('.modal-footer').html(eliminaBtn);
    eliminaBtn.addEventListener('click',function(){
        article.style.display ='none';
        $('#modalContent').modal('hide');
    });   
}

const getJsonPosts = fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(function(json){return json;
});

const getJsonUsers = fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(function(json){ return json;
});
