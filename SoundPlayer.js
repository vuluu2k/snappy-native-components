import * as React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import Colors from './Colors';

export default function SoundPlayer(props) {
  const [sound, setSound] = React.useState();
  const [isLoading, setLoading] = React.useState(false);

  async function playSound() {
    setLoading(true);
    const { sound } = await Audio.Sound.createAsync(
      {
        uri: props?.url,
      },
    );
    setSound(sound);
    setLoading(false);
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={playSound}
        style={{
          padding: 6,
          borderRadius: 10,
          backgroundColor: '#fff',
          height: 30,
          width: 30,
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View>{isLoading ? <ActivityIndicator size="small" color="#ccc" /> : <Feather name="play" size={20} />}</View>
      </TouchableOpacity>
      <View style={{ marginLeft: 10 }}>
        <Text style={{ color: props?.isDarkText ? Colors.gray_5 : '#fff', fontSize: 10 }}>Phát file âm thanh</Text>
      </View>
    </View>
  );
}
