document.addEventListener('DOMContentLoaded',()=>{
    const submitForm = document.getElementById('inputBook');
    const searchField = document.getElementById('searchBook')
    submitForm.addEventListener('submit',event=>{
        event.preventDefault();
        addBook()
    })

    if(isStorageExist()){
        loadData();
    }

    //search book by input
    document.getElementById('searchBook').addEventListener('keyup',()=> searchBook())

    //hide confirm box popup when close button clicked
    document.querySelector('.close').addEventListener('click',()=> hideConfirmBox())
    
})
document.addEventListener('ondatasaved',()=> console.log('Data berhasil tersimpan'))
  
document.addEventListener('ondataloaded',()=> refreshData())

