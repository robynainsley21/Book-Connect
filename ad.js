//@ts-nocheck

import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js";

const searchButton = document.querySelector("[data-header-search]");
const cancelSearch = document.querySelector("[data-search-cancel]");
const settingsButton = document.querySelector("[data-header-settings]");
const settingsCancel = document.querySelector("[data-settings-cancel]");
const dataListItems = document.querySelector("[data-list-items]");
const moreButton = document.querySelector("[data-list-button]");
const themeSettings = document.querySelector('[data-settings-theme]')
const saveSettings = document.querySelector("[data-settings-form]");
const themeChoice = document.querySelector("[data-settings-theme]");
const searchForm = document.querySelector('[data-search-form]')
const searchGenres = document.querySelector("[data-search-genres]");
const authorsOptions = document.querySelector("[data-search-authors]");
console.log(saveSettings);
console.log(settingsCancel)


let matches = books
let page = 1;
const range = [0, BOOKS_PER_PAGE];

if (!books && !Array.isArray(books)) throw new Error('Source required') 
if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')

const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}

let fragment = document.createDocumentFragment()
const extracted = books.slice(0, 36)

for (const book of extracted) {
  const { author: authorId, id, image, title } = book;

  let preview = document.createElement("button");
        preview.classList = 'preview'
        preview.setAttribute('data-preview', id)
        preview.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[authorId]}</div>
            </div>
        `;

  fragment.appendChild(preview);
}

dataListItems.appendChild(fragment)

searchButton.addEventListener("click", (event) => {
    document.querySelector("[data-search-overlay]").showModal();
    document.querySelector("[data-search-title]").focus();
//   data - search - title.focus();
}); 

cancelSearch.addEventListener("click", (event) => {
  document.querySelector("[data-search-overlay]").close();
});

settingsButton.addEventListener('click', (event) => {
    document.querySelector("[data-settings-overlay]").showModal();
})

settingsCancel.addEventListener('click', () => {
    document.querySelector("[data-settings-overlay]").close();
})

moreButton.innerHTML = /* html */
    `<span>Show more</span>
    <span class="list__remaining">${
      matches.length - [page * BOOKS_PER_PAGE] > 0
        ? matches.length - [page * BOOKS_PER_PAGE]
        : 0
}</span>`;
      
const createPreviewsFragment = (matches, start = (page * BOOKS_PER_PAGE), end = (page + 1) * BOOKS_PER_PAGE) => {
    let extracted = matches.slice(start, end);
    page += 1
    for (const book of extracted) {
      const { author: authorId, id, image, title } = book;

      let preview = document.createElement("button");
      preview.classList = "preview";
      preview.setAttribute("data-preview", id);
      preview.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[authorId]}</div>
            </div>
        `;

      fragment.appendChild(preview);
    }
    return fragment
};

console.log(createPreviewsFragment(matches))

moreButton.addEventListener('click', () => {
    dataListItems.appendChild(createPreviewsFragment(matches))
    moreButton.textContent = `Show more (${books.length - (BOOKS_PER_PAGE * page)})`;
    if (matches.length - page * BOOKS_PER_PAGE <= 0) {
        moreButton.disabled = true;
        moreButton.textContent = `Show more (0)`;
    } else {moreButton.disabled = false;}
}) 

themeSettings.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';

console.log(themeChoice.value)

saveSettings.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log(themeChoice.value)
    if (themeChoice.value === 'day') {
        document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
        document.documentElement.style.setProperty("--color-light", "255, 255, 255");
    } else if (themeChoice.value === "night") {
        document.documentElement.style.setProperty("--color-dark", "255, 255, 255");
        document.documentElement.style.setProperty("--color-light", "10, 10, 20");
    }
    document.querySelector("[data-settings-overlay]").close();
})

const genresList = document.createDocumentFragment()
let elementGenre = 'All Genres'
searchGenres.innerHTML = `<option>${elementGenre}</option>`

searchGenres.appendChild(genresList);

for (let [genreID, genreName] of Object.entries(genres)) {
    let genreOption = document.createElement("option");
    genreOption.innerText = `${genreName}`
    // document.createElement('option')
    genreOption.value = genreID
    // element.innerText = text
    genresList.appendChild(genreOption)
}
searchGenres.appendChild(genresList);

const authorList = document.createDocumentFragment()
let elementAuthors = 'All Authors'
authorsOptions.innerHTML = `<option>${elementAuthors}</option>`;

for (let [id, name] of Object.entries(authors)) {
    let authorOption = document.createElement('option')
    authorOption.innerText = `${name}`
    authorOption.value = id
    authorList.appendChild(authorOption)
}

authorsOptions.appendChild(authorList)


// data-settings-form.submit() { actions.settings.submit }
// data-list-close.click() { data-list-active.open === false }



// data-search-form.click(filters) {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const filters = Object.fromEntries(formData)
//     result = []

//     for (book; booksList; i++) {
//         titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
//         authorMatch = filters.author = 'any' || book.author === filters.author

//         {
//             genreMatch = filters.genre = 'any'
//             for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true }}}
//         }

//         if titleMatch && authorMatch && genreMatch => result.push(book)
//     }

//     if display.length < 1 
//     data-list-message.class.add('list__message_show')
//     else data-list-message.class.remove('list__message_show')
    

//     data-list-items.innerHTML = ''
//     const fragment = document.createDocumentFragment()
//     const extracted = source.slice(range[0], range[1])

//     for ({ author, image, title, id }; extracted; i++) {
//         const { author: authorId, id, image, title } = props

//         element = document.createElement('button')
//         element.classList = 'preview'
//         element.setAttribute('data-preview', id)

//         element.innerHTML = /* html */ `
//             <img
//                 class="preview__image"
//                 src="${image}"
//             />
            
//             <div class="preview__info">
//                 <h3 class="preview__title">${title}</h3>
//                 <div class="preview__author">${authors[authorId]}</div>
//             </div>
//         `

//         fragment.appendChild(element)
//     }
    
//     data-list-items.appendChild(fragments)
//     initial === matches.length - [page * BOOKS_PER_PAGE]
//     remaining === hasRemaining ? initial : 0
//     data-list-button.disabled = initial > 0

//     data-list-button.innerHTML = /* html */ `
//         <span>Show more</span>
//         <span class="list__remaining"> (${remaining})</span>
//     `

//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     data-search-overlay.open = false
// }

// data-settings-overlay.submit; {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const result = Object.fromEntries(formData)
//     document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
//     document.documentElement.style.setProperty('--color-light', css[result.theme].light);
//     data-settings-overlay).open === false
// }

// data-list-items.click() {
//     pathArray = Array.from(event.path || event.composedPath())
//     active;

//     for (node; pathArray; i++) {
//         if active break;
//         const previewId = node?.dataset?.preview
    
//         for (const singleBook of books) {
//             if (singleBook.id === id) active = singleBook
//         } 
//     }
    
//     if !active return
//     data-list-active.open === true
//     data-list-blur + data-list-image === active.image
//     data-list-title === active.title
    
//     data-list-subtitle === '${authors[active.author]} (${Date(active.published).year})'
//     data-list-description === active.description
// }