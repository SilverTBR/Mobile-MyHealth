import { db, storage } from '../firebase/config';
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';


const imgID = () => {
  const id = Date.now().toString(16) + Math.random().toString(16)
  return id.replace(/\./g, '')
}


// const salvarIMG = async (urlImg) => {
//   const referenciaIMG = ref(storage,"comprovantes/"+ imgID());
//   const file = await fetch(urlImg);
//   const blob = await file.blob();

//   uploadBytes(referenciaIMG, blob, { contentType: "image/jpeg"})
//   .then((result) => {
//     console.log("Upload de imagem realizado com sucesso: "+ JSON.stringify(result))
//     getDownloadURL(referenciaIMG)
//     .then((url)=>{
//       return url
//     })
//     .catch((error) => {
//       console.log("Erro ao pegar link de IMG: "+ JSON.stringify(error))
//     })
//   })
//   .catch((error)=> {
//     console.log("Erro ao dar upload de imagem: "+ JSON.stringify(error))
//   })
// }


const salvarIMG = async (urlImg) => {
  if (!urlImg) {
    console.log("URL is empty");
    return false;
  }

  const caminho = "comprovantes/"+imgID();
  const referenciaIMG = ref(storage, caminho);
  const file = await fetch(urlImg);
  const blob = await file.blob();

  try {
    const result = await uploadBytes(referenciaIMG, blob, { contentType: "image/png" });
    console.log("Upload de imagem realizado com sucesso: " + JSON.stringify(result));
    const url = await getDownloadURL(referenciaIMG);
    return { url, caminho };
  } catch (error) {
    console.log("Erro ao dar upload de imagem: " + JSON.stringify(error));
    return false;
  }
}

const addVacina = async (nome, dataVac, dataProxV, dose, userID, urlImg) => {
  if(nome === ""){
    return false
  }
  const resultado = await salvarIMG(urlImg);
  if (resultado === false) {
    return false;
  }

  if(dose === 4 ){
    dataProxV = 0;
  }


  const novaVacina = {
    nome: nome,
    dataVac: dataVac,
    dataProxV: dataProxV,
    dose: dose,
    userID: userID,
    urlIMG: resultado.url,
    caminhoIMG: resultado.caminho

  }

  const colecaoVac = collection(db, "Vacinas")
  try {
    let result = await addDoc(colecaoVac, novaVacina);
    console.log("Vacina cadastrada: " + JSON.stringify(result));
    return true;
  } catch (error) {
    console.log("Erro durante cadastro de vacina: " + JSON.stringify(error));
    return false;
  }
}

export { addVacina }