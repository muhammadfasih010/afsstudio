        const HF_TOKEN = "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"; 
const API_URL = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell";

// Load user name from login page
document.addEventListener('DOMContentLoaded', () => {
    const savedName = localStorage.getItem('userName') || "Guest";
    document.getElementById('displayProfileName').innerText = savedName;
    document.getElementById('displayProfileNameBig').innerText = savedName;
    document.getElementById('userAvatarLetter').innerText = savedName[0].toUpperCase();
    document.getElementById('userAvatarLetterBig').innerText = savedName[0].toUpperCase();
});

// Profile Dropdown Toggle - chota sa arrow click pe khule
document.getElementById('profileMenuBtn').addEventListener('click', (e) => {
    // agar seedha set.html jana hai to dropdown hata do
    // agar dropdown chahiye to neeche wali 2 line on kar do
    // e.preventDefault();
    // document.getElementById('profileDropdownMenu').classList.toggle('hidden');
});

// Bahar click karo to menu band
window.addEventListener('click', (e) => {
    if (!document.getElementById('profileMenuBtn').contains(e.target) &&!document.getElementById('profileDropdownMenu').contains(e.target)) {
        document.getElementById('profileDropdownMenu').classList.add('hidden');
    }
});


const generateBtn = document.getElementById('generateBtn');
const promptInput = document.getElementById('imagePrompt');
const outputImage = document.getElementById('generatedImage');
const loader = document.getElementById('loader');
const downloadBtn = document.getElementById('downloadImageBtn');
const placeholderText = document.getElementById('placeholderText');
const imageActions = document.getElementById('imageActions');

generateBtn.addEventListener('click', async () => {
    const prompt = promptInput.value.trim();
    if(prompt === "") { alert("Please enter a prompt first!"); return; }

    // Loading start
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

        if(!response.ok) {
            const err = await response.text();
            throw new Error(err);
        }

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);

        // Image show
        outputImage.src = imageUrl;
        outputImage.classList.remove('hidden');
        
        // Download button
        downloadBtn.href = imageUrl;
        imageActions.classList.remove('hidden');
        
        // History me save
        saveToHistory(prompt);

    } catch (error) {
        alert("Error generating image. \n" + error.message);
        console.error(error);
        placeholderText.classList.remove('hidden');
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
    if(history.length > 10) history.pop(); 
    localStorage.setItem('imageHistory', JSON.stringify(history));
}

// History Modal ke basic buttons - baad me complete kar lena
document.getElementById('openHistoryBtn').onclick = () => document.getElementById('historyModal').classList.remove('hidden');
document.getElementById('closeHistoryBtn').onclick = () => document.getElementById('historyModal').classList.add('hidden');
// Profile Dropdown Toggle
const profileMenuBtn = document.getElementById('profileMenuBtn');
const profileDropdownMenu = document.getElementById('profileDropdownMenu');

profileMenuBtn.addEventListener('click', () => {
    profileDropdownMenu.classList.toggle('hidden');
});

// Bahar click karo to menu band ho jaye
window.addEventListener('click', (e) => {
    if (!profileMenuBtn.contains(e.target) &&!profileDropdownMenu.contains(e.target)) {
        profileDropdownMenu.classList.add('hidden');
    }
});

// Profile name sync karo dono jagah
function updateProfileName(name) {
    document.getElementById('displayProfileName').innerText = name;
    document.getElementById('displayProfileNameBig').innerText = name;
    document.getElementById('userAvatarLetter').innerText = name[0].toUpperCase();
    document.getElementById('userAvatarLetterBig').innerText = name[0].toUpperCase();
}
updateProfileName("User"); // yahan localStorage se name le lena
