import { useReducer } from "react";

const initialState = {
    currentIndex: 0,
    flipped: false,
    completed: false
}

function reducer(state, action){
    switch(action.type){
        case "FLIP":
            return{
                ...state,
                flipped: !state.flipped
            }
        
        case "NEXT":
            return{
                ...state,
                currentIndex: state.currentIndex + 1,
                flipped: false
            }
        
        case "COMPLETE":
            return{
                ...state,
                completed: true
            }
        
        default:
            return state

    }
}

export default function useStudySession(){
    return useReducer(reducer, initialState);
}