// app/admin/dashboard/page.tsx
'use client';

import { useState } from 'react';
import { Box, CssBaseline, Typography } from '@mui/material';
import AdminTopbar from '@/components/admin/adminTopbar';
import AdminSidebar from '@/components/admin/adminSidebar';


export default function DashboardPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AdminTopbar handleDrawerToggle={handleDrawerToggle} />
      <AdminSidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` }, mt: 8 }}
      >
        <Typography variant="h4">Admin Dashboard</Typography>
        <Typography>
          Welcome to the admin panel. Use the sidebar to navigate to Products or Categories.
        </Typography>
      </Box>
    </Box>
  );
}