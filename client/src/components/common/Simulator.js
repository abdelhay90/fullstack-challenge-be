import React, { useState } from 'react';
import { inject } from 'mobx-react';
import Button from '@material-ui/core/Button';

const Simulator = ({ store }) => {
  const [started, setStarted] = useState(false);
  const handleSimulation = () => {
    if (store.simulationStarted) {
      store.stopSimulation();
      setStarted(false);
    } else {
      store.startSimulation();
      setStarted(true);
    }
  };
  return (
    <div>
      <Button
        variant='contained'
        color={started ? 'secondary' : 'primary'}
        onClick={() => {
          handleSimulation();
        }}
      >
        {started ? 'Stop Simulation' : 'Simulate Vehicles Change'}
      </Button>
    </div>
  );
};

export default inject('store')(Simulator);
