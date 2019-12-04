/**
 * vehicle model to be used in mobx store to be bound to controls from store
 */

import { action } from 'mobx';

export default class Customer {
  id;

  vin;

  regNo;

  createdAt;

  updatedAt;

  CustomerId;

  constructor({ id, vin, regNo, createdAt, updatedAt, CustomerId, status }) {
    this.id = id;
    this.vin = vin;
    this.regNo = regNo;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.CustomerId = CustomerId;
    this.status = status;
  }

  /**
   * update current vehicle data
   * @param updated
   */
  @action.bound
  update(updated) {
    this.id = updated.id;
    this.vin = updated.vin;
    this.address = updated.address;
    this.status = updated.status;
    this.createdAt = updated.createdAt;
    this.updatedAt = updated.updatedAt;
    this.CustomerId = updated.CustomerId;
  }
}
