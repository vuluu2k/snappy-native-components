import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import Modal from './Modal';
import Button from './Button';
import SpinnerV1 from './SpinnerV1';

export default class ConfirmModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { titleModal, text, visible, onDismiss, onSubmit, children, loading, btnAutoDismiss } = this.props;

    return (
      <>
        <Modal visible={visible} onDismiss={onDismiss} titleModal={titleModal} useFast>
          <SpinnerV1 spinning={loading} />
          <View style={{ padding: 16 }}>
            {children || (
              <>
                <View style={{ flexDirection: 'row', justifyContent: 'center', textAlign: 'center' }}>
                  <Text style={{ fontWeight: '500' }}>{text}</Text>
                </View>
              </>
            )}
            {/* <Button text="Huỷ bỏ" onPress={onDismiss} /> */}
            <Button
              text="Xác nhận"
              type="danger"
              size="lg"
              onPress={() => {
                onSubmit && onSubmit();
                btnAutoDismiss && onDismiss();
              }}
              style={{ marginTop: 24 }}
            />
          </View>
        </Modal>
      </>
    );
  }
}

ConfirmModal.propTypes = {
  titleModal: PropTypes.string,
  text: PropTypes.string,
  visible: PropTypes.bool,
  onDismiss: PropTypes.func,
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
  btnAutoDismiss: PropTypes.bool,
};

ConfirmModal.defaultProps = {
  visible: false,
  onDismiss: e => console.log(e),
  onSubmit: e => console.log(e),
  btnAutoDismiss: true,
};
