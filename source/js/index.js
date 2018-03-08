/* jshint esversion :6 */
/* global $ */

window.addEventListener('load',function(){
    "use strict";
    pageLoad();
});

function pageLoad(){
    
    const dati = getJsonPosts.then(function(post){
        for(let i = 0; i<post.length; i++){
            const section = document.getElementById('sezione');
            const article = document.createElement('article');
            const h2 = document.createElement('h2');
            const p = document.createElement('p');
            const content = post[i].body;
            const title = post[i].title;
            console.log(title);
            h2.innerHTML = title;
            p.innerHTML = content;
            article.appendChild(h2);
            //article.innerHTML = content;
            article.appendChild(p);
            section.appendChild(article);
            
        }
    });
}


   
const getJsonPosts = fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
    .then(response => response.json())
    .then(function(json){return json;
});

const getJsonUsers = fetch('https://jsonplaceholder.typicode.com/users/')
    .then(response => response.json())
    .then(function(json){ return json;
});
