import { base64UrlEncode, base64UrlDecode } from "./Base64UrlSafe.js";
// import { createHmacSignature } from "./HmacSignature.js";
// Function to create HMAC SHA-256 signature

async function createHmacSignature(key, message) {
    const encoder = new TextEncoder();
    const cryptoKey = await crypto.subtle.importKey(
        "raw",
        encoder.encode(key),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );

    const signature = await crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(message));
    return base64UrlEncode(String.fromCharCode(...new Uint8Array(signature)));
}

// Function to create a JWT token
export async function createToken(header, payload, secret) {  
    const base64Header = base64UrlEncode(JSON.stringify(header));
    const base64Payload = base64UrlEncode(JSON.stringify(payload));
    const unsignedToken = `${base64Header}.${base64Payload}`;
    const signature = await createHmacSignature(secret, unsignedToken);
    return `${unsignedToken}.${signature}`;
}

// Function to verify a JWT token
export async function verifyToken(token, secret) {
    const [header, payload, signature] = token.split(".");
    if (!header || !payload || !signature) {
        throw new Error("Invalid token format");
    }
    const unsignedToken = `${header}.${payload}`;
    const expectedSignature = await createHmacSignature(secret, unsignedToken);

    if (signature !== expectedSignature) {
        throw new Error("Invalid token signature");
    }
    return JSON.parse(base64UrlDecode(payload));
}

// Function to decode a JWT token (without verifying the signature)
export async function decodeToken(token) {
    const [header, payload] = token.split(".");
    if (!header || !payload) {
        throw new Error("Invalid token format");
    }
    return {
        header: JSON.parse(base64UrlDecode(header)),
        payload: JSON.parse(base64UrlDecode(payload)),
    };
}

// Example usage
// (async () => {
//     const secret = "my_secret_key";
//     const payload = {
//         userId: 123,
//         username: "john_doe",
//         exp: Date.now() + 3600000
//     };

//     const token = await createToken(payload, secret);
//     console.log("Generated Token:", token);

//     try {
//         const verifiedPayload = await verifyToken(token, secret);
//         console.log("Verified Payload:", verifiedPayload);
//     } catch (error) {
//         console.error("Verification Failed:", error.message);
//     }

//     const decoded = decodeToken(token);
//     console.log("Decoded Token:", decoded);
// })();
