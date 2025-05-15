export function convertKNumber(input) {
    if (input === "K67") {
        return "K66";
    } else if (input === "K65" || input === "K64") {
        return "K63";
    }
    return input; 
}