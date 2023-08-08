import styled from "styled-components/native";
import {useState, useEffect} from "react";
import { useFonts } from "expo-font"
import * as Location from "expo-location";

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

function App() {
    const [city, setCity] = useState("")
    const [description, setDescription] = useState("")
    const [temp, setTemp] = useState(0)
    const [tempMax, setTempMax] = useState(0)
    const [tempMin, setTempMin] = useState(0)
    const [fontsLoaded] = useFonts({
        "Montserrat": require("./assets/Montserrat/Montserrat-Regular.ttf")
    })

    async function getLocation() {
        await Location.requestForegroundPermissionsAsync();
        const {
            coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync();
        console.log(latitude, longitude)

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a1215692d81f82a8f734b4e483c2af15&units=metric`).then(res => res.json()).then((json) => {
            console.log(json)
            setCity(json.name)
            setDescription(json.weather[0].description)
            setTemp(json.main.temp)
            setTempMin(json.main.temp_min)
            setTempMax(json.main.temp_max)
        })
    }

    useEffect(() => {
        getLocation().then(r => r)
    }, [])

    if (fontsLoaded) {
        return (
            <>
                <MainLayer>
                    <MainContentLayer>
                        <TempText>{temp.toFixed(1)}</TempText>
                        <Description>{description}</Description>
                        <CityName>{city}</CityName>
                        <CityName>{tempMax.toFixed(1)} / {tempMin.toFixed(1)}</CityName>
                    </MainContentLayer>
                    <SubContentLayer></SubContentLayer>
                </MainLayer>
            </>
        );
    } else {
        return (
            <MainLayer></MainLayer>
        )
    }
}

export default App