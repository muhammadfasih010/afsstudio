// Pollinations AI - No Token Needed
const generateBtn = document.getElementById('generateBtn');
const promptInput = document.getElementById('imagePrompt');
const aspectRatio = document.getElementById('aspectRatio');
const outputImage = document.getElementById('generatedImage');
const loader = document.getElementById('loader');
const downloadBtn = document.getElementById('downloadImageBtn');
const placeholderText = document.getElementById('placeholderText');
const imageActions = document.getElementById('imageActions');

// Page load hote hi naam set karo
document.addEventListener('DOMContentLoaded', () => {
    const savedName = localStorage.getItem('userName') || "Guest";
    const firstLetter = savedName.charAt(0).toUpperCase();
    document.getElementById('displayProfileName').innerText = savedName;
    document.getElementById('userAvatarLetter').innerText = firstLetter;
});

// Image Generate with Pollinations
generateBtn.addEventListener('click', async () => {
    const prompt = promptInput.value.trim();
    if(prompt === "") { alert("Please enter a prompt first!"); return; }

    generateBtn.disabled = true;
    loader.classList.remove('hidden');
    placeholderText.classList.add('hidden');
    outputImage.classList.add('hidden');
    imageActions.classList.add('hidden');

    try {
        // Aspect ratio ke hisab se size set karo
        let width = 1024, height = 1024;
        const ratio = aspectRatio.value;
        if(ratio === "16:9") { width = 1344; height = 768; }
        if(ratio === "9:16") { width = 768; height = 1344; }
        if(ratio === "4:3") { width = 1024; height = 768; }

        // Pollinations ka direct URL
        const encodedPrompt = encodeURIComponent(prompt + ", highly detailed, 8k, masterpiece");
        const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${Math.floor(Math.random()*1000000)}&model=flux`;

        // Image load hone ka wait karo
        outputImage.onload = () => {
            outputImage.classList.remove('hidden');
            downloadBtn.href = imageUrl;
            imageActions.classList.remove('hidden');
            saveToHistory(prompt, imageUrl);
        }
        
        outputImage.onerror = () => {
            throw new Error("Image failed to load");
        }

        outputImage.src = imageUrl; // Yahan se load start

    } catch (error) {
        alert("Error: " + error.message);
        console.error(error);
        placeholderText.classList.remove('hidden');
    } finally {
        generateBtn.disabled = false;
        loader.classList.add('hidden');
    }
});

// History with image save
function saveToHistory(prompt, imageUrl) {
    let history = JSON.parse(localStorage.getItem('imageHistory')) || [];
    history.unshift({ 
        prompt: prompt, 
        image: imageUrl,
        date: new Date().toLocaleString() 
    });
    if(history.length > 10) history.pop();
    localStorage.setItem('imageHistory', JSON.stringify(history));
            }
