class Validator {

  constructor(value) {
    this.value = value;
    this.error = null;
  }

  _validate(errorCallback, message) {
    if (this.error) return this;
    if (errorCallback()) this.error = message;
    return this;
  }

  required(message = 'This field is required') {
    return this._validate(() => !this.value && this.value !== 0, message);
  }

}

export class NumberValidator extends Validator {

  constructor(value) {
    super(value);
    this.value = Number.parseFloat(this.value);
  }

  number(message = 'Invalid number') {
    return this._validate(() => Number.isNaN(this.value), message);
  }

  positive(message = 'Should be positive') {
    return this._validate(() => this.value <= 0, message);
  }

  int(message = 'Should be integer') {
    return this._validate(() => Math.round(this.value) !== this.value, message);
  }

  nonZero(message = 'Should not be zero') {
    return this._validate(() => this.value === 0, message);
  }

}
