import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';

interface Props {
  mm: number;
  reset: boolean;
}

const Timer = ({mm, reset}: Props) => {
  const [minutes, setMinutes] = useState<number>(mm);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (reset) {
        setMinutes(3);
        setSeconds(0);
        return;
      }
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [minutes, reset, seconds]);

  return (
    <Text>
      {minutes < 10 ? `0${minutes}` : minutes}:
      {seconds < 10 ? `0${seconds}` : seconds}
    </Text>
  );
};

export default Timer;
