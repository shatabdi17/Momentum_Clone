import React from 'react';

const TodoItem = (props) => {
    return (
        <li 
        className={props.completed === true ? 'completed' : null}
        // draggable="true"
        // onDragStart={this.handleDragStart}
        // onDragOver={this.handleDragOver}
        // onDrop={this.handleDrop}
        >
        
            <p>{props.task} </p>
            {/* {props.user} */}       
            <button onClick={() => props.completedTodo(props.task)}>Completed</button>
            <button onClick={() => props.removeTodo(props.task)}>X</button>
        
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