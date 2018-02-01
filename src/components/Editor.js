import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import 'brace/mode/python';
import 'brace/theme/monokai';
import 'brace/theme/github';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import '../styles/Editor.css';


export default class Editor extends Component {

  static propTypes = {
    fontSize: PropTypes.number.isRequired,
    theme: PropTypes.string.isRequired,
    editorActions: PropTypes.object.isRequired,
    input: PropTypes.shape({
      name: PropTypes.string.isRequired,
      onBlur: PropTypes.func.isRequired,
      onChange: PropTypes.func.isRequired,
      onFocus: PropTypes.func.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { shown: false };
  }

  show = () => this.setState({ shown: true });
  hide = () => this.setState({ shown: false });

  onFontSizeChange = e => {
    this.props.editorActions.setFontSize(Number.parseInt(e.target.value, 10));
  };

  onThemeChange = (e, i, val) => {
    this.props.editorActions.setTheme(val);
  };

  render() {
    const { fontSize, theme, input: { name, onChange, onFocus, value } } = this.props;

    const actions = [
      <RaisedButton label="Ready" primary={true} onClick={this.hide} />
    ];

    return (
      <div className="editor">
        <AceEditor
          mode="python"
          theme={theme}
          fontSize={fontSize}
          width="100%"
          editorProps={{$blockScrolling: true}}
          name={name}
          onChange={onChange}
          onFocus={onFocus}
          value={value}
        />
        <div className="m-t-1">
          <RaisedButton label="Configure editor" fullWidth={true} onClick={this.show} />
        </div>

        <Dialog
          title="Editor Settings"
          actions={actions}
          modal={false}
          open={this.state.shown}
          onRequestClose={this.hide}>
          <TextField
            type="number"
            floatingLabelText="Font size"
            className="editor-form-control editor-font-size"
            value={fontSize}
            onChange={this.onFontSizeChange} />
          <SelectField
            floatingLabelText="Theme"
            className="editor-form-control editor-theme"
            value={theme}
            onChange={this.onThemeChange}>
            <MenuItem value="monokai" primaryText="Monokai" />
            <MenuItem value="github" primaryText="Github" />
          </SelectField>
        </Dialog>
      </div>
    );
  }

}
