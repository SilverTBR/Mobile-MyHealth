import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";

const deletarVac = async (idVacina) =>{
    const documento = doc(db, "Vacinas", idVacina)
    try{
        await deleteDoc(documento)
        console.log("Documento excluido com sucesso!");
        return true
    }catch(error) {
        console.log("Erro durante exclusão do documento: "+ error)
        return false
    }

}

export {deletarVac}