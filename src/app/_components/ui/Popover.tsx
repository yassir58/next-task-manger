import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";

interface props {
  variant: string;
  value: any;
  children: React.ReactNode;
  title: string;
  position: string;
  header?:boolean
}
const Popover: React.FC<props> = ({
  variant,
  value,
  children,
  title,
  position,
  header = false
}) => {
  const [visible, setVisible] = useState(false);
  const positionMap = new Map();

  positionMap.set("top", "-top-48 left-6");
  positionMap.set("bottom", "top-10 -left-60");

  const onClose = () => setVisible(false);
  const onOpen = () => setVisible(true);

  return (
    <div>
      <div
        className={`absolute z-50 left-0 top-0 h-[100vh] w-[100vw] bg-black/10 ${
          visible ? "block" : "hidden"
        }`}
        onClick={onClose}
      ></div>
      <div className="relative">
        <button className={variant} onClick={onOpen}>
          {value}
        </button>
        <div
          className={`popover ${
            visible ? "flex" : "hidden"
          } absolute z-50 flex-col gap-4 rounded-md bg-white px-4 pb-4 pt-2 shadow-lg ${positionMap.get(
            position,
          )}  max-h-[500px] min-w-[300px] overflow-y-auto`}
        >
         {header ? <div className="flex w-full items-center justify-between py-4">
            <p className="text-md font-semibold text-black">{title}</p>
            <RxCross1
              className="text-mediumGray hover:scale-105"
              onClick={onClose}
            />
          </div> : ''}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Popover;
