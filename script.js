// Define prompts for each group and prompt list
const prompts = {
    g1: [
        "Prompt 1 for Group 1 - List 1",
        "Prompt 2 for Group 1 - List 2",
        "Prompt 3 for Group 1 - List 3"
        // Add more prompts for Group 1
    ],
    g2: [
        "Prompt 1 for Group 2 - List 1",
        "Prompt 2 for Group 2 - List 2",
        "Prompt 3 for Group 2 - List 3"
        // Add more prompts for Group 2
    ],
    g3: [
        "Prompt 1 for Group 3 - List 1",
        "Prompt 2 for Group 3 - List 2",
        "Prompt 3 for Group 3 - List 3"
        // Add more prompts for Group 3
    ],
    g4: [
        "Prompt 1 for Group 4 - List 1",
        "Prompt 2 for Group 4 - List 2",
        "Prompt 3 for Group 4 - List 3"
        // Add more prompts for Group 4
    ],
    g5: [
        "Prompt 1 for Group 5 - List 1",
        "Prompt 2 for Group 5 - List 2",
        "Prompt 3 for Group 5 - List 3"
        // Add more prompts for Group 5
    ]
};

// Initialize variables
let clickCount = 0;
const loggedPrompts = [];
let currentGroup = "g1"; // Default to Group 1
let currentList = "list1"; // Default to List 1

const clickCountDisplay = document.getElementById("clickCountDisplay");
const timestampList = document.getElementById("timestampList");
const hearButton = document.getElementById("hearButton");
const groupSelection = document.getElementById("groupSelection");
const promptDisplay = document.getElementById("promptDisplay");

// Event listener for group selection
groupSelection.addEventListener("change", function () {
    currentGroup = groupSelection.value;
    currentList = "list1"; // Reset to List 1
    clickCount = 0;
    clickCountDisplay.textContent = "Click count: 0";
    promptDisplay.textContent = "";
    loggedPrompts.length = 0;
    hearButton.disabled = true;
});

// Event listeners for generating prompts for each list
document.getElementById("generateList1Button").addEventListener("click", function () {
    currentList = "list1";
    generateRandomPrompt();
});

document.getElementById("generateList2Button").addEventListener("click", function () {
    currentList = "list2";
    generateRandomPrompt();
});

document.getElementById("generateList3Button").addEventListener("click", function () {
    currentList = "list3";
    generateRandomPrompt();
});

// Event listener for saving logged data
document.getElementById("saveButton").addEventListener("click", saveLoggedData);

// Event listener for "Hear This Prompt" button
hearButton.addEventListener("click", hearCurrentPrompt);

// Initialize with the first group
groupSelection.value = "g1";
groupSelection.dispatchEvent(new Event("change"));

function generateRandomPrompt() {
    if (!prompts[currentGroup][currentList]) {
        promptDisplay.textContent = "No prompts remaining for this group and list.";
    } else {
        clickCount++;
        const listPrompts = prompts[currentGroup][currentList];
        if (listPrompts.length === 0) {
            promptDisplay.textContent = "No prompts remaining for this group and list.";
            return;
        }
        const randomIndex = Math.floor(Math.random() * listPrompts.length);
        const randomPrompt = listPrompts.splice(randomIndex, 1)[0];
        const timestamp = new Date().toLocaleTimeString();

        promptDisplay.textContent = `Prompt #${clickCount}: ${randomPrompt}`;
        const timestampItem = document.createElement("li");
        timestampItem.textContent = `${clickCount}: ${randomPrompt} (Generated at ${timestamp})`;
        timestampList.appendChild(timestampItem);

        loggedPrompts.push({ prompt: randomPrompt, timestamp: timestamp });
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
