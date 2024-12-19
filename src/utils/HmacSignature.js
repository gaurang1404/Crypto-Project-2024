import { base64UrlEncode } from "./Base64UrlSafe.js";

// Define SHA-256 hash function (You can replace this with your own implementation or use a library)
async function sha256(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    // Perform hashing using subtle.crypto
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return new Uint8Array(hashBuffer);
}

// Helper: XOR two Uint8Arrays
function xorBuffers(buffer1, buffer2) {
    const result = new Uint8Array(buffer1.length);
    for (let i = 0; i < buffer1.length; i++) {
        result[i] = buffer1[i] ^ buffer2[i];
    }
    return result;
}

// Helper: Convert a string to Uint8Array
function stringToUint8Array(str) {
    const encoder = new TextEncoder();
    return encoder.encode(str);
}

// Helper: Convert Uint8Array to string
function uint8ArrayToString(array) {
    return Array.from(array)
        .map((byte) => String.fromCharCode(byte))
        .join("");
}

// Self-defined Base64Url Encoding


// Main HMAC-SHA256 Implementation
export async function createHmacSignature(key, message) {
    const blockSize = 64; // Block size for SHA-256 is 64 bytes
    const hashSize = 32;  // Output size of SHA-256 is 32 bytes

    // Step 1: Convert key and message to Uint8Array
    let keyBytes = stringToUint8Array(key);
    const messageBytes = stringToUint8Array(message);

    // Step 2: If the key length is greater than block size, hash the key
    if (keyBytes.length > blockSize) {
        keyBytes = await sha256(uint8ArrayToString(keyBytes));
    }

    // Step 3: If the key length is less than block size, pad it with zeros
    if (keyBytes.length < blockSize) {
        const paddedKey = new Uint8Array(blockSize);
        paddedKey.set(keyBytes);
        keyBytes = paddedKey;
    }

    // Step 4: Create ipad and opad by XORing the key with 0x36 and 0x5C respectively
    const ipad = xorBuffers(keyBytes, new Uint8Array(blockSize).fill(0x36));
    const opad = xorBuffers(keyBytes, new Uint8Array(blockSize).fill(0x5C));

    // Step 5: Perform HMAC computation
    // Inner hash: hash((key ⊕ ipad) || message)
    const innerHashInput = uint8ArrayToString(ipad) + uint8ArrayToString(messageBytes);
    const innerHash = await sha256(innerHashInput);

    // Outer hash: hash((key ⊕ opad) || innerHash)
    const outerHashInput = uint8ArrayToString(opad) + uint8ArrayToString(innerHash);
    const outerHash = await sha256(outerHashInput);

    // Step 6: Return the Base64Url encoded signature
    return base64UrlEncode(uint8ArrayToString(outerHash));
}

// Example Usage
// (async () => {
//     const key = "my-secret-key";
//     const message = "Hello, HMAC!";
//     const signature = await createHmacSignature(key, message);
//     console.log("HMAC-SHA256 Signature:", signature);
// })();
