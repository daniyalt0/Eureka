let prompts = [
    
    "Explore toothpick patterning – how can repeating patterns create strength while reducing toothpick count?",
    "Challenge yourself with the toothpick diamond principle – can diamonds be the key to efficiency in your design?",
    "Investigate the concept of toothpick honeycombs – can hexagonal patterns offer stability with fewer toothpicks?",
    "Reflect on toothpick reinforcement – how can you strategically reinforce key areas while minimizing overall toothpick usage?",
    // Add your prompts here
];

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

const generateButton = document.getElementById("generateButton");
const promptDisplay = document.getElementById("promptDisplay");

generateButton.addEventListener("click", generateRandomPrompt);
