#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Read the albums.js file
const albumsPath = path.join(__dirname, '../data/albums.js');
const albumsContent = fs.readFileSync(albumsPath, 'utf-8');

// Extract the albums array using a simple regex approach
// This matches: export const albums = [...];
const match = albumsContent.match(/export const albums = (\[[\s\S]*\]);/);

if (!match) {
    console.error('❌ Could not parse albums.js');
    process.exit(1);
}

// Parse the albums array
let albums;
try {
    // Use eval in a safe context (we control the source file)
    albums = eval(match[1]);
} catch (error) {
    console.error('❌ Error parsing albums array:', error.message);
    process.exit(1);
}

// Shuffle photos in each album
console.log('🔀 Shuffling photos in albums...\n');
albums.forEach(album => {
    const originalOrder = album.photos.map(p => p.src);
    album.photos = shuffleArray(album.photos);
    const newOrder = album.photos.map(p => p.src);

    const changed = JSON.stringify(originalOrder) !== JSON.stringify(newOrder);
    console.log(`   ${album.slug}: ${album.photos.length} photos ${changed ? '✓ shuffled' : '(unchanged)'}`);
});

// Generate the new file content
const newContent = `// ONLY export the albums array
export const albums = ${JSON.stringify(albums, null, 2)};
`;

// Write back to albums.js
fs.writeFileSync(albumsPath, newContent, 'utf-8');

console.log('\n✅ Albums successfully shuffled and saved!\n');
