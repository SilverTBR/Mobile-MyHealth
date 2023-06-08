import {View,Text,TextInput} from 'react-native';
import { estilosGeral } from './styles/Geral_Sty';
import Header from '../components/Header/Header'
import Button from '../components/Button/Button';
import { recuperarSenha } from '../controller/resetarSenha';
import { useState } from 'react';

const RecSenha = (props) => {

    const [carregando, setCarregando] = useState(false)
    const [email, setEmail] = useState ("");
    const [msg, setMsg] = useState("")
    const [color, setColor] = useState("#FD7979")

    const chamarResetar = async () => {
        setCarregando(true);
        let sucesso = await recuperarSenha(email)
        setCarregando(false)
        console.log(sucesso)
        if(sucesso){
            setMsg("Email de redefinição de senha enviado com sucesso!");
            setColor("green")
        }else{
            setMsg("Email invalido!")
            setColor("#FD7979")
        }

    }

    return(
        <View style={estilosGeral.background}>
            <Header action={() => props.navigation.popToTop()}/>
            <View style={estilosGeral.conteudoCentro}>
                <View style={estilosGeral.viewLabelCampo}>
                    <View style={[estilosGeral.viewLabelList, {flex: 15}]}>
                        <View style={estilosGeral.viewLabel}>
                            <Text style={estilosGeral.label}>E-mail</Text>
                        </View>
                    </View>
                    <View style={estilosGeral.viewCampoList}>
                        <TextInput style={estilosGeral.campo} value={email} onChangeText={setEmail}></TextInput>  
                        <Text style={{color}}>{msg.toString()}</Text>

                    </View>
                </View>
                <View style={estilosGeral.conteudoBotao}>    
                    <Button cor="#37BD6D" texto = "Recuperar senha" width="250" margin = "100" carregandoInterno={carregando} action={() => chamarResetar()}/>
                </View>
            </View>
        </View>
    )
}

export default RecSenha;