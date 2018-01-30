import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField } from 'redux-form-material-ui';
import Editor from '../containers/Editor';
import { NumberValidator } from '../utils/validation';
import '../styles/CreateTestForm.css';

const validate = values => ({
  delay: new NumberValidator(values.delay).required().number().positive().int().error,
  users: new NumberValidator(values.users).required().number().positive().int().error,
  duration: new NumberValidator(values.duration).required().number().positive().int().error
});

class CreateTestForm extends Component {

  static propTypes = {
    create: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      factoryCode: ''
    };
  }

  onSubmit = values => {
    return this.props.create(values);
  };

  render() {
    const { handleSubmit, invalid, submitting } = this.props;

    return (
      <div className="row create-test-form">
        <div className="col col-20 form-block form-block-left">
          <h3>Test params:</h3>
          <Field
            name="delay"
            type="number"
            className="form-field"
            floatingLabelText="Delay in seconds"
            component={TextField} />
          <Field
            name="users"
            type="number"
            className="form-field"
            floatingLabelText="Number of users"
            component={TextField} />
          <Field
            name="duration"
            type="number"
            className="form-field"
            floatingLabelText="Duration in seconds"
            component={TextField} />
        </div>
        <div className="col col-50 form-block form-block-right">
          <h3>Test factory code:</h3>
          <Field name="factory" component={Editor} />
        </div>
        <div className="col col-30">

        </div>

        <RaisedButton label="Run" disabled={invalid || submitting} primary onClick={handleSubmit(this.onSubmit)} />
      </div>
    );
  }

}

export default reduxForm({ form: 'create-test-form', validate })(CreateTestForm);
