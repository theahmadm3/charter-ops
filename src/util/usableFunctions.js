// Function to capitalize the first letter of a string using regex
function capitalise(str) {
    if (!str) return '';
    return str.replace(/^./, char => char.toUpperCase());
}

// Export the function
export { capitalise };
