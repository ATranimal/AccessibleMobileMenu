var categories = ['Appetizers', 'Main Course', 'Dessert']
var ingredients = ['Onion', 'Garlic', 'Salt', 'Pepper', 'Chicken', ' Tomato', 'Bacon', 'Steak', 'Quail', 'Trout', 'Salmon', 'Cod']

var inputIngredients = [];

///////////////// Typeahead 
var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;
    matches = [];
    substrRegex = new RegExp(q, 'i');
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });
    cb(matches);
  };
};

$('#category .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'categories',
  source: substringMatcher(categories)
});
$('#ingredients .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'ingredients',
  source: substringMatcher(ingredients)
});

$(":file").change(function () {
  var inputFile = $(":file")
  console.log('attached image')
})

///////////////// Editing /  Deleting Items
$("button").click(function(e) {
    
    var id = e.target.attributes.id.value;

    // Edit
    if (e.target.attributes.action != null && e.target.attributes.action.value == "edit") {
        window.location.href = '/dish/' + id + '/edit';
    }

    else if (e.target.attributes.action != null && e.target.attributes.action.value == "add") {
      $.ajax({
        url: "/api/v1/dish/",
        type: "POST",
        data: {
            restaurant: "tran",
            name: $("#name").val(),
            description: $("#description").val(),
            price: $("#price").val(),
            category: $("#categorymessage").val(),
            ingredients: inputIngredients
        },
        success: function(result){
            window.location.reload(false); 
        }
        });
    }

    // Delete
    else {
        $.ajax({
        url: "/api/v1/dish/" + id,
        type: "DELETE",
        success: function(result){
            window.location.reload(false); 
        }
        });
    }

    
});

///////////////// Storing Ingredients
const node = document.getElementsByName("ingredients")[0];
node.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    inputIngredients.push( $("#ingredient").val() );
    $("#ingredient_list").append(
      "<p>" + $("#ingredient").val() + "</p>"
    );
    $("#ingredient").val("");
  }
});

$(document).ready(function () {
  $(".twitter-typeahead").each(function (index) {
    this.style.display = null
  })
})

///////////////// PDF KIT
var iframe = document.querySelector('iframe');
var doc = new PDFDocument
var stream = doc.pipe(blobStream())

// fill with info
doc.fontSize(25)
   .text('Here is some vector graphics...', 100, 80);

doc.end()

stream.on('finish', function() {
  iframe.src = stream.toBlobURL('application/pdf');
});