import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 400,
  },
});

const PassengersPayslips = ({ classes, vehicles }) => {
  return (
    <>
      <Paper className={classes.paper}>
        <Table className={classes.table} size='small'>
          <TableHead>
            <TableRow>
              <TableCell align='left'>VIN</TableCell>
              <TableCell align='left'>Reg. No</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map(row => (
              <TableRow key={row.id}>
                <TableCell align='left'>{row.vin}</TableCell>
                <TableCell align='left'>{row.regNo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

export default withStyles(styles)(PassengersPayslips);
