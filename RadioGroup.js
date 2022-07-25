import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import Radio from './Radio';

export default class RadioGroup extends Component {
  constructor(props) {
    super(props);
    this.state = { keySelect: props.defaultKey || undefined };
  }

  handleOnChange = item => {
    const { keySelect } = this.state;
    const { onChange } = this.props;
    if (onChange) onChange(item);
    this.setState({ keySelect: item?.key });
  };

  render() {
    const { keySelect } = this.state;
    const { options, children } = this.props;
    return (
      <View>
        {children ||
          options.map((item, idx) => (
            <TouchableOpacity onPress={() => this.handleOnChange(item)} key={idx} style={[{ marginBottom: 12 }]}>
              <Radio checked={keySelect === item?.key} label={item?.text} />
            </TouchableOpacity>
          ))}
      </View>
    );
  }
}

RadioGroup.propTypes = {
  options: PropTypes.array,
  defaultKey: PropTypes.node,
  onChange: PropTypes.func,
  onPress: PropTypes.func,
};

RadioGroup.defaultProps = {
  options: [
    { key: 1, text: 'option1', onPress: () => console.log('option1') },
    { key: 2, text: 'option2', onPress: () => console.log('option1') },
    { key: 3, text: 'option3', onPress: () => console.log('option1') },
    { key: 4, text: 'option4', onPress: () => console.log('option1') },
  ],
};
