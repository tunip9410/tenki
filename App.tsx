import { useFonts } from "expo-font"
import {View} from "react-native";
import Main from "./src/pages/main";

function App() {
    const [fontsLoaded] = useFonts({
        "Montserrat": require("./assets/Montserrat/Montserrat-Regular.ttf")
    })

    if (fontsLoaded) {
        return (
            <Main></Main>
        )
    } else {
        return (
            <View></View>
        )
    }
}

export default App