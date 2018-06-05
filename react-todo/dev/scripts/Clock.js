import React from 'react';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
            greet: ""
  }
    
    }

    componentDidMount() {
        this.intervalHold = setInterval(() => this.currentTime(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalHold);
    }

    currentTime() {
        const hour = this.state.time.getHours();
        let greet;
        if (hour < 12) greet = "morning";
        else if (hour >= 12 && hour <= 17) greet = "afternoon";
        else if (hour >= 17 && hour <= 24) greet = "evening";
        this.setState({
            time: new Date(),
            greet
        });
    }
    render() {
        let greeting = `Good ${this.state.greet}, ${localStorage.getItem("name")}.`;
        const clockFace = this.state.time.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
        return (
            <div className="container-clock">
                <div className="clock">
                    <h1 className="clock-face">
                        {clockFace}
                    </h1>
                    <h2 className="greeting">{greeting}</h2>
            </div>           
            </div>
        );
    }
}

export default Clock;

