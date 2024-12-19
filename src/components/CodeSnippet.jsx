import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Check, Copy } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // Styling
import 'prismjs/components/prism-javascript'; // Ensure JavaScript language is loaded

export default function CodeSnippet({ code, language }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightedCode = Prism.languages[language] 
    ? Prism.highlight(code, Prism.languages[language], language)
    : code; // Fallback if language is invalid

  return (
    <div className="relative">
      <pre className="rounded-lg overflow-x-auto bg-gray-800 p-4">
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
      <motion.div
        className="absolute top-2 right-2 z-20"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button variant="outline" size="icon" onClick={copyToClipboard}>
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </motion.div>
    </div>
  );
}
