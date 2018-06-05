import React from "react";
import TaskItem from "./TaskItem";

const MAIN_FOCUS_KEY = "MAIN_FOCUS";

class MainFocus extends React.Component {
  constructor(props) {
    super(props);

    
    this.state = {mainFocus: localStorage.getItem(MAIN_FOCUS_KEY), inputVal: ""};

    this.handleCompleted = this.handleCompleted.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  handleAdd(event){
    this.setState({mainFocus: event.target.value});
  }

  handleCompleted(event) {
    localStorage.setItem(MAIN_FOCUS_KEY, "");
  }

  handleRemove(event) {
    localStorage.setItem(MAIN_FOCUS_KEY, "");
    this.setState({mainFocus: "", inputVal: ""});
  }

  handleInputChange(event) {
    this.setState({inputVal: event.target.value});
  }

  keyPress(event) {
    if (event.keyCode == 13) {
      localStorage.setItem(MAIN_FOCUS_KEY, this.state.inputVal);
      this.setState({mainFocus: this.state.inputVal, inputVal: ""});
    }
  }

  render() {
    const mainFocusForm = (
      <form>
        <h2> What is your main focus today? </h2>
        <input type="text" name="mainFocus" value={this.state.inputVal} 
        onKeyDown={this.keyPress} onChange={this.handleInputChange}/>
      </form>
    );

    const taskItem = (
      <TaskItem name={this.state.mainFocus} onTaskCompleted={this.handleCompleted} onTaskRemoved={this.handleRemove}/>
    )
    const child = (this.state.mainFocus ? taskItem : mainFocusForm);
    return (
      <div className="container-mainfocus">
       {child}
      </div>

    );
  }
}

export default MainFocus;