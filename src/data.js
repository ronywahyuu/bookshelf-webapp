const storage_key = "BOOKS_DATA";
let books = [];

const isStorageExist = () => typeof localStorage !== "undefined";

const storeBookObject = function (title, author, year, isComplete ){
    return {
        id  : +new Date(),
        title : title,
        author : author,
        year : year,
        isComplete : isComplete
    }
}

const itemCount = function(){
    const itemIncompleteCount = document.querySelector('.item-incomplete-count')
    const itemCompleteCount = document.querySelector('.item-complete-count')

    itemIncompleteCount.innerHTML =  `(${books.filter(item=>{
        return item.isComplete == false;
    }).length} item)`

    itemCompleteCount.innerHTML = `(${books.filter(item=>{
        return item.isComplete;
    }).length} item)`
}

const saveData = () => {
    const saveEvent = new Event('ondatasaved');

    if(isStorageExist){
        localStorage.setItem(storage_key, JSON.stringify(books));
    }
    itemCount()   
    document.dispatchEvent(saveEvent)
};


const updateData = ()=> saveData();

const loadData = ()=>{
    const loadedData = new Event('ondataloaded');
    let data = JSON.parse(localStorage.getItem(storage_key));

    if(data != null){
        books = data;
    }
    itemCount()
    document.dispatchEvent(loadedData);
}

const refreshData =()=>{
   
    for(book of books){
        const newBooks = makeBookContainer(book.title, book.author, book.year, book.isComplete)
    
        newBooks[bookID] = book.id;
        
        if(book.isComplete){
            completeBookshelf.append(newBooks)
        }else{
            incompleteBookshelf.append(newBooks);
        }
    }
}

const findIndex = (id)=>{
    let index = 0;
    for(book of books){
        if(book.id == id){
            return index;
        }
        index++;
    }
    return -1;
}

const findBookData =(id)=>{
    for(book of books){
        if(book.id === id){
            return book;
        }
    }
}