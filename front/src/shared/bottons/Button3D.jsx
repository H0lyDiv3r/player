import { Box, Button, Icon } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa6";
import colors from "../../themes/colors";

export const Button3D = ({
  children,
  height = 50,
  width = 50,
  depth = "4px",
  direction,
  disabled,
  action,
}) => {
  const styles = (dxn) => {
    switch (dxn) {
      case "down":
        return { borderBottomRadius: `${width}px` };
      case "up":
        return { borderTopRadius: `${width}px` };
      case "left":
        return { borderLeftRadius: `${width}px` };
      case "right":
        return { borderRightRadius: `${width}px` };
      default:
        return { borderRadius: `${width}px` };
    }
  };

  return (
    <>
      <Box
        bg={"transparent"}
        display={"flex"}
        alignItems={"center"}
        bgImage={"linear-gradient(145deg,brand.800,brand.500)"}
        boxShadow={`inset -1px -1px 5px ${colors.brand[300]},inset 1px 1px 5px ${colors.brand[900]}`}
        width={"fit-content"}
        height={"fit-content"}
        minH={"0px"}
        p={depth}
        mx={"4px"}
        {...styles(direction)}
      >
        <Button
          onClick={action}
          height={`${height}px`}
          width={`${width}px`}
          minW={"0px"}
          minH={"0px"}
          p={"0px"}
          m={"0px"}
          bg={"transparent"}
          // borderRadius={`${width / 2}px`}
          bgImage={`linear-gradient(145deg,brand.500,brand.600)`}
          boxShadow={`inset 0px 0px 1px 1px ${colors.brand[900]},
            inset -2px -2px 3px 2px ${colors.brand[700]},
            inset 3px 3px 2px ${colors.brand[100]}`}
          _hover={{
            bgImage: `linear-gradient(145deg,brand.500,brand.600)`,
            boxShadow: `inset 0px 0px 1px 1px ${colors.brand[800]},
            inset -2px -2px 3px 2px ${colors.brand[700]},
            inset 3px 3px 2px ${colors.brand[100]}`,
          }}
          _active={{
            bgImage: `linear-gradient(145deg,brand.500,brand.600)`,
            boxShadow: `inset 0px 0px 1px 2px ${colors.brand[900]},
            inset -2px -2px 3px 2px ${colors.brand[700]},
            inset 3px 3px 2px ${colors.brand[100]}`,
          }}
          _disabled={{
            bgImage: `linear-gradient(145deg,brand.500,brand.600)`,
            boxShadow: `inset 0px 0px 1px 2px ${colors.brand[700]},
            inset -1px -1px 3px 2px ${colors.brand[600]},
            inset 1px 1px 2px ${colors.brand[300]}`,
            color: "brand.800",
          }}
          isDisabled={disabled}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          {...styles(direction)}
        >
          {children}
        </Button>
      </Box>
    </>
  );
};

// export const DirectionalButton3D = ({
//   children,
//   height = 50,
//   width = 50,
//   depth = "4px",
//   direction,
//   action,
// }) => {
//   return (
//     <>
//       <Box
//         bg={"transparent"}
//         display={"flex"}
//         alignItems={"center"}
//         bgImage={"linear-gradient(145deg,brand.800,brand.500)"}
//         boxShadow={`inset -1px -1px 5px ${colors.brand[300]},inset 1px 1px 5px ${colors.brand[900]}`}
//         width={"fit-content"}
//         height={"fit-content"}
//         minH={"0px"}
//         p={depth}
//         // borderRadius={`${height}px`}

//         mx={"4px"}
//         {...styles(direction)}
//       >
//         <Button
//           onClick={action}
//           height={`${height}px`}
//           width={`${width}px`}
//           minW={"0px"}
//           minH={"0px"}
//           p={"0px"}
//           m={"0px"}
//           bg={"transparent"}
//           // borderRadius={`${width / 2}px`}

//           bgImage={`linear-gradient(145deg,brand.500,brand.600)`}
//           boxShadow={`inset 0px 0px 1px 1px ${colors.brand[900]},
//             inset -2px -2px 3px 2px ${colors.brand[700]},
//             inset 3px 3px 2px ${colors.brand[100]}`}
//           _hover={{
//             bgImage: `linear-gradient(145deg,brand.500,brand.600)`,
//             boxShadow: `inset 0px 0px 1px 1px ${colors.brand[800]},
//             inset -2px -2px 3px 2px ${colors.brand[700]},
//             inset 3px 3px 2px ${colors.brand[100]}`,
//           }}
//           _active={{
//             bgImage: `linear-gradient(145deg,brand.500,brand.600)`,
//             boxShadow: `inset 0px 0px 1px 2px ${colors.brand[900]},
//             inset -2px -2px 3px 2px ${colors.brand[700]},
//             inset 3px 3px 2px ${colors.brand[100]}`,
//           }}
//           {...styles(direction)}
//         >
//           {children}
//         </Button>
//       </Box>
//     </>
//   );
// };
