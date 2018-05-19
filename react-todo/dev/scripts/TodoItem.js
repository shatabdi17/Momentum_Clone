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
            {/* <label className="form-check-label">
                <input type="checkbox" className="form-check-input" onChange={this.markCompleted} /> {this.props.text}
            </label> */}
            <button onClick={() => props.completedTodo(props.firebaseKey, props.completed)}>Done</button>
            <button onClick={() => props.removeTodo(props.firebaseKey)}>x</button>
        
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