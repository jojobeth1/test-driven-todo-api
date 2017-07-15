// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));


/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 7, task: 'Laundry', description: 'Wash clothes' },
  { _id: 27, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 44, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
//I WILL NEED EXPLAINATION
   let searchTerm = req.query.q;
   console.log(searchTerm);

   let filteredTodos = todos.filter(function(todo){
     return(todo.task.toLowerCase().includes(searchTerm.toLowerCase()) || todo.description.toLowerCase().includes(searchTerm.toLowerCase()));
   });
   res.json({data : filteredTodos});

 });

app.get('/api/todos', function index(req, res) {
  /* (GET) endpoint responds with all of the todos */
  res.json({ data: todos });


});

app.post('/api/todos', function create(req, res) {
  /* (POST) This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
   let myId = todos[todos.length -1]._id+ 1

   //create a variable using same format as the rest of the other task objects.
   let newTask = {_id: myId, task: req.body.task, description: req.body.description};

   //gets new id number.


   todos.push(newTask);


   res.json(newTask);
   console.log(newTask);

});

app.get('/api/todos/:id', function show(req, res) {
  /* (GET) This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */

let todoId = req.params.id; // the requested parameter id
  let foundTodo = todos.filter(function(todo) { //filter through var todos
    return todo._id == todoId;//return only those who meet the requirements of todo._id == req.params.id
  })[0];
// sending out foundToDo
  res.json(foundTodo);

});

app.put('/api/todos/:id', function update(req, res) {
  /* (PUT/PATCH) This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
   let todoId = parseInt(req.params.id);

 // find todo to update by its id
 let todoToUpdate = todos.filter(function (todo) {
   return todo._id === todoId;
 })[0];

 // update the todo's task
 todoToUpdate.task = req.body.task;

 // update the todo's description
 todoToUpdate.description = req.body.description;

 res.json(todoToUpdate);

   });

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */

   let todoId = parseInt(req.params.id); //make sure id from url is a number

// find todo by id
   let deleteToDo = todos.filter(function(todo){
     return todo._id === todoId;
   })[0];

   //.splice (start, deleteCount)
   //start: Index at which to start changing the array (with origin 0).
   //deleteCount: number of items to delete
  todos.splice(todos.indexOf(deleteToDo), 1); // remove todo from `todos` array

   res.json()
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
