import React, { useState, useEffect } from 'react';
import Unity, { UnityContext } from "react-unity-webgl";

import logo from './logo.svg'
import './App.css'

const unityContext = new UnityContext({
    loaderUrl: "/tangram/Build/tangram.loader.js",
    dataUrl: "/tangram/Build/tangram.data.unityweb",
    frameworkUrl: "/tangram/Build/tangram.framework.js.unityweb",
    codeUrl: "/tangram/Build/tangram.wasm.unityweb",
});

function App() {


    const [isGameOver, setIsGameOver] = useState(false);
    const [percent, setPercent] = useState(0);

    useEffect(function () {
        unityContext.on("GetPercentageCovered", function (percent) {
            setIsGameOver(true);
            setPercent(percent);
        });
    }, []);

    return (
        <div>
            <Unity
                style={{
                    //width: "434px",
                    //height: "260px",
                    width: "90%", 
                    justifySelf: "center",
                    alignSelf: "center",
                }}
                unityContext={unityContext}
            />
            {isGameOver === true && <p>{`You clicked submit. You have covered a total of about ${percent}%`}</p>}
        </div>
    )
}

export default App;
