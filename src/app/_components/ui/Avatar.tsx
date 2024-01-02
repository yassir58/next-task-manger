import Image from "next/image";

interface props {
  image: string | null;
  name: string;
}

const Avatar: React.FC<props> = ({ image, name }) => {

  console.log (`image url ${image}`)
  return (
    <>
      {/* {(image && image.length > 0 && image !== undefined) ? (
        <Image width={45} height={45} src={image} alt="profile image" />
      ) : ( */}
        <div className="flex h-[45px] w-[45px] items-center justify-center rounded-md bg-mainPurple text-white">
          <p className='text-white text-sm font-bold'>{name?.substring (0,2)}</p>
        </div>
      {/* )} */}
    </>
  );
};

export default Avatar