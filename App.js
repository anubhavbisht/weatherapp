import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import WeatherInfo from "./components/WeatherInfo";
import UnitsPicker from "./components/UnitsPicker";
import { colors } from "./utils/index";
import ReloadIcon from "./components/ReloadIcon";
import WeatherDetails from "./components/WeatherDetails";
const weatherapikey = "";//enter your api key

export default function App() {
  const [errormessage, seterror] = useState(null);
  const [currentweather, setweather] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState("metric");
  useEffect(() => {
    load();
  }, [unitsSystem]);
  async function load() {
    setweather(null);
    seterror(null);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        seterror("Access is not granted");
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      const weatherurl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${weatherapikey}`;
      console.log(weatherurl);
      const response = await fetch(weatherurl);
      console.log(response);
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        setweather(result);
      } else {
        seterror(result.message);
      }
    } catch (error) {
      console.log(error.message);
      seterror(error.message);
    }
  }
  if (currentweather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <UnitsPicker
            unitsSystem={unitsSystem}
            setUnitsSystem={setUnitsSystem}
          />
          <ReloadIcon load={load} />
          <Text style={styles.heading}>Weather App</Text>
          <WeatherInfo currentweather={currentweather} />
        </View>
        <WeatherDetails
          currentweather={currentweather}
          unitsSystem={unitsSystem}
        />
      </View>
    );
  } else if (errormessage) {
    return (
      <View style={styles.container}>
        <ReloadIcon load={load} />
        <Text>{errormessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#C7D2FE",
  },
  main: {
    flex: 1,
    justifyContent: "center",
  },
  heading: {
    flex: 1,
    position: "absolute",
    top: 60,
    left: 105,
    fontSize: 30,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#831843",
  },
});
