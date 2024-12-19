import {motion} from "framer-motion"
import { Button } from "./ui/button";
import { ArrowRightIcon } from "lucide-react";

function JWTHero() {
  return (
    <section className="w-full max-w-7xl m-auto py-12 md:py-24 lg:py-32 xl:py-48 bg-[#17202e] text-white overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-6xl font-bold tracking-tighter sm:text-7xl md:text-8xl/none">
              JWT
            </h1>
            <p className="text-xl text-zinc-200 md:text-2xl mt-2">
              Secure Authentication for Modern Web Applications
            </p>
          </motion.div>
          <motion.p
            className="max-w-[700px] text-zinc-400 md:text-xl dark:text-zinc-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            JSON Web Tokens (JWT) provide a compact and self-contained way for securely transmitting information between parties as a JSON object.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button size="lg" className="bg-white text-black hover:bg-zinc-200">
              Get Started
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black"
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default JWTHero;
