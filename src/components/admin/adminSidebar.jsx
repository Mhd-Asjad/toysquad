"use client";

import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { MdCategory } from "react-icons/md";
import { FaBoxArchive } from "react-icons/fa6";
import { RiDashboardFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";


const drawerWidth = 240;

export default function AdminSidebar({
    mobileOpen,
    handleDrawerToggle,
}) {
    const router = useRouter();

    const handleLogout = async () => {
        console.log("Logging out...");
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
    };

    const menuItems = [
        {
            text: "Dashboard",
            icon: <RiDashboardFill />,
            path: "/admin/dashboard",
        },
        {
            text: "Products",
            icon: <FaBoxArchive />,
            path: "/admin/dashboard/products",
        },
        {
            text: "Categories",
            icon: <MdCategory />,
            path: "/admin/dashboard/categories",
        },
        {
            text: "Logout",
            icon: <FiLogOut />,
            onClick: handleLogout,
        },
    ];

    const drawerContent = (
        <div>
            <Toolbar />
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            onClick={() => {
                                if (item.onClick) {
                                    item.onClick();
                                } else if (item.path) {
                                    router.push(item.path);
                                }
                            }}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
            >
                {drawerContent}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </>
    );
}
