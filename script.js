const app = {
    addCardToDom: (data) => {
        const cardTemplate = document.querySelector("#card-template")
        const clone = cardTemplate.content.cloneNode(true)
        clone.querySelector(".card").classList.add(`${data.title.toLowerCase().replaceAll(" ", "")}Card`)
        clone.querySelector(".cardTitle").textContent = data.title
        for (const key in data.timeframes) {
            clone.querySelector(`.${key} .current`).textContent = data.timeframes[key].current + "hr" + (data.timeframes[key].current == 1 ? "" : "s")
            clone.querySelector(`.${key} .previous`).textContent = "Previous - " + data.timeframes[key].previous + "hr" + (data.timeframes[key].previous == 1 ? "" : "s")
        }
        document.querySelector("main").append(clone)
    },
    toggleTimeDetail: (timeframe) => {
        document.querySelectorAll(".card").forEach(card => {
            card.querySelectorAll(".timeDetail div").forEach(elem => elem.classList.add("inactiveDetail"))
            card.querySelector(`.timeDetail .${timeframe}`).classList.remove("inactiveDetail")
        })
    },
    init: async () => {
        try {
            const response = await fetch("./data.json");
            const data = await response.json()
            data.forEach(element => {
                app.addCardToDom(element)
            });
        } catch (error) {
            console.log(error);
        }
        document.querySelectorAll(".timeframe").forEach(tf => {
            tf.addEventListener("click", (e) => {
                document.querySelectorAll(".timeframe").forEach(tf => { tf.classList.remove("active") })
                e.target.classList.add("active")
                app.toggleTimeDetail(e.target.dataset.name)
            })
        })
    }
}

document.addEventListener("DOMContentLoaded", app.init)