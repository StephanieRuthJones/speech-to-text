const r = document.getElementById('result')

const button = document.querySelector('button')
button.addEventListener('click', () => startConverting())

function startConverting() {
    // console.log("clicked")
    if ('webkitSpeechRecognition' in window) {
        // console.log("in if statement")
        var speechRecognizer = new webkitSpeechRecognition()
        speechRecognizer.continuous = true
        speechRecognizer.interimResults = true
        speechRecognizer.lang = 'en-US'
        speechRecognizer.start()

        var finalTranscripts = ''

        speechRecognizer.onresult = function (event) {
            var interimTranscripts = ''
            // console.log("in speech recognizer function")
            for (let i = event.resultIndex; i < event.results.length; i++) {
                // console.log("in for loop", event.results[i][0].transcript)
                let transcript = event.results[i][0].transcript
                // transcript.replace("\n", "<br>")
                if (event.results[i].isFinal) {
                    // console.log("if statement, final transc", event.results[i].isFinal)
                    finalTranscripts += transcript
                } else {
                    // console.log("else statement", transcript)
                    interimTranscripts += transcript
                }
            }
            r.innerText = finalTranscripts + interimTranscripts
            console.log("r", r)
        }
        speechRecognizer.onerror = function (event) {

        }
    } else {
        r.innerHTML = 'Your browser is not supported. If google chrome, please upgrade.'
    }
}