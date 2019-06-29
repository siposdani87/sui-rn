import React from 'react';

export default class BaseField extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      clearError: false,
      error: null,
    }
  }

  static getDerivedStateFromProps(nextProps, state) {
    const error = state.clearError !== nextProps.error ? nextProps.error : null;
    return {
      error,
    };
  }
 
  onChange = () => {
    if (this.state.error){
      this.setState({
        clearError: this.state.error,
        error: null,
      });
    } else {
      this.setState({
        error: null,
      });
    }
  }

  onValueChange = (value) => {
    this.onChange();
    this.props.onValueChange(value);
  }
}
