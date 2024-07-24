import React from 'react';
import { motion } from 'framer-motion';

function CombinedEventSVG() {
  return (
    <svg
      width="600"
      height="400"
      viewBox="0 0 600 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Calendar Background */}
      <motion.rect
        x="50"
        y="100"
        width="500"
        height="300"
        rx="40"
        fill="none"
        stroke="black"
        strokeWidth="6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      />
      
      {/* Calendar Header */}
      <motion.rect
        x="45"
        y="40"
        rx="19"
        width="500"
        height="50"
        fill="black"
        initial={{ x: -600 }}
        animate={{ x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.text
        x="300"
        y="80"
        textAnchor="middle"
        fill="white"
        fontSize="45"
        fontWeight="bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        Event Calendar
      </motion.text>
      
      {/* Animated Event Dots */}
      {Array.from({ length: 7 }).map((_, i) => {
        const angle = (i * 360) / 7;
        const x = 300 + 150 * Math.cos((angle * Math.PI) / 180);
        const y = 240 + 100 * Math.sin((angle * Math.PI) / 180);
        const delay = i * 0.2;

        return (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="20"
            fill="black"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, delay: delay, repeat: Infinity, repeatType: 'loop' }}
          />
        );
      })}

      {/* Animated Event Icons */}
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i * 360) / 5;
        const x = 300 + 100 * Math.cos((angle * Math.PI) / 180);
        const y = 240 + 70 * Math.sin((angle * Math.PI) / 180);
        const delay = 1 + i * 0.3;

        return (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="16"
            fill="black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: delay, repeat: Infinity, repeatType: 'loop' }}
          />
        );
      })}

      {/* Spinner Animation */}
      <motion.circle
        cx="300"
        cy="320"
        r="30"
        fill="none"
        stroke="teal"
        strokeWidth="6"
        strokeDasharray="189"
        strokeDashoffset="189"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, repeatType: 'loop' }}
      />

      {/* Animated Loader Text */}
      <motion.text
        x="300"
        y="390"
        textAnchor="middle"
        fill="black"
        fontSize="30"
        fontWeight="bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        Managing Events...
      </motion.text>
    </svg>
  );
}

function Home() {
  return (
    <div className="h-screen w-full">
      <section className="bg-white flex flex-col justify-center items-center h-full align-middle dark:bg-gray-900">
        <CombinedEventSVG />
        <motion.div
          className="py-8 px-4 mx-auto max-w-screen-l text-center lg:py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-black"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Welcome to EventMaster
          </motion.h1>
          <motion.p
            className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            EventMaster is your go-to solution for managing events efficiently.
            Plan, organize, and execute events seamlessly with EventMaster.
          </motion.p>

          <motion.div
            className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >

          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

export default Home;
