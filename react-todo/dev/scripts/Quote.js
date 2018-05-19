import React from 'react';
import axios from 'axios';


class Quote extends React.Component {
    constructor(){
        super();
        this.state = {
            quote: ""
        };
    }
     
    componentDidMount() {
       
        const quoteURL = 
        "https://talaikis.com/api/quotes/random/";
        // const quoteURL = "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";

        axios.get(quoteURL).then(res => {
            console.log(res);
            this.setState({
                quote: res.data.quote,
                author: res.data.author
            });
        })
        
    }

    render() {
        return ( 
         <div>
                <div className="quote" >
                    <q className="quote-body" >
                        {this.state.quote}
                    </q>
                    <p className="quote-source" >
                        {this.state.author}
                    </p>
                </div>
            </div> 
        
        );
    }
}

export default Quote;