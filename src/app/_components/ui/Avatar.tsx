import Image from "next/image";

interface props {
  image: string | null;
  name: string;
  size:string
}

const Avatar: React.FC<props> = ({ image, name, size }) => {

  console.log (`image url ${image}`)

  if (!image)
    return (  <div className="flex h-[45px] w-[45px] items-center justify-center rounded-md bg-mainPurple text-white">
    <p className='text-white text-sm font-bold'>{name?.substring (0,2)}</p>
  </div>)
  return (
             <img className={` rounded-md ${size}`} src={image!} alt="profile image" />      
  );
};

export default Avatar