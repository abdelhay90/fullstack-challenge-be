import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Grid, TextField, MenuItem, Button } from '@material-ui/core';
import Vehicles from './Vehicles';
import { vehicleStatus } from '../../common/constants';

const VehiclesWithFilter = ({ classes, vehicles, customers }) => {
  const [values, setValues] = React.useState({
    selectedCustomerId: '',
    selectedStatus: '',
    currentVehiclesView: [...vehicles],
  });
  const [statusList, setStatusList] = useState([
    ...Object.values(vehicleStatus),
  ]);

  const handleChange = name => evt => {
    debugger;
    if (name === 'selectedStatus') {
      const currentFilterView =
        values.selectedCustomerId !== ''
          ? [...values.currentVehiclesView]
          : [...vehicles];
      setValues({
        currentVehiclesView: [
          ...currentFilterView.filter(item => item.status === evt.target.value),
        ],
        selectedCustomerId: values.selectedCustomerId,
        selectedStatus: evt.target.value,
      });
    } else if (name === 'selectedCustomerId') {
      const currentFilterView =
        values.selectedStatus !== ''
          ? [...values.currentVehiclesView]
          : [...vehicles];
      setValues({
        currentVehiclesView: [
          ...currentFilterView.filter(
            item => item.CustomerId === Number(evt.target.value),
          ),
        ],
        selectedCustomerId: Number(evt.target.value),
        selectedStatus: values.selectedStatus,
      });
    }
  };

  const handleResetFilter = () => {
    setValues({
      currentVehiclesView: [...vehicles],
      selectedCustomerId: '',
    });
  };
  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* customers drop down filter */}
          <Grid className={classes.item}>
            <TextField
              id='outlined-select-pickup-station'
              select
              label='Customers List'
              value={values.selectedCustomerId}
              onChange={handleChange('selectedCustomerId')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              variant='outlined'
              name='selectedCustomerId'
              fullWidth
            >
              {customers.map(option => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* status drop down filter */}
          <Grid className={classes.item}>
            <TextField
              id='outlined-select-pickup-station'
              select
              label='Status List'
              value={values.selectedStatus}
              onChange={handleChange('selectedStatus')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              variant='outlined'
              name='selectedStatus'
              fullWidth
            >
              {statusList.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Button
            color='primary'
            variant='contained'
            onClick={evt => handleResetFilter()}
          >
            Reset Filter
          </Button>
        </Grid>
        <Grid className={classes.tableContainer}>
          <Vehicles vehicles={values.currentVehiclesView} />
        </Grid>
      </Grid>
    </div>
  );
};

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  container: {
    margin: '0 auto',
    maxWidth: 960,
    padding: theme.spacing(2),
  },
  item: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  menu: {
    width: 200,
  },
  tableContainer: {
    width: '100%',
  },
});

export default withStyles(styles)(VehiclesWithFilter);
