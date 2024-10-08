  let recognition;
        let fullTranscript = '';
        const startBtn = document.getElementById('startBtn');
        const stopBtn = document.getElementById('stopBtn');
        const saveBtn = document.getElementById('saveBtn');
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
                        finalTranscript += event.results[i][0].transcript + ' ';
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }

                fullTranscript += finalTranscript;
                output.innerHTML = fullTranscript + '<i style="color:#999">' + interimTranscript + '</i>';
                output.scrollTop = output.scrollHeight;
            };

            recognition.onend = () => {
                if (startBtn.disabled) {
                    recognition.start();
                }
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
            };

            startBtn.onclick = () => {
                fullTranscript = '';
                output.innerHTML = '';
                recognition.start();
                startBtn.disabled = true;
                stopBtn.disabled = false;
                saveBtn.disabled = true;
            };

            stopBtn.onclick = () => {
                recognition.stop();
                startBtn.disabled = false;
                stopBtn.disabled = true;
                saveBtn.disabled = false;
            };

            saveBtn.onclick = () => {
                const blob = new Blob([fullTranscript], {type: 'text/plain'});
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = 'transcript.txt';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            };
        } else {
            startBtn.style.display = 'none';
            stopBtn.style.display = 'none';
            saveBtn.style.display = 'none';
            output.innerHTML = 'Web Speech API is not supported in this browser.';
        }