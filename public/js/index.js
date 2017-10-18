//Loading the dishes from the database
var dishes;
$.get("/api/v1/dish", function( data ){
    dishes = data;
    initialDisplay();
});

function initialDisplay() {
    console.log(dishes);
}

$('#box').keyup(function () {
    var input = $(this).val().toLowerCase();
    console.log(input);
    $('.menu>li').each(function () {
        var text = $(this).text().toLowerCase();
        var tags = $(this).attr("data-tags");
        ((text.indexOf(input) >= 0)|| (tags.indexOf(input) >= 0)) ? $(this).show() : $(this).hide();
    })
});