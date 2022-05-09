import { FC, MouseEvent } from "react";
import { IPost } from "../models/IPost";
import { Tr, Td, Button, Tooltip } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

interface PostItemProps {
  post: IPost;
  remove: (post: IPost) => void;
  update: (post: IPost) => void;
}

export const PostItem: FC<PostItemProps> = ({ post, remove, update }) => {
  const handleDelete = (event: MouseEvent) => {
    event.stopPropagation();
    remove(post);
  };

  const handleUpdate = (event: MouseEvent) => {
    event.stopPropagation();
    const title = prompt("Update title") || "";
    if (title) update({ ...post, title });
  };

  return (
    <Tr>
      <Td>{post.id}</Td>
      <Td>{post.title}</Td>
      <Td>
        <Tooltip label="Update post">
          <Button
            colorScheme="orange"
            iconSpacing={0}
            leftIcon={<EditIcon />}
            onClick={handleUpdate}
          />
        </Tooltip>
      </Td>
      <Td>
        <Tooltip label="Delete post">
          <Button
            colorScheme="red"
            iconSpacing={0}
            rightIcon={<DeleteIcon />}
            onClick={handleDelete}
          />
        </Tooltip>
      </Td>
    </Tr>
  );
};
