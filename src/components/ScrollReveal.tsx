import React from "react";
import { motion } from "motion/react";

type AnimationVariant = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "scale-up";

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: AnimationVariant;
  duration?: number;
  delay?: number;
  className?: string;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = "fade-up",
  duration = 0.6,
  delay = 0,
  className = "",
  once = true,
}) => {
  const getVariants = () => {
    switch (variant) {
      case "fade-up":
        return {
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        };
      case "fade-down":
        return {
          hidden: { opacity: 0, y: -30 },
          visible: { opacity: 1, y: 0 },
        };
      case "fade-left":
        return {
          hidden: { opacity: 0, x: 30 },
          visible: { opacity: 1, x: 0 },
        };
      case "fade-right":
        return {
          hidden: { opacity: 0, x: -30 },
          visible: { opacity: 1, x: 0 },
        };
      case "zoom-in":
        return {
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1 },
        };
      case "scale-up":
        return {
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1 },
        };
      default:
        return {
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-100px" }}
      variants={getVariants()}
      transition={{ duration, delay, ease: [0.21, 1.02, 0.43, 1.01] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
  delayChildren?: number;
  staggerBy?: number;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = "",
  once = true,
  delayChildren = 0,
  staggerBy = 0.1,
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-100px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren,
            staggerChildren: staggerBy,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps {
  children: React.ReactNode;
  variant?: AnimationVariant;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  variant = "fade-up",
  className = "",
  onClick,
}) => {
  const getVariants = () => {
    switch (variant) {
      case "fade-up":
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 1.02, 0.43, 1.01] } },
        };
      case "fade-down":
        return {
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 1.02, 0.43, 1.01] } },
        };
      case "fade-left":
        return {
          hidden: { opacity: 0, x: 20 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.21, 1.02, 0.43, 1.01] } },
        };
      case "fade-right":
        return {
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.21, 1.02, 0.43, 1.01] } },
        };
      case "zoom-in":
        return {
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.21, 1.02, 0.43, 1.01] } },
        };
      case "scale-up":
        return {
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.21, 1.02, 0.43, 1.01] } },
        };
    }
  };

  return (
    <motion.div variants={getVariants()} className={className} onClick={onClick}>
      {children}
    </motion.div>
  );
};
