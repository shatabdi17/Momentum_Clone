import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import TodoItem from './TodoItem';
import Quote from './Quote';
import Clock from './Clock';
import firebase from 'firebase';


const config = {
  apiKey: "AIzaSyB-eGBY9pBO8r0RKJAxLX2L3ygx9j7Rw6I",
  authDomain: "project5-74f4c.firebaseapp.com",
  databaseURL: "https://project5-74f4c.firebaseio.com",
  projectId: "project5-74f4c",
  storageBucket: "project5-74f4c.appspot.com",
  messagingSenderId: "289414904544"
};

firebase.initializeApp(config);


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      task:'',
      todos:[],
  
    };
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.completedTodo = this.completedTodo.bind(this);
    this.handleKeyup = this.handleKeyup.bind(this);
  }

  componentDidMount() {
    const apiKey='fa46b4109ae577006f5ed95cece9b166855021fc516306c06f350b2323ff70ab';
    const backgroundURL =
      `https://api.unsplash.com/search/photos/?query=flowers&client_id=${apiKey}`;
      // `https://api.unsplash.com/search/photos/?query=wanderlust&client_id=${apiKey}`;
    
    const randomNum = (max) => Math.floor(Math.random() * max);
    let backgroundResponse;
    axios.get(backgroundURL).then(res => {
      //console.log(res);
      const randomResults = randomNum(res.data.results.length);
      //console.log(randomResults);
      backgroundResponse = res.data.results[randomResults].urls.full;
    })
    

    const dbRef = firebase.database().ref('todos');
  
    dbRef.on('value', (snapshot) => {

      const data = snapshot.val();
    
      const todoArray = [];
    
      for (let item in data) {
              
        data[item].key = item;

        todoArray.push(data[item]);
      }
      console.log(todoArray)
      const completedTodosArray = todoArray.filter((todo) => {
        return todo.completed === true;
      });
  
      this.setState({
        todos: todoArray,
        completedTodos: completedTodosArray,
        backgroundURL: backgroundResponse
      });
    });
  }



  handleSubmit(e) {
    e.preventDefault();
  
    const todo = {
      value: this.state.task,
      completed:false
    };

    console.log(todo);
    const dbRef = firebase.database().ref('todos');
   // const dbRefusers = firebase.database().ref('todos/user');
    dbRef.push(todo);


    this.setState({
      task:''
    });
  }
  handleChange(e) {   
    this.setState({
      [e.target.name]: e.target.value
    });
    
  }

  removeTodo(keyToRemove) {
   
    firebase.database().ref(`todos/${keyToRemove}`).remove();
}

  completedTodo(keyToUpdate, completed) {
    firebase.database().ref(`todos/${keyToUpdate}`)
      .update({
        completed: completed === true ? false : true
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
        
        <div
          style={{
    background: `url("${this.state.backgroundURL}") center center no-repeat fixed`,
    backgroundSize: "cover",
      height: "100vh",
        width: "100vw"

}}>
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
              <div className="todo">     
                  <h1>Todo app</h1>  
                  {this.state.todos.length === 0 ? (
                    <div className="todo-nothing">
                      <p>There is nothing to do! <span className="smiley-face">&#9786;</span></p>
                  </div>
                ) : (
                <p>{this.state.todos.length} to do</p>
                       
                )
              }
              <form action="" onSubmit={this.handleSubmit}>
                <input className="todoitem-input" type="text" name="task" onChange={this.handleChange} placeholder="New Todo" value={this.state.task}/>
              </form>               
              <ul className="todo-list">
                {this.state.todos.map((todoItem) => {
                  return (  
                       
                      <TodoItem
                        key={todoItem.key}
                        task={todoItem.value}
                        firebaseKey={todoItem.key}
                        removeTodo={this.removeTodo}
                        completedTodo={this.completedTodo}
                        completed={todoItem.completed} />                                   
                    )
                })}
              </ul>
             </div>
                
                <div className="container-clock">
                  <Clock name={this.state.name} />
                </div>

              <div className="container-quote">
                <Quote />
              </div>

              </div>
           
          )}
          </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));



// {this.state.todos.length === 0 ? (
//     <div className="todo-nothing">
//       <p>There is nothing to do!</p>
//       <h1>&#x263A;</h1>
//     </div>
//   ) : (

// style = {{
//   background: `url(https://source.unsplash.com/collection/nature${
//     window.screen.width
//     }x${window.screen.height}) center center no-repeat fixed`,
//     backgroundSize: "cover",
//       height: "100vh",
//         width: "100vw"

// }}