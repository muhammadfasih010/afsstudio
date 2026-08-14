const HF_TOKEN = "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"; 
const API_URL = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell";


const generateBtn = document.getElementById('generateBtn');
const promptInput = document.getElementById('prompt');
const outputImage = document.getElementById('outputImage');
const loader = document.getElementById('loader');
const downloadBtn = document.getElementById('downloadBtn');

generateBtn.addEventListener('click', async () => {
    const prompt = promptInput.value.trim();
    if(prompt === "") { alert("Please enter a prompt first!"); return; }

    // Loading start
    generateBtn.disabled = true;
    loader.classList.remove('hidden');
    outputImage.classList.add('hidden');
    downloadBtn.classList.add('hidden');

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { 
                "Authorization": `Bearer ${HF_TOKEN}`, 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({ inputs: prompt })
        });

        if(!response.ok) throw new Error("API Error");

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);

        // Image show
        outputImage.src = imageUrl;
        outputImage.classList.remove('hidden');
        
        // Download button
        downloadBtn.href = imageUrl;
        downloadBtn.classList.remove('hidden');
        
        // History me save - Member 3 ke liye
        saveToHistory(prompt);

    } catch (error) {
        alert("Error generating image. Check your token and internet.");
        console.error(error);
    } finally {
        generateBtn.disabled = false;
        loader.classList.add('hidden');
    }
});

// History save karne ka function
function saveToHistory(prompt) {
    let history = JSON.parse(localStorage.getItem('imageHistory')) || [];
    history.unshift({
        prompt: prompt,
        date: new Date().toLocaleString()
    });
    // Sirf last 10 rakho
    if(history.length > 10) history.pop(); 
    localStorage.setItem('imageHistory', JSON.stringify(history));
}
