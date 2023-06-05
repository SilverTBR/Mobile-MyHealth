//importação
import { TouchableOpacity, View, Text } from "react-native";
import { estilos } from "./Button_Sty";
import { ActivityIndicator } from "react-native-paper";
//definição
const Button = (props) => {
    return (
        <TouchableOpacity
          style={estilos(props.cor, props.padding, props.margin).fundo}
          onPress={props.carregandoInterno ? null : props.action}
          disabled={props.carregando}
        >
          <View>
            {props.carregandoInterno ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={estilos().text}>{props.texto}</Text>
            )}
          </View>
        </TouchableOpacity>
      );
    };
//Exportação
export default Button