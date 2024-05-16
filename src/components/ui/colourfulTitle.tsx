import React from "react";

/** [UI Component] Colourful title bar.
* @param {string} title - The title of the colourful title.
* @param {string} subtitle - The subtitle of the colourful title.
* @param {string} color - Format in hexadecimals '#XXXXXX'. 
* @param {string} textColor - Format in hexadecimals '#XXXXXX'.
*/
const ColourfulTitle: React.FC<{ title?: string; subtitle?: string; color?:string; textColor?: string }> = ({
    title,
    subtitle,
    color,
    textColor
}) => {
    const linearGradientBlend = `linear-gradient(12deg, ${color} 0%, ${color} 19%, #FFFDD9 154%, #ffffff 100%)`; // this works
    return (
        <div className={`flex flex-col align-middle items-start p-4 rounded gap-0`} style={{ background: linearGradientBlend  }}>
            <h3 className="text-1xl text-center" style={{ color: textColor }}>{title} </h3>
            <p className="text-lg text-center text-white" style={{ color: textColor }}>{subtitle}</p>
        </div>
    );
};

export default ColourfulTitle;
