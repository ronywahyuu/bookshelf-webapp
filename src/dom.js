'use strict'

const bookID = 'book_id'
const overlay = document.querySelector('.overlay');
const confirmPopupBox = document.querySelector('.confirmation');

const incompleteBookshelf = document.getElementById('incompleteBookshelfList');
const completeBookshelf = document.getElementById('completeBookshelfList')


//function expression&arrow func to handle all process
//========================================,=
const addBook = ()=>{
    let titleInput = document.getElementById('inputBookTitle').value
    const authorInput = document.getElementById('inputBookAuthor').value
    const yearInput = document.getElementById('inputBookYear').value;
    const isCompleteInput = document.getElementById('inputBookIsComplete').checked;

    const bookContainer = makeBookContainer(
        titleInput,
        authorInput,
        yearInput,
        isCompleteInput
    )

    if(isCompleteInput){
        const bookObj = storeBookObject(titleInput, authorInput,yearInput, true)
        bookContainer[bookID] = bookObj.id
        books.push(bookObj);
        updateData();
        completeBookshelf.append(bookContainer)
    }else{
        const bookObj =storeBookObject(titleInput, authorInput,yearInput, false)
        bookContainer[bookID] = bookObj.id
        books.push(bookObj)
        updateData()
        incompleteBookshelf.append(bookContainer)
    }
}

const createButton = (buttonClass, textValue, eventListener)=>{
    const button = document.createElement('button');
    button.classList.add(buttonClass)
    button.innerHTML = textValue
    button.addEventListener('click',(event)=>{
        eventListener(event);
    })
    return button;
}

const finishButton = () =>{
    return createButton('green', 'Selesai Dibaca',(event)=>{
        addBookToComplete(event.target.parentElement)
    })
}

const unfinishedButton =() =>{
    return createButton('green', 'Belum Selesai Dibaca',(event)=>{
        addBookToIncomplete(event.target.parentElement)
    })
}

const deleteButton =() =>{
    return createButton('red', 'Hapus Buku',(event)=>{
        removeBook(event.target.parentElement)
    })
}

const makeBookContainer = (title, author, year, isComplete)=>{
    //button
    const finishedBtn = finishButton();
    const unFinishedBtn = unfinishedButton();
    const removeBtn = deleteButton();

    const titleEl = document.createElement('h3');
    titleEl.innerHTML = title

    const authorEl = document.createElement('p')
    authorEl.innerHTML = author;

    const yearEl = document.createElement('p')
    yearEl.innerHTML = year

    const ActionButtonDiv = document.createElement('div');
    ActionButtonDiv.classList.add('action')

    if(isComplete){
        ActionButtonDiv.append(unFinishedBtn, removeBtn)
    }else{
        ActionButtonDiv.append(finishedBtn,removeBtn);
    }
    
    const container = document.createElement('article');
    container.classList.add('book_item');
    container.append(titleEl,authorEl, yearEl, ActionButtonDiv)

    return container;
}

const addBookToComplete = taskElement=>{
    const title = taskElement.parentElement.querySelector('h3').innerHTML;

    const author = taskElement.parentElement.querySelectorAll('p')[0].innerHTML;

    const year = taskElement.parentElement.querySelectorAll('p')[1].innerHTML;

    const newBook = makeBookContainer(title, author, year, true);

    const bookPosition = findBookData(taskElement.parentElement[bookID]);
    bookPosition.isComplete = true;
    newBook[bookID] = bookPosition.id;

    completeBookshelf.append(newBook)
    taskElement.parentElement.remove()
    updateData()
}



const addBookToIncomplete = taskElement=>{
    const title = taskElement.parentElement.querySelector('h3').innerHTML;

    const author = taskElement.parentElement.querySelectorAll('p')[0].innerHTML;

    const year = taskElement.parentElement.querySelectorAll('p')[1].innerHTML;

    const newBook = makeBookContainer(title, author, year, false);

    const bookPosition = findBookData(taskElement.parentElement[bookID]);
    bookPosition.isComplete = false;
    newBook[bookID] = bookPosition.id;

    incompleteBookshelf.append(newBook)
    taskElement.parentElement.remove()
    updateData()

}

const showConfirmBox = function(){
    confirmPopupBox.classList.remove('hidden');
    document.querySelector('.confirm').classList.add('show-book')
    overlay.classList.remove('hidden');
}

const hideConfirmBox = function(){
   confirmPopupBox.classList.add('hidden');
   overlay.classList.add('hidden');
}

const removeBook = function(taskElement){
    showConfirmBox();

    document.querySelector('.confirmYesBtn').addEventListener('click',function(){
        const element = taskElement.parentElement;
        element.classList.add(('remove-book'));
        if(this == this){
            const bookPosition = findIndex(taskElement.parentElement[bookID])
            setTimeout(() => {
                hideConfirmBox();
                element.remove();
                books.splice(bookPosition,1);
                updateData()
                location.reload()
            }, 500);
        }
    })
    document.querySelector('.confirmNoBtn').addEventListener('click',function(){
        if(this == this) hideConfirmBox()
    })
}

const searchBook = function(){
    const searchField = document.getElementById('searchBookTitle')
    let search = searchField.value.toUpperCase();

    const bookAll = document.querySelectorAll('.book_item')

    bookAll.forEach(bookInfo=>{
        const titleItem = bookInfo.firstChild.innerHTML.toUpperCase();
        const authorItem = bookInfo.children[1].innerHTML.toUpperCase();
        const yearItem = bookInfo.children[2].innerHTML;

        if(titleItem.indexOf(search) == -1 && authorItem.indexOf(search) == -1 && yearItem.indexOf(search) == -1){ 
            bookInfo.classList.add('hidden');
        }
        else {
            bookInfo.classList.remove('hidden');
        }
    })
}

