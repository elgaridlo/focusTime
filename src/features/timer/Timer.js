import React, { useState } from 'react';
import { useKeepAwake } from 'expo-keep-awake';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { spacing } from '../../utils/size';
import { colors } from '../../utils/color';

import { RoundedButton } from '../../components/RoundedButton';
import { Countdown } from '../../components/Countdown';
import { Timing } from './Timing';

const DEFAULT_TIME = 0.1;

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  // ini buat tetap membuat aplikasi nyala
  useKeepAwake();
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);

      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.countdown}>
          <Countdown
            minutes={minutes}
            onEnd={onEnd}
            isPaused={!isStarted}
            onProgress={onProgress}
          />
        </View>
        <View style={{ paddingTop: spacing.lg }}>
          <Text style={styles.title}>Focus on:</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
        <View style={{ paddingTop: spacing.lg }}>
          <ProgressBar
            progress={progress}
            color="#5E84E2"
            style={{ height: 8 }}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Timing onChangeTime={changeTime} />
        </View>
        <View style={styles.buttonWrapper}>
          {isStarted ? (
            <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
          ) : (
            <RoundedButton title="start" onPress={() => setIsStarted(true)} />
          )}
        </View>
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton size={50} title="-" onPress={() => clearSubject()} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.xxl,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25,
  },
});
