import { BOOKS_PER_PAGE, authors, genres, books } from './data.js'
// ininitialised variables assigned them
const matches = books //books (from data.js) is an array of books (that are nested objects) 
const page = 1 //why is this 1?

if (!matches && !Array.isArray(matches)) { /* testing if books exists */
    throw new Error('Source required') 
}

if (!matches && matches.length < 2){ //
    throw new Error('Range must be an array with two numbers')
} 


console.log(!matches && matches.length < 2 )


//rgb for toggle option for used to be able to choose between dark and light mode
let day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

let night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}


// // LOGIC TO DISPLAY BOOKS

const fragment = document.createDocumentFragment()
const extractedMatches = matches.slice(0, 36) //gets all the objects from books
const { author, image, title, id } = matches //gets properties from books objects; correctly retrieved??

for (let i = 0; matches[i] < extractedMatches.length; i++) { /* b takes the info from each property in matches and sets it to 'preview' */
    //THERES SOMETHING MISSING HERE

    //(const { author, image, title, id } = matches; extracted; i++) //original loop content

    //creates a child element that mimics the content of the matches object and appends to the created fragment
    const preview = {
        author,
        id,
        image,
        title
    }

    return fragment.appendChild(preview) //return added 
}

const dataListItems = document.querySelector('[data-list-items]')
dataListItems.appendChild(fragment) //fragment containing books to be appended onto element [data-list-items]

console.log(extractedMatches)


// //  LOGIC TO DISPLAY GENRES

// const genresFragment = document.createDocumentFragment() //previously uninitialised
// const genreElement = document.createElement('option') //type of html element

// //have to set element to sth i.o.t be appended to genres fragment
// genreElement.value = 'any'
// element = 'All Genres' //this might be a text element meant to display the string
// genresFragment.appendChild(element)


// for ([id, name]; Object.entries(genres); i++) {
//     document.createElement('option')
//     element.value = value
//     element.innerText = text
//     genres.appendChild(element)

//     //to be returned??
// }

// const dataSearchGenres = document.querySelector('[data-search-genres]').appendChild(genres)


// //LOGIC TO DISPLAY AUTHORS

// const authorsFragment = document.createDocumentFragment() //uninitialised
// const authorsElement = document.createElement('option') //element to contain
// element.value = 'any'
// element.innerText = 'All Authors'
// authorsFragment.appendChild(element)

// for ([id, name];Object.entries(authors); id++) {
//     document.createElement('option')
//     element.value = value
//     element = text
//     authors.appendChild(element)
// }

// const dataSearchAuthors = document.querySelector('[data-search-authors]').appendChild(authors)


// //CONDITIONALS FOR SETTING LIGHT AND DARK MODE (DAY AND NIGHT)

// const dataSettingsTheme = document.querySelector('[data-settings-theme]')

// //what value needs to be accessed for it to be tested as true?
// dataSettingsTheme.value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
// v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' : 'day'

// dataSettingsTheme.style.setProperty('--color-dark', css[v].dark); //is v an object?; returns value of v
// dataSettingsTheme.style.setProperty('--color-light', css[v].light);


// const dataListButton = document.querySelector('[data-list-button]')
// // dataListButton.innerHTML = "Show more (books.length - BOOKS_PER_PAGE)" //see row 111

// dataListButton.disabled = !(matches.length - [page * BOOKS_PER_PAGE] > 0) //other way around? disables button if conditional is true

// dataListButton.innerHTML = //previously an array 
//     `
//     <span> Show more ${books.length - BOOKS_PER_PAGE}</span>
//     <span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>
//     `



// //LOGIC FOR EVENT LISTENERS    
// const dataSearchCancel = document.querySelector('[data-search-cancel]') //button
// const dataSearchOverlay = document.querySelector('[data-search-overlay]')
// dataSearchCancel.addEventListener(
//     'click', 
//     () => { 
//         dataSearchOverlay.open === false 
//         }
//     )

// // data-search-cancel.click() { data-search-overlay.open === false } //previously

// const dataSettingsCancel = document.querySelector('[data-settings-cancel]')
// const dataSettingsOverlay = document.querySelector('[data-settings-overlay]')
// dataSettingsCancel.addEventListener(
//     'click', 
//     () => {
//         dataSettingsOverlay.open === false
//     }
// ) 
// //data-settings-cancel.click() { querySelect(data-settings-overlay).open === false } //previously


// // data-settings-form.submit() { actions.settings.submit } //search 'submit' event listener

// const dataListClose = document.querySelector('[data-list-close]')
// const dataListActive = document.querySelector('[data-list-active]')
// dataListClose.addEventListener(
//     'click',
//     () => { 
//         dataListActive.open === false 
//     }
// )
// // data-list-close.click() { data-list-active.open === false } //previously


// // const dataListButton = document.querySelector('[data-list-button]') //already declared
// // const dataListItems = document.querySelector([data-list-items]) //already declared at line 50
// dataListItems.addEventListener(
//     'click',
//     () => { //what does the following mean? 
//         actions.list.updateRemaining()
//         page = page + 1
//     }
// )
// // data-list-button.click() {
// //     dataListItems.appendChild(createPreviewsFragment(matches, page x BOOKS_PER_PAGE, {page + 1} x BOOKS_PER_PAGE]))
// //     actions.list.updateRemaining()
// //     page = page + 1
// // }

// const dataHeaderSearch = document.querySelector('[data-header-search]')
// const dataSearchTitle = document.querySelector('[data-search-title]')
// dataSearchOverlay.addEventListener(
//     'click',
//     () => {
//         dataSearchOverlay.open === true
//         dataSearchTitle.focus()
//     }
// )
// // data-header-search.click() {
// //     data-search-overlay.open === true ;
// //     data-search-title.focus();
// // }

// const dataSearchForm = document.addEventListener('[data-search-form]')
// dataSearchForm.addEventListener(
//     'click', 
//     () => {
//         preventDefault()
//         const formData = new FormData(event.target)
//         const filters = Object.fromEntries(formData)
//         result = []
    
//         for (book; booksList; i++) {
//             titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
//             authorMatch = filters.author = 'any' || book.author === filters.author
    
//             {
//                 genreMatch = filters.genre = 'any'
//                 for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true }}}
//             }
    
//             if titleMatch && authorMatch && genreMatch => result.push(book)
//         }
    
//         if (display.length < 1){
//             data-list-message.class.add('list__message_show')
//         } else {
//             data-list-message.class.remove('list__message_show')

//         }
        
//         dataListItems.innerHTML = ''
//         // const fragment = document.createDocumentFragment()
//         // const extracted = source.slice(range[0], range[1])
    
//         for ({ author, image, title, id }; extracted; i++) {
//             const { author: authorId, id, image, title } = props
    
//             element = document.createElement('button')
//             element.classList = 'preview'
//             element.setAttribute('data-preview', id)
    
//             element.innerHTML = /* html */ `
//                 <img
//                     class="preview__image"
//                     src="${image}"
//                 />
                
//                 <div class="preview__info">
//                     <h3 class="preview__title">${title}</h3>
//                     <div class="preview__author">${authors[authorId]}</div>
//                 </div>
//             `
    
//             fragment.appendChild(element)
//         }
        
//         data-list-items.appendChild(fragments)
//         initial === matches.length - [page * BOOKS_PER_PAGE]
//         remaining === hasRemaining ? initial : 0
//         data-list-button.disabled = initial > 0
    
//         data-list-button.innerHTML = /* html */ `
//             <span>Show more</span>
//             <span class="list__remaining"> (${remaining})</span>
//         `
    
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//         data-search-overlay.open === false
//     }
// )
// //PREVIOUS CODE
// // // data-search-form.click(filters) {
// // //     preventDefault()
// // //     const formData = new FormData(event.target)
// // //     const filters = Object.fromEntries(formData)
// // //     result = []

// // //     for (book; booksList; i++) {
// // //         titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
// // //         authorMatch = filters.author = 'any' || book.author === filters.author

// // //         {
// // //             genreMatch = filters.genre = 'any'
// // //             for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true }}}
// // //         }

// // //         if titleMatch && authorMatch && genreMatch => result.push(book)
// // //     }

// // //     if display.length < 1 
// // //     data-list-message.class.add('list__message_show')
// // //     else data-list-message.class.remove('list__message_show')
    

// // //     data-list-items.innerHTML = ''
// // //     // const fragment = document.createDocumentFragment()
// // //     // const extracted = source.slice(range[0], range[1])

// // //     for ({ author, image, title, id }; extracted; i++) {
// // //         const { author: authorId, id, image, title } = props

// // //         element = document.createElement('button')
// // //         element.classList = 'preview'
// // //         element.setAttribute('data-preview', id)

// // //         element.innerHTML = /* html */ `
// // //             <img
// // //                 class="preview__image"
// // //                 src="${image}"
// // //             />
            
// // //             <div class="preview__info">
// // //                 <h3 class="preview__title">${title}</h3>
// // //                 <div class="preview__author">${authors[authorId]}</div>
// // //             </div>
// // //         `

// // //         fragment.appendChild(element)
// // //     }
    
// // //     data-list-items.appendChild(fragments)
// // //     initial === matches.length - [page * BOOKS_PER_PAGE]
// // //     remaining === hasRemaining ? initial : 0
// // //     data-list-button.disabled = initial > 0

// // //     data-list-button.innerHTML = /* html */ `
// // //         <span>Show more</span>
// // //         <span class="list__remaining"> (${remaining})</span>
// // //     `

// // //     window.scrollTo({ top: 0, behavior: 'smooth' });
// // //     data-search-overlay.open === false
// // // }

// // data-settings-overlay.submit; {
// //     preventDefault()
// //     const formData = new FormData(event.target)
// //     const result = Object.fromEntries(formData)
// //     document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
// //     document.documentElement.style.setProperty('--color-light', css[result.theme].light);
// //     data-settings-overlay).open === false
// // }

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
