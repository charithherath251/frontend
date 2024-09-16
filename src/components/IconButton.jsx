import React from "react";

import "./IconButton.css";

/*
    content
    iconb - icon before
    icona - icon after
    w - width
    h - height
    bg - background color
    c - color
    is - icon size
    ts - text size 
*/

function IconButton({ content, iconb, icona, w, h, bg, c, is, ts, extraClass, onClick }) {
  return (
    <button className={`icon-btn btn-width-${w} btn-height-${h} btn-bg-${bg} btn-clr-${c} ${extraClass}`} onClick={onClick}>
      {(iconb && content && <span className={`btn__icon btn__icon-rmargin btn__icon-${is}`}>{iconb || ""}</span>) || (iconb && <span className={`btn__icon btn__icon-${is}`}>{iconb || ""}</span>)}
      {content && <span className={`btn__text btn__text-${ts}`}>{content}</span>}
      {(icona && content && <span className={`btn__icon btn__icon-lmargin btn__icon-${is}`}>{icona || ""}</span>) || (icona && <span className={`btn__icon btn__icon-${is}`}>{icona || ""}</span>)}
    </button>
  );
}

export default IconButton;
