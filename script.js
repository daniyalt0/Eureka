// Define prompts for each group and prompt list

//----------------------------------------------------------------------------------------------------------------------//

//g1

let g1Prompts1 = [
    "Prompt 1 for Group 1 - List 1",
    "Prompt 2 for Group 1 - List 1",
    // Add more prompts for List 1
];

let g1Prompts2 = [
    "Prompt 1 for Group 1 - List 2",
    "Prompt 2 for Group 1 - List 2",
    // Add more prompts for List 2
];

let g1Prompts3 = [
    "Prompt 1 for Group 1 - List 3",
    "Prompt 2 for Group 1 - List 3",
    // Add more prompts for List 3
];

//---------------------------------------------------------------------------------------------------------------------------//

//g2

let g2Prompts1 = [
    "Prompt 1 for Group 2 - List 1",
    "Prompt 2 for Group 2- List 1",
    // Add more prompts for List 1
];

let g2Prompts2 = [
    "Prompt 1 for Group 2 - List 2",
    "Prompt 2 for Group 2- List 2",
    // Add more prompts for List 2
];

let g2Prompts3 = [
    "Prompt 1 for Group 2 - List 3",
    "Prompt 2 for Group 2 - List 3",
    // Add more prompts for List 3
];

//---------------------------------------------------------------------------------------------------------------------------//

//g3

let g3Prompts1 = [
    "Prompt 1 for Group 3 - List 1",
    "Prompt 2 for Group 3- List 1",
    // Add more prompts for List 1
];

let g3Prompts2 = [
    "Prompt 1 for Group 3 - List 2",
    "Prompt 2 for Group 3- List 2",
    // Add more prompts for List 2
];

let g3Prompts3 = [
    "Prompt 1 for Group 3 - List 3",
    "Prompt 2 for Group 3 - List 3",
    // Add more prompts for List 3
];

//---------------------------------------------------------------------------------------------------------------------------//

//g4

let g4Prompts1 = [
    "Prompt 1 for Group 4 - List 1",
    "Prompt 2 for Group 4- List 1",
    // Add more prompts for List 1
];

let g4Prompts2 = [
    "Prompt 1 for Group 4 - List 2",
    "Prompt 2 for Group 4- List 2",
    // Add more prompts for List 2
];

let g4Prompts3 = [
    "Prompt 1 for Group 4 - List 3",
    "Prompt 2 for Group 4 - List 3",
    // Add more prompts for List 3
];

//---------------------------------------------------------------------------------------------------------------------------//

//g5

let g5Prompts1 = [
    "Prompt 1 for Group 5 - List 1",
    "Prompt 2 for Group 5- List 1",
    // Add more prompts for List 1
];

let g5Prompts2 = [
    "Prompt 1 for Group 5 - List 2",
    "Prompt 2 for Group 5- List 2",
    // Add more prompts for List 2
];

let g5Prompts3 = [
    "Prompt 1 for Group 5 - List 3",
    "Prompt 2 for Group 5 - List 3",
    // Add more prompts for List 3
];

//---------------------------------------------------------------------------------------------------------------------------//

// Define prompts for other groups and prompt lists in a similar manner
// ...

// Event listeners for "Generate Prompt" buttons

//--------------------------------------------------------------------------------------------------------------------//

//g1

document.getElementById("generateButton-g1-1").addEventListener("click", function () {
    generateRandomPrompt(g1Prompts1);
});

document.getElementById("generateButton-g1-2").addEventListener("click", function () {
    generateRandomPrompt(g1Prompts2);
});

document.getElementById("generateButton-g1-3").addEventListener("click", function () {
    generateRandomPrompt(g1Prompts3);
});

//--------------------------------------------------------------------------------------------------------------------//

//g2

document.getElementById("generateButton-g2-1").addEventListener("click", function () {
    generateRandomPrompt(g2Prompts1);
});

document.getElementById("generateButton-g2-2").addEventListener("click", function () {
    generateRandomPrompt(g2Prompts2);
});

document.getElementById("generateButton-g2-3").addEventListener("click", function () {
    generateRandomPrompt(g2Prompts3);
});

//--------------------------------------------------------------------------------------------------------------------//

//g3

document.getElementById("generateButton-g3-1").addEventListener("click", function () {
    generateRandomPrompt(g3Prompts1);
});

document.getElementById("generateButton-g3-2").addEventListener("click", function () {
    generateRandomPrompt(g3Prompts2);
});

document.getElementById("generateButton-g3-3").addEventListener("click", function () {
    generateRandomPrompt(g3Prompts3);
});

//--------------------------------------------------------------------------------------------------------------------//

//g4

document.getElementById("generateButton-g4-1").addEventListener("click", function () {
    generateRandomPrompt(g4Prompts1);
});

document.getElementById("generateButton-g4-2").addEventListener("click", function () {
    generateRandomPrompt(g4Prompts2);
});

document.getElementById("generateButton-g4-3").addEventListener("click", function () {
    generateRandomPrompt(g4Prompts3);
});

//--------------------------------------------------------------------------------------------------------------------//

//g5

document.getElementById("generateButton-g5-1").addEventListener("click", function () {
    generateRandomPrompt(g5Prompts1);
});

document.getElementById("generateButton-g5-2").addEventListener("click", function () {
    generateRandomPrompt(g5Prompts2);
});

document.getElementById("generateButton-g5-3").addEventListener("click", function () {
    generateRandomPrompt(g5Prompts3);
});

//--------------------------------------------------------------------------------------------------------------------//

// Initialize the "Generate Prompt" button as disabled by default
const generateButton = document.getElementById("generateButton");
generateButton.disabled = true; // Disable it by default

// Event listener for group selection
const groupSelection = document.getElementById("groupSelection");
groupSelection.addEventListener("change", function () {
    const selectedGroup = groupSelection.value;
    // Hide all groups
    const allGroups = document.querySelectorAll(".group-container");
    allGroups.forEach(group => group.style.display = "none");
    // Show the selected group
    const selectedGroupDiv = document.getElementById(`group-${selectedGroup}`);
    selectedGroupDiv.style.display = "block";
    // Clear the click count and reset logged prompts
    clickCount = 0;
    loggedPrompts.length = 0;
    clickCountDisplay.textContent = "Click count: 0";
    promptDisplay.textContent = "";
    exportMessage.textContent = "";
    hearButton.disabled = true;
    // Update the current prompts based on the selected group
    switch (selectedGroup) {
        case "g1":
            currentPrompts = g1Prompts1; // Set the prompts for the selected group
            break;
        case "g2":
            currentPrompts = g2Prompts1; // Set the prompts for the selected group
            break;
        // Repeat the switch cases for other groups as needed
    }

    // Enable the "Generate Prompt" button when a group is selected
    generateButton.disabled = false;
});

function generateRandomPrompt(prompts) {
    // Generate prompts from the specified list
    // ...

    if (prompts.length === 0) {
        promptDisplay.textContent = "No prompts remaining.";
    } else {
        clickCount++;
        const randomIndex = Math.floor(Math.random() * prompts.length);
        const randomPrompt = prompts[randomIndex];
        const timestamp = new Date().toLocaleTimeString();

        timestampList.innerHTML = "";

        promptDisplay.textContent = `Prompt #${clickCount}: ${randomPrompt}`;
        const timestampItem = document.createElement("li");
        timestampItem.textContent = `${clickCount}: ${randomPrompt} (Generated at ${timestamp})`;
        timestampItem.style.fontFamily = "Roboto Mono, monospace";
        timestampList.appendChild(timestampItem);

        loggedPrompts.push({ prompt: randomPrompt, timestamp: timestamp });
        prompts.splice(randomIndex, 1);
        clickCountDisplay.textContent = `Click count: ${clickCount}`;

        // Enable the "Hear This Prompt" button after generating a prompt
        hearButton.disabled = false;
    }
}

function saveLoggedData() {
    if (loggedPrompts.length > 0) {
        let csvData = "Prompt Name,Time Stamp\n";
        for (const loggedPrompt of loggedPrompts) {
            csvData += `"${loggedPrompt.prompt}","${loggedPrompt.timestamp}"\n`;
        }
        csvData += `Total Count,${clickCount}\n`;

        exportData(csvData);
    }
}

function exportData(data) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'generated_data.csv';

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);

    const exportMessage = document.getElementById("exportMessage");
    exportMessage.textContent = "Data exported successfully!";
    exportMessage.style.color = "#556f7b";
}

function hearCurrentPrompt() {
    const currentPromptText = promptDisplay.textContent.replace(/^Prompt \d+: /, ''); // Remove "Prompt #X: "
    speakPrompt(currentPromptText);
}

const generateButton = document.getElementById("generateButton");
const saveButton = document.getElementById("saveButton");
const promptDisplay = document.getElementById("promptDisplay");
const exportMessage = document.getElementById("exportMessage"); // Reference to the "Exported Data Message"

generateButton.addEventListener("click", generateRandomPrompt);
saveButton.addEventListener("click", saveLoggedData);

// Add a click event listener to the "Hear This Prompt" button
hearButton.addEventListener("click", hearCurrentPrompt);

// Disable the "Hear This Prompt" button initially
hearButton.disabled = true;


function isSpeechSynthesisSupported() {
    return 'speechSynthesis' in window;
}

function speakPrompt(promptText) {
    if (isSpeechSynthesisSupported()) {
        const utterance = new SpeechSynthesisUtterance(promptText);
        speechSynthesis.speak(utterance);
    } else {
        alert("Speech synthesis is not supported in this browser.");
    }
}
