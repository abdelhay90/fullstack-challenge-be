/**
 * holds all app constants
 */

export const urls = {
  SIGN_IN: () => '/api/auth/signin',
  CUSTOMERS: () => '/api/customers',
  CUSTOMER: id => `/api/customers/${id}`,
  VEHICLES: () => '/api/vehicles',
  VEHICLE: id => `/api/vehicles/${id}`,
};

export const vehicleStatus = {
  STOPPED: 'STOPPED',
  RUNNING: 'RUNNING',
  RETIRED: 'RETIRED',
  CONNECTION_LOST: 'CONNECTION_LOST',
  CONNECTING: 'CONNECTING',
  IN_SERVICE: 'IN_SERVICE',
};
export const vehicleStatusColors = {
  STOPPED: '#561f55',
  RUNNING: '#e9ea77',
  RETIRED: '#e5dfdf',
  CONNECTION_LOST: '#FF0000',
  CONNECTING: '#ff7315',
  IN_SERVICE: '#297ca0',
};

export const simulationIntervalTimeMilliSeconds = 1500;
