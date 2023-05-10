import { BOOKS_PER_PAGE, authors, genres, books } from './data.js'
// ininitialised variables assigned them
const matches = books //books (from data.js) is an array of books (that are nested objects) 
const page = 1;

if (!matches && !Array.isArray(matches)) { /* testing if books exists */
    throw new Error('Source required') 
}

if (!matches && matches.length < 2){ 
    throw new Error('Range must be an array with two numbers')
} 


//rgb for toggle option for used to be able to choose between dark and light mode
const theme = {
    day : {
        dark: '10, 10, 20',
        light: '255, 255, 255',
    },
    
    night : {
        dark: '255, 255, 255',
        light: '10, 10, 20',
    }
}

//CLICKABLE ELEMENTS AND POPUP BOXES

const dataSearchOverlay = document.querySelector('[data-search-overlay]');//search dialog box to be made visible
const dataHeaderSearch = document.querySelector('[data-header-search]'); //button for search box
const dataSearchTitle = document.querySelector('[data-search-title]'); //title input
const dataSearchCancel = document.querySelector('[data-search-cancel]'); //button to close search box
const dataSearchGenres = document.querySelector('[data-search-genres]'); //input to search genre
const dataSearchAuthors = document.querySelector('[data-search-authors]') //input to search author
const dataHeaderSettings = document.querySelector('[data-header-settings]'); //search button for author, genre and title
const dataSearchForm = document.querySelector('[data-search-form]') //form element


const dataSettingsOverlay = document.querySelector('[data-settings-overlay]'); //pop-up box for theme settings
const dataSettingsForm = document.querySelector('[data-settings-form]'); //form element
const dataSettingsCancel = document.querySelector('[data-settings-cancel]'); //cancel button
const dataSettingsTheme = document.querySelector('[data-settings-theme]'); //input for night and day


const dataListItems = document.querySelector('[data-list-items]'); //all books
const dataListClose = document.querySelector('[data-list-close]'); //close button
const dataListActive = document.querySelector('[data-list-active]'); //reveals overlay for book preview
const dataListBlur = document.querySelector('[data-list-blur]'); 
const dataListButton = document.querySelector('[data-list-button]'); //button to display amount of books to filter through
const dataListMessage = document.querySelector('[data-list-message]')


// LOGIC TO DISPLAY BOOKS

const fragmentMatches = document.createDocumentFragment();
const extractedMatches = matches.slice(0, 36); //gets all the objects from books

//creating the content for the books first
const revealBookPreview = (matches) => {
    const { author, id, image, title } = matches //extracting the properties of the objects in the matches array
    const bookElement = document.createElement('div') //creating a piece of html to attach content to (was none previously)

    bookElement.classList.add('preview'); //adding the class 'preview' from css file to apply styling
    
    bookElement.innerHTML = 
    `
    <div class="preview__info">
        <h3 class="preview__title">${title}<h3> 
        <div class="preview__author">${author}</div>
    </div>

    <img class="preview__image" src="${image}"/>
    `;

    return bookElement;
}

//looping through each item in the selected objects in extractedMatches and appending created html content from revealBookPreview
for (const book of extractedMatches){
    const bookPreview = revealBookPreview(book)
    dataListItems.appendChild(bookPreview); //fragment containing books to be appended onto element [data-list-items]
}


// LOGIC TO DISPLAY GENRES IN SEARCH BOX

const genresFragment = document.createDocumentFragment(); //fragment for genres to be appended to
const genresElement = document.createElement('option'); //type of html element

//have to set element to sth i.o.t be appended to genres fragment; fallback for if loop does not exist
genresElement.value = 'any';
genresElement.innerText = 'All Genres'; //The value property sets or returns the value of the value attribute of a text field.
genresFragment.appendChild(genresElement); //why is it being appended here and then in the loop again?

for ( const [ id, name ] of Object.entries(genres) ) {
    const genreOption = document.createElement('option')
    genreOption.value = id;
    genreOption.innerText = name;
    genresFragment.appendChild(genreOption); //after every loop genresElement is appended to genresFragment
};

dataSearchGenres.appendChild(genresFragment)


//LOGIC TO DISPLAY AUTHORS IN SEARCH BOX

const authorsFragment = document.createDocumentFragment();
const authorsElement = document.createElement('option'); //element to contain loop content
authorsElement.value = 'any';
authorsElement.innerText = 'All Authors';
authorsFragment.appendChild(authorsElement);

for ( const [ id, name ] of Object.entries(authors) ) {
    const authorsOption = document.createElement('option');
    authorsOption.value = id;
    authorsOption.innerText = name;
    authorsFragment.appendChild(authorsOption);
};

dataSearchAuthors.appendChild(authorsFragment)


//CONDITIONALS FOR SETTING LIGHT AND DARK MODE (DAY AND NIGHT)

//window.matchMedia returns a new MediaQueryList object that can then be used to determine if the document matches the media query string, 
//as well as to monitor the document to detect when it matches (or stops matching) that media query.
dataSettingsTheme.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
const v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'

dataSettingsTheme.style.setProperty('--color-dark', theme[v].dark); // returns value of v
dataSettingsTheme.style.setProperty('--color-light', theme[v].light);


//LOGIC FOR CHANGING TO NEXT PAGE


if (matches.length - [page * BOOKS_PER_PAGE] <= 0){//disables button if conditional is true
    dataListButton.disabled = true;
    
} else {
    dataListButton.innerHTML = //previously an array 
    `
    <span>Show more</span>
    <span class="list__remaining">(${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : ''})</span>
    `
};


//LOGIC FOR EVENT LISTENERS    

//creating logic for preview of books
//LOGIC FOR FILTER SEARCH OVERLAY
const remaining = () => {
    let initial = matches.length - (page * BOOKS_PER_PAGE)
    let hasRemaining = hasRemaining ? initial : 0
    if (hasRemaining === 0) {
        dataListButton.disabled = true;
    }
}

//logic to retrieve book as requested or searched by user
dataSearchForm.addEventListener(
    'click', 
    (event) => {
        event.preventDefault()
        const formData = new FormData(dataSearchForm);
        const filters = Object.fromEntries(formData);
        let result = [];
    
        for (const book of matches) {
            let titleMatch = true;
            let authorMatch = true;
            let genreMatch = true;

            if (filters.title) {
                titleMatch = book.title.toLowerCase().trim().includes(filters.title.toLowerCase());
            }

            if (filters.author !=='any') {
                authorMatch = authors[book.author].includes(filters.author);
            }
    
            if (filters.genre !== 'any') {
                for (const genre of book.genres) { 
                    genreMatch = genres[genre].includes(filters.genre);
                }
            }
            
    
            if (titleMatch && authorMatch && genreMatch) {
                result.push(book)
            } 
        }
    
        if (result.length < 1){
            dataListMessage.classList.add('list__message_show');
        } else {
            dataListMessage.classList.remove('list__message_show');
        }
        
        dataListItems.innerHTML = ''
        const fragmentForPreview = document.createDocumentFragment()
        const extracted = source.slice(range[0], range[1])
    
        for (let i = 0; i < extracted.length; i++) {
            const { author: authorId, id, image, title } = props
    
            const buttonElement = document.createElement('button');
            buttonElement.classList.add = 'preview';
            buttonElement.setAttribute('data-preview', id)
    
            buttonElement.innerHTML = /* html */ `
                <img
                    class="preview__image"
                    src="${image}"
                />
                
                <div class="preview__info">
                    <h3 class="preview__title">${title}</h3>
                    <div class="preview__author">${authors[authorId]}</div>
                </div>
            `
    
            fragment.appendChild(element)
        }
        
        dataListItems.appendChild(fragmentForPreview)
        
    
        dataListButton.innerHTML = /* html */ `
            <span>Show more</span>
            <span class="list__remaining"> (${remaining})</span>
        `
    
        window.scrollTo({ top: 0, behavior: 'smooth' });
        dataSearchOverlay.close();
    }
)



//when the dataHeaderSearch button is clicked, the dataSearchOverlay dialogue appears
dataHeaderSearch.addEventListener(
    'click', 
    () => {
        dataSearchOverlay.setAttribute('open', true);
        dataSearchTitle.focus(); //gives focus to an element (if it can be focused) immediately after the dom has been loaded
    }
)

//cancel button in search overlay closes box
dataSearchCancel.addEventListener(
    'click',
    () => {
        dataSearchOverlay.close();
    }
);

//revealing night or dark mode overlay when icon clicked
dataHeaderSettings.addEventListener(
    'click',
    () => {
        dataSettingsOverlay.showModal();
    }
);

//selecting night or dark mode
dataSettingsForm.addEventListener(
    'submit',
    () => { 
    
        if (dataSettingsTheme.value === 'day') {
            dataSettingsTheme.style.setProperty('--color-dark', theme.day.dark);
            dataSettingsTheme.style.setProperty('--color-light', theme.day.light);
        } else if (dataSettingsTheme.value === 'night') {
            dataSettingsTheme.style.setProperty('--color-dark', theme.night.dark);
            dataSettingsTheme.style.setProperty('--color-light', theme.night.light);
        }
    }
)

//closes night or dark mode box
dataSettingsCancel.addEventListener(  
    'click', 
    () => {
        dataSettingsOverlay.close()
    }
)

//closes preview overlay of book 
dataListClose.addEventListener(
    'click',
    () => { 
        dataListActive.close()
    }
)


//increments page to display more books (page containing certain amount of books gets incremented)
dataListItems.addEventListener(
    'click',
    () => { 
        dataListItems.appendChild(createPreviewsFragment(matches, (page * BOOKS_PER_PAGE), (page + 1) * BOOKS_PER_PAGE))
        actions.list.updateRemaining()
        page = page + 1
    }
)




