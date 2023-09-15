// Define prompts for each group and prompt list
const prompts = {
    g1: {
        list1: [
            "Modular",
            "Tessellation and trusses",
            "Tensions and Compressions",
            "Density",
            "Geometry",
            "Angles",
            "Placement",
            "Triangulation",
            "Weaving/Braiding",
            "Cantilever Design",
            // Add more prompts for Group 1 List 1
        ],
        list2: [
            "Balancing Forces",
            "Toothpick spacing",
            "Arches",
            "Lattice Structures",
            "Load Bearing Prompts",
            "Beyond Traditional shapes",
            "Principles of Minimalism",
            "Fractals",
            "Scale",
            "Size"
            // Add more prompts for Group 1 List 2
        ],
        list3: [
            "Domes and Spheres",
            "Helix/DNA",
            "Gaps and voids",
            "Unconventional alignments / toothpick orientation",
            "Varying Modules",
            "Think like a master weaver",
            "Volumetric trusses",
            "Principles of origami",
            "Notion of thickening diameter",
            "Investigate density gradient"
            // Add more prompts for Group 1 List 3
        ],
    },
    g2: {
        list1: [
            "Think Repetition and Rhythm",
            "Repeat Patterns/ Think like Escher",
            "Apply laws of physics",
            "Is your iteration spaced out or condensed",
            "Rotate, Skew, Warp",
            "Move, Remove, Displace",
            "Think strength geometry",
            "Joinery mechanism",
            "Go beyond support, Float or hang",
            "folds and interlinks"
            // Add more prompts for Group 2 List 1
        ],
        list2: [
            "Disbalancing, asymmetry and symmetrical",
            "Distance and Division",
            "Think supporting in curves",
            "Lightness and Weight",
            "Non-shape geometry",
            "More with less",
            "Does size matter",
            "Non-shape organic",
            "Flip and Mirror",
            "Angles and orientation"
            // Add more prompts for Group 2 List 2
        ],
        list3: [
            "Eggs",
            "Hats and helmets",
            "Negative Space",
            "Hummingbird’s nest",
            "Strength through sum of parts",
            "Prisms/Pyramid",
            "Paper crane",
            "Stacking and fattening",
            "Distributing weight",
            "Left Right Up Down"
            // Add more prompts for Group 2 List 3
        ],
    },
};

// Initialize variables
let clickCount = 0;
const totalCounts = { list1: 0, list2: 0, list3: 0 }; // Total counts for each stage
let currentGroup = "g1"; // Default to Group 1
let currentList = "list1"; // Default to List 1
const loggedPrompts = []; // Initialize an empty array for logged prompts

// Initialize variables for individual stage counts
const stageCounts = { list1: 0, list2: 0, list3: 0 };

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
    clickCountDisplay.textContent = `Total Count: ${totalCounts[currentList]}`;
    promptDisplay.textContent = "";
    loggedPrompts.length = 0;
    hearButton.disabled = true;
    // Reset individual stage counts
    stageCounts.list1 = 0;
    stageCounts.list2 = 0;
    stageCounts.list3 = 0;

    // Update total count in the HTML
    document.getElementById("totalCountDisplay").textContent = `Total Count: ${clickCount}`;
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

function generateRandomPrompt(list) {
    if (!prompts[currentGroup] || !prompts[currentGroup][list]) {
        promptDisplay.textContent = "No prompts remaining for this group and list.";
    } else {
        clickCount++;
        stageCounts[list]++; // Update the count for the current stage
        const listPrompts = prompts[currentGroup][list];
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

        // Update individual stage counts in the HTML
        document.getElementById(`${list}Count`).textContent = `${list} Count: ${stageCounts[list]}`;

        // Enable the "Hear This Prompt" button after generating a prompt
        hearButton.disabled = false;

        // Update total count in the HTML
        document.getElementById("totalCountDisplay").textContent = `Total Count: ${clickCount}`;
    }
}

// Event listener for saving logged data
document.getElementById("saveButton").addEventListener("click", saveLoggedData);

// Event listener for "Hear This Prompt" button
hearButton.addEventListener("click", hearCurrentPrompt);

// Initialize with the first group
groupSelection.value = "g1";
groupSelection.dispatchEvent(new Event("change"));

function saveLoggedData() {
    if (loggedPrompts.length > 0) {
        let csvData = "Prompt Name,Time Stamp,Stage 1 Count,Stage 2 Count,Stage 3 Count\n";
        for (const loggedPrompt of loggedPrompts) {
            csvData += `"${loggedPrompt.prompt}","${loggedPrompt.timestamp}",${stageCounts.list1},${stageCounts.list2},${stageCounts.list3}\n`;
        }
        csvData += `Total Count,${clickCount}\n`; // Only include the total count here

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
