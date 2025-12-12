function convert() {
    let num = document.getElementById("amount").value;
    document.getElementById("output").innerText = numberToWords(num);
}

// Word mappings
const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
              "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
              "seventeen", "eighteen", "nineteen"];

const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy",
              "eighty", "ninety"];

function numToWords(n) {
    let str = "";
    if (n > 19) {
        str += tens[Math.floor(n / 10)];
        if (n % 10 !== 0) str += " " + ones[n % 10];
    } else {
        str += ones[n];
    }
    return str;
}

function numberToWords(num) {

    if (!num) return "";

     // Split rupees and cents
    let parts = num.toString().split(".");
    let rupees = parseInt(parts[0]);
    let cents = parts[1] ? parts[1].substring(0, 2).padEnd(2, "0") : null;

    let n = rupees;

    if (n === 0 && !cents) return "zero rupees only.";

    let result = "";

    let billion = Math.floor(n / 1000000000);
    n %= 1000000000;

    let million = Math.floor(n / 1000000);
    n %= 1000000;

    let thousand = Math.floor(n / 1000);
    n %= 1000;

    let hundred = Math.floor(n / 100);
    n %= 100;

    if (billion) result += convertBelowThousand(billion) + " billion ";
    if (million) result += convertBelowThousand(million) + " million ";
    if (thousand) result += convertBelowThousand(thousand) + " thousand ";
    if (hundred) result += ones[hundred] + " hundred ";

    // Convert last two digits
    if (n > 0) {
        result += numToWords(n) + " ";
    }

    // Handle cents
    if (cents && parseInt(cents) > 0) {
        let centsWords = numToWords(parseInt(cents));
        result += "rupees and " + centsWords + " cents";
    } else {
        result = result.trim() + " rupees";
    }

    return result;
    // if (n > 0) {
    //     if (result !== "" && hundred > 0) result += "and ";
    //     result += numToWords(n) + " ";
    // }

    //return result.trim() + " rupees only.";
}

// Helper to convert numbers below 1000
function convertBelowThousand(n) {
    let str = "";

    let hundred = Math.floor(n / 100);
    let rest = n % 100;

    if (hundred > 0) {
        str += ones[hundred] + " hundred ";
    }

    if (rest > 0) {
        str += numToWords(rest);
    }
    return str.trim();
}


// Copy to clipboard function
function copyText() {
    const text = document.getElementById("output").innerText;
    if (!text) return;

    navigator.clipboard.writeText(text)
        .then(() => alert("Copied to clipboard"))
        .catch(() => alert("Failed to copy"));
    }

// End of copy to clipboard function
document.addEventListener("DOMContentLoaded", function () {
    const amt = document.getElementById("amount");

    amt.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            convert();
            copyText();
        }
    });
});