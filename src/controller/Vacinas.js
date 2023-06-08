import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
const vacina = []
let unsubscribe = null;


const buscaVacinasGeral = (userID) => {
    return new Promise((resolve, reject) => {
      const vacQuery = query(collection(db, "Vacinas"), where("userID", "==", userID))
  
     unsubscribe = onSnapshot(vacQuery, (listaVacinas) => {
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

const returnVacinasProx = () => {
    const vacinasProx = vacinas.filter(vacina => vacina.dose !== 4);
    return vacinasProx;   
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

export { unsubscribe ,tipoDose, verData, returnVacinasProx, buscaVacinasGeral};
