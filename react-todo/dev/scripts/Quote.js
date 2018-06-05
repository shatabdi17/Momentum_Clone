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
         <div className="container-quote">
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