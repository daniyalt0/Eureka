let prompts = [
    "Optimize toothpick module design – explore the concept of modular toothpick units to create a sturdy, load-bearing structure.",
    "Leverage geometric principles – consider how triangles can serve as the building blocks for your toothpick bridge, providing stability with fewer toothpicks.",
    "Reflect on tension and compression – how can you apply the principles of tensegrity to create a toothpick bridge that balances forces efficiently?",
    "Explore tessellations for structural integrity – arrange toothpick shapes in a pattern that strengthens the overall bridge design.",
    "Challenge yourself with cantilever construction – extend your toothpick bridge to its limits while ensuring it supports the weight of the brick.",
    "Investigate the potential of toothpick trusses – can you strategically place truss structures to create a lightweight yet robust bridge?",
    "Think like a minimalist architect – how can you create a functional toothpick bridge with the fewest toothpicks possible?",
    "Reflect on the concept of load-bearing points – where should you focus toothpick support to maximize your bridge's strength?",
    "Consider the beauty of simplicity – how can you achieve structural efficiency while maintaining an elegant, minimalist design?",
    "Innovate toothpick placement by optimizing for balance – how can you strategically distribute toothpicks for the best structural results?",
    "Challenge the limits of toothpick length – how can you use extended toothpicks creatively to minimize their overall count?",
    "Explore the concept of toothpick spirals – can a spiraling design enhance both aesthetics and strength while conserving resources?",
    "Imagine toothpick arches as load-bearing elements – how can you leverage them to reduce the total toothpick requirement?",
    "Experiment with toothpick weaving patterns – how might unique weaves enhance the bridge's load-bearing capacity?",
    "Investigate the use of toothpick symmetry – can symmetrical designs achieve stability with fewer toothpicks?",
    "Reflect on the power of toothpick angles – how can you employ precise angles to maximize strength and minimize material use?",
    "Utilize toothpick cantilevers to extend support – what innovative cantilever shapes can efficiently hold the weight?",
    "Explore toothpick diamonds – can these geometric shapes offer a surprising solution for minimizing toothpick use while ensuring stability?",
    "Investigate the concept of toothpick duality – how might two interlocking components provide increased strength while using fewer toothpicks?",
    "Strategically layer toothpicks – how can you stack them to maximize support and minimize usage?",
    "Invent toothpick tension bridges – can you use tension forces to achieve a resource-efficient design?",
    "Build a toothpick suspension bridge – explore creative ways to suspend your bridge while conserving toothpicks.",
    "Investigate toothpick helix designs – how can spiraling toothpicks enhance both aesthetics and stability?",
    "Reflect on toothpick alignment – how might precise alignment contribute to a stronger bridge with fewer toothpicks?",
    "Optimize toothpick triangulation – what arrangements can maximize structural integrity using minimal toothpicks?",
    "Explore toothpick patterning – how can repeating patterns create strength while reducing toothpick count?",
    "Challenge yourself with the toothpick diamond principle – can diamonds be the key to efficiency in your design?",
    "Investigate the concept of toothpick honeycombs – can hexagonal patterns offer stability with fewer toothpicks?",
    "Reflect on toothpick reinforcement – how can you strategically reinforce key areas while minimizing overall toothpick usage?",
    // Add your prompts here
];

let clickCount = 0; // Initialize a counter
const loggedPrompts = []; // To store logged prompts

const clickCountDisplay = document.getElementById("clickCountDisplay"); // Display element for click count
const timestampList = document.getElementById("timestampList"); // List element for timestamps

function generateRandomPrompt() {
    if (prompts.length === 0) {
        promptDisplay.textContent = "No prompts remaining.";
    } else {
        clickCount++; // Increment the click count
        const randomIndex = Math.floor(Math.random() * prompts.length);
        const randomPrompt = prompts[randomIndex];
        const timestamp = new Date().toLocaleTimeString(); // Get the current timestamp

        // Display the prompt with timestamp
        promptDisplay.textContent = `Prompt #${clickCount}: ${randomPrompt}`;
        const timestampItem = document.createElement("li");
        timestampItem.textContent = `${clickCount}: ${randomPrompt} (Generated at ${timestamp})`;
        timestampItem.style.fontFamily = "Roboto Mono, monospace"; // Apply "Roboto Mono" font
        timestampList.appendChild(timestampItem);

        loggedPrompts.push(`${clickCount}: ${randomPrompt} (Generated at ${timestamp})`);
        prompts.splice(randomIndex, 1); // Remove the used prompt
        clickCountDisplay.textContent = `Click count: ${clickCount}`; // Update click count display
    }
}

function saveLoggedData() {
    if (loggedPrompts.length > 0) {
        // Export data as text
        const exportedData = `Logged Prompts:\n\n${loggedPrompts.join('\n\n')}`;
        exportData(exportedData);
    }
}

function exportData(data) {
    const blob = new Blob([data], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'generated_data.txt';

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);

    // Display a success message
    const exportMessage = document.getElementById("exportMessage");
    exportMessage.textContent = "Data exported successfully!";
    exportMessage.style.color = "#556f7b"; // Apply pastel tone color to the message
}

const generateButton = document.getElementById("generateButton");
const saveButton = document.getElementById("saveButton");
const promptDisplay = document.getElementById("promptDisplay");

generateButton.addEventListener("click", generateRandomPrompt);
saveButton.addEventListener("click", saveLoggedData);
