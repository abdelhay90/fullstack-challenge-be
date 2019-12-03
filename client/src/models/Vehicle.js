import { action } from 'mobx';

export default class Customer {
  id;

  vin;

  regNo;

  createdAt;

  updatedAt;

  CustomerId;

  constructor({ id, vin, regNo, createdAt, updatedAt, CustomerId }) {
    this.id = id;
    this.vin = vin;
    this.regNo = regNo;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.CustomerId = CustomerId;
  }

  @action.bound
  update(updated) {
    this.id = updated.id;
    this.vin = updated.vin;
    this.address = updated.address;
    this.createdAt = updated.createdAt;
    this.updatedAt = updated.updatedAt;
    this.CustomerId = updated.CustomerId;
  }
}
