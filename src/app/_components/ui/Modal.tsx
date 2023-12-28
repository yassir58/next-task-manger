"use client";
import React, { createContext, useState } from "react";
import { MdSettings } from "react-icons/md";
import { Card } from "./Cards";
import { RxCross1 } from "react-icons/rx";
interface modalContext {
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}
export const modalContext = createContext<modalContext>({});

interface modalWrapperProps {
  variant?: string;
  cardModal: boolean;
  children: React.ReactNode;
  value?: any;
  component?: any;
  title: string;
  size?: string;
  card?: any;
}

const Modal: React.FC<modalWrapperProps> = ({
  variant,
  value,
  size = "sm",
  title,
  children,
  cardModal,
  card,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const sizesMap = new Map();

  sizesMap.set("sm", {w:"350px", h:'auto', maxH:'[650px]'});
  sizesMap.set("md", {w:"450px", h:'auto', maxH:'[650px]'});
  sizesMap.set("lg", {w:"550px", h:'auto', maxH:'[650px]'});
  sizesMap.set("xl", {w:"650px", h:'auto', maxH:'[650px]'});
  sizesMap.set("full", {w:"50vw", h:'[50vh]', maxH:'[60vh]'});


  return (
    <>
      {cardModal ? (
        <div className="" onClick={onOpen}>
          <modalContext.Provider value={{ onClose }}>
            {card}
          </modalContext.Provider>
        </div>
      ) : (
        <button className={`${variant}`} onClick={onOpen}>
          {value}
        </button>
      )}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } fixed left-0 top-0 z-30 flex h-[100vh] w-[100vw] items-center justify-center`}
      >
        <div
          className="left-0 top-0 h-[100vh] w-[100vw]  bg-black/75 "
          onClick={onClose}
        ></div>
        <div className="fixed flex h-[100vh] w-[vw] items-center justify-center">
          <div
            className={`w-[${sizesMap.get(size).w}] max-w-[${sizesMap.get(size).w}] fixed z-50 h-${sizesMap.get(size).h}  max-h-${sizesMap.get(size).maxH} overflow-y-auto rounded-md bg-white px-6 py-3 `}
          >
            <div className="flex w-full items-center justify-between py-4">
              <p className="text-md font-semibold text-black">{title}</p>
              <RxCross1
                className="text-mediumGray hover:scale-105"
                onClick={onClose}
              />
            </div>
            <div className="flex h-auto w-full flex-col pt-6">
              <modalContext.Provider value={{ onClose }}>
                {children}
              </modalContext.Provider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
