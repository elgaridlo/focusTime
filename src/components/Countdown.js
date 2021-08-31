import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet} from 'react-native'
import {fontSizes, spacing} from '../utils/size'
import {colors} from '../utils/color'

const minutesToMillis = (min) => min*60*1000
const formatTime = (time) => {
  return time < 10 ? `0${time}`: time
}

export const Countdown = ({
  minutes = 0.1,
  isPaused,
  onProgress,
  onEnd,
}) => {
  const [millis, setMillis] = useState(null)
  const minute = Math.floor(millis / 1000 / 60) % 60
  const seconds = Math.floor(millis / 1000) % 60
  const interval = React.useRef(null)
  const countDown = () => {
    setMillis((time) => {
      if(time === 0) {
        clearInterval(interval.current)
        return time
      }
      const timeLeft = time - 1000
      
      return timeLeft
    })
  }

  useEffect(()=>{
    setMillis(minutesToMillis(minutes))
  },[minutes])

  useEffect(() => {
    onProgress(millis / minutesToMillis(minutes))
    if(millis === 0) {
      onEnd()
    }
  },[millis])

  useEffect(()=> {
    if (isPaused) {
      if(interval.current) clearInterval(interval)
      return
    }
    interval.current = setInterval(countDown, 1000)

    return () => clearInterval(interval.current)
  },[isPaused])
  return(
    <>
      <Text style={styles.text}>{formatTime(minute)}:{formatTime(seconds)}</Text>
    </>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxl,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    padding: fontSizes.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)'
  }
})