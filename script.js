// Define prompts for each group and prompt list
const prompts = {
    g1: {
        list1: [
            "Prompt 1 for Group 1 - List 1",
            "Prompt 2 for Group 1 - List 1",
            "Prompt 3 for Group 1 - List 1"
            // Add more prompts for Group 1 List 1
        ],
        list2: [
            "Prompt 1 for Group 1 - List 2",
            "Prompt 2 for Group 1 - List 2",
            "Prompt 3 for Group 1 - List 2"
            // Add more prompts for Group 1 List 2
        ],
        list3: [
            "Prompt 1 for Group 1 - List 3",
            "Prompt 2 for Group 1 - List 3",
            "Prompt 3 for Group 1 - List 3"
            // Add more prompts for Group 1 List 3
        ],
    },
    g2: {
        list1: [
            "Prompt 1 for Group 2 - List 1",
            "Prompt 2 for Group 2 - List 1",
            "Prompt 3 for Group 2 - List 1"
            // Add more prompts for Group 2 List 1
        ],
        list2: [
            "Prompt 1 for Group 2 - List 2",
            "Prompt 2 for Group 2 - List 2",
            "Prompt 3 for Group 2 - List 2"
            // Add more prompts for Group 2 List 2
        ],
        list3: [
            "Prompt 1 for Group 2 - List 3",
            "Prompt 2 for Group 2 - List 3",
            "Prompt 3 for Group 2 - List 3"
            // Add more prompts for Group 2 List 3
        ],
    },
   
};

// Rest of the code remains the same...

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
    generateRandomPrompt("list1");
});

document.getElementById("generateList2Button").addEventListener("click", function () {
    generateRandomPrompt("list2");
});

document.getElementById("generateList3Button").addEventListener("click", function () {
    generateRandomPrompt("list3");
});


// Rest of the code remains the same...


function generateRandomPrompt(list) {
    if (!prompts[currentGroup] || !prompts[currentGroup][list]) {
        promptDisplay.textContent = "No prompts remaining for this group and list.";
    } else {
        clickCount++;
        const listPrompts = prompts[currentGroup][list]; // Use the provided list parameter
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



//_________________________________________________________________________________________--
// Event listener for saving logged data
document.getElementById("saveButton").addEventListener("click", saveLoggedData);

// Event listener for "Hear This Prompt" button
hearButton.addEventListener("click", hearCurrentPrompt);

// Initialize with the first group
groupSelection.value = "g1";
groupSelection.dispatchEvent(new Event("change"));


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
