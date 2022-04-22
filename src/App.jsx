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
    const [instructionScore, setInstructionScore] = useState(0);
    const [hintScore, setHintScore] = useState(0);
    const [helpScore, setHelpScore] = useState(0);
    const [completenessScore, setCompletenessScore] = useState(0);

    useEffect(function () {
        unityContext.on("GetScore", function (instructionScore, hintScore, helpScore, completenessScore) {
            setIsGameOver(true);
            setInstructionScore(instructionScore);
            setHintScore(hintScore);
            setHelpScore(helpScore);
            setCompletenessScore(completenessScore);
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
            {isGameOver === true && <p>{`You clicked submit. 
                \n Instruction Score: ${instructionScore} 
                \n Hint Score: ${hintScore} 
                \n Help Score: ${helpScore} 
                \n Completeness Score: ${completenessScore}`}</p>
            }
        </div>
    )
}

export default App;
