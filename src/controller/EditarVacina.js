import { db, storage } from '../firebase/config';
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const salvarIMG = async (urlImg, caminhoIMG) => {
  if (!urlImg) {
    console.log("URL is empty");
    return false;
  }

  const referenciaIMG = ref(storage, caminhoIMG);
  const file = await fetch(urlImg);
  const blob = await file.blob();

  try {
    const result = await uploadBytes(referenciaIMG, blob, { contentType: "image/png" });
    console.log("Upload de imagem realizado com sucesso: " + JSON.stringify(result));
    const url = await getDownloadURL(referenciaIMG);
    return { url };
  } catch (error) {
    console.log("Erro ao dar upload de imagem: " + JSON.stringify(error));
    return false;
  }
}

const updateVacina = async (id ,nome, dataVac, dataProxV, dose, urlImg, caminhoIMG ) => {
  if(nome === ""){
    return false
  }
  const resultado = await salvarIMG(urlImg, caminhoIMG);
  if (resultado === false) {
    return false;
  }

  if(dose === 4 ){
    dataProxV = 0;
  }


  const vacinaData = {
    nome: nome,
    dataVac: dataVac,
    dataProxV: dataProxV,
    dose: dose,
    urlIMG: resultado.url,
  }

  const vacReferencia = doc(db, "Vacinas", id)

  try {
    await updateDoc(vacReferencia, vacinaData);
    console.log("Vacina atualizada com sucesso!");
    return true;
  } catch (error) {
    console.log("Erro durante atualização da vacina: " + JSON.stringify(error));
    return false;
  }
}

export { updateVacina }