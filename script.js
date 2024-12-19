const apiKey = 'AIzaSyBBaesZiljQnifo0LD-OND2TwbsNDEO2n4'; // Replace with your API key
const folderIds = {
    Cat: '1RKMOjPVY9tgwh4X7mmFw4yv0ikY42k21', 
    Dallas: '1gEB8x-AzRPi8wIc4IZi8LdnqsTfIUqli',
    Fallan: '1D-4wXbcGBlyTXuessbHvlSYnVSbGma2X',
    Griffen: '19mVUBoJIIx973K9_ZCrSDZPMOlhi9l89',
    Ian: '1QTjWjT4KkuCWO7QpdoVHlBaFbexYbhym',
    Jack: '1mjSKBTwLSXmsbS1FVFGh0fFxYB0toUOB',
    Jonah: '1f9fFkvNrh653VttQfGXJzGby0Bs2Xc_i',
    Kenna: '1kUtrCaAblL0aLilzYb62JuBRtggoV8dQ',
    Kian: '1DG5p1bCO-fcaZA_tTT9cz7doVomBiza4',
    Mason: '1qDTd7JGfLgTUPlXcJiFmP7xrnv8kuyO6',
    Tuxin: '1F3xSfY9p6lz7Uh1Yk-xfHMImOZT3dDAj'
};

const imgWidth = 500;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

async function fetchImages(friend) {
    const galleryId = folderIds[friend];
    console.log(`Fetching images from folder: ${galleryId}`);
    
    const response = await fetch(`https://www.googleapis.com/drive/v3/files?q='${galleryId}'+in+parents&key=${apiKey}&fields=files(id,name)`);
    
    // Check if the response is okay
    if (!response.ok) {
        console.error('Error fetching images:', response.statusText);
        return;
    }
    
    const data = await response.json();
    console.log('Data received:', data); // Log the data received from API
    const gallery = document.getElementById('gallery');

    // Clear existing images in case of re-fetch
    gallery.innerHTML = '';

    // Check if there are any files
    if (data.files.length === 0) {
        gallery.innerHTML = '<p>No images found.</p>'; // Message if no images are found
        console.log('No images found in the folder.');
        return;
    }

    // Shuffle the array of files
    shuffleArray(data.files);

    // Loop through the shuffled files and create image elements
    data.files.forEach(file => {
        const imgElement = document.createElement('img');
        imgElement.src = `https://drive.google.com/thumbnail?id=${file.id}&sz=h${imgWidth}`;
        imgElement.alt = file.name;
        gallery.appendChild(imgElement);
        console.log(`Image added: ${file.name}`); // Log each added image
    });
}
