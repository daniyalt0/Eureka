function isSpeechSynthesisSupported() {
    return 'speechSynthesis' in window;
}

function speakPrompt(promptText) {
    if (isSpeechSynthesisSupported()) {
        const utterance = new SpeechSynthesisUtterance(promptText);
        speechSynthesis.speak(utterance);
    } else {
        alert("Speech synthesis is not supported in this browser.");
    }
}
