const express = require("express");

const app = express();

app.use(express.json()); //middleware to parse json

let todos = [];

//route to get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

//route to add a new todo
app.post("/todos", (req, res) => {
  const newtodo = {
    id: todos.length + 1,
    task: req.body.task,
    completed: false,
  };
  todos.push(newtodo);
  res.status(201).json(newtodo);
});

//route to update a todo
app.put("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (todo) {
    todo.task = req.body.task || todo.task;
    todo.completed =
      req.body.completed !== undefined ? req.body.completed : todo.completed;
      res.json(todo)
  }else{
    res.status(404).json({error:"todo not found"})
  }
}); 

//route to delete a todo

app.delete('/todos/:id',(req,res)=>{
    todos = todos.filter(t=>t.id !== parseInt(req.params.id))
    res.json({message : "todo deleted"})
})

app.listen(3000,()=>{
    console.log("SERVER IS RUNNING ON http://localhost:3000")
})
