// Uses the Provider Pattern to set Global Modal Settings once
"use client";

import { useEffect } from "react";
import Modal from "react-modal";

export default function ModalProvider({children}: {children: React.ReactNode}) {
    useEffect(() => {
        Modal.setAppElement("#main-content");
    }, []);

    return <>{children}</>;
}

