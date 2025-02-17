import React, {useState, useEffect} from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/material.css';
// import 'codemirror/mode/javascript/javascript';
// import 'codemirror/mode/python/python';
// import 'codemirror/mode/clike/clike';
// import 'codemirror/mode/htmlmixed/htmlmixed';
// import 'codemirror/mode/css/css';
import ParagraphContent from './ParagraphContent';
import StepBody from './StepBody';
import {Dropdown} from 'react-bootstrap';
import { TfiSave } from "react-icons/tfi";

const Exercise = ({table}) => {
    const [userAnswer, setUserAnswer] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');
    const [codeMirrorMode, setCodeMirrorMode] = useState('javascript');

    useEffect(() => {
        // Update the CodeMirror mode when the selected language changes
        switch (selectedLanguage) {
            case 'javascript':
                setCodeMirrorMode('javascript');
                break;
            case 'python':
                setCodeMirrorMode('python');
                break;
            case 'java':
                setCodeMirrorMode('text/x-java');
                break;
            case 'c++':
                setCodeMirrorMode('text/x-c++src');
                break;
            case 'html':
                setCodeMirrorMode('htmlmixed');
                break;
            case 'css':
                setCodeMirrorMode('css');
                break;
            // Add more cases for other languages as needed
            default:
                setCodeMirrorMode('text/plain');
                break;
        }
    }, [selectedLanguage]);

    const handleAnswerChange = (editor, data, value) => {
        setUserAnswer(value);
    };

    const handleRedButton = () => {
        console.log('Red button clicked');
    };

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
    };

    const languageOptions = ['javascript', 'python', 'java', 'c++', 'html', 'css'];

    return (<div className="exercise">
        {table && table.tableRows.length > 0 && table.tableRows[0].tableCells.length > 0 && (
            <StepBody content={table.tableRows[0].tableCells[0].content}/>
        //     <div>
        //     {table.tableRows[0].tableCells[0].content.map((paragraph, index) => (
        //         <StepBody key={`paragraph_${index}_${paragraph.paragraphId}`} content={paragraph}/>))}
        // </div>

        )}
        <div className="code-tool">
            <div className="left-elements">
                <Dropdown onSelect={handleLanguageChange}>
                    <Dropdown.Toggle as="span" id="language-dropdown">
                        {selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {languageOptions.map((language) => (<Dropdown.Item key={language} eventKey={language}>
                            {language.charAt(0).toUpperCase() + language.slice(1)}
                        </Dropdown.Item>))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="right-elements">
                    <span className="submit-button" onClick={handleRedButton}>
                        <TfiSave />  Save
                    </span>
            </div>
        </div>
        <div className="submit-code">

            <CodeMirror
                value={userAnswer}
                options={{
                    mode: codeMirrorMode, // Use the dynamically determined mode
                    lineNumbers: true,
                    lineWrapping: true,
                }}
                onBeforeChange={handleAnswerChange}
            />

        </div>

        <div className="submit-file">
            <input type="file" id="fileUpload"/>
        </div>
    </div>);
};

export default Exercise;
