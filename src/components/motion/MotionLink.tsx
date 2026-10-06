"use client";

import Link from "next/link";
import { motion } from "motion/react";

/** next/link yang bisa memakai gesture Motion (whileHover / whileTap) */
const MotionLink = motion.create(Link);
export default MotionLink;
