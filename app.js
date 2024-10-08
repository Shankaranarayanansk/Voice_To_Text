// Check if the browser supports Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert("Your browser does not support Speech Recognition.");
} else {
    const recognition = new SpeechRecognition();
    recognition.interimResults = true; // Get interim results
    recognition.lang = 'en-US'; // Set the language

    const startButton = document.getElementById('start');
    const resultDiv = document.getElementById('result');

    // Start listening
    startButton.addEventListener('click', () => {
        recognition.start();
        resultDiv.textContent = 'Listening...'; // Show that we are listening
    });

    // Process results
    recognition.addEventListener('result', (event) => {
        const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
        
        resultDiv.textContent = transcript; // Update the result div with the transcript
        
        if (event.results[0].isFinal) {
            // If the speech recognition result is final
            console.log(`Final Transcript: ${transcript}`);
        }
    });

    // Handle end of recognition
    recognition.addEventListener('end', () => {
        resultDiv.textContent += ' (Stopped listening.)'; // Indicate that listening has stopped
    });
}
