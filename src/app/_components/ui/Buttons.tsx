import { FaPlus } from "react-icons/fa6";
import { BiExit } from "react-icons/bi";
interface props {
  handleClick: () => void;
  icon?:any,
  value:string
}
const PrimaryButton: React.FC<props> = ({ handleClick, value }) => {
  return (
    <button className="bg-[#C3DAFA] w-[98%] px-4 py-2 rounded-[12px] hover:opacity-80 text-[#4565D6] border-[1px] border-[#4565D6]" onClick={handleClick}>
      <div className='flex w-[100%] justify-between items-center'>
       <p>{value}</p>
       <FaPlus fontSize='18px'/> 
      </div>
    </button>
  );
};

export const DangerButton:React.FC<props> = ({handleClick, value}) => {
    return (
        <button className="alignSelf-end bg-transparent w-[98%] px-4 py-2 rounded-[12px] hover:opacity-80 text-red-400 hover:bg-red-400 hover:text-[#1A1B1F]  border-[1px] border-red-400 " onClick={handleClick}>
          <div className='flex w-[100%] justify-between items-center'>
           <p>{value}</p>
           <BiExit fontSize='18px'/> 
          </div>
        </button>
    )
}

export const SmallButton:React.FC<props> = ({handleClick, value}) => {
    return (
        <button className="bg-[#C3DAFA] w-10 px-4 py-2 rounded-[12px] hover:opacity-80 text-[#4565D6] border-[1px] border-[#4565D6]" onClick={handleClick}>
        <div className='flex gap-6  items-center'>
         <p>{value}</p>
         <FaPlus fontSize='18px'/> 
        </div>
      </button>
    )
}


export default PrimaryButton