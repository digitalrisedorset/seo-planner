import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useFlashMessage} from "@/state/FlassMessageState";
import {useEffect} from "react";

export const Feedback: React.FC = () => {
    const {messageState, resetMessage} = useFlashMessage()
    const notifyError = (message: string) => toast.error(message);
    const notifySuccess = (message: string) => toast.success(message);

    useEffect(() => {
        if (messageState.messageType === 'error') {
            notifyError(messageState.message)
            resetMessage()
        }
        if (messageState.messageType === 'success') {
            notifySuccess(messageState.message)
            resetMessage()
        }
    }, [messageState.message, messageState.messageType, resetMessage]);

    return (
        <ToastContainer />
    )
}