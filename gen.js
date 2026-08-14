alert("JS File Loaded ✅"); // 1. Ye sabse pehle aana chahiye

const generateBtn = document.getElementById('generateBtn');
const promptInput = document.getElementById('imagePrompt');
const aspectRatio = document.getElementById('aspectRatio');
const outputImage = document.getElementById('generatedImage');
const loader = document.getElementById('loader');
const downloadBtn = document.getElementById('downloadImageBtn');
const placeholderText = document.getElementById('placeholderText');
const imageActions = document.getElementById('imageActions');

// Check karo saare element mil rahe hain ya nahi
if(!generateBtn) alert("Error: generateBtn nahi mila");
if(!promptInput) alert("Error: imagePrompt nahi mila");
if(!outputImage) alert("Error: generatedImage nahi mila");

document.addEventListener('DOMContentLoaded', () => {
    alert("DOM Ready ✅"); // 2. Ye dusra aana chahiye
    const savedName = localStorage.getItem('userName') || "Guest";
    document.getElementById('displayProfileName').innerText = savedName;
    document.getElementById('userAvatarLetter').innerText = savedName[0].toUpperCase();
});

generateBtn.addEventListener('click', () => {
    alert("Button Clicked ✅"); // 3. Button dabao to ye aana chahiye

    const prompt = promptInput.value.trim();
    if(prompt === "") { alert("Please enter a prompt first!"); return; }

    generateBtn.disabled = true;
    generateBtn.innerText = "Generating...";
    loader.classList.remove('hidden');
    placeholderText.classList.add('hidden');
    outputImage.classList.add('hidden');
    imageActions.classList.add('hidden');

    let width = 1024, height = 1024;
    const ratio = aspectRatio.value;
    if(ratio === "16:9") { width = 1344; height = 768; }
    if(ratio === "9:16") { width = 768; height = 1344; }
    if(ratio === "4:3") { width = 1024; height = 768; }

    const finalPrompt = prompt + ", highly detailed, 8k, masterpiece";
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt)}?width=${width}&height=${height}&seed=${Date.now()}&model=flux&nologo=true`;

    alert("URL: " + imageUrl); // 4. URL check karo

    outputImage.onload = () => {
        alert("Image Loaded ✅");
        outputImage.classList.remove('hidden');
        downloadBtn.href = imageUrl;
        imageActions.classList.remove('hidden');
        generateBtn.disabled = false;
        generateBtn.innerText = "✨ Generate Image";
        loader.classList.add('hidden');
    };

    outputImage.onerror = () => {
        alert("Image Error ❌ Pollinations down ho sakta hai");
        placeholderText.classList.remove('hidden');
        generateBtn.disabled = false;
        generateBtn.innerText = "✨ Generate Image";
        loader.classList.add('hidden');
    }

    outputImage.src = imageUrl;
});
