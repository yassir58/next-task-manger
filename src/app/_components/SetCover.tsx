"use client";
import {
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Avatar,
  Button
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { BiSearch } from "react-icons/bi";
import axios from "axios";
import { LoaderIcon } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { modalContext } from "./ui/Modal";

interface props {
  coverSetter?: (value: string) => void;
}

export const SetCover: React.FC<props> = ({ coverSetter }) => {
  const [covers, setCovers] = useState([]);
  const [input, setInput] = useState("");
  const {onClose} = useContext (modalContext)

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
    <Stack justifyContent={"center"} alignItems="center" spacing={4}>
      <InputGroup>
        <Input variant="regular" placeholder="search for covers" />
        <InputRightElement>
          <BiSearch color="gray.500" />
        </InputRightElement>
      </InputGroup>

      {!covers.length ? (
        <LoaderIcon />
      ) : (
        <HStack
          flexWrap={"wrap"}
          spacing={2}
          alignItems="center"
          justifyContent={"center"}
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
        </HStack>
      )}
      <HStack spacing={4} w='100%'>
        <button className="btn-primary" onClick={onClose}>done</button>
      </HStack>
    </Stack>
  );
};
