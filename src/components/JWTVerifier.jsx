'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { verify } from '@/utils/jwtUtils';

export default function JWTVerifier() {
  const [token, setToken] = useState('');
  const [secret, setSecret] = useState('');
  const [result, setResult] = useState();
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    setIsVerifying(true);
    try {
      const verificationResult = await verify(token, secret);
      setResult(verificationResult);
    } catch (error) {
      setResult({ valid: false, payload: { error: 'Invalid token or secret' } });
    }
    setIsVerifying(false);
  };

  return (
    <div>
      <div className='max-w-7xl m-auto' style={{ marginTop: "-2rem", marginBottom: "3rem" }}>
        <h1 className='text-5xl font-extrabold'>Dummy Tokens</h1>
        <p className='mt-2'>Use these tokens to decode the payload using the Verifier below </p>
      </div>

      <div className="min-h-screen max-w-7xl m-auto bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl"
        >
          <h1 className="text-3xl font-bold mb-6 text-gray-800">JWT Verifier</h1>
          <div className="space-y-4">
            <div>
              <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-1">
                JWT Token
              </label>
              <Textarea
                style={{ color: "black" }}
                id="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter your JWT token here"
                className="h-32"
              />
            </div>
            <div>
              <label htmlFor="secret" className="block text-sm font-medium text-gray-700 mb-1">
                Secret Key
              </label>
              <Input
                id="secret"
                style={{ color: "black" }}
                type="text"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="Enter your secret key"
              />
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleVerify}
                style={{ color: "white", backgroundColor: "#141c2b" }}
                disabled={isVerifying || !token || !secret}
                className="w-full"
              >
                {isVerifying ? 'Verifying...' : 'Verify Token'}
              </Button>
            </motion.div>
          </div>
          {result && (
            <motion.div
              style={{ color: "black" }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <h2 className="text-xl font-semibold mb-2">
                {result.valid ? 'Valid Token' : 'Invalid Token'}
              </h2>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-64">
                {JSON.stringify(result.payload, null, 2)}
              </pre>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
