"use client";
import {
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { BiSearch } from "react-icons/bi";
import axios from "axios";
import { LoaderIcon } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { modalContext } from "./ui/Modal";
import ui from "../../styles/ui-module.module.css";

interface props {
  coverSetter?: (value: string) => void;
  submitHandler?: () => void;
  cancelHandler?: (value:boolean) =>  void
}

export const SetCover: React.FC<props> = ({ coverSetter, submitHandler , cancelHandler}) => {
  const [covers, setCovers] = useState([]);
  const [input, setInput] = useState("");
  const { onClose } = useContext(modalContext);

  const { data, isLoading } = useQuery({
    queryKey: ["photos"],
    queryFn: async () =>
      axios
        .get(
          `${process.env.NEXT_PUBLIC_UNSPLASH_ENDPOINT}/photos?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`,
        )
        .then((res) => res.data),
    onSuccess: (data: any) => {
      const urls = data.map((photo: any) => photo.urls.small);
      setCovers(urls);
    },
    onError: (error: any) => console.log(error),
  });

  return (
    <div className="flex flex-col max-w-[350px] gap-6 justify-center items-start">
     <input className='input-regular' placeholder="Seach for photos by keyword" />

      {!covers.length ? (
        <LoaderIcon />
      ) : (
        <div
          className='flex flex-wrap gap-2 items-center justify-start'
        >
          {covers.map((cover: string, index: number) => {
            return (
              <Avatar
                onClick={() => coverSetter!(cover)}
                key={index}
                src={cover}
                name="cover"
                size="md"
                _hover={{
                  opacity: 0.8,
                  transform: "scale(1.1)",
                }}
                borderRadius="md"
              />
            );
          })}
        </div>
      )}
      <div className='flex gap-3'>
        {submitHandler ? (
          <button
            onClick={() =>{ 
              submitHandler ();
            }}
            className={`${ui.Grad} mx-auto rounded-full px-4 py-2 text-[#D6E4FC] hover:opacity-80`}
          >
            Change cover
          </button>
        ) : (
          <button className="btn-primary" onClick={() => {
            if (cancelHandler)
              cancelHandler! (false)
            else if (onClose)
              onClose ();
          }}>
            done
          </button>
        )}
      </div>
    </div>
  );
};
