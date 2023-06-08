import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";

const recuperarSenha = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (error) {
      console.log("Erro ao redefinir senha: " + JSON.stringify(error));
      return false;
    }
  };


export {recuperarSenha}