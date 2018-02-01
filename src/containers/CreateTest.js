import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import * as testActions from '../action-creators/tests';
import * as factoryRunActions from '../action-creators/factory-run';
import * as editorActions from '../action-creators/editor';
import CreateTestForm from '../components/CreateTestForm';


class CreateTest extends Component {

  static propTypes = {
    testActions: PropTypes.object.isRequired,
    factoryRunActions: PropTypes.object.isRequired,
    factoryRun: PropTypes.object.isRequired,
    editor: PropTypes.object.isRequired,
    editorActions: PropTypes.object.isRequired,

    currentTest: PropTypes.string,
  };

  create = data => this.props.testActions.createTest(data);

  render() {
    const { currentTest, testActions, factoryRunActions, factoryRun, editor, editorActions } = this.props;

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
            <CreateTestForm
              create={this.create}
              editor={editor}
              editorActions={editorActions}
              factoryRunActions={factoryRunActions}
              factoryRun={factoryRun} />
          )
        }
      </div>
    );
  }

}

export default connect(
  state => ({
    factoryRun: state.factoryRun,
    currentTest: state.tests.currentTest,
    editor: state.editor,
  }),
  dispatch => ({
    testActions: bindActionCreators(testActions, dispatch),
    factoryRunActions: bindActionCreators(factoryRunActions, dispatch),
    editorActions: bindActionCreators(editorActions, dispatch),
  })
)(CreateTest);
