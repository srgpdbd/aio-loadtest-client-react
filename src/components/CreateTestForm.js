import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField } from 'redux-form-material-ui';
import Editor from './Editor';
import FactoryRunResult from '../components/FactoryRunResult';
import { NumberValidator } from '../utils/validation';
import '../styles/CreateTestForm.css';

const validate = values => ({
  delay: new NumberValidator(values.delay).required().number().positive().int().error,
  users: new NumberValidator(values.users).required().number().positive().int().error,
  duration: new NumberValidator(values.duration).required().number().positive().int().error
});

const defaultFactory =
`
import requests

def pre_test():
    """
    This code will be called once before test starts and 
    whatever this function returns will be passed to request factory as kwargs
    """
    pass

def factory(user_params):
    """
    Return a list of request config dicts from this function
    """
    return {
        "url": "https://google.com",
        "method": "GET",
        "headers": "*",
    }
`;

class CreateTestForm extends Component {

  static propTypes = {
    create: PropTypes.func.isRequired,
    factoryRun: PropTypes.object.isRequired,
    factoryRunActions: PropTypes.object.isRequired,
    factory: PropTypes.string.isRequired,
    editor: PropTypes.object.isRequired,
    editorActions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      factoryCode: ''
    };
  }

  componentDidMount() {
    this.props.initialize({ factory: defaultFactory.slice(1) });
  }

  onSubmit = values => {
    return this.props.create(values);
  };

  render() {
    const {
      handleSubmit,
      invalid,
      submitting,
      factoryRun,
      factoryRunActions,
      factory,
      editor,
      editorActions
    } = this.props;

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
          <Field name="factory" component={Editor} props={{ ...editor, editorActions }} />
        </div>
        <div className="col col-30 align-top">
          <h3>Run factory code:</h3>
          <FactoryRunResult
            factoryRun={factoryRun}
            factoryRunActions={factoryRunActions}
            factory={factory} />
        </div>

        <RaisedButton label="Run" disabled={invalid || submitting} primary onClick={handleSubmit(this.onSubmit)} />
      </div>
    );
  }

}

const FORM_NAME = 'create-test-form';
const selector = formValueSelector(FORM_NAME);

export default connect(
  state => ({ factory: selector(state, 'factory') })
)(reduxForm({ form: FORM_NAME, validate })(CreateTestForm));
