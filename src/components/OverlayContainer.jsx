import { useState } from "react";

import "./OverlayContainer.css";

function OverlayContainer({children, display}) {
    const handleOverlay = (e) => {
        //if click taget is this and not a child of this then close the overlay
        if (e.target === e.currentTarget) {
            display(false);
        }
    };

    return <div className="overlay-container" onClick={(e)=>handleOverlay(e)}>{children}</div>;
}

export default OverlayContainer;