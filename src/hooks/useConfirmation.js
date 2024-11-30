import { useState } from "react";

export const useConfirmation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [onConfirm, setOnConfirm] = useState(() => {});

    const requestConfirmation = (message, onConfirmAction) => {
        setMessage(message);
        setOnConfirm(() => onConfirmAction);
        setIsOpen(true);
    };

    const handleConfirm = () => {
        if (onConfirm) onConfirm();
        setIsOpen(false);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    return {
        isOpen,
        message,
        handleConfirm,
        handleCancel,
        requestConfirmation,
    };
};
