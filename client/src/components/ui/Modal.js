import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  overflow-y: auto;
  backdrop-filter: blur(2px);
`;

const ModalContainer = styled(motion.div)`
  background-color: ${({ theme }) => theme.surface};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow};
  max-width: ${({ size }) =>
    size === "small" ? "400px" : size === "large" ? "800px" : "600px"};
  width: 100%;
  max-height: calc(100vh - 2rem);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const ModalCloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textSecondary};
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    background-color: ${({ theme }) => `${theme.border}40`};
    color: ${({ theme }) => theme.text};
  }
`;

const ModalContent = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
  color: ${({ theme }) => theme.text};
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.2rem 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 500px) {
    flex-direction: column-reverse;

    button {
      width: 100%;
    }
  }
`;

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "medium", // small, medium, large
  closeOnOverlayClick = true,
}) => {
  const modalRef = useRef(null);

  // Close on escape key
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    // Prevent scrolling on the body when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // Click outside to close
  const handleOverlayClick = (e) => {
    if (
      closeOnOverlayClick &&
      modalRef.current &&
      !modalRef.current.contains(e.target)
    ) {
      onClose();
    }
  };

  // Create portal to render at the end of the body
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
        >
          <ModalContainer
            ref={modalRef}
            size={size}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <ModalHeader>
              <ModalTitle>{title}</ModalTitle>
              <ModalCloseButton onClick={onClose} aria-label="Close">
                <FiX size={20} />
              </ModalCloseButton>
            </ModalHeader>
            <ModalContent>{children}</ModalContent>
            {footer && <ModalFooter>{footer}</ModalFooter>}
          </ModalContainer>
        </ModalOverlay>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
