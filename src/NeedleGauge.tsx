import { useEffect, useState } from 'react';
import './NeedleGauge.css';

export interface NeedleGaugeProps {
    inputValue: number
}

const NeedleGauge = ({inputValue} : NeedleGaugeProps) => {

    const [animated, setAnimated] = useState(true);

    useEffect(() => {
        
        setAnimated(false);


        setTimeout(() => {
            setAnimated(true);
        }, 900); // transition animation finishes after 800ms

    }, [inputValue])


    let rotationDegree = inputValue * (180 / 100); // 180 degrees available for 100 values (0-100) of the inputValue; -90 because to modify the original orientation of the svg to neutral (0deg)
    
    setTimeout(() => {

        // Set the value of CSS variable 
        let cssRoot = document.querySelector(':root') as HTMLElement;
        if(cssRoot != null)
            cssRoot.style.setProperty('--rotation-degrees', rotationDegree+"deg");
    }, 100);




    let containerClasses = "needle-gauge-indicator ";
    if(animated) containerClasses += "animated";

    return (
        <div className={containerClasses}>
            <div className="scale-container">
                <div className="border"></div>
                <div className="mask">
                    <div className="background"></div>
                </div>
            </div>
            <svg className="needle" viewBox="0 0 12 117" width="12" height="117">
                <path fill="currentColor" d="M6 0h1.5l1.4 105.74a6 6 0 1 1-5.8 0L4.5 0H6z"></path>
            </svg>

            <p>Score: <b>{inputValue}</b></p>
        </div>
    );
}

export default NeedleGauge;
