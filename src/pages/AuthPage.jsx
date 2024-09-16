import TwoColContainer from "../components/TwoColContainer";

import "./AuthPage.css";

import transparentLogo from "../assets/logo.svg"
import neonImage from "../assets/neon-image-3.jpg"

function AuthPage({formType}) {
    return (
        <TwoColContainer bgImage={neonImage}
            leftContainer={
                <div className="logo-background">
                    <div className="logo-container" style={{ backgroundImage: `url(${transparentLogo})` }}></div>
                </div>
            }

            rightContainer = {formType}
        />

    );
}

export default AuthPage;