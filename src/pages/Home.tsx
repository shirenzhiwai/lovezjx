import React from 'react';
import { Heart, Star, ArrowRight, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
      {/* 导航栏 */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-2"
          >
            <Heart className="text-red-500" size={28} />
            <h1 className="text-xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              爱情评分中心
            </h1>
          </motion.div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#" className="font-medium hover:text-red-500 transition-colors">首页</a></li>
              <li><a href="#" className="font-medium hover:text-red-500 transition-colors">关于</a></li>
              <li><a href="#" className="font-medium hover:text-red-500 transition-colors">联系我们</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-12">
        {/* 英雄区域 */}
        <section className="mb-16 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent"
          >
            探索你的爱情评分
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-10"
          >
            通过我们独特的评估系统，了解你的感情状况并获得专业建议，让你的爱情之路更加顺畅。
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/love-rating">
              <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center mx-auto">
                开始评分
                <ArrowRight className="ml-2" size={18} />
              </button>
            </Link>
          </motion.div>
        </section>

        {/* 特点区域 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">为什么选择我们的爱情评分系统</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 特点1 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-md p-8 border border-gray-100"
            >
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <Star className="text-red-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">科学评估</h3>
              <p className="text-gray-600">基于心理学研究的评估体系，帮助你全面了解自己的感情状况。</p>
            </motion.div>

            {/* 特点2 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-md p-8 border border-gray-100"
            >
              <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                <Heart className="text-pink-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">个性化建议</h3>
              <p className="text-gray-600">根据你的评估结果，提供量身定制的爱情建议和改进方向。</p>
            </motion.div>

            {/* 特点3 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-md p-8 border border-gray-100"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Users className="text-blue-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">专业支持</h3>
              <p className="text-gray-600">我们的专业团队随时为你提供爱情咨询和指导服务。</p>
            </motion.div>
          </div>
        </section>

        {/* 呼吁行动区域 */}
        <section className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl shadow-xl p-10 text-white text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6"
          >
            准备好提升你的爱情质量了吗？
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg mb-8 max-w-2xl mx-auto"
          >
            立即开始你的爱情评分之旅，发现更美好的感情生活。
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link to="/love-rating">
              <button className="bg-white text-red-500 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                免费开始评分
              </button>
            </Link>
          </motion.div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="text-red-400" size={24} />
                <h3 className="text-xl font-bold text-white">爱情评分中心</h3>
              </div>
              <p className="mb-4">让爱情更美好，让关系更和谐。</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">快速链接</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">首页</a></li>
                <li><a href="#" className="hover:text-white transition-colors">关于我们</a></li>
                <li><a href="#" className="hover:text-white transition-colors">爱情建议</a></li>
                <li><a href="#" className="hover:text-white transition-colors">联系我们</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">隐私政策</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">条款与条件</a></li>
                <li><a href="#" className="hover:text-white transition-colors">隐私政策</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p>&copy; 2025 爱情评分中心. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}