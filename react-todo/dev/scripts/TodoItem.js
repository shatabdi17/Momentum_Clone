import React from 'react';

const TodoItem = (props) => {
    console.log(props);
    return (
        <li
            className={`todo-item ${props.completed === true ? 'completed' : null}`}
        // draggable="true"
        // onDragStart={this.handleDragStart}
        // onDragOver={this.handleDragOver}
        // onDrop={this.handleDrop}
        >          
            <input type="checkbox" className="form-check-input" checked={props.completed} onChange={() => props.completedTodo(props.firebaseKey, props.completed)}/>        
            <p>{props.task} </p>     
            <button className="todo-delete" onClick={() => props.removeTodo(props.firebaseKey)}>x</button>       
        </li>
    )
};

export default TodoItem;

// handleDragStart(e) {
//     e.dataTranfer.setData("text",e.target.value);
// }

// handleDragOver(e) {
//     e.preventDefault();

// }

// handleDrop(e) {
//     e.preventDefault();
//     e.dataTranfer.getData("text", e.target.value);
// }