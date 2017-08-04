import React, {Component} from 'react'
import TodoModel from '../models/Todo'
import TodoList from '../components/TodoList'
import CreateTodoForm from '../components/CreateTodoForm'
//import EditTodoForm from '../components/EditTodoForm'

class TodosContainer extends Component {
  constructor(){
    super()
    this.state = {
      todos: []
    }
  }
  componentDidMount(){
    this.fetchData()
  }
  fetchData(){
    TodoModel.all().then( (res) => {
      this.setState ({
        todos: res.todos
      })
    })
  }
  createTodo (newBody){
    let newTodo = {
      body: newBody,
      completed: false
    }
    TodoModel.create(newTodo).then((res) =>{
      console.log('created todo', res)
      let todos = this.state.todos
      todos.push(res)
      this.setState({todos})
    })
  }
  deleteTodo(todo) {
   console.log('deleting todo', todo)
   TodoModel.delete(todo).then((res) => {
       let todos = this.state.todos.filter(function(todo) {
         return todo._id !== res._id
       });
       this.setState({todos})
   })
 }
 updateTodo(newTodoBody, id){
   console.log('updating todo in Todos Container')

   //have access to id of todo that needs to be updated
   //have access to new info from Update form
   //call method in TodoModel class that sends the AJAX req to mod the todo

   TodoModel.update(newTodoBody, id).then((res)=>{
     let targetTodo = this.state.todos.find((item)=>{
       return item._id === id;
     })
     //update this.state.todos based on API res
     this.setState({id})

   })
 }
  render(){
    return (
      <div className='todosContainer'>
      <CreateTodoForm
        createTodo={this.createTodo.bind(this)}/>
        <TodoList
          todos={this.state.todos}
          onDeleteTodo={this.deleteTodo.bind(this)}
          onUpdateTodo={this.updateTodo.bind(this)}/>
      </div>
    )
  }
}
export default TodosContainer
