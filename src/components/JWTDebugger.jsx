import React, { useState, useEffect } from 'react';
import { encodeJWT, decodeJWT } from '../utils/jwtUtils';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { verify } from '@/utils/jwtUtils';

export default function JWTDebugger() {
  const [header, setHeader] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
  const [payload, setPayload] = useState('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}');
  const [secret, setSecret] = useState('your-256-bit-secret');
  const [encodedJWT, setEncodedJWT] = useState('');
  const [expectedJWT, setExpectedJWT] = useState('');
  const [error, setError] = useState(null);
  const [syntaxError, setSyntaxError] = useState({
    header: false,
    payload: false,
    secret: false,
  });

  useEffect(() => {
    validateAndUpdate();
  }, [header, payload, secret]);

  const validateJSON = (input) => {
    try {
      JSON.parse(input);
      return true;
    } catch {
      return false;
    }
  };

  const validateAndUpdate = async () => {
    const isHeaderValid = validateJSON(header);
    const isPayloadValid = validateJSON(payload);

    setSyntaxError({
      header: !isHeaderValid,
      payload: !isPayloadValid,
      secret: secret.trim() === '',
    });

    if (!isHeaderValid || !isPayloadValid || secret.trim() === '') {
      setError('Invalid syntax in header, payload, or secret. Please correct them.');
      setExpectedJWT('');
      return;
    }

    try {
      const newEncodedJWT = await encodeJWT(header, payload, secret);
      setExpectedJWT(newEncodedJWT);
      setEncodedJWT(newEncodedJWT);
      setError(null);
    } catch (err) {
      setError('Error encoding JWT. Please check your input.');
      setExpectedJWT('');
    }
  };

  const handleEncodedJWTChange = async (e) => {
    const newEncodedJWT = e.target.value;
    setEncodedJWT(newEncodedJWT);

    if (!expectedJWT) {
      setError('Cannot validate the token because header or payload is invalid.');
      return;
    }

    try {
      const signed = await verify(token, secret);
      if(signed){
        const decoded = await decodeJWT(newEncodedJWT);
        if (decoded) {
          if (newEncodedJWT === expectedJWT) {
            setHeader(JSON.stringify(decoded.header, null, 2));
            setPayload(JSON.stringify(decoded.payload, null, 2));
            setError(null);
          } else {
            setError('The provided token does not match the expected token for the given header and payload.');
          }
        }
      }else{
        setError('The provided token does not match the expected token for the given header and payload.');
      }

    } catch (err) {
      setError('Error decoding JWT. Please check your input.');
    }
  };

  return (
    <div style={{marginTop: "5rem"}}>
      <div className='max-w-7xl m-auto' style={{marginBottom: "5rem"}}>
        <h1 className='text-5xl font-extrabold'>JWT Debugger</h1>
        <p className='mt-2'>Change the header, payload and secret key to check the JWT token generated </p>
      </div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex  max-w-7xl m-auto flex-col md:flex-row gap-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-lg"
      >
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-2xl font-bold text-indigo-700">Decoded</h2>
          <motion.div 
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`p-4 bg-white rounded-lg shadow ${syntaxError.header ? 'border-2 border-red-500' : 'border border-indigo-200'}`}
          >
            <label htmlFor="header" className="block text-sm font-medium text-indigo-600 mb-2">
              HEADER: ALGORITHM & TOKEN TYPE
            </label>
            <Textarea
              style={{color: "black"}}
              id="header"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${syntaxError.header ? 'border-red-500' : ''}`}
              rows={5}
            />
            {syntaxError.header && <p className="text-red-500 text-sm mt-1">Invalid JSON syntax in header.</p>}
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`p-4 bg-white rounded-lg shadow ${syntaxError.payload ? 'border-2 border-red-500' : 'border border-indigo-200'}`}
          >
            <label htmlFor="payload" className="block text-sm font-medium text-indigo-600 mb-2">
              PAYLOAD: DATA
            </label>
            <Textarea
              id="payload"
              style={{color: "black"}}
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
              className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${syntaxError.payload ? 'border-red-500' : ''}`}
              rows={8}
            />
            {syntaxError.payload && <p className="text-red-500 text-sm mt-1">Invalid JSON syntax in payload.</p>}
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`p-4 bg-white rounded-lg shadow ${syntaxError.secret ? 'border-2 border-red-500' : 'border border-indigo-200'}`}
          >
            <label htmlFor="secret" className="block text-sm font-medium text-indigo-600 mb-2">
              VERIFY SIGNATURE
            </label>
            <Textarea
              id="secret"
              style={{color: "black"}}
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${syntaxError.secret ? 'border-red-500' : ''}`}
              rows={2}
            />
            {syntaxError.secret && <p className="text-red-500 text-sm mt-1">Secret cannot be empty.</p>}
          </motion.div>
        </div>
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-2xl font-bold text-indigo-700">Encoded</h2>
          <motion.div 
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-4 bg-white rounded-lg shadow border border-indigo-200"
          >
            <label htmlFor="encoded" className="block text-sm font-medium text-indigo-600 mb-2">
              ENCODED JWT
            </label>
            <Textarea
            style={{color: "black"}}
              id="encoded"
              value={encodedJWT}
              onChange={handleEncodedJWTChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows={8}
            />
          </motion.div>
          <Button 
          style={{backgroundColor: "#262e3c"}}
            onClick={validateAndUpdate}
            className="w-full bg-blue-900 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-103"
          >
            Encode JWT
          </Button>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
            >
              {error}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

