const searchElement = document.querySelector('.search'),
    searchInput = searchElement.querySelector('input'),
    removeIcon = searchElement.querySelector('span'),
    searchButton = document.querySelector('.search-button').querySelector('button'),
    meanLike = document.querySelector('#mean_like'),
    spellLike = document.querySelector('#spell_like'),
    antonyms = document.querySelector('#antonyms'),
    resultElement = document.querySelector('#result'),
    infoText = document.querySelector(".info-text")

function data(result, word) {
    if (result.length == 0) {
        if (meanLike.classList.contains('active')) {
            infoText.innerHTML = `Không thể tìm thấy từ đồng nghĩa với <span>"${word}"</span>. Mời nhập lại. `
        }
        else if (spellLike.classList.contains('active')) {
            infoText.innerHTML = `Không thể tìm thấy từ đồng âm với <span>"${word}"</span>. Mời nhập lại. `
        }
        else if (antonyms.classList.contains('active')) {
            infoText.innerHTML = `Không thể tìm thấy từ trái nghĩa với <span>"${word}"</span>. Mời nhập lại. `
        }

    } else {
        if (meanLike.classList.contains('active')) {
            infoText.innerHTML = `Các từ đồng nghĩa tìm được:`
        }
        else if (spellLike.classList.contains('active')) {
            infoText.innerHTML = `Các từ đồng âm tìm được:`
        }
        else if (antonyms.classList.contains('active')) {
            infoText.innerHTML = `Các từ trái nghĩa tìm được:`
        }
        let words = ''
        for (let i = 0; i < result.length; i++) {
            let definition = ''
            if(result[i].defs == undefined)
                definition = 'undefined'
            else if(result[i].defs.length > 1)
                for(let j = 0; j < result[i].defs.length; j++){
                    definition += result[i].defs[j] + `; \n`
                }
            else{
                definition = result[i].defs[0]
            }
            words += 
            `
                <li>
                    <p>${result[i].word}</p>
                    <span>${definition}</span>
                </li>\n
            `
        }
        resultElement.innerHTML = words
    }
}

function fetchApi(word) {
    infoText.style.color = "#000";
    if (meanLike.classList.contains('active')) {
        let url = `https://api.datamuse.com/words?rel_syn=${word}&qe=rel_syn&md=dp`;
        fetch(url).then(response => response.json())
            .then(result => data(result, word))
            .catch((e) => {
                infoText.innerHTML = 'Failed to load data from API'
                alert('Failed to load data from API')
                console.log(e)
            })
    }
    else if (spellLike.classList.contains('active')) {
        let url = `https://api.datamuse.com/words?sp=${word}&qe=sp&md=dp`;
        fetch(url).then(response => response.json())
            .then(result => data(result, word))
            .catch((e) => {
                infoText.innerHTML = 'Failed to load data from API'
                alert('Failed to load data from API')
                console.log(e)
            })
    }
    else if (antonyms.classList.contains('active')) {
        let url = `https://api.datamuse.com/words?rel_ant=${word}&qe=rel_ant&md=dp`;
        fetch(url).then(response => response.json())
            .then(result => data(result, word))
            .catch((e) => {
                infoText.innerHTML = 'Failed to load data from API'
                alert('Failed to load data from API')
                console.log(e)
            })
    }
}

searchInput.addEventListener("keyup", e => {
    let word = e.target.value.replace(/\s+/g, ' ');
    if (e.key == "Enter" && word) {
        resultElement.innerHTML = ''
        fetchApi(word);
    }
})

searchButton.addEventListener("click", e => {
    let word = searchInput.value.replace(/\s+/g, ' ');
    if (word) {
        resultElement.innerHTML = ''
        fetchApi(word);
    }
})

removeIcon.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.focus();
    infoText.innerHTML = "Type any existing word and press enter to get meaning, example, synonyms, etc.";
});

meanLike.addEventListener('click', e => {
    if (!meanLike.classList.contains('active'))
        meanLike.classList.add('active')
    if (spellLike.classList.contains('active'))
        spellLike.classList.remove('active')
    if (antonyms.classList.contains('active'))
        antonyms.classList.remove('active')
    let word = searchElement.querySelector('input').value.replace(/\s+/g, ' ');
    resultElement.innerHTML = ''
    fetchApi(word);
})

spellLike.addEventListener('click', e => {
    if (!spellLike.classList.contains('active'))
        spellLike.classList.add('active')
    if (meanLike.classList.contains('active'))
        meanLike.classList.remove('active')
    if (antonyms.classList.contains('active'))
        antonyms.classList.remove('active')
    let word = searchElement.querySelector('input').value.replace(/\s+/g, ' ');
    resultElement.innerHTML = ''
    fetchApi(word);
})

antonyms.addEventListener('click', e => {
    if (!antonyms.classList.contains('active'))
        antonyms.classList.add('active')
    if (spellLike.classList.contains('active'))
        spellLike.classList.remove('active')
    if (meanLike.classList.contains('active'))
        meanLike.classList.remove('active')
    let word = searchElement.querySelector('input').value.replace(/\s+/g, ' ');
    resultElement.innerHTML = ''
    fetchApi(word);
})