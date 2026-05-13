import { useReducer } from "react";

const initialState = {
    currentIndex: 0,
    flipped: false,
    revealed: false
}

function reducer(state, action){
    switch(action.type){
        case "FLIP":
            return{
                ...state,
                flipped: !state.flipped,
                revealed: true
            }
        
        case "NEXT":
            return{
                ...state,
                currentIndex: state.currentIndex + 1,
                flipped: false,
                revealed: false
            }

        default:
            return state

    }
}

export default function useStudySession(){
    return useReducer(reducer, initialState);
}
