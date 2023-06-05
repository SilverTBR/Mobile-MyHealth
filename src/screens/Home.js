import { FlatList, View, Text, Image, TextInput } from 'react-native'
import { estilosGeral } from './styles/Geral_Sty';
import Header from '../components/Drawer/HeaderDrawer';
import { tipoDose, verData, returnVacinas, buscaVacinasGeral } from '../controller/Vacinas';
import { useState, useEffect } from 'react';
import { estiloHome } from './styles/Home_Sty';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass'
import Button from '../components/Button/Button'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setGlobalVacina } from '../redux/vacinaSlice';

const TelaHome = (props) => {
  const [pesquisa, setPesquisa] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [vacinas, setVacinas] = useState([])
  const [vacinasF, setVacinasF] = useState([]);
  const [carregando, setCarregando] = useState(false)
  const userID = useSelector((state) => state.usuario.id)
  const dispatch = useDispatch()


  useEffect(()=> {
    let texto = pesquisa.trim()
    setVacinasF(vacinas.filter(vacina => vacina.nome.toLowerCase().includes(texto.toLowerCase())))
    setRefresh(!refresh)
  },[pesquisa])



  props.navigation.addListener('focus', async () => {
    try {
      setCarregando(true)
      const vacinasData = await buscaVacinasGeral(userID);
      setCarregando(false)
      setVacinas(vacinasData);
      setVacinasF(vacinasData);
      setRefresh(!refresh);
      dispatch(setGlobalVacina({}));
        } catch (error) {
      console.error(error);
    }
  });

  const stackTela = (tela, vacina) => {
    props.navigation.push(tela, {vacina: vacina});
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
            extraData={refresh}
            
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
