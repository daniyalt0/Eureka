onst prompts = [
    "Write a short story about a time traveler.",
    "Describe your dream vacation destination in detail.",
    "Create a poem about the changing seasons.",
    "Imagine a world without technology. How would people live?",
    "Write a dialogue between two characters who have just met."
];

const generateButton = document.getElementById("generateButton");
const promptDisplay = document.getElementById("promptDisplay");

generateButton.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    const randomPrompt = prompts[randomIndex];
    promptDisplay.textContent = randomPrompt;
});
