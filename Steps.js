import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import MaskedView from '@react-native-community/masked-view';
import { AntDesign } from '@expo/vector-icons';

import Colors from './Colors';

export default class Steps extends Component {
  constructor(props) {
    super(props);
    this.state = { currentStep: props.currentStep || 0 };
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentStep } = this.props;
    if (prevProps.currentStep !== currentStep) {
      this.setState({ currentStep });
    }
  }

  onPressItem = (item, idx) => {
    const { onPress: onPressContainer } = this.props;
    const { onPress } = item;
    if (onPress) onPress(item, idx);
    if (onPressContainer) onPressContainer(item, idx);

    this.setState({ currentStep: idx });
  };

  render() {
    const { options, onPress: onPressContainer } = this.props;
    const { currentStep } = this.state;

    return (
      <View style={[styles.container]}>
        {options.map((item, idx) => {
          const IconComponent = item?.icon.component;

          return (
            <TouchableOpacity
              onPress={() => this.onPressItem(item, idx)}
              disabled={(!item?.onPress && !onPressContainer) || item?.disabled}
              key={idx}
              style={[styles.main_item]}>
              <View style={[styles.container_item]}>
                {(currentStep === idx && (
                  <LinearGradient
                    colors={['#FFC107', '#F89433', '#F36F56']}
                    start={{ x: 0.0, y: 0.0 }}
                    end={{ x: 1.0, y: 1.0 }}
                    style={[styles.gradient]}>
                    <View
                      style={[styles.container_icon, idx <= currentStep && styles.container_icon_active, currentStep === idx && styles.active_icon]}>
                      {item?.icon.component && (
                        <IconComponent
                          {...item?.icon}
                          color={item?.icon?.color || (idx <= currentStep && Colors.sunset_orange_7) || Colors.gray_2}
                          size={item?.icon?.size || 16}
                        />
                      )}
                    </View>
                  </LinearGradient>
                )) || (
                  <View
                    style={[styles.container_icon, idx <= currentStep && styles.container_icon_active, currentStep === idx && styles.active_icon]}>
                    {item?.icon.component && (
                      <IconComponent
                        {...item?.icon}
                        color={item?.icon?.color || (idx <= currentStep && Colors.sunset_orange_7) || Colors.gray_2}
                        size={item?.icon?.size || 16}
                      />
                    )}
                  </View>
                )}

                <Text style={[styles.label]}>{item?.label}</Text>
              </View>
              {idx !== options.length - 1 && (
                <View style={[styles.divider, idx >= currentStep && { backgroundColor: Colors.gray_2 }]}>
                  {idx >= currentStep && (
                    <LinearGradient colors={['#D9DBEA33', '#D9DBEA33', '#D9DBEA33']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}></LinearGradient>
                  )}
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

Steps.propTypes = {
  options: PropTypes.array,
  currentStep: PropTypes.number,
};

Steps.defaultProps = {
  currentStep: 0,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  main_item: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1, flexWrap: 'wrap', position: 'relative' },
  divider: { backgroundColor: '#F89433', height: 1, width: '50%', position: 'absolute', right: '-25%', top: '26%' },

  container_item: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  container_icon_active: {
    backgroundColor: Colors.sunset_orange_1,
  },

  container_icon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9DBEA33',
    width: 28,
    height: 28,
    borderRadius: 4,
  },

  active_icon: {
    margin: 1,
  },

  label: { fontSize: 12, fontWeight: '500', lineHeight: 20 },

  gradient: {
    borderRadius: 4,
  },
});
