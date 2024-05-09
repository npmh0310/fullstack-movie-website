import { Box, Button, Container, Paper, Stack } from "@mui/material";
import ContainerC  from "./Container";
import React from "react";
import Logo from "./Logo";
import menuConfigs from "./../../configs/menu.configs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <ContainerC>
      <Paper square={true} sx={{ backgroundImage: "unset", padding: "2rem" }}>
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction={{ xs: "column", md: "row " }}
          sx={{ height: "max-content" }}
        >
          <Logo />
          <Box>
            {menuConfigs.main.map((item, index) => (
              <Button
                key={index}
                sx={{ color: "inherit" }}
                component={Link}
                to={item.path}
              >
                {item.display}
              </Button>
            ))}
          </Box>
        </Stack>
      </Paper>
    </ContainerC>
  );
};

export default Footer;
