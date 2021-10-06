import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { Directions } from "react-native-gesture-handler";
import { set } from "react-native-reanimated";

function useTimer(init) {
  const [counter, setCounter] = React.useState(init);
  const [running, setRunning] = React.useState(false);
  const [cycle, setCycle] = React.useState(1);
  const [rest, setRest] = React.useState(false);

  const reset = React.useRef();
  reset.current = init;

  // const currentCycle = React.useRef(cycle)
  // const prevCycle = React.useRef(0)

  let myTimer = React.useRef();

  React.useEffect(() => {
    // console.log("effect start", counter, running);
    if (cycle == 3) {
      stop();
    }
    if (running) {
      if (counter == 1) {
        setRest(!rest);
      }
      if (counter >= 1) {
        myTimer.current = setInterval(() => {
          setCounter(counter - 1);
        }, 1000);
      } else {
        if (rest) {
          setCounter(10);
        } else {
          setCounter(20);
          setCycle(cycle + 1);
        }
      }
    }
    return () => {
      // console.log("effect finish", counter, running);
      clearInterval(myTimer.current);
    };
  }, [counter]);

  const start = () => {
    setCounter(counter - 1);
    setRunning(true);
  };
  const stop = () => {
    // clearInterval(myTimer.current);
    setCounter(reset.current);
    setRunning(false);
    setRest(false);
    setCycle(1);
  };

  return { counter, setCounter, start, stop, rest, cycle, running };
}

export default function App() {
  const { counter, setCounter, start, stop, rest, cycle, running } =
    useTimer(20);

  return (
    <View
      style={
        !rest && running
          ? styles.container2
          : running && rest
          ? styles.container3
          : styles.container
      }
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Workout </Text>
        <Text style={styles.headerText}> App </Text>
      </View>
      <View style={styles.counter}>{counter}</View>
      <View style={styles.buttonView}>
        {!running ? (
          <TouchableOpacity style={styles.button} onPress={start}>
            {" "}
            Start{" "}
          </TouchableOpacity>
        ) : null}
        {running ? (
          <TouchableOpacity style={styles.button} onPress={stop}>
            {" "}
            Stop{" "}
          </TouchableOpacity>
        ) : null}
      </View>
      {running && rest ? (
        <Text style={styles.paragraph1}>Resting 🛌</Text>
      ) : running && !rest ? (
        <Text style={styles.paragraph1}>Working Out 🏋️‍♀️</Text>
      ) : (
        <Text style={styles.paragraph1}>Ready For Workout?</Text>
      )}
      {running ? (
        <Text style={styles.paragraph2}>Cycle: {cycle}</Text>
      ) : (
        <Text style={styles.paragraph2}>10 Cycles</Text>
      )}
      <View style={styles.footer}>
        <Text style={styles.footerText}>by Mintes </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontFamily: "Helvetica",
    fontSize: 30,
    color: "#C6D57E",
  },
  header: {
    height: 80,
    borderColor: "black",
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    margin: 0,
    padding: 20,
  },
  footer: {
    height: 40,
    borderColor: "black",
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    margin: 0,
    padding: 20,
  },
  footerText: {
    color: "grey",
  },

  container: {
    flex: 1,
    justifyContent: "space-between",
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  container2: {
    flex: 1,
    justifyContent: "space-around",
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: "#C6D57E",
    // padding: 8,
  },
  container3: {
    flex: 1,
    justifyContent: "space-around",
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: "#D57E7E",
    // padding: 8,
  },
  counter: {
    color: "#184D47",
    margin: 24,
    fontSize: 200,
    fontFamily: "helvetica",
    fontWeight: "bold",
    textAlign: "center",
  },
  paragraph1: {
    margin: 24,
    fontSize: 50,
    fontFamily: "helvetica",
    color: "#fff",
    textAlign: "center",
  },
  paragraph2: {
    margin: 24,
    fontSize: 50,
    fontFamily: "helvetica",
    fontWeight: "bold",
    color: "#8D2828",
    textAlign: "center",
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#FFE1AF",
    padding: 10,
    margin: 1,
    width: 200,
  },
});
