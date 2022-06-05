const shortenButton = document.getElementById('shorten-button')
const input = document.getElementById('link-input')
const linksToCopy = document.getElementById('links-to-copy');

// window.onload = () =>{
//     console.log(localStorage.getItem('link'));
//     let element = localStorage.getItem('link');
//     linksToCopy.append(element);
// }

shortenButton.addEventListener('click', ()=>{
    const inputValue = input.value;
    const url = `https://api.shrtco.de/v2/shorten?url=${inputValue}`;
    fetch(url)
    .then(respone => respone.json())
    .then(data =>{
        displayLink(data);
    })
    .catch(error => {
        throw error;
    })
})

function createFullLinkElement(link){
    let p = document.createElement('p');
    p.textContent = link;
    return p;
}

function createDivWithShrtLinkAndButon(shrtLink){
    let div = document.createElement('div');
    let p = document.createElement('p');
    let button = document.createElement('button');
    p.textContent = shrtLink;
    button.textContent = 'Copy';

    div.append(p);
    div.append(button);

    div.classList.add('d-flex');
    p.classList.add('me-5', 'shrt-color', 'align-self-center');
    button.classList.add('rounded', 'text-white', 'fw-bold', 'py-2', 'px-4')
    return div;
}
function createDiv(pEl, dEl){
    let div = document.createElement('div');
    div.append(pEl);
    div.append(dEl);
    div.classList.add('bg-white', 'rounded', 'fw-bold','d-flex', 'flex-row', 'justify-content-between', 'py-2', 'px-4', 'mt-3', 'align-items-center');
    localStorage.setItem('link', div.innerHTML);
    return div;
}

function displayLink(data){
    console.log(data);
    let linkElement = createFullLinkElement(input.value);
    let divWithLink = createDivWithShrtLinkAndButon(data.result.full_short_link);
    let div = createDiv(linkElement, divWithLink);
    linksToCopy.append(div);
}