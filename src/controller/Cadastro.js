import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase/config';
import { setDoc, doc } from "firebase/firestore";

/*Versão sem async, e logo abaixo versão com async*/
// const addUser = (nome, sexo, data, id) => {
//     const novoUsuario = {
//         nome: nome,
//         sexo: sexo,
//         data: data
//     }
//     const userDoc = doc(db, "Usuarios", id);
//     setDoc(userDoc, novoUsuario)
//         .then(() => {
//             console.log("Usuario cadastrado: "+ JSON.stringify(userDoc))
//             return true;
//         })
//         .catch((error) => {
//             console.log("Erro durante cadastro de usuario: "+ JSON.stringify(error))
//             return false;
//         })

// }
const addUser = async (nome, sexo, data, id) => {
    const novoUsuario = {
      nome: nome,
      sexo: sexo,
      data: data
    }
    const userDoc = doc(db, "Usuarios", id);
  
    try {
      await setDoc(userDoc, novoUsuario);
      console.log("Usuario cadastrado: " + JSON.stringify(userDoc));
      return id;
    } catch (error) {
      console.log("Erro durante cadastro de usuario: " + JSON.stringify(error));
      return false;
    }
  }


const verificarSenha = (senha, cSenha) => {
    if(senha === cSenha){
        return true
    }
    console.log("Senha invalida, as senhas não são iguais")
    return false
}


/*Versão sem async, e logo abaixo versão com async*/

// const cadastrar = (nome, sexo, data, email, senha, cSenha) =>{
//         if(verificarSenha(senha, cSenha)){
//             createUserWithEmailAndPassword(auth,email,senha)
//             .then((refCadastro) => {
//                 let uid = refCadastro.user.uid;
//                 addUser(nome, sexo, data, uid);
//                 return sucesso;
//             })
//             .catch((erro) => {
//                 console.log("Erro ao cadastrar: "+JSON.stringify(erro))
//                 return false;
//             })
//             return false;
//         }
//     }

const cadastrar = async (nome, sexo, data, email, senha, cSenha) => {
    if (verificarSenha(senha, cSenha)) {
      try {
        let refCadastro = await createUserWithEmailAndPassword(auth, email, senha);
        let uid = refCadastro.user.uid;
        let id = await addUser(nome, sexo, data, uid);
        return id;
      } catch (erro) {
        console.log("Erro ao cadastrar: " + JSON.stringify(erro));
        return false;
      }
    }
      return false;
    
  }




export {cadastrar}