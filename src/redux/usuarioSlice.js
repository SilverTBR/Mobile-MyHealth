import { createSlice } from "@reduxjs/toolkit"

const valoresIniciais ={
    id: null,
    nome: null,
}

export const usuarioSlice = createSlice({
    name: "usuario",
    initialState: valoresIniciais,
    reducers:{
        setGlobalUsuario: (state, action) => {
            state.id = action.payload.id
            state.nome = action.payload.nome
        }
    }
})

export const {setGlobalUsuario} = usuarioSlice.actions
export default usuarioSlice.reducer