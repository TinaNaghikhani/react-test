import { useReducer } from "react";
import Button from "../base/button/button";
import Input from "../base/input/input";

interface State {
    count: number;
    step: number;
}

type Action =
    | { type: "INCREMENT" }
    | { type: "DECREMENT" }
    | { type: "RESET" }
    | { type: "SET_STEP"; payload: number };

const initialState = { count: 0, step: 1 }

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "INCREMENT":
            return { ...state, count: state.count + state.step };
        case "DECREMENT":
            return { ...state, count: state.count - state.step };
        case "RESET":
            return initialState;
        case "SET_STEP":
            return { ...state, step: action.payload };
        default:
            return state;
    }
}

export default function Reduce() {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div className="flex flex-col items-center space-y-4 p-4 border rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Counter: {state.count}</h2>
            <div className="flex gap-2">

                <Button className="w-16 h-16 p-1 text-center rounded-full text-pink-500 font-bold shadow-lg bg-zinc-300" type="button" label="+" onClick={() => dispatch({ type: "INCREMENT" })} />
                <Input className="mt-4 p-2 bg-pink-200 rounded-2xl text-pink-600 border-2 boder-pink" type="number" name="counter" value={state.step} onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch({ type: "SET_STEP", payload: Number(e.target.value) })
                } />
                {/* <input
                    type="number"
                    name="counter"
                    value={state.step}
                    onChange={(e) => dispatch({ type: "SET_STEP", payload:+(e.target.value) })}
                    className="focus:outline-none mt-4 p-2 bg-pink-200 rounded-2xl text-pink-600 border-2 boder-pink"
                /> */}
                <Button className="w-16 h-16 p-1 text-center rounded-full text-pink-500 font-bold shadow-lg bg-zinc-300" type="button" label="-" onClick={() => dispatch({ type: "DECREMENT" })} />
            </div>
            <Button className="w-16 h-16 p-1 text-center rounded-full text-pink-500 font-bold shadow-lg bg-zinc-300" type="reset" label="RESET" onClick={() => dispatch({ type: "RESET" })} />
            <p>Step:{state.step}</p>

        </div>
    )
}
