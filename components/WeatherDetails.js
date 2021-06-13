import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../utils/index";
const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors;
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

export default function WeatherDetails({ currentweather, unitsSystem }) {
  const { main, wind } = currentweather;
  const windSpeed =
    unitsSystem === "metric"
      ? `${Math.round(wind.speed)} m/s`
      : `${Math.round(wind.speed)} miles/h`;
  return (
    <View style={styles.details}>
      <View style={styles.weatherrow}>
        <View
          style={{
            ...styles.weatherbox,
            borderRightWidth: 1,
            borderRightColor: BORDER_COLOR,
          }}
        >
          <View style={styles.weatherrow}>
            <FontAwesome5
              name="temperature-low"
              size={25}
              color={PRIMARY_COLOR}
            />
            <View style={styles.weatheritems}>
              <Text>Feels Like::</Text>
              <Text style={styles.textSecondary}>{main.feels_like}</Text>
            </View>
          </View>
        </View>
        <View style={styles.weatherbox}>
          <View style={styles.weatherrow}>
            <MaterialCommunityIcons
              name="water"
              size={30}
              color={PRIMARY_COLOR}
            />
            <View style={styles.weatheritems}>
              <Text>Humidity::</Text>
              <Text style={styles.textSecondary}>{main.humidity} %</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.weatherrow}>
        <View
          style={{
            ...styles.weatherbox,
            borderRightWidth: 1,
            borderRightColor: BORDER_COLOR,
          }}
        >
          <View style={styles.weatherrow}>
            <MaterialCommunityIcons
              name="speedometer"
              size={30}
              color={PRIMARY_COLOR}
            />

            <View style={styles.weatheritems}>
              <Text>Wind Speed::</Text>
              <Text style={styles.textSecondary}>{windSpeed}</Text>
            </View>
          </View>
        </View>
        <View style={styles.weatherbox}>
          <View style={styles.weatherrow}>
            <MaterialCommunityIcons
              name="weather-windy"
              size={30}
              color={PRIMARY_COLOR}
            />
            <View style={styles.weatheritems}>
              <Text>Pressure::</Text>
              <Text style={styles.textSecondary}>{main.pressure} hPa</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  details: {
    marginTop: "auto",
    margin: 15,
    borderWidth: 1,
    borderColor: "#374151",
    borderRadius: 10,
  },
  weatherrow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  weatherbox: {
    flex: 1,
    padding: 20,
  },
  weatheritems: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  textSecondary: {
    fontSize: 15,
    color: SECONDARY_COLOR,
    fontWeight: "700",
    margin: 7,
  },
});
