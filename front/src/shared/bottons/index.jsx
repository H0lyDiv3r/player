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

export const DefaultButton = ({ children, action, ...other }) => {
  return (
    <Button
      onClick={action}
      bg={"brand.500"}
      color={"neutral.200"}
      _hover={{ background: "brand.600" }}
      width={"100%"}
      fontSize={"14px"}
      fontWeight={400}
      {...other}
    >
      {children}
    </Button>
  );
};

export const ButtonIcon = ({
  children,
  action,
  icon,
  size = 4,
  type = "left",
  ...other
}) => {
  return (
    <>
      <Button
        onClick={action}
        bg={"brand.500"}
        color={"neutral.200"}
        _hover={{ background: "brand.600" }}
        width={"100%"}
        fontSize={"14px"}
        fontWeight={400}
        size={"sm"}
        {...other}
      >
        {type === "left" && <Icon as={icon} mr={"6px"} boxSize={size} />}
        {children}
        {type === "right" && <Icon as={icon} ml={"6px"} boxSize={size} />}
      </Button>
    </>
  );
};
