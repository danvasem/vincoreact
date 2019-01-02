const initialState = {
    datos: null
};

function cliente(state = initialState, action) {
    switch (action.type) {
        case "SET_CLIENTE": {
            return {
                ...state,
                datos: action.payload.cliente
            };
        }
        default: {
            return state;
        }
    }
}

export default cliente; 
