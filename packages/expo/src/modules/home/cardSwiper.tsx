import Animated from 'react-native-reanimated';

const {clockRunning, startClock, stopClock, spring, Value, set, cond} = Animated;

//Mathematical equations to calculate the trigonometric coefficient of rotation
const rotatedWidthCoefficient = ({width, height}) =>
  width * Math.sin((75 * Math.PI) / 180) + height * Math.sin((15 * Math.PI) / 180);

//Animation function to spring animation
function runSpring(
  clock: Animated.Clock,
  value: Animated.Value<0>,
  velocity: number | Animated.Value<0>,
  dest: number | Animated.Node<number>,
) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    damping: 20,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 1,
    restDisplacementThreshold: 0.5,
    toValue: new Value(0),
  };

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, velocity),
      set(state.position, value),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ];
}

export {runSpring, rotatedWidthCoefficient};
