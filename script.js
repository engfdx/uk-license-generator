// Function to generate a single fictional UK-style license number
// This function aims for a somewhat realistic (though randomized) 16-character format.
function generateFictionalUKLicenseNumber() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';

    let license = '';

    // Part 1: First 5 letters (fictional surname part)
    for (let i = 0; i < 5; i++) {
        license += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Part 2: Fictional DOB (YYMMDD format, e.g., 870312 for 12 March 1987)
    // Random year between 1950 and 2005 (for adult drivers)
    const year = String(Math.floor(Math.random() * (2005 - 1950 + 1)) + 1950).slice(-2);
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0'); // Max 28 for simplicity

    license += year + month + day;

    // Part 3: Gender/Initial (fictional - usually first initial, could be M/F)
    license += Math.random() < 0.5 ? 'M' : 'F'; // Random M or F

    // Part 4: Remaining characters (to make it 16 total)
    const allChars = chars + numbers;
    const remainingLength = 16 - license.length;
    for (let i = 0; i < remainingLength; i++) {
        license += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    return license;
}

// Function to generate and display N licenses (where N is 50 in your case)
function generateAndDisplayLicenses(count) {
    const container = document.getElementById('licenseListContainer');
    container.innerHTML = ''; // Clear previous content

    const ul = document.createElement('ul');
    ul.style.listStyleType = 'none'; // Remove bullet points
    ul.style.padding = '0';

    for (let i = 0; i < count; i++) {
        const licenseNumber = generateFictionalUKLicenseNumber();
        const li = document.createElement('li');
        li.textContent = licenseNumber;
        li.style.marginBottom = '5px'; // Add some spacing between items
        ul.appendChild(li);
    }
    container.appendChild(ul);
}

// Function to copy all generated licenses to the clipboard
function copyAllLicenses() {
    const container = document.getElementById('licenseListContainer');
    // Get text content, split by lines, filter out empty lines, join back with newlines
    const allLicensesText = container.textContent.trim().split('\n').filter(Boolean).join('\n');

    if (allLicensesText) {
        navigator.clipboard.writeText(allLicensesText).then(() => {
            alert('All licenses copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy licenses. Please try again or copy manually.');
        });
    } else {
        alert('No licenses to copy yet. Generate them first!');
    }
}

// Optional: Generate licenses immediately when the page loads
// Uncomment the line below if you want 50 licenses to appear automatically on page load
// window.addEventListener('load', () => {
//     generateAndDisplayLicenses(50);
// });