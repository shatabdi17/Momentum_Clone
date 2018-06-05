import React from "react"

// Attributes: name, onTaskCompleted, onTaskRemoved
class TaskItem extends React.Component {
  constructor(props){
    super(props);

    this.state = {completed: false}

    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleChange(event) {
    this.setState({completed: event.target.checked});
    if (event.target.checked) this.props.onTaskCompleted();
  }

  handleRemove(event) {
    this.props.onTaskRemoved();
  }

  render() {
    return (
      <li className= "task-item" >
        <input name="isCompleted" type="checkbox" className="form-check-input"  onChange={this.handleChange}/> 
        <p className={this.state.completed === true ? 'completed' : ''}>{this.props.name}</p>
        <button className="todo-delete" onClick={this.handleRemove}> x </button>
      </li>
    );
  }
}
export default TaskItem;