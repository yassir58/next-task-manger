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
    Button,
    EditableInput,
    Editable
  } from '@chakra-ui/react'
import { Card } from "./Cards";
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
    buttonWidth?:string
}

export const ModalWrapper:React.FC<modalWrapperProps> = ({children,size='sm', variant, value, title, buttonWidth})=> {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Button w={buttonWidth} variant={variant} onClick={onOpen}>{value}</Button>
  
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


interface ModalCardWrapperProps {
  task:Task
  children:React.ReactNode
}

export const ModalCardWrapper:React.FC<ModalCardWrapperProps> = ({task, children}) =>{
  const {isOpen, onOpen, onClose} = useDisclosure ()
  return (<>
    <div onClick={onOpen} className="bg-gradient-to-r from-[#B06AB3] to-[#4568DC] rounded-[8px] hover:px-[1px] hover:py-[1px] hover:opacity-80">
    <Card task={task}/>
    </div>
    <Modal  isOpen={isOpen} onClose={onClose} size={'3xl'} >
          <ModalOverlay />
          <ModalContent bgColor={'#2A2D32'}>
            <ModalHeader color={'#D6E4FC'}>
              <Editable>
              <EditableInput value={task!.content} />
              </Editable>
            </ModalHeader>
            <ModalCloseButton color={'#C4C1BB'}/>
            <ModalBody>
                <modalContext.Provider value={{isOpen, onOpen, onClose}}>
                {children}
                </modalContext.Provider>
            </ModalBody>
          </ModalContent>
        </Modal>
  </>)
}