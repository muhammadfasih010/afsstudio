const HF_TOKEN = "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";
const API_URL = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell";

const generateBtn = document.getElementById('generateBtn');
const promptInput = document.getElementById('imagePrompt');
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

// Image Generate
generateBtn.addEventListener('click', async () => {
    const prompt = promptInput.value.trim();
    if(prompt === "") { alert("Please enter a prompt first!"); return; }

    generateBtn.disabled = true;
    loader.classList.remove('hidden');
    placeholderText.classList.add('hidden');
    outputImage.classList.add('hidden');
    imageActions.classList.add('hidden');

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${HF_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: prompt })
        });

        if(!response.ok) throw new Error(await response.text());

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);

        outputImage.src = imageUrl;
        outputImage.classList.remove('hidden');

        downloadBtn.href = imageUrl;
        imageActions.classList.remove('hidden');

    } catch (error) {
        alert("Error: " + error.message);
        console.error(error);
        placeholderText.classList.remove('hidden');
    } finally {
        generateBtn.disabled = false;
        loader.classList.add('hidden');
    }
});
