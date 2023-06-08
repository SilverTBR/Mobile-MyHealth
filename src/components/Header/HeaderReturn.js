import {View,Text,Image, TouchableOpacity} from 'react-native';
import { estiloHeader } from './Header_Sty';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import { useDispatch } from 'react-redux';
import { reset } from '../../redux/vacinaSlice';



const Header = (props) => {
    const dispatch = useDispatch()

    const retornar = () => {
        dispatch(reset());
        props.action()
    }

    return(
        <View style={estiloHeader.fundo}>
            <TouchableOpacity onPress={retornar}>
                <FontAwesomeIcon icon={faArrowLeft} size={40} style={{color: "#c0c0c0", marginHorizontal: 10}}/>
            </TouchableOpacity>
            <Text style={estiloHeader.headerText}>MyHealth</Text>
        </View>
    )
}

export default Header