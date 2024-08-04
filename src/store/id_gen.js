

export function generateUniqueId() {
   
    // Helper function to generate a random integer
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    // Generate random values
    const a = getRandomInt(25);
    const b = getRandomInt(600);
    const c = getRandomInt(3250);
    const d = getRandomInt(6000);
    const e = getRandomInt(30);


    // Pad values with leading zeros
    const aStr = a.toString().padStart(2, 'a');
    const bStr = b.toString().padStart(3, 'b');
    const cStr = c.toString().padStart(4, 'c');
    const dStr = d.toString().padStart(4, 'd');
    const eStr = e.toString().padStart(2, 'e');


    // Combine into unique ID
    return `ID-${aStr}${bStr}${cStr}${dStr}${eStr}`;
}
