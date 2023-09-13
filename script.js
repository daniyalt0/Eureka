// Define prompt sets (separate for each set)
const promptSets = {
    g1: ["Prompt 1A", "Prompt 1B", "Prompt 1C"],
    g2: ["Prompt 2A", "Prompt 2B", "Prompt 2C"],
    g3: ["Prompt 3A", "Prompt 3B", "Prompt 3C"],
    g4: ["Prompt 4A", "Prompt 4B", "Prompt 4C"],
    g5: ["Prompt 5A", "Prompt 5B", "Prompt 5C"],
};

// Initialize selected prompt set
let selectedPromptSet = "g1";

// Function to generate a random prompt from the selected set
function generateRandomPrompt(set) {
    const prompts = promptSets[set];
    if (!prompts || prompts.length === 0) {
        return "No prompts available in the selected set.";
    }
    const randomIndex = Math.floor(Math.random() * prompts.length);
    return prompts[randomIndex];
}

// Function to update the prompt display for a specific set
function updatePromptDisplay(set) {
    // Get the prompt display element
    const promptDisplay = document.getElementById(`promptDisplaySet${set}`);

    // Check if the element exists
    if (!promptDisplay) {
        console.error(`Prompt display for set ${set} not found.`);
        return;
    }

    // Generate and set the prompt text
    const generatedPrompt = generateRandomPrompt(set);
    promptDisplay.textContent = generatedPrompt;
}

// Event listener for prompt set selection dropdown
document.getElementById("promptSetSelection").addEventListener("change", function () {
    selectedPromptSet = this.value;
    updatePromptDisplay(selectedPromptSet);
});

// Event listeners for "Generate Prompt" buttons for each set
document.getElementById("generateButtonSet1").addEventListener("click", () => {
    updatePromptDisplay("g1");
    incrementClickCount("g1");
});
document.getElementById("generateButtonSet2").addEventListener("click", () => {
    updatePromptDisplay("g2");
    incrementClickCount("g2");
});
document.getElementById("generateButtonSet3").addEventListener("click", () => {
    updatePromptDisplay("g3");
    incrementClickCount("g3");
});
document.getElementById("generateButtonSet4").addEventListener("click", () => {
    updatePromptDisplay("g4");
    incrementClickCount("g4");
});
document.getElementById("generateButtonSet5").addEventListener("click", () => {
    updatePromptDisplay("g5");
    incrementClickCount("g5");
});

// Separate click counters for each set
const clickCounts = {
    g1: 0,
    g2: 0,
    g3: 0,
    g4: 0,
    g5: 0,
};

// Function to increment and display the click count for a specific set
function incrementClickCount(set) {
    clickCounts[set]++;
    const clickCountDisplay = document.getElementById(`clickCountSet${set}`);
    if (clickCountDisplay) {
        clickCountDisplay.textContent = `Click count Set ${set}: ${clickCounts[set]}`;
    }
}

// Rest of your code...

// Function to handle the "Save Data" button click for a specific set
function saveData(set) {
    // Get the click count
    const clickCount = clickCounts[set];

    // Get the current prompt
    const promptDisplay = document.getElementById(`promptDisplaySet${set}`);
    const currentPrompt = promptDisplay.textContent;

    // Get the timestamp
    const timestamp = new Date().toLocaleString();

    // Create a CSV row with click count, prompt, and timestamp
    const csvRow = `${clickCount},${currentPrompt},${timestamp}`;

    // Get the exported message element
    const exportMessage = document.getElementById(`exportMessageSet${set}`);

    // Check if this is the first saved entry
    if (!exportMessage.textContent) {
        exportMessage.textContent = "Data exported:";
    }

    // Create a new list item for the timestamp list
    const timestampList = document.getElementById(`timestampListSet${set}`);
    const listItem = document.createElement("li");
    listItem.textContent = `${currentPrompt} - ${timestamp}`;

    // Append the list item to the timestamp list
    timestampList.appendChild(listItem);

    // Show the timestamp list
    document.getElementById(`timestampGridSet${set}`).style.display = "block";

    // Reset click count
    clickCounts[set] = 0;

    // Log the CSV row to the console (you can remove this in production)
    console.log(csvRow);
}

// Event listeners for the "Save Data" button for each set
document.getElementById("saveButtonSet1").addEventListener("click", () => saveData("g1"));
document.getElementById("saveButtonSet2").addEventListener("click", () => saveData("g2"));
document.getElementById("saveButtonSet3").addEventListener("click", () => saveData("g3"));

// Initial prompt display for the selected set
updatePromptDisplay(selectedPromptSet);
