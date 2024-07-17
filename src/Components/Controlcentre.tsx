import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TrackPlayer, {usePlaybackState, State} from 'react-native-track-player'


import Icon from 'react-native-vector-icons/MaterialIcons'
import { playbackService } from '../../musicPlayerServices'

const Controlcentre = () => {

    const playBackState = usePlaybackState();
    
    // Previous Button
    const skipToNext = async () => {
        await TrackPlayer.skipToNext();
    }
    
    // Next Button
    const skipToPrevious = async () => {
        await TrackPlayer.skipToPrevious();
    }

    // Toggle Button
    const togglePlayBack = async (playback: State) => {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        
        if(currentTrack != null){
            if(playback === State.Paused || playback === State.Ready){
                await TrackPlayer.play();
            }else{
                await TrackPlayer.pause();
            }
        }
    }

  return (
    <View style={styles.container}>
      <Pressable onPress={skipToPrevious}>
          <Icon style={styles.icon} name="skip-previous" size={40} />
      </Pressable>
      <Pressable onPress={() => togglePlayBack(playBackState)}>
          <Icon style={styles.icon} name={playBackState === State.Playing ? "pause" : "play-arrow"} size={75} />
      </Pressable>
      <Pressable onPress={skipToNext}>
          <Icon style={styles.icon} name="skip-next" size={40} />
      </Pressable>
    </View>
  )
}

export default Controlcentre

const styles = StyleSheet.create({
    container: {
        marginBottom: 56,
    
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      },
      icon: {
        color: '#FFFFFF',
      },
      playButton: {
        marginHorizontal: 24,
      },
})