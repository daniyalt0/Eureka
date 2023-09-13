// Define prompts for each group
const promptsByGroup = {
    g1: [
        "Test Prompt 1 for Group 1",
        "Test Prompt 2 for Group 1",
        "Test Prompt 3 for Group 1",
        "Test Prompt 4 for Group 1",
        "Test Prompt 5 for Group 1",
    ],
    g2: [
        "Test Prompt 1 for Group 2",
        "Test Prompt 2 for Group 2",
        "Test Prompt 3 for Group 2",
        "Test Prompt 4 for Group 2",
        "Test Prompt 5 for Group 2",
    ],
    g3: [
        "Test Prompt 1 for Group 3",
        "Test Prompt 2 for Group 3",
        "Test Prompt 3 for Group 3",
        "Test Prompt 4 for Group 3",
        "Test Prompt 5 for Group 3",
    ],
    g4: [
        "Test Prompt 1 for Group 4",
        "Test Prompt 2 for Group 4",
        "Test Prompt 3 for Group 4",
        "Test Prompt 4 for Group 4",
        "Test Prompt 5 for Group 4",
    ],
    g5: [
        "Test Prompt 1 for Group 5",
        "Test Prompt 2 for Group 5",
        "Test Prompt 3 for Group 5",
        "Test Prompt 4 for Group 5",
        "Test Prompt 5 for Group 5",
    ],
};

let clickCount = 0;
const loggedPrompts = [];

const clickCountDisplay = document.getElementById("clickCountDisplay");
const timestampList = document.getElementById("timestampList");
const hearButton = document.getElementById("hearButton"); // Reference to the "Hear This Prompt" button

// Event listener for group selection
const groupSelection = document.getElementById("groupSelection");
const groupContainers = document.querySelectorAll(".group-container");

groupSelection.addEventListener("change", function () {
    const selectedGroup = groupSelection.value;

    // Hide all group containers
    groupContainers.forEach(group => group.style.display = "none");

    // Show the selected group container
    const selectedGroupContainer = document.getElementById(`group-${selectedGroup}`);
    selectedGroupContainer.style.display = "block";

    // Clear the click count and reset logged prompts
    clickCount = 0;
    loggedPrompts.length = 0;
    clickCountDisplay.textContent = "Click count: 0";
    promptDisplay.textContent = "";
    exportMessage.textContent = "";
    hearButton.disabled = true;
});

function generateRandomPrompt() {
    const selectedGroup = groupSelection.value;
    const prompts = promptsByGroup[selectedGroup];

    if (!prompts || prompts.length === 0) {
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

// Initialize with the default group
groupSelection.dispatchEvent(new Event("change"));
