import TwoColContainer from "../components/TwoColContainer";

import "./AuthPage.css";

import transparentLogo from "../assets/logo.svg"
import image from "../assets/auth-image.jpg"

function AuthPage({formType}) {
    return (
        <TwoColContainer bgImage={image}
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