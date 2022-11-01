const game = document.getElementById("game")
const pantallaDePunteos = document.getElementById("score")

const jeopardyCategories = [
    {
        genero: "QUIEN",
        preguntas: [{
            pregunta: "Quien escribio Harry Potter",
            answers: ["JK Rowling", "JRR Tolkien"],
            correct: "JK Rowling",
            level: "Easy"
        
    },
    {
            pregunta: "Quien nacio en Krypton",
            answers: ["Aquaman", "Superman"],
            correct: "Superman",
            level: "Medium"
    },
    {
            pregunta: "Quien diceño el primer carro",
            answers: ["Karl Benz", "Henry Ford"],
            correct: "Karl Benz",
            level: "Hard"
        }]
    },


    {
        genero: "DONDE",
        preguntas: [{
            pregunta: "DOnde esta el palacio Buckingham",
            answers: ["Richmon", "London"],
            correct: "London",
            level: "Easy"
    },
    {

            pregunta: "En donde esta el Coliseo",
            answers: ["Roma", "Milan"],
            correct: "Roma",
            level: "Medium"
    },
    {
            pregunta: "En donde esta el monte Kilimanjaro",
            answers: ["Zimbawe", "Tanzania"],
            correct: "Tanzania",
            level: "Hard"
        
        }]
    },


    {
        genero: "CUANDO",
        preguntas: [{
            pregunta: "Cuando es navidad",
            answers: ["30 de Diciembre", "24/25 de Diciembre"],
            correct: "24/25 de Diciembre",
            level: "Easy"
    },
    {
            pregunta: "En que año le dispararon a JFK",
            answers: ["1963", "1961"],
            correct: "Tanzania",
            level: "Hard"
    },
    {
            pregunta: "Cuando fue la segunda guerra mudial",
            answers: ["1932", "1941"],
            correct: "1941",
            level: "Medium"
        }]
    },


    {
        genero: "QUE o CUAL",
        preguntas: [{
            pregunta: "Cual es la capital de Arabia Saudita",
            answers: ["Jeddah", "Riyadh"],
            correct: "Riyadh",
            level: "Hard"
    },
    {
            pregunta: "Que comen los Koalas",
            answers: ["Sandia", "Eucalipto"],
            correct: "Eucalipto",
            level: "Medium"
    },
    {
            pregunta: "Cual es el significado de 'kg' ",
            answers: ["Kilojoule", "Kilogramo"],
            correct: "Kilogramo",
            level: "Easy"
        }]
    },


    {
        genero: "CUANTOS",
        preguntas: [{
            pregunta: "Cuantos jugadores hay en un equipo de futlbol",
            answers: ["15", "11"],
            correct: "11",
            level: "Easy"
    },
    {
            pregunta: "Cuantos segundos hay en una hora",
            answers: ["36000", "3600"],
            correct: "3600",
            level: "Medium"
    },
    {
            pregunta: "Cuantos personas hay en China",
            answers: ["1.1 billones", "1.4 billones"],
            correct: "1.4 billones",
            level: "Hard"
        }]
    },
]

let score = 0


function addCategory(category) {
    const column = document.createElement("div")
    column.classList.add("genero-column")

    const generoTitle = document.createElement("div")
    generoTitle.classList.add("genero-title")
    generoTitle.innerHTML = category.genero

    column.appendChild(generoTitle)
    game.append(column)

    category.preguntas.forEach(pregunta => {
        const card = document.createElement("div")
        card.classList.add("card")
        column.append(card)

        if (pregunta.level === "Easy") {
            card.innerHTML = 100
        } else if (pregunta.level === "Medium") {
            card.innerHTML = 200
        } else if (pregunta.level === "Hard"){
            card.innerHTML = 300
        }

        card.setAttribute("data-pregunta", pregunta.pregunta)
        card.setAttribute("data-answer-1", pregunta.answers[0])
        card.setAttribute("data-answer-2", pregunta.answers[1])
        card.setAttribute("data-correct", pregunta.correct)
        card.setAttribute("data-value", card.getInnerHTML())

        card.addEventListener("click", flipCard)
    })

}

jeopardyCategories.forEach(category => addCategory(category))


function flipCard() {
    this.innerHTML = ""

    this.style.fontSize = "15px";
    this.style.lineHeight = "30px";

    const textDisplay = document.createElement("div")
    textDisplay.classList.add("card-text")
    textDisplay.innerHTML = this.getAttribute("data-pregunta")
    const firstButton = document.createElement("button")
    const secondButton = document.createElement("button")

    firstButton.classList.add("first-button")
    secondButton.classList.add("second-button")
    firstButton.innerHTML = this.getAttribute("data-answer-1")
    secondButton.innerHTML = this.getAttribute("data-answer-2")
    firstButton.addEventListener("click", getResult)
    secondButton.addEventListener("click", getResult)
    this.append(textDisplay, firstButton, secondButton)

    const allCards = Array.from(document.querySelectorAll(".card"))
    allCards.forEach(card => card.removeEventListener("click", flipCard))
}

function getResult() {
    const allCards = Array.from(document.querySelectorAll(".card"))
    allCards.forEach(card => card.addEventListener("click", flipCard))

    const cardOfButton = this.parentElement

    if (cardOfButton.getAttribute("data-correct") == this.innerHTML) {
        score = score + parseInt(cardOfButton.getAttribute("data-value"))
        scoreDisplay.innerHTML = score
        cardOfButton.classList.add("correct-answer")
        setTimeout(() => {
            while (cardOfButton.firstChild) {
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerHTML = cardOfButton.getAttribute("data-value")
        }, 100)
    } else {
        cardOfButton.classList.add("wrong-answer")
        setTimeout(() => {
            while (cardOfButton.firstChild) {
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerHTML = 0

        }, 100)
    }
    cardOfButton.removeEventListener("click", flipCard)

}