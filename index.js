const shortenButton = document.getElementById('shorten-button')
const input = document.getElementById('link-input')
const linksToCopy = document.getElementById('links-to-copy');

window.onload = () => {
    const links = getLinksFromLocalStorage();
    links.forEach(link => {
        displayLink(link.shrtLink, link.fullLink)
    });
}

shortenButton.addEventListener('click', () => {
    eventHandler();
});
input.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        eventHandler();
    }
});
function eventHandler() {
    const inputValue = input.value;
    if (urlValidation(inputValue)) {
        input.classList.remove('invalid-url');
        document.getElementById('invalid-url-message').style.display = "none";
        const url = `https://api.shrtco.de/v2/shorten?url=${inputValue}`;
        fetch(url)
            .then(respone => respone.json())
            .then(data => {
                saveToLocal(data.result.full_short_link, inputValue);
                displayLink(data.result.full_short_link, inputValue);
                input.value = '';
            })
            .catch(error => {
                throw error;
            })
    }
    else{
        input.classList.add('invalid-url');
        document.getElementById('invalid-url-message').style.display = "block";
    }
}

function getLinksFromLocalStorage() {
    let existingLinks = []
    if (localStorage.getItem('links') !== null) {
        existingLinks = JSON.parse(localStorage.getItem('links'));
    }
    return existingLinks;
}

function saveToLocal(shrtLink, fullLink) {
    let links = { shrtLink, fullLink }
    let existingLinks = getLinksFromLocalStorage();
    existingLinks.push(links);
    localStorage.setItem('links', JSON.stringify(existingLinks));
}

function createFullLinkElement(link) {
    let p = document.createElement('p');
    p.textContent = link;
    return p;
}

function createDivWithShrtLinkAndButon(shrtLink) {
    let div = document.createElement('div');
    let p = document.createElement('p');
    let button = document.createElement('button');
    p.textContent = shrtLink;
    button.textContent = 'Copy';

    div.append(p);
    div.append(button);

    div.classList.add('d-flex', 'flex-column', 'flex-sm-row', 'sm-margin2');
    p.classList.add('me-5', 'shrt-color', 'align-self-center');
    button.classList.add('rounded', 'text-white', 'fw-bold', 'py-2', 'px-4')
    return div;
}
function createDiv(pEl, dEl) {
    let div = document.createElement('div');
    div.append(pEl);
    div.append(dEl);
    div.classList.add('bg-white', 'rounded', 'fw-bold', 'd-flex', 'flex-column', 'flex-sm-row', 'justify-content-between', 'py-2', 'px-4', 'mt-3', 'align-items-center');

    return div;
}

function displayLink(shrtLink, fullLink) {
    let linkElement = createFullLinkElement(fullLink);
    let divWithLink = createDivWithShrtLinkAndButon(shrtLink);
    let div = createDiv(linkElement, divWithLink);
    linksToCopy.append(div);
}
function urlValidation(url) {
    return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(url)
}