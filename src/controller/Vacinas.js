import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const vacina = []


const buscaVacinasGeral = (userID) => {
    return new Promise((resolve, reject) => {
      const vacQuery = query(collection(db, "Vacinas"), where("userID", "==", userID))
  
      onSnapshot(vacQuery, (listaVacinas) => {
        vacinas = [];
        listaVacinas.forEach((snapVacinaIndividual) => {
          vacinas.push({
            nome: snapVacinaIndividual.data().nome,
            dataVac: snapVacinaIndividual.data().dataVac,
            dataProxV: snapVacinaIndividual.data().dataProxV,
            dose: snapVacinaIndividual.data().dose,
            id: snapVacinaIndividual.id,
            caminhoIMG: snapVacinaIndividual.data().caminhoIMG,
            urlIMG: snapVacinaIndividual.data().urlIMG
          });
        });
        resolve(vacinas);
      }, (error) => {
        reject(error);
      });
    });
  };
  

const pushVacinas = (vacina) =>{
    vacina.id = vacinas[vacinas.length-1].id+1;
    vacinas.push(vacina);
    console.log(vacina)
}

const returnVacinas = () => {
    return vacinas;
} 

const returnVacinasID = (id) => {
    let resultado = vacinas.find(vacina => vacina.id === id);
    if(resultado === undefined){
        return -1
    }else{
        return resultado;
    }
}

const excluirID = (id) => {
    index = vacinas.findIndex(tempVac => tempVac.id === id)
    vacinas.splice(index,1);
}

const returnVacinasProx = () => {
    const vacinasProx = vacinas.filter(vacina => vacina.dose !== 4);
    return vacinasProx;   
}

const returnVacinasIndex = (id) => {
    let resultado = vacinas.findIndex(vacina => vacina.id === id);
    return resultado
}

const tipoDose = (valTip) => {
    switch (valTip) {
        case 1:
            return "1ª dose"
        case 2:
            return "2ª dose"
        case 3:
            return "3ª dose"
        case 4:
            return "Dose única"
    }
}

const verData = (data) => {
    if(data === 0){
        return "Não há próxima dose"
    }else{
        return "Próxima dose em: "+data
    }
}

const editar = (vacina) => {
   let index = returnVacinasIndex(vacina.id);
   vacinas[index] = vacina;
}

export {pushVacinas, returnVacinas, returnVacinasID, tipoDose, verData, editar, returnVacinasProx, excluirID, buscaVacinasGeral};
