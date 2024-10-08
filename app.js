const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert("Your browser does not support Speech Recognition.");
} else {
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.continuous = true;

    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const resultDiv = document.getElementById('result');
    let isListening = false;
    let finalTranscript = '';
    let lastTranscript = ''; // Store last final transcript to prevent repetition

    // Start button click event
    startButton.addEventListener('click', () => {
        if (!isListening) {
            recognition.start();
            isListening = true;
            resultDiv.textContent = 'Listening...';
            startButton.disabled = true;
            stopButton.disabled = false;
        }
    });

    // Stop button click event
    stopButton.addEventListener('click', () => {
        if (isListening) {
            recognition.stop();
            isListening = false;
            startButton.disabled = false;
            stopButton.disabled = true;
        }
    });

    // Process the speech recognition result
    recognition.addEventListener('result', (event) => {
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
                let currentFinal = event.results[i][0].transcript.trim();

                // Append final result only if it's not the same as the last final result
                if (currentFinal !== lastTranscript) {
                    finalTranscript += currentFinal + ' ';
                    lastTranscript = currentFinal; // Update last transcript with current one
                }
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }

        // Display the final transcript combined with the interim transcript
        resultDiv.textContent = finalTranscript + interimTranscript;
    });

    // Restart speech recognition when it ends, if still listening
    recognition.addEventListener('end', () => {
        if (isListening) {
            recognition.start();
        } else {
            resultDiv.textContent += ' (Stopped listening.)';
        }
    });
}
