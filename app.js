// Check if the browser supports Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert("Your browser does not support Speech Recognition.");
} else {
    const recognition = new SpeechRecognition();
    recognition.interimResults = true; // Get interim results
    recognition.lang = 'en-US'; // Set the language
    recognition.continuous = true; // Continue listening even after capturing speech

    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const resultDiv = document.getElementById('result');
    let isListening = false;

    // Start listening when the "Start" button is clicked
    startButton.addEventListener('click', () => {
        if (!isListening) {
            recognition.start();
            isListening = true;
            resultDiv.textContent = 'Listening...';
            startButton.disabled = true; // Disable the start button while listening
            stopButton.disabled = false; // Enable the stop button
        }
    });

    // Stop listening when the "Stop" button is clicked
    stopButton.addEventListener('click', () => {
        if (isListening) {
            recognition.stop();
            isListening = false;
            startButton.disabled = false;
            stopButton.disabled = true;
        }
    });

    // Process speech recognition results
    recognition.addEventListener('result', (event) => {
        let transcript = '';
        // Loop through all results (can contain interim results)
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }

        // Append to the result div
        resultDiv.textContent += transcript + ' ';
    });

    // When speech recognition ends, if still listening, restart it
    recognition.addEventListener('end', () => {
        if (isListening) {
            recognition.start(); // Restart recognition automatically
        } else {
            resultDiv.textContent += ' (Stopped listening.)'; // Indicate that listening has stopped
        }
    });
}
