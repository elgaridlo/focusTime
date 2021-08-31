import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Platform, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import { Timer } from './src/features/timer/Timer';
import { colors } from './src/utils/color';
import { spacing } from './src/utils/size';

// You can import from local files

// or any pure javascript modules available in npm

const STATUSES = {
  COMPLETED: 1,
  CANCELLED: 2,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setFocusHistory([...focusHistory, { key: String(focusHistory.length + 1), subject, status }]);
  };

  const onClear=()=>{
    setFocusHistory([])
  }
// it's for load the data from storage
  const loadFocusHistory = async () => {
    try{
      const history = await AsyncStorage.getItem('focusHistory')
      if(history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history))
      }
    } catch(e){
      console.log(e)
    }
  }

// it's for first load application to load history
  useEffect(() => {
    loadFocusHistory()
  },[])

// it for save the data
  const saveFocusHistory = async () => {
    try {
     await AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory))
    } catch(e) {
      console.log(e)
    }
  }

// its for save the data everytime focusHistory changes
  useEffect(() => {
    saveFocusHistory()
  },[focusHistory])

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLETED);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.CANCELLED);
            setFocusSubject(null);
          }}
        />
      ) : (
        <>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear}/>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    color: '#ffff',
  },
  text: {
    padding: spacing.lg,
    color: colors.white,
  },
});
