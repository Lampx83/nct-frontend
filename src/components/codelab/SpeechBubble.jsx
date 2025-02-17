import React from 'react';

const SpeechBubble = ({position, userOnline}) => {
    const {x, y} = position;

    const bubbleStyle = {
        position: 'fixed', top: y - 19, left: x + 32,
    };

    return (<div
        className="speech-bubble"
        style={bubbleStyle}
        dangerouslySetInnerHTML={{__html: userOnline?.user}}
    />);
};

export default SpeechBubble;
