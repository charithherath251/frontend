import "./TwoColContainer.css";

function TwoColContainer({leftContainer, rightContainer, bgImage}){
    return(
        <div className="two-col-container">
            <div className="left-container" style={{backgroundImage: `url(${bgImage})`}}>
                {leftContainer}
            </div>
            <div className="right-container">
                {rightContainer}
            </div>
        </div>
    )
}

export default TwoColContainer;