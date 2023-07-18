import {useCallback, useReducer} from "react";
import {mockedFetch} from "./utils/mockedFetch";

interface State {
    response: object | null;
    error: Error | null;
    isLoading: boolean;
}

type Action = { type: 'request' } | { type: 'success', payload: object } | { type: 'failure', payload: Error };

const initialState: State = {
    response: null,
    error: null,
    isLoading: false,
}

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'request':
            return {
                ...state,
                isLoading: true,
                error: null,
                response: null,
            }
        case 'success':
            return {
                ...state,
                isLoading: false,
                response: action.payload,
            }
        case 'failure':
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

type CustomRequestInit = Omit<RequestInit, 'body'> & { body: object };
type UseRequestReturnType = [State, (requestInit?: CustomRequestInit) => Promise<void>]

export const useRequest = (path: string): UseRequestReturnType => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const request = useCallback(async (requestInit?: CustomRequestInit) => {
        dispatch({ type: 'request' });

        try {
            const response = await mockedFetch(path, requestInit && {
                ...requestInit,
                body: JSON.stringify(requestInit.body),
            });

            const json = await response.json();

            dispatch({ type: 'success', payload: json })
        } catch (error: unknown) {
            const customError = error as Error;

            dispatch({ type: 'failure', payload: customError })
        }
    }, [path]);

    return [state, request];
}