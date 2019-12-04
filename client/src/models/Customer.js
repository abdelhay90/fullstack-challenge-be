/**
 * customer model to be used in mobx store to be bound to controls from store
 */

import { action, observable } from 'mobx';
import Vehicle from './Vehicle';

export default class Customer {
  @observable id;

  @observable name;

  @observable address;

  @observable createdAt;

  @observable updatedAt;

  @observable Vehicles;

  constructor({ id, name, address, createdAt, updatedAt, Vehicles = [] }) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.Vehicles = Vehicles.map(item => new Vehicle({ ...item }));
  }

  /**
   * update current customer data
   * @param updated
   */
  @action.bound
  update(updated) {
    this.id = updated.id;
    this.name = updated.name;
    this.address = updated.address;
    this.createdAt = updated.createdAt;
    this.updatedAt = updated.updatedAt;
    this.Vehicles = updated.Vehicles.map(item => new Vehicle({ ...item }));
  }
}
