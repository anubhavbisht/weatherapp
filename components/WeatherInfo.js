import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../utils/index";
const { PRIMARY_COLOR, SECONDARY_COLOR } = colors;

export default function WeatherInfo({ currentweather }) {
  const { main, weather, name } = currentweather;
  const { icon } = weather[0];
  console.log(weather[0].main);
  const iconurl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  return (
    <View style={styles.winfo}>
      <Text style={styles.name}>{name}</Text>
      <Image style={styles.weatherIcon} source={{ uri: iconurl }} />
      <Text style={styles.textprimary}>{main.temp}°</Text>
      <Text style={styles.descrip}>{weather[0].description}</Text>
      <Text style={styles.textsecondary}>{weather[0].main}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  winfo: {
    alignItems: "center",
  },
  weatherIcon: {
    width: 100,
    height: 100,
    backgroundColor: "#D1FAE5",
    marginTop: 10,
  },
  descrip: {
    textTransform: "capitalize",
    fontSize: 20,
  },
  textprimary: {
    fontSize: 40,
    color: PRIMARY_COLOR,
  },
  textsecondary: {
    fontSize: 30,
    color: SECONDARY_COLOR,
    fontWeight: "500",
    marginTop: 10,
  },
  name: {
    fontSize: 20,
    marginTop: 70,
  },
});
