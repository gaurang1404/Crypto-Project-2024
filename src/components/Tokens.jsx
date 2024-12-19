import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const tokens = [
  { id: 1, name: "Token 1", content: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkdhdXJhbmcgU2hpcm9ka2FyIiwidXNuIjoiMUJNMjJJUzI1NiIsImVtYWlsIjoiZ2F1cmFuZ3JzLmlzMjJAYm1zY2UuYWMuaW4iLCJpYXQiOjE1MTYyMzkwMjJ9.adN2I6kC9pYy6GfOJwhFz9xIrI7_Q-FQ8k5VmstsRn4" },
  { id: 2, name: "Token 2", content: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik5pa2hpbCBTaGFybWEiLCJ1c24iOiIxQk0yMklTMTIxIiwiZW1haWwiOiJuaWtoaWxzaGFybWEuaXMyMkBibXNjZS5hYy5pbiIsImlhdCI6MTUxNjIzOTAyMn0.gf4vBYHY7jcgWlgOQYUDY64leFfPFjIrumZlYF9dhTY" },
  { id: 3, name: "Token 3", content: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik5pa2hpbCBTaW5naCIsInVzbiI6IjFCTTIySVMxMjIiLCJlbWFpbCI6Im5pa2hpbHNpbmdoLmlzMjJAYm1zY2UuYWMuaW4iLCJpYXQiOjE1MTYyMzkwMjJ9.No8WYG8e4Jx74mO4N6fhWilwSXauZvAPfjvnPOHrYqY" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
}

export default function Token() {
  return (
    <section className="py-12 px-4 md:px-6 lg:px-8">
      <motion.div
        className="max-w-7xl mx-auto space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {tokens.map((token) => (
          <motion.div key={token.id} variants={cardVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{token.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className="text-white break-words whitespace-normal overflow-x-auto p-2 bg-gray-700 rounded-md"
                  style={{
                    wordBreak: "break-word",
                  }}
                >
                  {token.content}
                </p>
              </CardContent>

            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

