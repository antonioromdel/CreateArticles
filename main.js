window.addEventListener("DOMContentLoaded", () => {

    let articles = document.querySelector(".layaout__articles")
    let title = document.querySelector("#title")
    let subtitle = document.querySelector("#subtitle")
    let description = document.querySelector("#description")
    let form = document.querySelector(".form__create")
    let vaciarCarrito = document.querySelector("#vaciarCarrito")
    
    let articlesArray = []

    vaciarCarrito.addEventListener('click', () => {
        localStorage.clear()
        articlesArray = []
        showArticles()
    })

    function createArticle () {

        form.addEventListener('submit', (e) => {    
            e.preventDefault()  //Evitar que se refresque la pagina

            if(title.value && subtitle.value && description.value){
                let article = {
                    title: title.value,
                    subtitle: subtitle.value,
                    description: description.value
                }

                articlesArray.unshift(article)
                localStorage.setItem("articles", JSON.stringify(articlesArray))
                showArticles()
                
            } else {
                alert("Faltan datos en el formulario.")
            }
        })

    }

    function layaoutArticle(article) {
        let layaout = `
            <article class="layaout__card" id=${articlesArray.indexOf(article)}>
                <header class="card__header">
                    <p class="header__author">${article.title} €</p>
                </header>
                <div class="card__content">
                    <h2 class="content__title">${article.subtitle}</h2>
                    <p class="content__description">
                        ${article.description}
                    </p>
    
                    <button class="content__btn">Eliminar</button>
                </div>
            </article>
        `

        return layaout
    }

    function showArticles (){
        articles.innerHTML = ""
        
        if(articlesArray.length > 0 || articlesArray == null){
            
            articlesArray = JSON.parse(localStorage.getItem("articles"))
            articlesArray.forEach(element => {
                articles.innerHTML += layaoutArticle(element)
            });

            addDeleteBtn()
            
        } else {
            articles.innerHTML = "Carro Vacio"
        }

    }

    function addDeleteBtn() {
        document.querySelectorAll(".content__btn").forEach(boton => {
            boton.addEventListener('click', (e) => {
                let card = e.target.closest('.layaout__card');
                let id = parseInt(card.getAttribute('id'), 10);
                articlesArray.splice(id, 1);
                localStorage.setItem("articles", JSON.stringify(articlesArray));
                showArticles();
            })
        })


    }

    createArticle()
    showArticles()

})