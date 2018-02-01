import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';
import RaisedButton from 'material-ui/RaisedButton';
import '../styles/FactoryRunResult.css';


export default class FactoryRunResult extends Component {

  static propTypes = {
    factoryRun: PropTypes.object.isRequired,
    factoryRunActions: PropTypes.object.isRequired,
    factory: PropTypes.string.isRequired,
  };

  run = () => {
    const { factoryRunActions, factory } = this.props;
    factoryRunActions.run(factory);
  };

  render() {
    const { factoryRun: { traceBack, result }, factoryRunActions } = this.props;

    return (
      <div className="factory-run-result">
        <div className="row">
          <div className="col col-50 align-left">
            <RaisedButton label="Run factory" primary onClick={this.run} />
          </div>
          <div className="col col-50 align-right">
          {
            (result || traceBack) && (
              <RaisedButton label="Skip result" secondary onClick={factoryRunActions.skip} />
            )
          }
          </div>
        </div>
        {
          traceBack ? (
            <div
              className="m-t-1 trace-back"
              dangerouslySetInnerHTML={{__html: traceBack.replace(/\n/, '<br />')}} />
          ) : (result && [
            <div key="pre_test" className="m-t-1">
              <h4>Return value of pre_test:</h4>
              <ReactJson src={result.pre_test} />
            </div>,
            <div key="factory" className="m-t-1">
              <h4>Return value of factory:</h4>
              <ReactJson src={result.factory} />
            </div>
          ])
        }
      </div>
    );
  }

}
