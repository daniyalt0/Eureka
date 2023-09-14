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



// Initialize variables
let clickCount = 0;
const loggedPrompts = [];
let currentPrompts = [];

const clickCountDisplay = document.getElementById("clickCountDisplay");
const timestampList = document.getElementById("timestampList");
const hearButton = document.getElementById("hearButton");

// Event listener for group selection
const groupSelection = document.getElementById("groupSelection");
groupSelection.addEventListener("change", function () {
    const selectedGroup = groupSelection.value;
    const selectedList = groupSelection.options[groupSelection.selectedIndex].getAttribute("data-list");
    const selectedPrompts = prompts[selectedGroup][selectedList];

    if (!selectedPrompts || selectedPrompts.length === 0) {
        alert("No prompts available for this group and list.");
        return;
    }

    // Reset variables
    clickCount = 0;
    loggedPrompts.length = 0;
    clickCountDisplay.textContent = "Click count: 0";
    promptDisplay.textContent = "";
    exportMessage.textContent = "";
    hearButton.disabled = true;
    currentPrompts = selectedPrompts;
});

// Event listener for generating prompts
document.getElementById("generateButton").addEventListener("click", generateRandomPrompt);

// Event listener for saving logged data
document.getElementById("saveButton").addEventListener("click", saveLoggedData);

// Event listener for "Hear This Prompt" button
hearButton.addEventListener("click", hearCurrentPrompt);

// Initialize with the first group and list
groupSelection.value = "g1";
groupSelection.dispatchEvent(new Event("change"));

function generateRandomPrompt() {
    if (currentPrompts.length === 0) {
        promptDisplay.textContent = "No prompts remaining.";
    } else {
        clickCount++;
        const randomIndex = Math.floor(Math.random() * currentPrompts.length);
        const randomPrompt = currentPrompts[randomIndex];
        const timestamp = new Date().toLocaleTimeString();

        timestampList.innerHTML = "";

        promptDisplay.textContent = `Prompt #${clickCount}: ${randomPrompt}`;
        const timestampItem = document.createElement("li");
        timestampItem.textContent = `${clickCount}: ${randomPrompt} (Generated at ${timestamp})`;
        timestampItem.style.fontFamily = "Roboto Mono, monospace";
        timestampList.appendChild(timestampItem);

        loggedPrompts.push({ prompt: randomPrompt, timestamp: timestamp });
        currentPrompts.splice(randomIndex, 1);
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
