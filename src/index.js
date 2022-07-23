(function ($) {
  const endpoints = [
    "./app/controller/catalogoJSON.php",
    "./app/controller/route_1.php", //getallbooksBycategory. category_id optional param
    "./app/controller/route_2_detail.php" //getBookByID book_id optional param
  ];
  class BookItem {
    constructor(book){
        this.book = book
    }
    get UI(){
        return `
        <div class="col col-sm-6 col-lg-4">
            <div class="card">
                <img src="${this.book.thumbnail}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${this.book.title}</h5>
                <p class="${this.book.content}</p>
                <a href="#" class="btn btn-primary">${endpoints[2]}?book_id=${this.book.ID}</a>
                </div>
            </div>
        </div>
        `
    }
  }
    $.getJSON( endpoints[0], function ( results =[] ) {
        results.map(cat => {
            $("#categories").append($("<option>"),{
                value: cat.category_id,
                text: cat.name
            });
            document.getElementById("categories").addEventListener("change", e =>{
                const id = e.currentTarget.value
                $.getJSON(`${endpoints[1]}?category_id=${id}`, function (books) {
                    document.getElementById("books") = books.reduce((acc, value) =>{
                        const newBook = new BookItem(value)
                        return acc + newBook.UI;
                    },"");
                })
            })
        })
    } );
    
})(jQuery);
