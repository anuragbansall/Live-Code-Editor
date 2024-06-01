let allTextArea = document.querySelectorAll('textarea');
for(textArea of allTextArea){
    textArea.addEventListener("input", function(e){
        runCode();
        autoComplete(e.data, e.target);
    })
}

function runCode(){
    let htmlCode = document.querySelector('#html-textarea').value;
    let cssCode = document.querySelector('#css-textarea').value;
    let jsCode = document.querySelector('#js-textarea').value;
    let output = document.querySelector('.code-output-window');

    output.contentDocument.body.innerHTML = htmlCode + "<style>" + cssCode + "</style>";
    try{
        output.contentWindow.eval(jsCode);
    }catch{}
}

function autoComplete(character, textArea) {
    let brackets = {
        '[': ']',
        '(': ')',
        '{': '}',
        '<': '>',
    };

    let startPos = textArea.selectionStart;
    let endPos = textArea.selectionEnd;
    let selectedText = textArea.value.substring(startPos, endPos);
    let replacement = '';

    if (brackets.hasOwnProperty(character)) {
        let isStartBracketPresent = selectedText.trim() === character;
        if (!isStartBracketPresent) {
            replacement = brackets[character];
        } else {
            endPos--;
        }
    } else {
        return;
    }

    textArea.value =
        textArea.value.substring(0, startPos) +
        replacement +
        textArea.value.substring(endPos);

    let newPos = startPos + replacement.length - 1;
    textArea.setSelectionRange(newPos, newPos);
}
