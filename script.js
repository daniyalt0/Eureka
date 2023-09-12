let prompts = [];

// Function to fetch prompts from prompts.json
function fetchPrompts() {
    fetch('prompts.json')
        .then(response => response.json())
        .then(data => {
            prompts = data;
        })
        .catch(error => console.error('Error fetching prompts:', error));
}

// Function to generate and display a random prompt
function generateRandomPrompt() {
    if (prompts.length === 0) {
        promptDisplay.textContent = "No prompts remaining.";
    } else {
        const randomIndex = Math.floor(Math.random() * prompts.length);
        const randomPrompt = prompts[randomIndex];
        promptDisplay.textContent = randomPrompt;
        prompts.splice(randomIndex, 1); // Remove the used prompt
    }
}

generateButton.addEventListener("click", generateRandomPrompt);

// Fetch prompts when the page loads
fetchPrompts();
