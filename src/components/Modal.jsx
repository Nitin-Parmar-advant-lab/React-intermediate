import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ children, open, onClose  }) {
    const dialog = useRef();

    // dependency are prop or state values that are used inside of this effect funciotn
    // dependencies would be functions or contect values that depend on or use state or props.
    // whenever the component function executed if one of its dependencies changes

    useEffect(() => {
        if (open) {
            dialog.current.showModal();
        } else {
            dialog.current.close();
        }
    }, [open]);

    return createPortal(
        <dialog className="modal" ref={dialog} onClose={onClose}>
            {open ? children : null}
        </dialog>,
        document.getElementById("modal"),
    );
}

export default Modal;