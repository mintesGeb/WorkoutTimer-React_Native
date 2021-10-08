import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  FlatList,
} from "react-native";
import PropTypes from "prop-types";
import { Directions } from "react-native-gesture-handler";
import { set } from "react-native-reanimated";

const myData = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const Item = ({ year, month, day, hour, minute }) => (
  <View>
    <Text style={styles.title}>
      {year}-{month}-{day} {hour}:{minute}
    </Text>
  </View>
);

function useTimer(myCycle, mySetTime, myRestTime) {
  const [counter, setCounter] = React.useState(() => {
    return mySetTime;
  });
  const [running, setRunning] = React.useState(false);
  const [cycle, setCycle] = React.useState(1);
  const [rest, setRest] = React.useState(false);
  let workOutData = [];

  const reset = React.useRef();
  reset.current = mySetTime;

  let myTimer = React.useRef();

  React.useEffect(() => {
    console.log(myCycle, mySetTime, myRestTime);
    if (cycle == myCycle + 1) {
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
          setCounter(myRestTime);
        } else {
          setCounter(mySetTime);
          setCycle(cycle + 1);
        }
      }
    }
    return () => {
      clearInterval(myTimer.current);
      logDate(workOutData);
    };
  }, [counter, myCycle, mySetTime, myRestTime]);

  const logDate = (arr) => {
    const thisDate = new Date();
    arr.push({
      year: thisDate.getFullYear(),
      month: thisDate.getMonth() + 1,
      day: thisDate.getDate(),
      hour: thisDate.getHours(),
      minute: thisDate.getMinutes(),
    });
  };

  const start = () => {
    setCounter(counter - 1);
    setRunning(true);
    logDate(workOutData);
  };
  logDate(workOutData);
  const stop = () => {
    // clearInterval(myTimer.current);
    setCounter(reset.current);
    setRunning(false);
    setRest(false);
    setCycle(1);
    logDate(workOutData);
  };

  return {
    counter,
    setCounter,
    start,
    stop,
    rest,
    cycle,
    setCycle,
    running,
    workOutData,
  };
}

export default function App() {
  const [myCycle, setMyCycle] = React.useState(10);
  const [mySetTime, setMySetTime] = React.useState(20);
  const [myRestTime, setMyRestTime] = React.useState(10);

  const {
    counter,
    setCounter,
    start,
    stop,
    rest,
    cycle,
    setCycle,
    running,
    workOutData,
  } = useTimer(myCycle, mySetTime, myRestTime);

  const renderItem = ({ item }) => (
    <Item
      year={item.year}
      month={item.month}
      day={item.day}
      hour={item.hour}
      minute={item.minute}
    />
  );

  return (
    <SafeAreaView>
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
          <Text style={styles.headerText}>Menu </Text>
          <Image
            style={styles.logo}
            source={require("./images/logo/logo-05.png")}
          />
          <Text style={styles.headerText}> Profile </Text>
        </View>
        <View style={styles.inputsView}>
          <TextInput
            style={styles.input}
            placeholder="Cycles"
            onChangeText={(x) => {
              if (+x) {
                setMyCycle(+x);
                // setCycle(+x);
              }
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Time for a set"
            onChangeText={(x) => {
              if (+x) {
                setMySetTime(+x);
                setCounter(+x);
              }
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Rest Time"
            onChangeText={(x) => {
              if (+x) {
                setMyRestTime(+x);
              }
            }}
          />
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
          <Text style={styles.paragraph2}>{myCycle} Cycles</Text>
        )}
        <SafeAreaView>
          <FlatList
            data={workOutData}
            renderItem={renderItem}
            // keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Copyright © 2021 Mintes, Inc.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  inputsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
  },
  logo: {
    width: 100,
    height: 100,
  },
  headerText: {
    fontFamily: "Helvetica",
    fontSize: 18,
    color: "#C6D57E",
  },
  header: {
    height: 120,
    borderColor: "black",
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "space-between",
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
    // padding: 8,
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
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
