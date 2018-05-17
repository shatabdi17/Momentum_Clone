import React from 'react';

class Clock extends React.Component {
    constructor() {
        super();
        this.state = {
            time: new Date(),
            greet: ""
  }
    
    }

    componentDidMount() {
        setInterval(() => this.currentTime(), 1000);
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
        return (
            <div>
                <div className="clock">
                    <h1 className="clock-face">
                        {this.state.time.toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit"
                        })}
                    </h1>
                    <h2 className="greeting">{`Good ${this.state.greet},${localStorage.getItem("name") } `}</h2>
            </div>           
            </div>
        );
    }
}

export default Clock;

