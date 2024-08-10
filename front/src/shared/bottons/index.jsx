import { Button, Icon } from "@chakra-ui/react";
import { FaRepeat } from "react-icons/fa6";

export const IconButton = ({ action, icon, size = 4, ...other }) => {
  return (
    <>
      <Button onClick={action} {...other}>
        <Icon as={icon} boxSize={size} />
      </Button>
    </>
  );
};
