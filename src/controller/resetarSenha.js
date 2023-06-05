import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";

const recuperarSenha = (email) => {
    sendPasswordResetEmail(auth, email)
    .then( () => {
        console.log("Email de redefinição enviado com sucesso!")
    })
    .catch((error) => {
        console.log("Erro ao redefinir senha: "+ JSON.stringify(error))
    })
}


export {recuperarSenha}