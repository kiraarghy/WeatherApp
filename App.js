import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground,
  ActivityIndicator,
  StatusBar
} from "react-native";

import { fetchLocationID, fetchWeather, fetchLocationId } from "./utils/api";
import getImageForWeather from "./utils/getImageForWeather";

import SearchInput from "./components/SearchInput";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      loading: false,
      error: false,
      temperature: 0,
      weather: ""
    };
  }

  componentDidMount() {
    this.handleUpdateLocation("London");
  }

  handleUpdateLocation = async city => {
    if (!city) return;

    this.setState(
      {
        loading: true
      },
      async () => {
        try {
          const locationID = await fetchLocationId(city);
          const { location, weather, temperature } = await fetchWeather(
            locationID
          );

          this.setState({
            loading: false,
            error: false,
            location,
            weather,
            temperature
          });
        } catch (e) {
          this.setState({
            loading: false,
            error: true
          });
        }
      }
    );
  };

  render() {
    const { location, weather, temperature, error, loading } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ImageBackground
          source={getImageForWeather(weather)}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} color="white" size="large" />
            {!loading && (
              <View>
                {error && (
                  <Text style={[styles.smallText, styles.textStyle]}>
                    Could not load weather, please try a different city
                  </Text>
                )}
                {!error && (
                  <View>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {location}
                    </Text>
                    <Text style={[styles.smallText, styles.textStyle]}>
                      {weather}
                    </Text>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {`${Math.round(temperature)}`}C
                    </Text>
                  </View>
                )}
                <SearchInput
                  placeholder="Search any City"
                  onSubmit={this.handleUpdateLocation}
                />
              </View>
            )}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#34495E"
  },
  imageContainer: { flex: 1 },
  image: { flex: 1, width: null, height: null, resizeMode: "cover" },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 20
  },
  textStyle: {
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "AvenirNext-Regular" : "Roboto",
    color: "white"
  },
  largeText: { fontSize: 44 },
  smallText: { fontSize: 18 },
  TextInput: {
    backgroundColor: "#666",
    color: "white",
    height: 40,
    width: 300,
    marginTop: 20,
    marginHorizontal: 10,
    alignSelf: "center"
  }
});
