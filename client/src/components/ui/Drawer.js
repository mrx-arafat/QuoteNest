import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useThemeContext } from "../../context/ThemeContext";

const DrawerOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: stretch;
`;

const DrawerContainer = styled(motion.div)`
  position: relative;
  width: 280px;
  max-width: 80%;
  height: 100%;
  background: ${({ theme }) => (theme === "dark" ? "#1a1a1a" : "#ffffff")};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const DrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid
    ${({ theme }) => (theme === "dark" ? "#333333" : "#e5e5e5")};
`;

const DrawerTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#333333")};
  font-size: 1.5rem;
`;

const CloseButton = styled(motion.button)`
  background: transparent;
  border: none;
  color: ${({ theme }) => (theme === "dark" ? "#b1b1b1" : "#666666")};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

const DrawerContent = styled.div`
  flex: 1;
`;

const DrawerFooter = styled.div`
  padding-top: 15px;
  margin-top: auto;
  border-top: 1px solid
    ${({ theme }) => (theme === "dark" ? "#333333" : "#e5e5e5")};
  color: ${({ theme }) => (theme === "dark" ? "#999999" : "#777777")};
  font-size: 0.9rem;
`;

// Animation variants
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const drawerVariants = {
  hidden: { x: "-100%" },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: { x: "-100%", transition: { duration: 0.3 } },
};

const Drawer = ({
  isOpen,
  onClose,
  title = "Menu",
  children,
  footer,
  position = "left", // 'left' or 'right'
}) => {
  const { theme } = useThemeContext();

  // Close drawer on escape key press
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    // Lock body scroll when drawer is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Adjust variants based on position
  const dynamicDrawerVariants = {
    ...drawerVariants,
    hidden: { x: position === "right" ? "100%" : "-100%" },
    exit: {
      x: position === "right" ? "100%" : "-100%",
      transition: { duration: 0.3 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <DrawerOverlay
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
          onClick={onClose}
        >
          <DrawerContainer
            theme={theme}
            variants={dynamicDrawerVariants}
            onClick={(e) => e.stopPropagation()}
            style={{
              marginLeft: position === "right" ? "auto" : 0,
              marginRight: position === "left" ? "auto" : 0,
            }}
          >
            <DrawerHeader theme={theme}>
              <DrawerTitle theme={theme}>{title}</DrawerTitle>
              <CloseButton
                theme={theme}
                onClick={onClose}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: theme === "dark" ? "#333333" : "#f0f0f0",
                }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes />
              </CloseButton>
            </DrawerHeader>

            <DrawerContent>{children}</DrawerContent>

            {footer && <DrawerFooter theme={theme}>{footer}</DrawerFooter>}
          </DrawerContainer>
        </DrawerOverlay>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
