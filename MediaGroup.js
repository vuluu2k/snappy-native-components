import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Animated, StyleSheet } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import { API_URL } from '../../../environment';
import Popup from './Popup';
import Modal from './Modal';

let recording
export default class MediaGroup extends Component {
  constructor(props) {
    super(props);
    this.state = { isRecording: false, visibleModalAudio: false };
  }

  openCamera = async () => {
    const { onClickCamera } = this.props;

    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();

      if (permission.status === 'granted') {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: true,
        });

        if (!result.cancelled) {
          onClickCamera(result);
        }
      }
      
    } catch (err) {
      console.log(err);
    }
  };

  pickPicture = async () => {
    const { onClickPicture } = this.props;

    try {

      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permission.status === 'granted') {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: true,
        });
        if (!result.cancelled) {
          onClickPicture(result);
        }
      }
      
    } catch (err) {
      console.log(err);
    }
  };

  startRecord = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status == 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        this.setState({ isRecording: true })

        const _recording = new Audio.Recording()
        await _recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)
        await _recording.startAsync()
        recording = _recording
      }
      else {
        console.log('error')
      }
    } catch (err) {
      console.log(err);
    }
  };

  stopRecording = async () => {
    const { onClickAudio } = this.props
  
    await recording.stopAndUnloadAsync();
    onClickAudio(recording)

    recording = undefined
    
    this.setState({ isRecording: false, visibleModalAudio: false })
  }

  openModalAudio = () => {
    this.setState({ visibleModalAudio: true })
    this.startRecord()
  }
  closeModalAudio = () => this.setState({ visibleModalAudio: false })

  render() {
    const { mediaList, size } = this.props;
    const { visibleModalAudio } = this.state

    return (
      <>
        <View style={styles.container}>
          {mediaList.includes('mic') && (
            <TouchableOpacity onPress={this.openModalAudio} style={styles.mic}>
              <View>
                <FontAwesome name="microphone" size={size} color="black" />
              </View>
            </TouchableOpacity>
          )}
          {mediaList.includes('camera') && (
            <TouchableOpacity onPress={this.openCamera} style={styles.mic}>
              <View>
                <AntDesign name="camera" size={size} color="black" />
              </View>
            </TouchableOpacity>
          )}
          {mediaList.includes('picture') && (
            <TouchableOpacity onPress={this.pickPicture} style={styles.picture}>
              <View>
                <AntDesign name="picture" size={size} color="black" />
              </View>
            </TouchableOpacity>
          )}
          {visibleModalAudio && (
            <Modal visible={visibleModalAudio} onDismiss={this.stopRecording} titleModal="Trình ghi âm">
              <View style={styles.audioModal}>
                <TouchableOpacity onPress={this.stopRecording}>
                  <View style={styles.audioModalIcon}>
                    <FontAwesome name="microphone" size={80} color="white" />
                  </View>
                </TouchableOpacity>
                <Text style={styles.audioModalText}>Đang ghi âm</Text>
              </View>
            </Modal>
          )}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  mic: { paddingVertical: 2, paddingHorizontal: 12 },
  picture: { paddingVertical: 2, paddingHorizontal: 6 },
  audioModal: { height: 200, alignItems: 'center', marginTop: 50 },
  audioModalIcon: { width: 120, height: 120, backgroundColor: 'red', borderRadius: 60, justifyContent: 'center', alignItems: 'center' },
  audioModalText: { marginTop: 12, fontSize: 20 }
})