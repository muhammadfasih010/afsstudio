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
generateBtn.addEventListener('click', () => {
    const prompt = promptInput.value.trim();
    if(prompt === "") { alert("Please enter a prompt first!"); return; }

    // Loading start
    generateBtn.disabled = true;
    loader.classList.remove('hidden');
    placeholderText.classList.add('hidden');
    outputImage.classList.add('hidden');
    imageActions.classList.add('hidden');

    // Aspect ratio ke hisab se size
    let width = 1024, height = 1024;
    const ratio = aspectRatio.value;
    if(ratio === "16:9") { width = 1344; height = 768; }
    if(ratio === "9:16") { width = 768; height = 1344; }
    if(ratio === "4:3") { width = 1024; height = 768; }

    // Pollinations ka direct URL + random seed taake har baar nayi image aaye
    const finalPrompt = prompt + ", highly detailed, 8k, masterpiece, cinematic lighting";
    const encodedPrompt = encodeURIComponent(finalPrompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${Date.now()}&model=flux&nologo=true`;

    // Image load hone pe kya karna hai
    outputImage.onload = () => {
        outputImage.classList.remove('hidden');
        downloadBtn.href = imageUrl;
        imageActions.classList.remove('hidden');
        saveToHistory(prompt, imageUrl);
        generateBtn.disabled = false;
        loader.classList.add('hidden');
    };
    
    // Agar error aaye
    outputImage.onerror = () => {
        alert("Image generate nahi ho saki. 5 sec baad dobara try karo.");
        console.error("Pollinations Error");
        placeholderText.classList.remove('hidden');
        generateBtn.disabled = false;
        loader.classList.add('hidden');
    }

    // Image load karwao
    outputImage.src = imageUrl; 
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

// History Modal buttons
document.getElementById('openHistoryBtn').onclick = (e) => {
    e.preventDefault();
    document.getElementById('historyModal').classList.remove('hidden');
};
document.getElementById('closeHistoryBtn').onclick = () => document.getElementById('historyModal').classList.add('hidden');
