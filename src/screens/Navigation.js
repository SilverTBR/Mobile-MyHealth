import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Inicial from "./Inicial"
import RecSenha from "./RecSenha";
import CadUsuario from "./CadastrarUsuario";
import TelaHome from "./Home";
import DrawerNavigation from "../components/Drawer/DrawerNavigation";
import NovaVacina from "./NovaVacina";
import { Provider } from "react-redux";
import { store } from "../redux/store";


const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Inicial" component={Inicial} />
                    <Stack.Screen name="RecSenha" component={RecSenha} />
                    <Stack.Screen name="CadUsuario" component={CadUsuario} />
                    <Stack.Screen name="TelaHome" component={TelaHome} />
                    <Stack.Screen name="NovaVacina" component={NovaVacina} />
                    <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}

export default Navigation;