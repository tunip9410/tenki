import styled from "styled-components/native";
import {useEffect, useState} from "react";
import * as Location from "expo-location";
import {Text, View} from "react-native";

const MainLayer = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`

const MainContentLayer = styled.View`
    flex: 1;
    width: 100%;
    justify-content: center;
    margin-left: 70px;
    margin-top: 40px;
`

const SubContentLayer = styled.View`
    flex: 1;
    width: 100%;
`

const TempText = styled.Text`
    font-size: 100px;
    font-family: "Montserrat";
`

const Description = styled.Text`
    font-size: 40px;
    font-family: "Montserrat";
    margin-bottom: 10px;
`

const CityName = styled(Description)`
    font-size: 15px;
    margin: 0;
`

const ForecastLayer = styled.View`
    flex: 1;
    border: 1px solid black;
`

function Main() {
    const [weather, setWeather] = useState()
    const [forecastArr, setForecastArr] = useState<object[]>([])
    const API_KEY = "a1215692d81f82a8f734b4e483c2af15"

    async function getLocation() {
        await Location.requestForegroundPermissionsAsync();
        const {
            coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync();
        console.log(latitude, longitude)

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`).then((res :any) => res.json()).then((json :any) => {
            setWeather(json)
        })
    }

    async function getForecast() {
        await Location.requestForegroundPermissionsAsync();
        const {coords: { latitude, longitude }} = await Location.getCurrentPositionAsync();

        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`).then((res) => res.json()).then((json) => {
            setForecastArr(json.list)
        })
    }

    useEffect(() => {
        getForecast().then(r => r)
        getLocation().then(r => r)
    }, [])

    if (forecastArr[0] !== undefined) {

    }

    if (weather !== undefined) {
        console.log(weather.sys.sunrise, weather.sys.sunset)

        return (
            <MainLayer>
                <MainContentLayer>
                    <TempText>{weather.main.temp.toFixed(1)}</TempText>
                    <Description>{weather.weather[0].description}</Description>
                    <CityName>{weather.name}</CityName>
                    <CityName>{weather.main.temp_max.toFixed(1)} / {weather.main.temp_min.toFixed(1)}</CityName>
                </MainContentLayer>
                <SubContentLayer>
                    {forecastArr
                        .slice(0, 20)
                        .map((e, i :number) => (
                        <View key={i}>
                            <Text>{e.main.temp.toFixed(1)}</Text>
                            <Text>{new Date(e.dt * 1000).toString()}</Text>
                        </View>
                    ))}
                </SubContentLayer>
            </MainLayer>
        )
    } else {
        return null
    }
}

export default Main