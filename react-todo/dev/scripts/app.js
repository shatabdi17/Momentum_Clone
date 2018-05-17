import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import TodoItem from './TodoItem';
import Quote from './Quote';
import Clock from './Clock';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      task:'',
      // user:'',
      todos:[],
  
    };
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.completedTodo = this.completedTodo.bind(this);
    this.handleKeyup = this.handleKeyup.bind(this);
  }



  handleSubmit(e) {
    e.preventDefault();
    //here we use Array.from to clone the todos state.
    // This will produce a brand new copy of the values stored in this.state.todos.array.
    // the key is we DO NOT mutate the original array
    const todosClone = Array.from(this.state.todos);
    const todo = {
      value: this.state.task,
      user:this.state.user,
      completed:false
    };
    todosClone.push(todo);

    this.setState({
      task:'',
      // user:'',
      todos: todosClone
    });
  }
  handleChange(e) {   
    //console.log(e.target.value);
    this.setState({
      //todo:e.target.value;
      [e.target.name]: e.target.value
    });
    
  }

  removeTodo(taskName) {
    console.log('Remove todo');
    // clone the state todos, important to NOT mutate theoriginal array, 
    //So calling Array.from (this.state.todos) will take all the values in that array at that point in time, and clone..shallow copy
    //console.log(taskName);
    const todosClone = Array.from(this.state.todos);
    // Here we use the findIndex method method to take our array of elements, and find the one whose value matcehes the taskName to this method
    const itemToRemoveIndex = todosClone.findIndex((todoItem) => {
      // Once this callback function returns true, it will provide us the index value
      return todoItem.value === taskName;
    });

    console.log(itemToRemoveIndex);
// With this value, we can then splice out the element from the array
    todosClone.splice(itemToRemoveIndex,1);
    //Finally we can set the state of the todos to be our new version. Allowing React the info needed to figure out what IT needs to render
    this.setState ({
      todos: todosClone
    });
    
  }

  completedTodo (taskName) {
    console.log(taskName);
    const todosClone = Array.from(this.state.todos);
    //using the taskname , we need to find the object that matches that name in our state todos
    const itemsToCompleteIndex = todosClone.findIndex((completedItem) => {
      return completedItem.value === taskName;
    });
    console.log(itemsToCompleteIndex);
    // with that object, we want to toggle the completed method,
    todosClone[itemsToCompleteIndex].completed = todosClone[itemsToCompleteIndex].completed === true ? false : true;  
    // if it is true, it should be false, and vice versa
    // then update our state with this new altered array
    this.setState({
      todos: todosClone
    });
  }


  handleKeyup (e)  {
    if (e.key === "Enter" && e.target.value.length) {
      this.setState({ 
        name: e.target.value 
      });
      localStorage.setItem("name", e.target.value)
    };
  }

    render() {
      return (

        // <div>
        //   url(``)
        // </div>
          <div>
          {localStorage.getItem("name") === null ? (
              <div className="app-name">
                <h1>Hi, what is your name?</h1>
                <input
                  className="app-input"
                  type="text"
                  onKeyUp={this.handleKeyup}
                />
              </div>
            ) : (
            <div>
              <h1>Todo app</h1>
              <form action="" onSubmit={this.handleSubmit}>
                <input type="text" name="task" onChange={this.handleChange} placeholder="New Todo" value={this.state.task}/>
                {/* <input type="text" name="user" onChange={this.handleChange} placeholder="User to do todo" value={this.state.user}/> */}
                {/* <input type="submit" /> */}
                  <button type="submit">+</button>
              </form>
              <ul>
                {this.state.todos.map((todoItem,i) => {

                  return (
                      <TodoItem 
                      key={i}
                      task={todoItem.value} 
                      // user={todoItem.user} 
                      removeTodo={this.removeTodo}
                      completedTodo={this.completedTodo}
                      completed={todoItem.completed}/>
                    )
                })}
              </ul>

              <div className="container-quote">
                <Quote />
              </div>

              <div className="container-clock">
                    <Clock name={this.state.name} />
              </div>
            </div>
          )}
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

