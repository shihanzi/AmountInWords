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

    let n = parseInt(num);

    if (n === 0) return "zero rupess only";

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
    if (n > 0) {
        if (result !== "" && hundred > 0) result += "and ";
        result += numToWords(n) + " ";
    }

    return result.trim() + " rupees only.";
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