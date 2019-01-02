const initialState = {
    datos: null
};

function negocio(state = initialState, action) {
    switch (action.type) {
        case "SET_NEGOCIO": {
            return {
                ...state,
                datos: action.payload.negocio
            };
        }
        default: {
            return state;
        }
    }
}

export default negocio;