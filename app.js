let recognition;
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const output = document.getElementById('output');

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }

        output.innerHTML = finalTranscript + '<i style="color:#999">' + interimTranscript + '</i>';
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
    };

    startBtn.onclick = () => {
        recognition.start();
        startBtn.disabled = true;
        stopBtn.disabled = false;
    };

    stopBtn.onclick = () => {
        recognition.stop();
        startBtn.disabled = false;
        stopBtn.disabled = true;
    };
} else {
    startBtn.style.display = 'none';
    stopBtn.style.display = 'none';
    output.innerHTML = 'Web Speech API is not supported in this browser.';
}