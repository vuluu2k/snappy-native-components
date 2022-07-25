import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, Animated, Easing, StyleSheet } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import propTypes from 'prop-types';

import Colors from './Colors';
import Button from './Button';


const size_icon = 30;
const color_bg = '#fff';

export default class Popup extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
  }
  mapStatusWithIcon = () => {
    const { status } = this.props;

    switch (status) {
      case 'info':
        return <AntDesign name="infocirlceo" size={size_icon} color={Colors.status_info} />;
      case 'danger':
        return <Feather name="x-octagon" size={size_icon} color={Colors.status_danger} />;
      case 'warning':
        return <AntDesign name="warning" size={size_icon} color={Colors.status_warning} />;
      case 'success':
        return <AntDesign name="checkcircle" size={size_icon} color={Colors.status_success} />;
      default:
        return <AntDesign name="notification" size={size_icon} color={Colors.status_primary} />;
    }
  };

  animateColor = () => {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: Platform.OS === 'ios' ? 0 : 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  revertAnimatedColor = callback => {
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: Platform.OS === 'ios' ? 0 : 100,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start(callback);
  };

  render() {
    const { visible, onCancel, containerStyle, contentStyle, title, children, status, text, onOk, textCancel, textOk, OS } = this.props;
    const interpolateColor = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['#14141400', '#14141490'],
    });

    return (
      <Modal
        animationType="fade"
        statusBarTranslucent
        transparent
        hardwareAccelerated
        onRequestClose={() => {
          this.revertAnimatedColor(onCancel);
        }}
        onShow={() => {
          this.animateColor();
        }}
        visible={visible}
        onDismiss={() => {
           this.revertAnimatedColor(onCancel);
        }}>
        <Animated.View style={[styles.style_modal, containerStyle, { backgroundColor: interpolateColor }]}>
          <View style={[styles.style_content, contentStyle]}>
            <View>
              <View style={styles.container_title}>
                {this.mapStatusWithIcon(status)}
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginRight: 4,
                    color: Colors?.[status],
                  }}>
                  {title}
                </Text>
              </View>
              {children || (
                <View>
                  <Text style={{ textAlign: 'center' }}>{text}</Text>
                </View>
              )}
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              {(OS === 'android' && (
                <View style={{ flexDirection: 'row', marginVertical: 12 }}>
                  <Button onPress={onCancel} size="lg">
                    {textCancel || 'Đóng lại'}
                  </Button>
                  <Button onPress={onOk} style={{ marginLeft: 8 }} size="lg" type="primary">
                    {textOk || 'Tiếp tục'}
                  </Button>
                </View>
              )) || (
                <>
                  <View style={{ height: 1, backgroundColor: Colors.gray_1, marginTop: 16 }} />
                  {onCancel && (
                    <TouchableOpacity onPress={onCancel} style={{ flex: 1 }}>
                      <View style={{ paddingVertical: 11, alignItems: 'center' }}>
                        <Text style={{ fontSize: 17, fontWeight: 'bold', color: Colors?.[status] || Colors.status_primary }}>
                          {textCancel || 'Đóng lại'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  {onOk && (
                    <TouchableOpacity onPress={onOk} style={{ flex: 1 }}>
                      <View style={{ paddingVertical: 11, alignItems: 'center', borderLeftWidth: 1, borderLeftColor: Colors.gray_1 }}>
                        <Text style={{ fontSize: 17, fontWeight: 'bold', color: Colors.status_primary }}>{textOk || 'Tiếp tục'}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </>
              )}
            </View>
          </View>
        </Animated.View>
      </Modal>
    );
  }
}

Popup.propTypes = {
  visible: propTypes.bool,
  onCancel: propTypes.func,
  onOk: propTypes.func,
  contentStyle: propTypes.oneOfType([propTypes.array, propTypes.object]),
  containerStyle: propTypes.oneOfType([propTypes.array, propTypes.object]),
  title: propTypes.string,
  width: propTypes.number,
  children: propTypes.node,
  text: propTypes.string,
  textCancel: propTypes.string,
  textOk: propTypes.string,
  OS: propTypes.oneOf(['android', 'ios']),
};

Popup.defaultProps = {
  status: 'status_primary',
  visible: false,
  tittle: 'Thông báo',
  contentStyle: {},
  containerStyle: {},
};

const styles = StyleSheet.create({
  style_modal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: color_bg,
  },
  style_content: { padding: 16, backgroundColor: color_bg, margin: 20, borderRadius: 16 },
  container_title: { flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
});
