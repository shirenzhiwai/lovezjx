import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import LoveRatingPage from "@/pages/LoveRatingPage";
import NotFound from "@/components/NotFound";
import { useState } from "react";
import { AuthContext } from '@/contexts/authContext';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <Routes>
        <Route path="/" element={<LoveRatingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
        {/* 通配符路由，处理所有未定义的路径 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthContext.Provider>
  );
}
