import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import * as testActions from '../action-creators/tests';
import CreateTestForm from '../components/CreateTestForm';


class CreateTest extends Component {

  static propTypes = {
    testActions: PropTypes.object.isRequired,
    currentTest: PropTypes.string,
  };

  create = data => this.props.testActions.createTest(data);

  render() {
    const { currentTest, testActions } = this.props;

    return (
      <div>
        {
          currentTest ? (
            <div className="current-test m-t-4">
              <div>Your test <i>{currentTest}</i> is running...</div>
              <div className="m-t-2">
                <RaisedButton label="Run one more test" primary onClick={testActions.dropCurrentTest} />
              </div>
            </div>
          ) : (
            <CreateTestForm create={this.create} />
          )
        }
      </div>
    );
  }

}

export default connect(
  state => ({
    currentTest: state.tests.currentTest,
  }),
  dispatch => ({
    testActions: bindActionCreators(testActions, dispatch),
  })
)(CreateTest);
