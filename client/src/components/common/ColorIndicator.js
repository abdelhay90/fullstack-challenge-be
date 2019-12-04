import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

const Indicator = ({ classes, color }) => {
  return <span className={classes.dot} style={{ backgroundColor: color }} />;
};

const styles = theme => ({
  dot: {
    marginRight: theme.spacing(1),
    height: '10px',
    width: '10px',
    'background-color': '#2F2F2F',
    'border-radius': '50%',
    display: 'inline-block',
  },
});

export default withStyles(styles)(Indicator);
