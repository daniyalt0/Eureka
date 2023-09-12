const prompts = [
    "Prompt 1",
    "Prompt 2",
    "Prompt 3",
    // Add your 30 prompts here
];

const generateButton = document.getElementById("generateButton");
const promptDisplay = document.getElementById("promptDisplay");

generateButton.addEventListener("click", () => {
    if (prompts.length === 0) {
        promptDisplay.textContent = "No prompts remaining.";
    } else {
        const randomIndex = Math.floor(Math.random() * prompts.length);
        const randomPrompt = prompts[randomIndex];
        promptDisplay.textContent = randomPrompt;
        prompts.splice(randomIndex, 1); // Remove the used prompt
    }
});
