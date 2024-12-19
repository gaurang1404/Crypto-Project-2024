import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from './Navigation';
import CodeSnippet from './CodeSnippet';
import JWTDebugger from './JWTDebugger';
import JWTVerifier from './JWTVerifier';
import Hero from './Hero';
import Token from './Tokens';
import Footer from './Footer';

export default function Home() {
  const debuggerRef = useRef(null);
  const codeRef = useRef(null);
  const verifierRef = useRef(null); // Add this reference for the JWT Verifier

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const codes = [
    {
      name: "Encode Token",
      code: `
export async function createToken(header, payload, secret) {  
    const base64Header = base64UrlEncode(JSON.stringify(header));
    const base64Payload = base64UrlEncode(JSON.stringify(payload));
    const unsignedToken = '$ {base64Header}.$ {base64Payload}';
    const signature = await createHmacSignature(secret, unsignedToken);
    return '$ {unsignedToken}.$ {signature}';
}`
    },
    {
      name: "Decode Token",
      code: `
export async function decodeToken(token) {
    const [header, payload] = token.split(".");
    if (!header || !payload) {
        throw new Error("Invalid token format");
    }
    return {
        header: JSON.parse(base64UrlDecode(header)),
        payload: JSON.parse(base64UrlDecode(payload)),
    };
}`
    },
    {
      name: "Verify Token",
      code: `
export async function verifyToken(token, secret) {
    const [header, payload, signature] = token.split(".");
    if (!header || !payload || !signature) {
        throw new Error("Invalid token format");
    }
    const unsignedToken = '$ {header}.$ {payload}';
    const expectedSignature = await createHmacSignature(secret, unsignedToken);

    if (signature !== expectedSignature) {
        throw new Error("Invalid token signature");
    }
    return JSON.parse(base64UrlDecode(payload));
}`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Navigation scrollTo={scrollTo} debuggerRef={debuggerRef} codeRef={codeRef} verifierRef={verifierRef} /> {/* Pass verifierRef */}

      <main className="container mx-auto px-4 py-16">
        <Hero />
        <motion.section
          ref={debuggerRef}
          className="mb-16"
          {...fadeInUp}
        >
          <JWTDebugger />
          <div className='max-w-7xl m-auto' style={{ marginTop: "5rem" }}>
            <h1 className='text-5xl font-extrabold'>Dummy Tokens</h1>
            <p className='mt-2'>Use these tokens to decode the payload using the Verifier below </p>
          </div>
          <Token />
        </motion.section>
        <motion.section
          ref={verifierRef} // Add ref for JWT Verifier
          className="mb-16"
          {...fadeInUp}
        >
          <JWTVerifier />
        </motion.section>
        <motion.section
          ref={codeRef}
          className="mb-16"
          {...fadeInUp}
        >
          {codes.map((c, index) => (
            <div key={index}>
              <h2 className="max-w-7xl m-auto text-4xl font-bold mb-8">{c.name}</h2>
              <Card className="max-w-7xl m-auto mb-6 bg-gray-800 p-6">
                <CodeSnippet code={c.code} language="javascript" />
              </Card>
            </div>
          ))}
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
