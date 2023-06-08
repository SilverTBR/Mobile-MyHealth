import { FlatList, View, Text, Image, TextInput } from 'react-native'
import { estilosGeral } from './styles/Geral_Sty';
import Header from '../components/Drawer/HeaderDrawer';
import { tipoDose, verData, unsubscribe, buscaVacinasGeral } from '../controller/Vacinas';
import { useState, useEffect } from 'react';
import { estiloHome } from './styles/Home_Sty';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass'
import Button from '../components/Button/Button'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setGlobalVacina, reset } from '../redux/vacinaSlice';

const TelaHome = (props) => {
  const [pesquisa, setPesquisa] = useState("");
  const [vacinas, setVacinas] = useState([])
  const [vacinasF, setVacinasF] = useState([]);
  const [carregando, setCarregando] = useState(false)
  const userID = useSelector((state) => state.usuario.id)
  const dispatch = useDispatch()


  useEffect(()=> {
    let texto = pesquisa.trim()
    setVacinasF(vacinas.filter(vacina => vacina.nome.toLowerCase().includes(texto.toLowerCase())))
  },[pesquisa])

  // const ativarBusca = async () => {
  //   try {
  //     setCarregando(true)
  //     const vacinasData = await buscaVacinasGeral(userID);
  //     setCarregando(false)
  //     setVacinas(vacinasData);
  //     setVacinasF(vacinasData);
  //     dispatch(setGlobalVacina({}));
  //       } catch (error) {
  //     console.error(error);
  //   }
  // }



  props.navigation.addListener('focus', async () => {
    try {
      setCarregando(true)
      const vacinasData = await buscaVacinasGeral(userID);
      setCarregando(false)
      setVacinas(vacinasData);
      setVacinasF(vacinasData);
        } catch (error) {
      console.error(error);
    }
  });

  // useEffect(() => {
  //   ativarBusca();
  //   reset();
  // }, [])

  const stackTela = (tela) => {
    unsubscribe();
    props.navigation.push(tela);
  }

  const definindoVGlobal = (vacina) =>{
    dispatch(setGlobalVacina({id: vacina.id, nome: vacina.nome, dataVac: vacina.dataVac, dataProxV: vacina.dataProxV, dose: vacina.dose, urlIMG: vacina.urlIMG, caminhoIMG: vacina.caminhoIMG}))
  }




  const renderItem = ({ item: vacina }) => {
    return (
      <View style={estiloHome.conteudoFlat}>
      <TouchableOpacity style = {{alignItems: "center"}} onPress={() => [definindoVGlobal(vacina) ,stackTela("NovaVacina")]}>
          <Text style={[estilosGeral.font, estiloHome.tituloFlat]}>{vacina.nome}</Text>
          <Text style={[estilosGeral.font, estiloHome.doseText]}>{tipoDose(vacina.dose)}</Text>
          <Text style={[estilosGeral.font, estiloHome.dataText]}>{vacina.dataVac}</Text>
          <Image source={{ uri: vacina.urlIMG }} style={estiloHome.flatImage} />
          <Text style={[estiloHome.fontProxVac, estilosGeral.font]}>{verData(vacina.dataProxV)}</Text>
      </TouchableOpacity>
      </View>
    );
  };

  return (



    <View style={[estilosGeral.background]}>
      <Header {...props} />

      <View style={estilosGeral.conteudoCentro}>

        <View style={estiloHome.viewPesquisa}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size={30} style={{color: "#c0c0c0", marginHorizontal: 10}}/>
          <TextInput placeholder="PESQUISAR VACINA..." placeholderTextColor={"#8B8B8B"} style={estiloHome.pesquisaCampo} value={pesquisa} onChangeText={setPesquisa}></TextInput>
        </View>

        <View style={{justifyContent: "center", flex: 90, }}>
          <FlatList
            data={vacinasF}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            extraData={vacinasF}
            
          />
        </View>
        <View style={[estilosGeral.conteudoBotao, {marginBottom: 50}]}>    
            <Button cor="#37BD6D" texto = "Nova vacina" padding="5" carregandoInterno = {carregando}  action={() => stackTela("NovaVacina")}/>
        </View>

      </View>
    </View>
  )
}

export default TelaHome;
