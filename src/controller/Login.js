import { signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../firebase/config"
import { getDoc, doc } from "firebase/firestore";


const login = async (email, senha) => {
    try {
        let ususarioLogado = await signInWithEmailAndPassword(auth, email, senha)
        let id = ususarioLogado.user.uid;
        let docUsuRef = doc(db, "Usuarios", ususarioLogado.user.uid)
        let resultQuery = await getDoc(docUsuRef)
        if (resultQuery.exists()) {
            let nome = resultQuery.data().nome;
            console.log("Usuario logado com sucesso: " + JSON.stringify(resultQuery.data()));
            return { id, nome };
        } else {
            console.log("Erro ao buscar documento do ususario!")
        }
    } catch (error) {
        console.log("Erro ao realizar login:" + JSON.stringify(error))
        return false;
    }
}

export { login }