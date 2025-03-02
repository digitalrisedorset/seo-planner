import {createContext, ReactNode, useContext} from "react";
import {useImmer} from "use-immer";

interface WebsiteInfoState {
    activeWebsiteId: string | undefined,
}

interface WebsiteState {
    websiteState: WebsiteInfoState,
    resetActiveWebsite: () => void
    toggleActiveWebsite: (id: string) => void
}

const intialState: WebsiteInfoState = {
    activeWebsiteId: ''
}

const LocalStateContext = createContext<WebsiteState | undefined>(undefined);
const LocalStateProvider = LocalStateContext.Provider;

interface WebsiteStateProviderProps {
    children: ReactNode;
}

const WebsiteStateProvider: React.FC<WebsiteStateProviderProps> = ({ children }) => {
    const [state, setState] = useImmer<WebsiteInfoState>(intialState);

    const toggleActiveWebsite = (id: string) => {
        setState(draft => { draft.activeWebsiteId = id });
    }

    const resetActiveWebsite = () => {
        setState(draft => { draft.activeWebsiteId = undefined });
    }

    return <LocalStateProvider
        value={{
            resetActiveWebsite,
            toggleActiveWebsite,
            websiteState: state
        }}
    >{children}</LocalStateProvider>
}

function useWebsiteState(): WebsiteState {
    const context = useContext(LocalStateContext)
    if (!context) {
        throw new Error("useWebsiteState must be used within a LocalStateProvider");
    }
    return context;
}

export { WebsiteStateProvider, useWebsiteState }