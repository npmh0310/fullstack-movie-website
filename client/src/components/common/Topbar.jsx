import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import { cloneElement, useState } from "react";
import { Link } from "react-router-dom";
import menuConfigs from "./../../configs/menu.configs";
import { themeModes } from "./../../configs/theme.configs";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { setThemeMode } from "../../redux/features/themeModeSlice";
import Logo from "./Logo";
import UserMenu from "./UserMenu";

//?  tạo ra một thanh AppBar có thể thay đổi màu khi người dùng cuộn trang.
const ScrollAppBar = ({ children, window }) => {
  const { themeMode } = useSelector((state) => state.themeMode);
  const trigger = useScrollTrigger({
    //? có mục đích là tạo ra một thanh AppBar có thể thay đổi màu khi người dùng cuộn trang.

    disableHysteresis: true, //?trigger sẽ không được kích hoạt nếu người dùng chỉ cuộn một chút.
    threshold: 50, //?  trigger sẽ được kích hoạt khi người dùng cuộn trang xuống hoặc lên ít nhất 50 pixel.
    target: window ? window() : undefined, //? nếu không có window được truyền vào, nó sẽ được đặt thành undefined.
  });
  return cloneElement(children, {
    // ?  tạo ra một bản sao của children (AppBar) với các thuộc tính mới được thiết lập.
    sx: {
      color: trigger
        ? "text.primary"
        : themeMode === themeModes.dark
        ? "primary.contrastText"
        : "text.primary",
      backgroundColor: trigger
        ? "background.paper"
        : themeMode === themeModes.dark
        ? "transparent"
        : "background.paper",
    },
  });
};

const Topbar = () => {
  const { user } = useSelector((state) => state.user);
  const { appState } = useSelector((state) => state.appState);
  const { themeMode } = useSelector((state) => state.themeMode);

  const [slidebarOpen, setSlidebarOpen] = useState(false);

  const dispatch = useDispatch();

  //? thay đổi chế độ giao diện giữa chế độ sáng và chế độ tối khi người dùng thực hiện hành động chuyển đổi chủ đề.
  const onSwithTheme = () => {
    const theme =
      themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme));              
  };
  return (
    <>
      <ScrollAppBar>
        <AppBar elevation={0} sx={{ zIndex: 9999 }}>
          <Toolbar
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            {/* Icon mobile header */}
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                color="inherit"
                sx={{
                  mr: 2,
                  display: { md: "none" },
                }}
              >
                <MenuIcon />
              </IconButton>

              <Box
                sx={{
                  display: { xs: "inline-block", md: "none" },
                }}
              >
                <Logo />
              </Box>
            </Stack>
            {/* Icon mobile header */}
            {/* Main menu */}
            <Box
              flexGrow={1}
              alignItems="center"
              display={{ xs: "none", md: "flex" }}
            >
              <Box sx={{ marginRight: "30px" }}>
                <Logo />
              </Box>
              {menuConfigs.main.map((item, index) => (
                <Button
                  key={index}
                  sx={{
                    color: appState.includes(item.state)
                      ? "primary.contrastText"
                      : "inherit",
                    mr: 2,
                  }}
                  component={Link}
                  to={item.path}
                  variant={appState.includes(item.state) ? "contained" : "text"}
                >
                  {item.display}
                </Button>
              ))}
              <IconButton sx={{ color: "inherit" }} onClick={onSwithTheme}>
                {themeMode === themeModes.dark && <DarkModeOutlinedIcon />}
                {themeMode === themeModes.light && <WbSunnyOutlinedIcon />}
              </IconButton>
            </Box>
            {/* Main menu */}
              {/* user menu */}
              <Stack spacing={3} direction="row" alignItems="center">
              {!user && <Button
                variant="contained"
                onClick={() => dispatch(setAuthModalOpen(true))}
              >
                sign in
              </Button>}
            </Stack>
            {user && <UserMenu />}
            {/* user menu */}
          </Toolbar>
        </AppBar>
      </ScrollAppBar>
    </>
  );
};

export default Topbar;
