import { createSlice } from "@reduxjs/toolkit"

const valoresIniciais ={
    id: null,
    nome: null,
    dataVac: null,
    dataProxV: null,
    dose: null,
    urlIMG: null,
    caminhoIMG: null
}

export const vacinaSlice = createSlice({
    name: "vacina",
    initialState: valoresIniciais,
    reducers:{
        setGlobalVacina: (state, action) => {
            state.id = action.payload.id
            state.nome = action.payload.nome
            state.dataVac = action.payload.dataVac
            state.dataProxV = action.payload.dataProxV
            state.dose = action.payload.dose
            state.urlIMG = action.payload.urlIMG
            state.caminhoIMG = action.payload.caminhoIMG
        },
        reset: (state) => valoresIniciais
    }
})

export const {setGlobalVacina, reset} = vacinaSlice.actions
export default vacinaSlice.reducer