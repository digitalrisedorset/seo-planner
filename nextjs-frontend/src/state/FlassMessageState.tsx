import {createContext, ReactNode, useContext} from 'react';
import {useImmer} from "use-immer";

interface FlashMessageInfoState {
    message: string
    messageType: string
}

interface FlashMessageState {
    messageState: FlashMessageInfoState
    addSuccessMessage: (id: string) => void
    addErrorMessage: (id: string) => void
    resetMessage: () => void
}

const initialState: FlashMessageInfoState = {
    message: '',
    messageType: ''
}

const LocalStateContext = createContext<FlashMessageState | undefined>(undefined);
const LocalStateProvider = LocalStateContext.Provider;

interface FlashMessageProviderProps {
    children: ReactNode;
}

const FlashMessageProvider: React.FC<FlashMessageProviderProps> = ({ children }) => {
    const [state, setState] = useImmer<FlashMessageInfoState>(initialState);

    const addSuccessMessage = (message: string) => {
        setState(draft => {
            draft.message = message
            draft.messageType = 'success'
        });
    }

    const addErrorMessage = (message: string) => {
        setState(draft => {
            draft.message = message
            draft.messageType = 'error'
        });
    }

    const resetMessage = () => {
        setState(initialState);
    }

    return (
        <LocalStateProvider
            value={{
                addSuccessMessage,
                addErrorMessage,
                resetMessage,
                messageState: state
            }}
        >
            {children}
        </LocalStateProvider>
    )
}

function useFlashMessage(): FlashMessageState {
    const context = useContext(LocalStateContext);
    if (!context) {
        throw new Error("useFlashMessage must be used within a LocalStateProvider");
    }
    return context;
}

export { FlashMessageProvider, useFlashMessage };