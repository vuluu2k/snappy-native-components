import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import Colors from './Colors';

export default class ButtonOptions extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedOption: props?.defaultSelect || 0 };
  }

  componentDidMount() {
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  onSelect = selectedOption => {
    const { onChange } = this.props;
    this.mounted && this.setState({ selectedOption: selectedOption?.id });
    onChange(selectedOption);
  };

  render() {
    const { options, optionStyle, selectedStyle, gap, textStyle, textSelectedStyle } = this.props;
    const { selectedOption } = this.state;

    return (
      <>
        <ScrollView horizontal={true} style={styles.scroll} showsHorizontalScrollIndicator={false}>
          <View style={styles.content}>
            {options.map(item => {
              return (
                <TouchableOpacity key={item.id} onPress={() => this.onSelect(item)} style={{ marginRight: options?.length > 2 && gap }}>
                  <View style={[styles.option, optionStyle, selectedOption == item.id && selectedStyle]}>
                    {item.icon}
                    <Text style={[selectedOption != item.id ? textStyle : textSelectedStyle, item?.icon && { marginLeft: 4, fontWeight: '500' }]}>
                      {item.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </>
    );
  }
}

ButtonOptions.propTypes = {
  defaultSelect: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  gap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  containerStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  optionStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  selectedStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  textStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  textSelectedStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onChange: PropTypes.func,
  options: PropTypes.array,
};

ButtonOptions.defaultProps = {
  selectedStyle: {
    backgroundColor: Colors.geek_blue_1,
    borderColor: Colors.geek_blue_1,
  },
  gap: 8,
  onChange: item => {
    console.log(item);
  },
  options: [
    { label: 'label1', id: 0 },
    { label: 'label2', id: 1 },
    { label: 'label3', id: 2 },
  ],
  textStyle: { fontSize: 14, fontWeight: '500', color: Colors.gray_4 },
  textSelectedStyle: { fontSize: 14, fontWeight: '500', color: Colors.logo_snappy },
};

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 150,
    paddingHorizontal: 16,
    height: 38,
    borderWidth: 1,
    borderColor: Colors.color_border,
    borderRadius: 8,
  },
  content: { paddingHorizontal: 16, paddingVertical: 8, flexDirection: 'row' },
  scroll: { backgroundColor: '#fff', maxHeight: 52 },
});
