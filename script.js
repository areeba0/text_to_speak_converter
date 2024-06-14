document.addEventListener("DOMContentLoaded", () => {
    let speech = new SpeechSynthesisUtterance();
    const textarea = document.querySelector("textarea");
    const button = document.getElementById("speak");
    const voiceSelect = document.getElementById("voices");

    // Populate voice list
    function populateVoiceList() {
        const voices = window.speechSynthesis.getVoices();
        voiceSelect.innerHTML = voices.map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`).join('');
    }

    populateVoiceList();
    if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoiceList;
    }

    button.addEventListener("click", () => {
        speech.text = textarea.value;
        const selectedVoice = voiceSelect.selectedOptions[0].value;
        speech.voice = window.speechSynthesis.getVoices().find(voice => voice.name === selectedVoice);
        window.speechSynthesis.speak(speech);
    });
});
