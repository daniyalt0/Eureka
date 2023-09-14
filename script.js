// Define prompts for each group and prompt list
const prompts = {
    g1: {
        list1: [
            "Prompt 1 for Group 1 - List 1",
            "Prompt 2 for Group 1 - List 1",
            // Add more prompts for List 1
        ],
        list2: [
            "Prompt 1 for Group 1 - List 2",
            "Prompt 2 for Group 1 - List 2",
            // Add more prompts for List 2
        ],
        list3: [
            "Prompt 1 for Group 1 - List 3",
            "Prompt 2 for Group 1 - List 3",
            // Add more prompts for List 3
        ],
    },
    g2: {
        list1: [
            "Prompt 1 for Group 2 - List 1",
            "Prompt 2 for Group 2 - List 1",
            // Add more prompts for List 1
        ],
        list2: [
            "Prompt 1 for Group 2 - List 2",
            "Prompt 2 for Group 2 - List 2",
            // Add more prompts for List 2
        ],
        list3: [
            "Prompt 1 for Group 2 - List 3",
            "Prompt 2 for Group 2 - List 3",
            // Add more prompts for List 3
        ],
    },
    g3: {
        list1: [
            "Prompt 1 for Group 3 - List 1",
            "Prompt 2 for Group 3- List 1",
            // Add more prompts for List 1
        ],
        list2: [
            "Prompt 1 for Group 3 - List 2",
            "Prompt 2 for Group 3 - List 2",
            // Add more prompts for List 2
        ],
        list3: [
            "Prompt 1 for Group 3 - List 3",
            "Prompt 2 for Group 3 - List 3",
            // Add more prompts for List 3
        ],
    }, 
    g4: {
        list1: [
            "Prompt 1 for Group 4 - List 1",
            "Prompt 2 for Group 4- List 1",
            // Add more prompts for List 1
        ],
        list2: [
            "Prompt 1 for Group 4 - List 2",
            "Prompt 2 for Group 4 - List 2",
            // Add more prompts for List 2
        ],
        list3: [
            "Prompt 1 for Group 4 - List 3",
            "Prompt 2 for Group 4 - List 3",
            // Add more prompts for List 3
        ],
    }, 
    g5: {
        list1: [
            "Prompt 1 for Group 5 - List 1",
            "Prompt 2 for Group 5- List 1",
            // Add more prompts for List 1
        ],
        list2: [
            "Prompt 1 for Group 5 - List 2",
            "Prompt 2 for Group 5 - List 2",
            // Add more prompts for List 2
        ],
        list3: [
            "Prompt 1 for Group 5 - List 3",
            "Prompt 2 for Group 5 - List 3",
            // Add more prompts for List 3
        ],
    }, 
    // Define prompts for other groups similarly
};

// Initialize the "Generate Prompt" button as disabled by default
const generateButton = document.getElementById("generateButton");
generateButton.disabled = true; // Disable it by default

// Event listener for group selection
const groupSelection = document.getElementById("groupSelection");
groupSelection.addEventListener("change", function () {
    const selectedGroup = groupSelection.value;
    const selectedList = "list1"; // You can change this to the desired list initially

    // Update the current prompts based on the selected group and list
    const currentPrompts = prompts[selectedGroup][selectedList];

    // Enable the "Generate Prompt" button when a group is selected
    generateButton.disabled = false;
});

let clickCount = 0;
const clickCountDisplay = document.getElementById("clickCountDisplay");
const promptDisplay = document.getElementById("promptDisplay");
const exportMessage = document.getElementById("exportMessage");

generateButton.addEventListener("click", function () {
    const selectedGroup = groupSelection.value;
    const selectedList = "list1"; // You can change this to the desired list initially
    const currentPrompts = prompts[selectedGroup][selectedList];

    generateRandomPrompt(currentPrompts);
});

function generateRandomPrompt(prompts) {
    if (prompts.length === 0) {
        promptDisplay.textContent = "No prompts remaining.";
    } else {
        clickCount++;
        const randomIndex = Math.floor(Math.random() * prompts.length);
        const randomPrompt = prompts[randomIndex];

        promptDisplay.textContent = `Prompt #${clickCount}: ${randomPrompt}`;
        clickCountDisplay.textContent = `Click count: ${clickCount}`;
    }
});
