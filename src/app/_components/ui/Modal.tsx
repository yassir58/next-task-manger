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
    Button
  } from '@chakra-ui/react'
interface modalContext {
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}
export const modalContext = createContext<modalContext>({});

interface modalWrapperProps {
    variant:string 
    children:React.ReactNode,
    value:any
    title:string
    size?:string
}

export const ModalWrapper:React.FC<modalWrapperProps> = ({children,size='sm', variant, value, title})=> {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Button variant={variant} onClick={onOpen}>{value}</Button>
  
        <Modal  isOpen={isOpen} onClose={onClose} size={size} >
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


