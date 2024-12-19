import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

export default function Navigation({ scrollTo, debuggerRef, codeRef, verifierRef }) {
  return (
    <motion.nav
      className="fixed top-0 pl-10 pr-10 m-auto left-0 right-0 bg-gray-900 bg-opacity-90 backdrop-blur-sm z-10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.h1
          className="text-2xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          JWT Auth
        </motion.h1>
        <div className="space-x-4">
          <Button variant="ghost" onClick={() => scrollTo(debuggerRef)}>Debugger</Button>
          <Button variant="ghost" onClick={() => scrollTo(verifierRef)}>Verifier</Button> {/* Add this button */}
          <Button variant="ghost" onClick={() => scrollTo(codeRef)}>Code</Button>
        </div>
      </div>
    </motion.nav>
  );
}
