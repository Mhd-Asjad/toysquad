"use client";

import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
// import { Menu as MenuIcon } from "@mui/icons-material";
import Image from "next/image";


export default function AdminTopbar({ handleDrawerToggle }) {
    return (
        <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: "none" } }}
                >
                    {/* <MenuIcon /> */}
                </IconButton>

                {/* Logo */}
                <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={32}
                        height={32}
                    />
                </Box>

                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1 }}
                >
                    Toysquad
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
