import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
export  default   () => {
    const codeString = 'class Main {\n' +
        '\n' +
        '  public static void main(String[] args) {\n' +
        '    \n' +
        '    int first = 10;\n' +
        '    int second = 20;\n' +
        '\n' +
        '    // add two numbers\n' +
        '    int sum = first + second;\n' +
        '    System.out.println(first + " + " + second + " = "  + sum);\n' +
        '  }\n' +
        '}\n';
    return (
        <SyntaxHighlighter language="javascript" style={docco}>
            {codeString}
        </SyntaxHighlighter>
    );
};