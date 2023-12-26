import Image from "next/image";

interface props {
  image: string | null;
  name: string;
}

const Avatar: React.FC<props> = ({ image, name }) => {
  return (
    <>
      {image ? (
        <Image src={image} alt="profile image" />
      ) : (
        <div className="flex h-[45px] w-[45px] items-center justify-center rounded-md bg-mainPurple text-white">
          <p className='text-white text-sm font-bold'>{name?.substring (0,2)}</p>
        </div>
      )}
    </>
  );
};

export default Avatar