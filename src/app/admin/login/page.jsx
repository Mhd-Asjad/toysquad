// app/admin/login/page.tsx
"use client";

import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${apiUrl}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            // const data = await res.json();
            if (!res.ok) {
                return alert("Login failed");
            }
            router.push("/admin/dashboard");
            // if (data.token) {
            //     localStorage.setItem("adminToken", data.token);
            // } else {
            //     alert(data.message || "Login failed");
            // }
        } catch (err) {
            console.log(err)
            alert("Connection error. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
            {/* Glow Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full filter blur-3xl"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl overflow-hidden"
            >
                <div className="bg-gray-900/50 p-6 text-center border-b border-gray-700">
                    <div className="flex justify-center mb-4">
                        <Image
                            src="/assets/flashcar.png"
                            alt="Company Logo"
                            width={120}
                            height={60}
                            className="h-12 w-auto"
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                        Flash Car
                    </h2>
                    <p className="text-gray-400 mt-1 text-sm">
                        Sign in to your dashboard
                    </p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            variant="outlined"
                            required
                            margin="normal"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "#4b5563",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "#6b7280",
                                    },
                                    "& input": {
                                        color: "white",
                                        padding: "20px",
                                        marginTop: "8px",
                                    },
                                },
                                "& .MuiInputLabel-root": {
                                    color: "#ccc",
                                },
                            }}
                        />

                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            variant="outlined"
                            required
                            margin="normal"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "#4b5563",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "#6b7280",
                                    },
                                    "& input": {
                                        color: "white",
                                        padding: "20px",
                                        marginTop: "8px",
                                    },
                                },
                                "& .MuiInputLabel-root": {
                                    color: "#ccc",
                                },
                            }}
                        />

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="pt-2"
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                sx={{
                                    backgroundColor: "#10b981",
                                    "&:hover": {
                                        backgroundColor: "#059669",
                                    },
                                    padding: "12px",
                                    fontSize: "1rem",
                                    fontWeight: "600",
                                    textTransform: "none",
                                    borderRadius: "0.5rem",
                                }}
                            >
                                Sign In
                            </Button>
                        </motion.div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
