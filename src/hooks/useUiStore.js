import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store";

export const useUiStore = () => { 
    const dispatch = useDispatch();

    const { isDataModalOpen } = useSelector(state => state.ui);

    const openDateModal = () => dispatch(onOpenDateModal());
   
    const closeDateModal = () => dispatch(onCloseDateModal());
    


    return {
        // * Properties
        isDataModalOpen,
        // * Methods
        openDateModal,
        closeDateModal
    }
}