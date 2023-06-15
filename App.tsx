import styled from "styled-components/native";
import createGlobalStyle from "styled-components";
import {useState, useEffect, useCallback} from "react";
import * as Location from "expo-location";

import Montserrat from "./assets/Montserrat/Montserrat-Medium.ttf"

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: Montserrat;
        src: url(${Montserrat});
        font-style: normal;
    }
    
    * {
        font-family: Montserrat,sans-serif;
    }
`

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
`

const SubContentLayer = styled.View`
    flex: 1;
`

const TempText = styled.Text`
    font-size: 100px;
`

const Description = styled.Text`
    font-size: 40px;
    font-weight: normal;
`

function App() {
    const [city, setCity] = useState("")
    const [description, setDescription] = useState("")
    const [temp, setTemp] = useState(0)
    const [image, setImage] = useState("")

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
            setImage(json.weather[0].icon)
        })
    }

    useEffect(() => {
        getLocation().then(r => r)
    }, [])

    return (
        <MainLayer>
            <MainContentLayer>
                <TempText>{temp.toFixed(1)}</TempText>
                <Description>{description}</Description>
            </MainContentLayer>
            <SubContentLayer></SubContentLayer>
        </MainLayer>
    );
}

export default App