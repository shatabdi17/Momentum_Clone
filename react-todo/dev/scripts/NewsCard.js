import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    flex: 1,
    margin: 10,
    minWidth: 250,
    maxWidth: 300,
    // width: 300,
    // marginBottom:20
  },
  media: {
    height: 0,
    paddingTop: '56.25%', 
  },
};

function NewsCard(props) {
  const { classes } = props;
  return (
    <div>
      <a href={props.url}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={props.imageUrl}
            title={props.title}
          />
          <CardContent>
            <Typography variant="title" align="justify">
              {props.title}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Learn More
            </Button>
            <Button size="small" color="primary">
              Save
            </Button>
          </CardActions>
        </Card>
      </a>
    </div>
  );
}

NewsCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default withStyles(styles)(NewsCard);
