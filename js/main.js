'use strict';
let bookName = document.getElementById('bookname');
let bookAuthor = document.getElementById('bookauthor');
let bookPrice = document.getElementById('bookprice');
let bookQuantity = document.getElementById('bookquantity');
let bookDiscount = document.getElementById('bookdiscount');
let searchInput = document.getElementById('searchinput');
let addBookBtn = document.getElementById('addbookbtn');
let addDiscountBtn = document.getElementById('adddiscountbtn');
let tbody = document.getElementById('tbody');
let currentIndex = 0 ;
let books = [];
if(localStorage.getItem('books') != null ){
    books = JSON.parse(localStorage.getItem('books'));
    displayBooks();    
}
addBookBtn.onclick = function(){
    if(addBookBtn.innerHTML == 'Add'){
        addBook();
        clearForm();    
        displayBooks();
    }
    else{
        updateBook(currentIndex);
    }    
}
addDiscountBtn.onclick = function(){
    discount();
}
searchInput.onkeyup =function(){
    displayBooks();
}
function addBook(){
    let book = {
        bookName : bookName.value,
        bookAuthor:bookAuthor.value,
        bookPrice:bookPrice.value,
        bookQuantity:bookQuantity.value
    }
    books.push(book);
    localStorage.setItem('books',JSON.stringify(books))
}
function clearForm(){
    bookName.value = "";
    bookAuthor.value = "";
    bookPrice.value = "";
    bookQuantity.value = "";
}

function displayBooks(){
    let box = '';
    for(let i = 0;i<books.length;i++){
        if(books[i].bookName.toLowerCase().includes(searchInput.value.toLowerCase())){
            box += `
            <tr>
                <td>${i + 1}</td>
                <td>${books[i].bookName}</td>
                <td>${books[i].bookAuthor}</td>
                <td>$${books[i].bookPrice}</td>
                <td>${books[i].bookQuantity}</td>
                <td><button onclick = "getBookInfo(${i})" class="border-0 bg-transparent btn-yellow"><i class="fa-solid fa-pen-to-square fa-sm"></i></button></td>
                <td><button onclick = "deleteBook(${i})" class="border-0 bg-transparent btn-red"><i class="fa-solid fa-trash-can fa-sm"></i></button></td>
            </tr>`;
        }
    }
    tbody.innerHTML = box;
}
function getBookInfo(index){
    bookName.value = books[index].bookName;
    bookAuthor.value =books[index].bookAuthor;
    bookPrice.value =books[index].bookPrice;
    bookQuantity.value =books[index].bookQuantity;
    addBookBtn.innerHTML = 'Update';
    currentIndex = index;
}
function updateBook(index){
    let book = {
        bookName : bookName.value,
        bookAuthor:bookAuthor.value,
        bookPrice:bookPrice.value,
        bookQuantity:bookQuantity.value
    }
    books[index] = book;
    addBookBtn.innerHTML = 'Add';
    localStorage.setItem('books',JSON.stringify(books))
    clearForm();
    displayBooks();
}
function deleteBook(index){
    books.splice(index,1);
    localStorage.setItem('books',JSON.stringify(books))
    displayBooks();
}
function discount(){
    books = JSON.parse(localStorage.getItem('books'));
    for(let i = 0;i<books.length;i++){
        books[i].bookPrice = books[i].bookPrice - ((books[i].bookPrice * bookDiscount.value)/100);
    }
    displayBooks();
}