import { motion } from "framer-motion";

const cards = [
  { title: "Total Loans", value: "1,250" },
  { title: "Pending Loans", value: "320" },
  { title: "Recovered Loans", value: "930" },
  { title: "Recovery Rate", value: "74%" },
];

export default function OverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <motion.div
          whileHover={{ scale: 1.05 }}
          key={index}
          className="glass glow p-6 rounded-2xl card-hover"
        >
          <h2 className="text-gray-300">{card.title}</h2>
          <h1 className="text-4xl font-bold mt-2">
            {card.value}
          </h1>
        </motion.div>
      ))}
    </div>
  );
}