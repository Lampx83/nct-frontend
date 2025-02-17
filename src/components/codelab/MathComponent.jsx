import React from 'react';
import {MathJax, MathJaxContext} from 'better-react-mathjax';

const config = {
    loader: {load: ['input/tex', 'output/chtml']}, tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']]
    }
};

const MathComponent = ({content}) => {
    return (<span className="inline"><MathJaxContext config={config}><MathJax dynamic dangerouslySetInnerHTML={{__html: content.data}}>
    </MathJax></MathJaxContext></span>);
    //   const math = `$$\\sum_{i=0}^n i^2 = \\frac{(n^2+n)(2n+1)}{6}$$`;
    //   return (<MathJaxContext config={config}>
    //       <MathJax dynamic>{math}</MathJax>
    //   </MathJaxContext>);


    // return (<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
    //     <munderover>
    //         <mo data-mjx-texclass="OP">&#x2211;</mo>
    //         <mrow data-mjx-texclass="ORD">
    //             <mi>i</mi>
    //             <mo>=</mo>
    //             <mn>0</mn>
    //         </mrow>
    //         <mi>n</mi>
    //     </munderover>
    //     <msup>
    //         <mi>i</mi>
    //         <mn>2</mn>
    //     </msup>
    //     <mo>=</mo>
    //     <mfrac>
    //         <mrow>
    //             <mo stretchy="false">(</mo>
    //             <msup>
    //                 <mi>n</mi>
    //                 <mn>2</mn>
    //             </msup>
    //             <mo>+</mo>
    //             <mi>n</mi>
    //             <mo stretchy="false">)</mo>
    //             <mo stretchy="false">(</mo>
    //             <mn>2</mn>
    //             <mi>n</mi>
    //             <mo>+</mo>
    //             <mn>1</mn>
    //             <mo stretchy="false">)</mo>
    //         </mrow>
    //         <mn>6</mn>
    //     </mfrac>
    // </math>)
};

export default MathComponent;
