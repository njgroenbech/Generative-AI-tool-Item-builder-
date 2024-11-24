const championInput = document.body.querySelector('section.input_container input[name="champion"]')
const playStyleInput = document.body.querySelector('section.input_container input[name="play-style"]')
const apiKeyInput = document.body.querySelector('section.input_container input[name="api_key"]')
const findBuildBtn = document.body.querySelector('section.input_container button.btn')
const resultContainer = document.querySelector('div#result_container .result_text');

findBuildBtn.addEventListener("click", () => {
    // Check to see if user has requested a prompt using both input values
    if (!championInput.value || !playStyleInput.value || !apiKeyInput.value) {
        alert("Please fill out all inputs!")
    // Change resultContainer string to "Generating Response" when clicked
    } resultContainer.innerText = "Generating response..."
    // Call function to get Message from API and update the resultContainer
    logSuggestion()
});

function logSuggestion() {
    const OPENAI_API_KEY = apiKeyInput.value; // Replace with your actual API key
    fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{
                role: 'user',
                content: `Create a build in League of Legends for: ${championInput.value} with the play-style: ${playStyleInput.value}. 
                Return the message with no '*' characters you use to highlight, just only letters. 
                If the champion input isn't a valid Champion in league of legends, return a message that reminds the user to use a valid Champion.
                If play-style isn't related to LEAGUE OF LEGENDS play-styles, return a message that tells the user to choose a valid play-style.
                If it IS a play-style in LEAGUE OF LEGENDS, complete the query.`
            }]
        })
    })
        .then(response => response.json())
        // Grabs the object data and prints the message content
        .then(data => {
           if (data.error) {
               resultContainer.innerText = "Unexpected error has occurred";
           } else {
               resultContainer.innerText = data.choices[0].message.content;
           }
        })
        .catch(error => {
            resultContainer.innerText = "An error has occurred. Please try again later";
            console.log(error);
        });
}