class PoetryCard extends HTMLElement {
    connectedCallback() {
        this.title = this.getAttribute("title") || null;
        this.author = this.getAttribute("author") || null;
        this.contain = this.getAttribute("contain") || null;

        this.innerHTML = `
        <div class="card">
            <h3>${this.title}</h3>
            <p><i>${this.author}</i></p>
            <p>${this.contain}</p>
        </div>
        `;
    }
}

function main() {
    const baseUrl = "https://poetrydb.org/author/Sir Walter Scott";

    customElements.define("poetry-card", PoetryCard);

    const getPoetry = () => {
        fetch(`${baseUrl}`)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if (responseJson.length >= 0) {
                    renderAllPoetries(responseJson)
                } else {
                    showResponseMessage(responseJson.reason);
                }
            })
            .catch(error => {
                showResponseMessage(error);
            })
    };

    const renderAllPoetries = (poetries) => {
        const listPoetryElement = document.querySelector("#list-poetry");

        poetries.forEach((poetry, i) => {
            const poetryCardElement = document.createElement("poetry-card");
            let contain = ""
            poetry.lines.forEach((line, j) => {
                if (j == 7) {
                    contain += `<span id="dots-${i}"></span><span id="more-${i}" style="display: none;">`
                    // console.log(document.getElementById("dots-" + i).style.display == "none")
                    poetryCardElement.addEventListener("click", function () {
                        clickButton(i);
                    }, false);
                }

                contain += `${line}<br>`
                if (j == poetry.lines.length - 1) {
                    contain += `</span><input type="button" value="Read more" id="myBtn-${i}" class="btn btn-primary">`
                }
            })

            poetryCardElement.setAttribute("title", poetry.title);
            poetryCardElement.setAttribute("author", poetry.author);
            poetryCardElement.setAttribute("contain", contain);

            listPoetryElement.appendChild(poetryCardElement);
        });
    }

    const clickButton = (i) => {
        var dots = document.getElementById("dots-" + i);
        var moreText = document.getElementById("more-" + i);
        var btnText = document.getElementById("myBtn-" + i);
        console.log(i)
        if (dots.style.display === "none") {
            dots.style.display = "inline";
            btnText.value = "Read more";
            moreText.style.display = "none";
        } else {
            dots.style.display = "none";
            btnText.value = "Read less";
            moreText.style.display = "inline";
        }
    }

    const showResponseMessage = (message = "Check your internet connection") => {
        alert(message);
    };

    getPoetry()
}

export default main;