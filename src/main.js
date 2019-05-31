import StringTester from './StringTester';

function onInputChange(event) {
    const tester = new StringTester(event.target.value);

    tester
        .testConsecutiveChars(3)
        .testForbidenChars('iOl')
        .testNonOverlappingChars(2).times(2)
        .testLength(32)
        .testOnlyLowerCaseChars();

    updateChecks(tester.ruleSet);
    enableSendButton(tester.valid);
}

function toggleCheckbox(checkbox, checked) {
    checked ? checkbox.setAttribute('checked', checked): checkbox.removeAttribute('checked');
}

function updateChecks(ruleSet) {
    for(let rule in ruleSet) {
        toggleCheckbox(document.getElementById(rule), ruleSet[rule])
    }
}

function enableSendButton(valid) {
    console.log(valid);
    const sendButton = document.getElementById('sendForm');
    valid ? sendButton.removeAttribute('disabled') : sendButton.setAttribute('disabled', valid);
}

window.onload = function() {
    const passwordField = document.getElementById('pass');
    passwordField.addEventListener('keyup', onInputChange);
}