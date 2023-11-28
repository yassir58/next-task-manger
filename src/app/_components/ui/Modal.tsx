'use client'
import React, { createContext } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
  } from '@chakra-ui/react'
interface modalContext {
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}
export const modalContext = createContext<modalContext>({});

interface modalWrapperProps {
    styles:string 
    children:React.ReactNode,
    value:any
    title:string
}

export const ModalWrapper:React.FC<modalWrapperProps> = ({children, styles, value, title})=> {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <button className={styles} onClick={onOpen}>{value}</button>
  
        <Modal  isOpen={isOpen} onClose={onClose} size={'xs'} >
          <ModalOverlay />
          <ModalContent bgColor={'#2A2D32'}>
            <ModalHeader color={'#D6E4FC'}>{title}</ModalHeader>
            <ModalCloseButton color={'#C4C1BB'}/>
            <ModalBody>
                <modalContext.Provider value={{isOpen, onOpen, onClose}}>
                {children}
                </modalContext.Provider>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }


