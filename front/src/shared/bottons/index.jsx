import { Box, Button, Icon } from "@chakra-ui/react";
import { Button3D } from "./Button3D";

export const IconButton = ({ action, children, ...other }) => {
  return (
    <>
      <Button onClick={action} {...other}>
        {children}
      </Button>
    </>
  );
};

export const PlayerButton = ({
  children,
  action,
  primary = false,
  color = "white",
  bg = "white",
  ...other
}) => {
  return (
    <Button
      onClick={action}
      color={color}
      bg={"none"}
      width={primary ? "40px" : "30px"}
      height={primary ? "40px" : "30px"}
      borderRadius={"40px"}
      display={"flex"}
      m={0}
      justifyContent={"center"}
      alignItems={"center"}
      {...other}
    >
      {children}
    </Button>
  );
};

export const DefaultButton = ({ children, action, ...other }) => {
  return (
    <Button
      onClick={action}
      bg={"brand.500"}
      color={"neutral.dark.800"}
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
        color={"neutral.dark.800"}
        _hover={{ background: "brand.600" }}
        width={"100%"}
        fontSize={"14px"}
        fontWeight={400}
        {...other}
      >
        {type === "left" && <Icon as={icon} mr={"6px"} boxSize={size} />}
        {children}
        {type === "right" && <Icon as={icon} ml={"6px"} boxSize={size} />}
      </Button>
    </>
  );
};

export const WalkmanButton = Button3D;
