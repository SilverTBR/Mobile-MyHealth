import { TouchableOpacity, View, Text, Image, TextInput, ScrollView } from 'react-native'
import { estilosGeral } from './styles/Geral_Sty';
import Header from '../components/Header/HeaderReturn';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState, useEffect } from 'react';
import logo from '../assets/images/iconcalendario.png';
import { RadioButton } from 'react-native-paper';
import Button from '../components/Button/Button'
import { estiloVacina } from './styles/Vacina_Sty';
import { editar, pushVacinas, excluirID } from '../controller/Vacinas';
import { estilos } from "../components/Button/Button_Sty";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
import { Modal } from "react-native"
import { addVacina } from '../controller/CadastrarVacina';
import { useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import { updateVacina } from '../controller/EditarVacina';
import { deletarVac } from '../controller/DeleteVacina';
import { useDispatch } from 'react-redux';
import { reset } from '../redux/vacinaSlice';




const TelaPVacina = (props) => {
    const [dateV, setDateV] = useState(new Date());
    const [datePV, setDatePV] = useState(new Date());
    const [showV, setShowV] = useState(false);
    const [showPV, setShowPV] = useState(false);
    const [dose, setDose] = useState(1);
    const [vacinaN, setVacinaN] = useState("")
    const [hideDatePicker, setHideDatePicker] = useState(false);
    const [iseditar, setEditar] = useState(false);
    const [excluir, setExcluir] = useState(false)
    const [urlFoto, setUrlFoto] = useState('')
    const [carregando, setCarregando] = useState(false)
    const [falhou, setFalhou] = useState(false)
    const userID = useSelector((state) => state.usuario.id)
    const vacina = useSelector((state) => state.vacina)
    const dispatch = useDispatch()


    const onChangeV = (event, selectedDate) => {
        let currentDate = selectedDate || dateV;
        setShowV(false);
        setDateV(currentDate);
    };

    const onChangePV = (event, selectedDate) => {
        let currentDate = selectedDate || datePV;
        setShowPV(false);
        setDatePV(currentDate);
        //console.log('Data selecionada:', date.toLocaleDateString());
    };


    const showDatepickerV = () => {
        setShowV(true);
    };

    const showDatepickerPV = () => {
        setShowPV(true);
    };

    const retorno = () => {
        dispatch(reset());
        props.navigation.pop();
    }

    const mudaDose = (dose) => {
        if (dose === 4) {
            setHideDatePicker(true);
        } else {
            setHideDatePicker(false);
        }
    }

    const converteStringParaData = (data) => {
        let [day, month, year] = data.split("/");
        return new Date(year, month - 1, day);
    }

    useEffect(() => {
        if (vacina.id) {
            setEditar(true)
            setVacinaN(vacina.nome)
            setDose(vacina.dose)
            setDateV(converteStringParaData(vacina.dataVac))
            setUrlFoto(vacina.urlIMG)
            if (vacina.dose === 4) {
                mudaDose(vacina.dose)
            } else {
                setDatePV(converteStringParaData(vacina.dataProxV))
            }
        }
    }, []);

    const selectImagem = () => {
        const opt = {
            mediaType: "photo",
            quality: 1,
            selectionLimit: 1,
        }

        launchImageLibrary(opt)
            .then((resultado) => {
                setUrlFoto(resultado.assets[0].uri)
            })
            .catch((error) => {
                console.log("Erro ao capturar a imagem: " + JSON.stringify(error))
            })

    }

    const chamarCadasto = async () => {
        setCarregando(true)
        let sucesso = await addVacina(vacinaN, dateV.toLocaleDateString(), datePV.toLocaleDateString(), dose, userID, urlFoto)
        setCarregando(false)
        if (sucesso) {
            props.navigation.pop();
        } else {
            setFalhou(true)
        }
    }

    const chamarEditar = async () => {
        setCarregando(true)
        let sucesso = await updateVacina(vacina.id,vacinaN, dateV.toLocaleDateString(), datePV.toLocaleDateString(), dose, urlFoto, vacina.caminhoIMG)
        setCarregando(false)
        if (sucesso){
            dispatch(reset())
            props.navigation.pop()
        }else{
            setFalhou(true)
        }
    }

    const chamarExcluir = async () => {
        setCarregando(true)
        let sucesso = await deletarVac(vacina.id)
        setCarregando(false)
        if(sucesso){
            dispatch(reset())
            setExcluir(false)
            props.navigation.pop()
        }
    }


    return (
        <View style={[estilosGeral.background]}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={excluir}
            >
                <View style={estiloVacina.modalContainer}>
                    <View style={estiloVacina.modalCaixa}>
                        <Text style={[estilosGeral.font, { marginHorizontal: 20, color: "#FD7979", fontSize: 20, textAlign: 'center' }]}>Tem certeza que deseja remover essa vacina?</Text>
                        <View style={estiloVacina.modalBotoes}>
                            <View style={[estilosGeral.conteudoBotao]}>
                                <Button cor="#FF8383" texto="Sim" padding="10" carregandoInterno={carregando} action={() => { chamarExcluir() }} />
                            </View>
                            <View style={[estilosGeral.conteudoBotao, { marginLeft: 10 }]}>
                                <Button cor="#3F92C5" texto="Cancelar" padding="10" carregandoInterno={carregando} action={() => { setExcluir(false) }} />
                            </View>
                        </View>
                    </View>
                </View>

            </Modal>
            <Header action={retorno} />
            <View style={estilosGeral.conteudoCentro}>
                {/* <ScrollView contentContainerStyle={{ justifyContent: "center", marginTop: 50}}> */}
                <View style={estilosGeral.viewLabelCampo}>
                    <View style={estilosGeral.viewLabelList}>
                        <View style={estilosGeral.viewLabel}>
                            <Text style={estilosGeral.label}>Data de vascinação</Text>
                        </View>
                        <View style={estilosGeral.viewLabel}>
                            <Text style={estilosGeral.label}>Vacina</Text>
                        </View>
                        <View style={estilosGeral.viewLabel}>
                            <Text style={estilosGeral.label}>Dose</Text>
                        </View>
                        <View style={[estilosGeral.viewLabel, { height: 100 }]}>
                            <Text style={estilosGeral.label}>Comprovante</Text>
                        </View>

                        {!hideDatePicker && (<View style={[estilosGeral.viewLabel, { marginTop: 155 }]}>
                            <Text style={estilosGeral.label}>Próxima vacinação</Text>
                        </View>)}

                    </View>
                    <View style={estilosGeral.viewCampoList}>
                        <TouchableOpacity onPress={showDatepickerV} style={[estilosGeral.campo, estilosGeral.campoData]}>
                            <Text style={estilosGeral.textData}>{dateV.toLocaleDateString()}</Text>
                            <Image source={logo} style={estilosGeral.dataIcon} />
                        </TouchableOpacity>
                        {showV && (<DateTimePicker testID='dateTimePicker' value={dateV} mode='date' display='default' onChange={onChangeV} />)}

                        <TextInput style={estilosGeral.campo} value={vacinaN} onChangeText={setVacinaN}></TextInput>

                        <RadioButton.Group onValueChange={dose => { setDose(dose); mudaDose(dose) }} value={dose}>
                            <View style={[estilosGeral.viewDataCampo]}>
                                <View style={estilosGeral.genView}>
                                    <RadioButton value={1} color='#419ED7' />
                                    <Text style={estilosGeral.label}>1ª. dose</Text>
                                </View>

                                <View style={estilosGeral.genView}>
                                    <RadioButton value={2} color='#419ED7' />
                                    <Text style={estilosGeral.label}>2ª. dose</Text>
                                </View>
                                <View style={estilosGeral.genView}>
                                    <RadioButton value={3} color='#419ED7' />
                                    <Text style={estilosGeral.label}>3ª dose</Text>
                                </View>

                                <View style={estilosGeral.genView}>
                                    <RadioButton value={4} color='#419ED7' />
                                    <Text style={estilosGeral.label}>Dose única</Text>
                                </View>
                            </View>
                        </RadioButton.Group>
                        <View style={{ alignItems: "flex-start", marginTop: 50 }}>
                            <Button texto="Selecionar imagem..." cor="#419ED7" padding="6" action={() => { selectImagem() }} />
                        </View>
                        <View style={estiloVacina.imgFundo}>
                            {
                                urlFoto ? <Image resizeMode="contain" source={{ uri: urlFoto }} style={estiloVacina.img} />
                                    : null

                            }

                        </View>

                        {!hideDatePicker && (
                            <TouchableOpacity onPress={showDatepickerPV} style={[estilosGeral.campo, estilosGeral.campoData]}>
                                <Text style={estilosGeral.textData}>{datePV.toLocaleDateString()}</Text>
                                <Image source={logo} style={estilosGeral.dataIcon} />
                            </TouchableOpacity>
                        )}
                        {showPV && (<DateTimePicker testID='dateTimePicker' value={datePV} mode='date' display='default' onChange={onChangePV} />)}

                        {falhou && <Text style={estilosGeral.avisoText}>Dados inseridos estão inválidos.</Text>}
                    </View>

                </View>
                {!iseditar && (<View style={[estilosGeral.conteudoBotao, { marginBottom: 50 }]}>
                    <Button cor="#37BD6D" texto="Cadastrar" padding="5" carregandoInterno={carregando}  action={() => { chamarCadasto() }} />
                </View>)}

                {iseditar && (<View style={[estilosGeral.conteudoBotao, { marginBottom: 50 }]}>
                    <Button cor="#37BD6D" texto="Salvar alteração" padding="5" carregandoInterno={carregando} action={() => { chamarEditar() }} />
                </View>
                )}

                {iseditar && (
                    <View style={[estilosGeral.conteudoBotao, { marginBottom: 50 }]}>
                        <TouchableOpacity style={estilos("#FD7979", 5).fundo} onPress={() => { setExcluir(true) }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <FontAwesomeIcon icon={faTrash} style={{ marginEnd: 5 }} color='white' />
                                <Text style={estilos().text}>Excluir</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
                {/* </ScrollView> */}
            </View>
        </View>
    )


}

export default TelaPVacina;
