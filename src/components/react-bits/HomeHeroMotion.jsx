"use client";

/**
 * Entrance motion inspired by React Bits patterns (https://reactbits.dev) — staggered fade-up via Framer Motion.
 */
import Link from "next/link";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HomeHeroMotion() {
  return (
    <motion.section
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-black via-zinc-900 to-pink-700 px-6 py-14 text-white md:px-12"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-pink-500/25 blur-3xl" aria-hidden />
      <motion.p
        variants={item}
        className="relative text-sm uppercase tracking-[0.25em] text-pink-200"
      >
        Sonia Dresses Collection
      </motion.p>
      <motion.h1
        variants={item}
        className="relative mt-4 max-w-2xl text-4xl font-black leading-tight md:text-6xl"
      >
        Fashion-first styles inspired by global trends.
      </motion.h1>
      <motion.p variants={item} className="relative mt-4 max-w-xl text-sm text-zinc-100 md:text-base">
        Discover bold new drops, festive must-haves, and timeless picks designed to make everyday dressing easy.
      </motion.p>
      <motion.div variants={item} className="relative mt-7 flex flex-wrap gap-3">
        <Link
          href="/category/Women"
          className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-zinc-100"
        >
          Shop Women
        </Link>
        <Link
          href="/category/Kids"
          className="rounded-full border border-white/40 px-5 py-2 text-sm font-semibold transition hover:bg-white/10"
        >
          Shop Kids
        </Link>
      </motion.div>
    </motion.section>
  );
}
