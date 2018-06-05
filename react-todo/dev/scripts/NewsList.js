import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NewsCard from './NewsCard';
import axios from 'axios';
import Typography from '@material-ui/core';

const API_KEY = "d5112edde19e4100b0b9b57c1d4605d6";
const BASE_URL = "https://newsapi.org/v2/top-headlines";

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
  subheader: {
    width: '100%',
  },
});

class NewsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {newsData: []};
  }

  componentWillMount() {
    const url = `${BASE_URL}?sources=${this.props.provider}&apiKey=${API_KEY}`;
    axios.get(url)
    .then(data => {
      this.setState({newsData: data.data.articles}); 
      console.log(this.state.newsData);    
    })
    .catch(error => {console.log(error)});
  }

  render() {
    const { classes } = this.props;

    return (this.state.newsData ? 
      <div className={classes.root}> 
        {this.state.newsData.map((data => (
          <NewsCard key={data.imageUrl} title={data.title} description={data.description}
          imageUrl={data.urlToImage} url={data.url}/>
        )))}
      </div>
      : <div/>
    );
  }
}

NewsList.propTypes = {
  classes: PropTypes.object.isRequired,
  provider: PropTypes.string.isRequired,
}

export default withStyles(styles)(NewsList);