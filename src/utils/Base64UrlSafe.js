// Define Base64 character set
const base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

// Helper: Convert a string to a Uint8Array
function stringToUint8Array(str) {
    const arr = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
        arr[i] = str.charCodeAt(i);
    }
    return arr;
}

// Helper: Convert a Uint8Array to a string
function uint8ArrayToString(arr) {
    return Array.from(arr)
        .map((byte) => String.fromCharCode(byte))
        .join("");
}

// Base64Url Encoding
export function base64UrlEncode(input) {
    const bytes = stringToUint8Array(input); // Convert string to bytes
    let binary = "";

    // Convert bytes to a binary string
    for (const byte of bytes) {
        binary += byte.toString(2).padStart(8, "0"); // Pad each byte to 8 bits
    }

    let base64 = "";

    // Convert binary string to Base64 string
    for (let i = 0; i < binary.length; i += 6) {
        const chunk = binary.slice(i, i + 6).padEnd(6, "0"); // Take 6 bits at a time
        const index = parseInt(chunk, 2); // Convert 6-bit binary to decimal
        base64 += base64Chars[index]; // Map decimal to Base64 character
    }

    // Add padding if needed
    while (base64.length % 4 !== 0) {
        base64 += "=";
    }

    // Convert Base64 to Base64Url-safe
    return base64
        .replace(/\+/g, "-") // Replace + with -
        .replace(/\//g, "_") // Replace / with _
        .replace(/=+$/, ""); // Remove trailing =
}

// Base64Url Decoding
export function base64UrlDecode(base64Url) {
    // Convert Base64Url-safe to Base64
    let base64 = base64Url
        .replace(/-/g, "+") // Replace - with +
        .replace(/_/g, "/"); // Replace _ with /

    // Add padding if needed
    while (base64.length % 4 !== 0) {
        base64 += "=";
    }

    let binary = "";

    // Convert Base64 string to binary string
    for (const char of base64) {
        if (char === "=") break; // Ignore padding characters
        const index = base64Chars.indexOf(char); // Get decimal value of Base64 character
        binary += index.toString(2).padStart(6, "0"); // Convert to binary and pad to 6 bits
    }

    const bytes = [];

    // Convert binary string to bytes
    for (let i = 0; i < binary.length; i += 8) {
        const byte = binary.slice(i, i + 8); // Take 8 bits at a time
        if (byte.length === 8) {
            bytes.push(parseInt(byte, 2)); // Convert to decimal and push to byte array
        }
    }

    // Convert bytes back to string
    return uint8ArrayToString(new Uint8Array(bytes));
}
