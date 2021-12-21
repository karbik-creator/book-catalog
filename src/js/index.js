import '../scss/style.scss'
import '../img/open-book.svg'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app"
import { deleteDoc, setDoc, doc, addDoc, onSnapshot, getFirestore, collection } from "firebase/firestore";


const firebaseApp = initializeApp({
  apiKey: "AIzaSyA-a92_xSG8wonlyn-GybUuCTRkwgETsKc",
  authDomain: "book-catalog-29aa4.firebaseapp.com",
  projectId: "book-catalog-29aa4",
  storageBucket: "book-catalog-29aa4.appspot.com",
  messagingSenderId: "999396800830",
  appId: "1:999396800830:web:b35471e5df861622ad146f",
  measurementId: "G-E1926JYJFQ"
});
const db = getFirestore(firebaseApp);
const catalogBooksReference = collection(db, "catalog");


let buttonsDelete, buttonsRedactor,buttonOpenCreateForm;
const backDrop = document.querySelector('.backdrop');
const forms = document.querySelectorAll('form');
const redactorForm = document.querySelector('[data-type="redactorForm"]');
const createForm = document.querySelector('[data-type="createForm"]');
const inputList = document.querySelectorAll('input');
const containerForBooks = document.querySelector('.group');
const containerForRecommend = document.querySelector('.recommend__content');
const selectForSort = document.querySelector('.select');
const selectInput = selectForSort.querySelector('.value')

let catalog = [];
let keys = ['Name', 'Author', 'Publication year', 'Rating', 'ISBN'];
let keysNumberValue = ['Publication year', 'Rating'];
let id;
let object = {};
let thisYear = new Date().getFullYear();

onSnapshot(catalogBooksReference, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      catalog.push({ ...change.doc.data(), id: change.doc.id });
    }
    if (change.type === "modified") {
      let index = catalog.findIndex(item => item.id === change.doc.id);
      catalog.splice(index, index + 1, { ...change.doc.data(), id: change.doc.id });
    }
    if (change.type === "removed") {
      let index = catalog.findIndex(item => item.id === change.doc.id);
      catalog.splice(index, index + 1);
    }
  });
  renderContent();
});
function setup() {
  buttonsDelete = document.querySelectorAll('[data-type="delete"]');
  buttonsRedactor = document.querySelectorAll('[data-type="redactor"]');
  buttonOpenCreateForm = document.querySelector('[data-type="openModal"]');
  buttonsRedactor.forEach(button => {
    button.addEventListener('click', fillDataForm)
  });
  buttonsDelete.forEach(button => {
    button.addEventListener('click', deleteBook)
  });
  buttonOpenCreateForm.addEventListener('click', () => {
  createForm.classList.add('open');
  backDrop.classList.add('active');
})
}
selectForSort.addEventListener('click', clickHandler)
backDrop.addEventListener('click', () => {
  createForm.classList.remove('open');
  redactorForm.classList.remove('open');
  backDrop.classList.remove('active');
})
inputList.forEach(item => {
  item.addEventListener('focusout', (e) => {
    if (controlValueInput(e.target.value, e.target.name)) {
      e.target.classList.add('error')
    } else {
      e.target.classList.remove('error')
    }
  })
})
forms.forEach(form => {
  form.addEventListener('reset', () => {
    form.classList.remove('open');
    backDrop.classList.remove('active');
    inputList.forEach(item => {
      item.classList.remove('error');
    })
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (form.dataset.type === 'redactorForm' && validationDateForm(form)) {
      redactorBook(form)
    }
    if (form.dataset.type === 'createForm' && validationDateForm(form)) {
      addBook(form);
      form.reset();
    }
  })
})
window.onload = ()=>{
  sessionStorage.removeItem('tipeSort')
}

function isEmpty(object) {
  for (const key in object) {
    object[key].length > 0 && object[key] !== ' ' ? object[key] : delete object[key];
  }
  keysNumberValue.forEach(key => {
    key in object ? object[key] = parseInt(object[key]) : object[key]
  })
  return Object.keys(object).length == 0
}

function controlValueInput(value, key) {
  if (key === 'Publication year') {
    let year = parseInt(value);
    return (year < 1800 || year > thisYear)
  }
  if (key === 'Rating') {
    let rating = Number(value);
    return (rating < 0 || rating > 10 || !Number.isInteger(rating))
  }
  if (key === 'Name' || key === 'Author') {
    return (value.length == 0 || value == ' ' || value.length > 100)
  }
}

function renderContent(tipeSort = 'Publication year') {
  if(sessionStorage.getItem('tipeSort') !== null){
    tipeSort = JSON.parse(sessionStorage.getItem('tipeSort'));
  }
  containerForBooks.innerHTML = '';
  containerForRecommend.innerHTML = '';
  containerForBooks.insertAdjacentHTML('afterbegin', getPatternBooks(sortBook(tipeSort), tipeSort));
  containerForRecommend.insertAdjacentHTML('beforeend', getPatternBooks(recommedBook(), 'recommend'));
  setup();
}

function getPatternBooks(catalog, tipeSort) {
  if (tipeSort === 'recommend'){
    const booksHtml = catalog.map(book => {
      return ` <div class="card-book">
      <img src="./img/open-book.svg">
      <div class="card-book__text">
          <div class="card-book__title">${book.Name}</div>
          <div class="card-book__author">${book.Author}</div>
          <div class="card-book__year"> <span>Publication year:</span> ${book['Publication year'] === undefined ? '-' : book['Publication year']}</div>
          <div class="card-book__raiting"><span>Rating:</span> ${book.Rating === undefined ? '-' : book.Rating}</div>
          <div class="card-book__ISBN">ISBN: ${book.ISBN === undefined ? '-' : book.ISBN}</div>
      </div>
      <div class="card-book__hover" data-index=${book.id}>
          <div class="buttons">
              <button class="btn" data-type="delete">delete</button>
              <button class="btn" data-type="redactor">edit</button>
          </div>
      </div>
  </div>`}).join('');
  
                  
    return booksHtml
  }else{
    const booksHtml = catalog.map(item => {
      return item.map(book=>{
        return ` <div class="card-book">
      <img src="./img/open-book.svg">
      <div class="card-book__text">
          <div class="card-book__title">${book.Name}</div>
          <div class="card-book__author">${book.Author}</div>
          <div class="card-book__year"> <span>Publication year:</span> ${book['Publication year'] === undefined ? '-' : book['Publication year']}</div>
          <div class="card-book__raiting"><span>Rating:</span>${book.Rating === undefined ? '-' : book.Rating}</div>
          <div class="card-book__ISBN">ISBN: ${book.ISBN === undefined ? '-' : book.ISBN}</div>
      </div>
      <div class="card-book__hover" data-index=${book.id}>
          <div class="buttons">
              <button class="btn" data-type="delete">delete</button>
              <button class="btn" data-type="redactor">edit</button>
          </div>
      </div>
  </div>`
      }).join('')}).join('');
      
  const groups = `<button type="button" class="btn btn-create" data-type='openModal'>
                  <span class="material-icons-outlined">add</span></button>
                  ${booksHtml}`;
    return groups
  }   
}

function clickHandler(event) {
  const { type } = event.target.dataset;
  if (type === 'select-input') {
    selectForSort.classList.toggle('open')
  }
  if (type === 'select-item') {
    sessionStorage.setItem('tipeSort', JSON.stringify(event.target.dataset.value));
    renderContent(event.target.dataset.value);
    selectInput.innerHTML = `group by ${event.srcElement.innerHTML}`;
    selectForSort.classList.remove('open')
  }
}

function deleteBook(event) {
  let id = event.target.offsetParent.dataset.index;
  deleteDoc(doc(catalogBooksReference, id))
}
function redactorBook(form) {
  setDoc(doc(catalogBooksReference, id), object)
    .then(() => {
      form.classList.remove('open');
      backDrop.classList.remove('active');
    }
    )
}
function addBook(form) {
  addDoc(catalogBooksReference, object)
    .then(() => {
      form.classList.remove('open');
      backDrop.classList.remove('active');
    }
    )
}
function fillDataForm(event) {
  id = event.target.offsetParent.dataset.index;
  let book = catalog.find(book => book.id === id);
  keys.forEach(key => {
    if (book[key] !== undefined) {
      redactorForm[key].value = book[key]
    }
  })
  redactorForm.classList.add('open');
  backDrop.classList.add('active');
}

function validationDateForm(form) {
  keys.forEach(key => {
    if (key === 'Author') {
      object[key] = form[key].value.trim();
    } else {
      object[key] = form[key].value;
    }
    controlValueInput(object[key], key) ? form[key].classList.add('error') : form[key].classList.remove('error')
  });

  if (!isEmpty(object) && form.querySelector('.error') === null) {
    return true
  }
  else {
    false
  }
}

function recommedBook() {
  let maxRating = 0;
  let recommedBook = catalog.filter(item => item['Publication year'] >= thisYear - 3);
  if (recommedBook.length > 1) {
    recommedBook.forEach(item => item.Rating >= maxRating ? maxRating = item.Rating : maxRating);
    recommedBook = recommedBook.filter(item => item.Rating >= maxRating);
  }
  if (recommedBook.length > 1) {
    let index = Math.floor(Math.random() * recommedBook.length);
    return recommedBook.slice(index, index + 1)
  }

  return recommedBook
}

function sortBook(tipeSort) {
  let books = [];
  let listDate = new Set();
  catalog.forEach(book => {
    listDate.add(book[tipeSort])
  });
  listDate = tipeSort === 'Author' ?
    Array.from(listDate).sort((a, b) => { return a < b ? -1 : 1 }) :
    Array.from(listDate).sort((a, b) => b - a);
  listDate.forEach(date => {
    books.push(catalog.filter(item => item[tipeSort] === date))
  })
  books.forEach(item => {
    if (item.length > 1) {
      item.sort((a, b) => {
        if (a.Name < b.Name) return -1
        if (a.Name > b.Name) return 1
      })
    }
  });
  return books
}



