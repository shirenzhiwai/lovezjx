import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 flex flex-col items-center justify-center py-8 px-4 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        {/* 404图标 */}
        <motion.div
          animate={{ 
            rotate: [0, 10, 0, -10, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 5,
          }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center">
            <Heart className="w-12 h-12 text-red-500" fill="#ef4444" />
          </div>
        </motion.div>
        
        {/* 404文本 */}
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl font-bold text-gray-800 mb-4"
        >
          404
        </motion.h1>
        
        {/* 错误信息 */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-gray-600 mb-8"
        >
          哎呀，你访问的页面不存在
        </motion.p>
        
        {/* 返回按钮 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link to="/">
            <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center mx-auto">
              <ArrowLeft className="w-5 h-5 mr-2" /> 返回评分页面
            </button>
          </Link>
        </motion.div>
        
        {/* 装饰元素 */}
        <motion.div 
          className="flex justify-center mt-12 space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5, 
                delay: i * 0.2
              }}
            >
              <Heart className="w-4 h-4 text-pink-400" fill="#f9a8d4" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}