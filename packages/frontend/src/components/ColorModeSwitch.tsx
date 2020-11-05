import React from "react";
import { Button, useColorMode } from "@chakra-ui/core";
import { FaSun, FaMoon } from "react-icons/fa";

function ColorModeSwitch() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      variant="ghost"
      onClick={toggleColorMode}
      colorScheme={colorMode === "light" ? "blue" : "orange"}
    >
      {colorMode === "light" ? <FaMoon /> : <FaSun />}
    </Button>
  );
}

export default ColorModeSwitch;
