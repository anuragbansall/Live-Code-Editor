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

function autoComplete(character, textArea){
    let brackets = {
        '[' : ']',
        '(' : ')',
        '{' : '}',
        '<' : '>',
    };
    if (brackets.hasOwnProperty(character)) {
        textArea.value += brackets[character];
    }
}