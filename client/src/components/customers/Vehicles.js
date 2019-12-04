/**
 * vehicles component table that holds all vehicles bound to it
 */

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
import Indicator from '../common/ColorIndicator';
import { vehicleStatusColors } from '../../common/constants';

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

const Vehicles = ({ classes, vehicles }) => {
  return (
    <>
      <Paper className={classes.paper}>
        <Table className={classes.table} size='small'>
          <TableHead>
            <TableRow>
              <TableCell align='left'>VIN</TableCell>
              <TableCell align='left'>Reg. No</TableCell>
              <TableCell align='left'>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles &&
              vehicles.map(row => (
                <TableRow key={row.id}>
                  <TableCell align='left'>{row.vin}</TableCell>
                  <TableCell align='left'>{row.regNo}</TableCell>
                  <TableCell align='left'>
                    <div>
                      <Indicator color={vehicleStatusColors[row.status]} />
                      <span>{row.status}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

export default withStyles(styles)(Vehicles);
