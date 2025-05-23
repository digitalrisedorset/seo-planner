import {createContext, ReactNode, useContext} from "react";
import {useImmer} from "use-immer";

interface PageInfoState {
    activePageId: string | undefined,
    activePageVersionId: string | undefined
}

interface PageState {
    pageState: PageInfoState,
    toggleActivePage: (id: string) => void
    clearActivePageVersionId: () => void
    toggleActivePageVersion: (id: string) => void
}

const intialState: PageInfoState = {
    activePageId: '',
    activePageVersionId: ''
}

const LocalStateContext = createContext<PageState | undefined>(undefined);
const LocalStateProvider = LocalStateContext.Provider;

interface PageStateProviderProps {
    children: ReactNode;
}

const PageStateProvider: React.FC<PageStateProviderProps> = ({ children }) => {
    const [state, setState] = useImmer<PageInfoState>(intialState);

    const toggleActivePage = (id: string) => {
        setState(draft => { draft.activePageId = id });
    }

    const toggleActivePageVersion = (id: string) => {
        setState(draft => { draft.activePageVersionId = id });
    }

    const clearActivePageVersionId = (id: string) => {
        setState(draft => { draft.activePageVersionId = null });
    }

    return <LocalStateProvider
        value={{
            toggleActivePage,
            toggleActivePageVersion,
            clearActivePageVersionId,
            pageState: state
        }}
    >{children}</LocalStateProvider>
}

function usePageState(): PageState {
    const context = useContext(LocalStateContext)
    if (!context) {
        throw new Error("usePageState must be used within a LocalStateProvider");
    }
    return context;
}

export { PageStateProvider, usePageState }