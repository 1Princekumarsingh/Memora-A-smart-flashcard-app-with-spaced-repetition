import { useEffect } from "react";

export default function useKeyBoardShortcut(handlers){
    useEffect(()=> {
        function handleKeyDown(e){
            const key = e.code === "Space" ? " " : e.key;

            if (handlers[key]) { // if valid key pressed
                e.preventDefault(); //prevent space buttom from scrolling
                handlers[key]();
            }
        }
        window.addEventListener("keydown", handleKeyDown);

        return ()=>{
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [handlers] )
}
