import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Heart, Save, Trash2, Calendar, Plus, Minus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// 定义历史评分记录接口
interface RatingRecord {
  id: string;
  timestamp: string;
  score: number;
  date: string;
  comment: string;
}

export default function LoveRatingPage() {
  // 当前评分
  const [currentScore, setCurrentScore] = useState<number>(0);
  
  // 输入框中的分数字符串
  const [scoreInput, setScoreInput] = useState<string>('');
  
  // 备注内容
  const [comment, setComment] = useState<string>('');
  
  // 历史评分记录
  const [historyRecords, setHistoryRecords] = useState<RatingRecord[]>([]);
  
  // 从本地存储加载历史记录
  useEffect(() => {
    const savedRecords = localStorage.getItem('loveRatingHistory');
    if (savedRecords) {
      try {
        const parsedRecords = JSON.parse(savedRecords) as RatingRecord[];
        setHistoryRecords(parsedRecords);
      } catch (error) {
        console.error('加载历史记录失败:', error);
        toast.error('加载历史记录失败');
      }
    }
  }, []);
  
  // 处理分数输入
  const handleScoreInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // 只允许输入数字、小数点和负号
    if (/^-?\d*\.?\d*$/.test(value)) {
      setScoreInput(value);
      
      // 转换为数字
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        // 移除范围限制，允许任意数字，包括负数
        setCurrentScore(numValue);
      } else if (value === '') {
        setCurrentScore(0);
      }
    }
  };
  
  // 加分函数 - 移除最大值限制
  const handleAddScore = (amount: number) => {
    const newValue = currentScore + amount;
    setCurrentScore(newValue);
    setScoreInput(newValue.toString());
  };
  
  // 减分函数 - 支持负数
  const handleSubtractScore = (amount: number) => {
    const newValue = currentScore - amount;
    setCurrentScore(newValue);
    setScoreInput(newValue.toString());
  };
  
  // 保存评分
  const handleSave = () => {
    // 检查是否已评分
    if (currentScore === 0) {
      toast.warning('请先为他打分！');
      return;
    }
    
  // 创建新的评分记录
    const now = new Date();
    const newRecord: RatingRecord = {
      id: `rating-${now.getTime()}`,
      timestamp: now.toISOString(),
      score: currentScore,
      date: formatDate(now),
      comment: comment.trim()
    };
    
    // 添加到历史记录
    const updatedRecords = [...historyRecords, newRecord];
    setHistoryRecords(updatedRecords);
    
    // 保存到本地存储
    localStorage.setItem('loveRatingHistory', JSON.stringify(updatedRecords));
    
    // 重置当前评分和备注
    setCurrentScore(0);
    setScoreInput('');
    setComment('');
    
    toast.success('评分已保存！');
  };
  
  // 删除历史记录
  const handleDeleteHistory = () => {
    if (historyRecords.length === 0) {
      toast.warning('没有可删除的历史记录');
      return;
    }
    
    if (window.confirm('确定要删除所有历史评分记录吗？此操作不可恢复。')) {
      setHistoryRecords([]);
      localStorage.removeItem('loveRatingHistory');
      toast.success('历史记录已删除');
    }
  };
  
  // 格式化日期
  const formatDate = (date: Date): string => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };
  
  // 获取评分对应的表情 - 处理任意大小的分数，包括负数
  const getScoreEmoji = (score: number): string => {
    if (score >= 100) return '💖'; // 超级棒
    if (score >= 50) return '😍'; // 超棒
    if (score >= 20) return '😘'; // 很棒
    if (score >= 10) return '😊'; // 不错
    if (score >= 5) return '🙂'; // 良好
    if (score > 0) return '😐'; // 一般
    if (score === 0) return '👉'; // 开始评分
    if (score > -5) return '😒'; // 有点失望
    if (score > -10) return '😠'; // 生气
    return '😡'; // 非常生气
  };
  
  // 获取评分对应的文字描述 - 处理任意大小的分数，包括负数
  const getScoreDescription = (score: number): string => {
    if (score >= 100) return '他是完美的男朋友！爱了爱了！';
    if (score >= 50) return '他今天太让我感动了！';
    if (score >= 20) return '超级棒的一天！';
    if (score >= 10) return '表现真不错~';
    if (score >= 5) return '今天也很贴心哦';
    if (score > 0) return '还可以做得更好';
    if (score === 0) return '请输入分数为他评分吧';
    if (score > -5) return '今天有点失望...';
    if (score > -10) return '真的生气了！';
    return '哼，太让我失望了！';
  };
  
  // 计算图表的动态Y轴范围 - 虚拟表示超大分数
  const chartConfig = useMemo(() => {
    if (historyRecords.length === 0) {
      return { yAxisDomain: [0, 10], tickFormatter: (value: number) => value.toString() };
    }
    
    // 找出历史记录中的最高分
    const maxScore = Math.max(...historyRecords.map(record => record.score));
    
     // 找出历史记录中的最低分
    const minScore = Math.min(...historyRecords.map(record => record.score));
    
    // 确保图表能同时显示正负分数
    let lowerBound = minScore;
    let upperBound = maxScore;
    
    // 根据分数范围设置不同的Y轴处理策略
    if (Math.abs(upperBound - lowerBound) <= 100) {
      // 小分数范围：正常显示
      // 留出10%的余量
      const margin = (upperBound - lowerBound) * 0.1;
      const domain = [Math.floor(lowerBound - margin), Math.ceil(upperBound + margin)];
      return { yAxisDomain: domain, tickFormatter: (value: number) => value.toString() };
    } else if (Math.abs(upperBound - lowerBound) <= 1000) {
      // 中等分数范围：千分位显示
      // 留出10%的余量
      const margin = (upperBound - lowerBound) * 0.1;
      return { 
        yAxisDomain: [Math.floor(lowerBound - margin), Math.ceil(upperBound + margin)],
        tickFormatter: (value: number) => (Math.abs(value) >= 1000 ? `${(value/1000).toFixed(1)}k` : value.toString())
      };
    } else if (Math.abs(upperBound - lowerBound) <= 1000000) {
      // 大分数范围：百万分位显示
      // 留出10%的余量
      const margin = (upperBound - lowerBound) * 0.1;
      return { 
        yAxisDomain: [Math.floor(lowerBound - margin), Math.ceil(upperBound + margin)],
        tickFormatter: (value: number) => {
          if (Math.abs(value) >= 1000000) return `${(value/1000000).toFixed(1)}M`;
          if (Math.abs(value) >= 1000) return `${(value/1000).toFixed(0)}k`;
          return value.toString();
        }
      };
    } else {
      // 超大分数范围：对数缩放虚拟表示
      // 处理负数和正数
      const logMin = Math.floor(Math.log10(Math.abs(minScore || 1)));
      const logMax = Math.ceil(Math.log10(maxScore));
      const scaledMin = minScore < 0 ? -Math.pow(10, logMin) : 0;
      const scaledMax = Math.pow(10, logMax);
      
      return { 
        yAxisDomain: [scaledMin, scaledMax],
        tickFormatter: (value: number) => {
          if (value === 0) return '0';
          if (value < 0) {
            const logValue = Math.log10(Math.abs(value));
            return `-10^${Math.round(logValue)}`;
          } else {
            const logValue = Math.log10(value);
            return `10^${Math.round(logValue)}`;
          }
        }
      };
    }
  }, [historyRecords]);
  
  // 处理分数的显示样式，包括负数
  const getScoreDisplayClass = (score: number): string => {
    if (score >= 100) return 'border-pink-600 text-pink-600';
    if (score >= 50) return 'border-pink-500 text-pink-500';
    if (score >= 20) return 'border-pink-400 text-pink-400';
    if (score >= 10) return 'border-purple-400 text-purple-500';
    if (score >= 5) return 'border-blue-400 text-blue-500';
    if (score > 0) return 'border-blue-300 text-blue-500';
    if (score === 0) return 'border-gray-200 text-gray-300';
    if (score > -10) return 'border-red-400 text-red-500';
    return 'border-red-600 text-red-600';
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      {/* 头部装饰 */}
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
            }}
            className="inline-block p-3 bg-white rounded-full shadow-lg mb-4"
          >
            <Heart className="w-14 h-14 text-pink-500" fill="#ec4899" />
          </motion.div>
           <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">李祥浩的表现分</h1>
           <p className="text-gray-600 max-w-md mx-auto">
             今天李祥浩表现怎么样？给他打个分吧！💕
           </p>
           <p className="text-sm text-gray-500 italic mt-2">李祥浩永远喜欢周佳汐</p>
        </motion.div>

        {/* 评分卡片 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          {/* 评分区域 */}
          <div className="text-center mb-8">
           <h2 className="text-2xl font-bold text-gray-800 mb-6">今日表现分</h2>
            
            {/* 分数显示区域 */}
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="mb-8"
            >
              <div className="flex flex-col items-center">
                {/* 分数数字显示 */}
                <div className="relative mb-6">
                  <motion.div
                    key={currentScore}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`text-5xl sm:text-7xl font-bold w-40 h-40 flex items-center justify-center rounded-full border-8 ${getScoreDisplayClass(currentScore)}`}
                    style={{
                      // 处理超大分数的显示
                      fontSize: currentScore >= 1000 ? '2.5rem' : 
                               currentScore >= 100 ? '3rem' : '5rem'
                    }}
                  >
                    {currentScore >= 1000 ? (
                      <span>{(currentScore/1000).toFixed(1)}k</span>
                    ) : (
                      <span>{currentScore}</span>
                    )}
                  </motion.div>
                  
                  {/* 表情指示器 */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute -bottom-4 text-2xl"
                  >
                    {getScoreEmoji(currentScore)}
                  </motion.div>
                </div>
                
                {/* 分数输入框 */}
                <div className="mb-6 w-full max-w-xs">
                  <input
                    type="text"
                    value={scoreInput}
                    onChange={handleScoreInput}
                    placeholder="请输入任意分数"
                    className="w-full px-4 py-3 text-xl font-medium text-center border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all"
                  />
                </div>
                
                {/* 备注输入框 */}
                <div className="mb-8 w-full max-w-xs">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="添加备注（可选）"
                    className="w-full px-4 py-3 text-base border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all min-h-[80px] resize-none"
                    maxLength={200}
                  />
                  <p className="text-xs text-gray-400 text-right mt-1">{comment.length}/200</p>
                </div>
                
                {/* 加减分区域 */}
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
                  <div className="flex flex-col items-center">
                    <p className="text-sm text-gray-500 mb-2">减分</p>
                    <div className="flex space-x-2">
                      {[0.5, 1, 2].map((amount) => (
                        <motion.button
                          key={`subtract-${amount}`}
                          whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           className={`px-4 py-2 rounded-lg border ${
                             currentScore !== Infinity && currentScore !== -Infinity 
                               ? 'border-red-200 bg-red-50 text-red-500 hover:bg-red-100' 
                               : 'border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed'
                           }`}
                          onClick={() => handleSubtractScore(amount)}
                          disabled={currentScore <= 0}
                        >
                          -{amount}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <p className="text-sm text-gray-500 mb-2">加分</p>
                    <div className="flex space-x-2">
                      {[0.5, 1, 2].map((amount) => (
                        <motion.button
                          key={`add-${amount}`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 rounded-lg border border-green-200 bg-green-50 text-green-500 hover:bg-green-100"
                          onClick={() => handleAddScore(amount)}
                        >
                          +{amount}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* 评分描述 */}
                <p className="text-xl text-pink-600 font-medium">
                  {getScoreDescription(currentScore)}
                </p>
              </div>
            </motion.div>
          </div>
          
          {/* 操作按钮 */}
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className={`px-8 py-3 font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center ${
                 currentScore !== 0 && currentScore !== Infinity && currentScore !== -Infinity
                   ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' 
                   : 'bg-gray-200 text-gray-400 cursor-not-allowed'
               }`}
               onClick={handleSave}
               disabled={currentScore === 0 || !isFinite(currentScore)}
            >
              <Save className="w-5 h-5 mr-2" /> 保存评分
            </motion.button>
          </div>
        </motion.div>

        {/* 历史趋势图表 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-pink-500" /> 评分历史趋势
            </h2>
            {historyRecords.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm px-3 py-1 bg-red-100 text-red-600 rounded-full flex items-center hover:bg-red-200 transition-colors"
                onClick={handleDeleteHistory}
              >
                <Trash2 className="w-4 h-4 mr-1" /> 清空历史
              </motion.button>
            )}
          </div>
          
          {historyRecords.length > 0 ? (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={historyRecords}
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3e8ff" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6b7280"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    domain={chartConfig.yAxisDomain as [number, number]} 
                    stroke="#6b7280"
                    tick={{ fontSize: 12 }}
                    tickFormatter={chartConfig.tickFormatter}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string, props: any) => {
                      const record = historyRecords.find(r => r.id === props.payload.id);
                      return record && record.comment 
                        ? [`${value} 分`, '评分', `备注: ${record.comment}`] 
                        : [`${value} 分`, '评分'];
                    }}
                    labelFormatter={(label) => `日期: ${label}`}
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderColor: '#f9a8d4',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#ec4899" 
                    strokeWidth={3}
                    dot={{ 
                      stroke: '#ec4899', 
                      strokeWidth: 2, 
                      r: 6, 
                      fill: 'white' 
                    }}
                    activeDot={{ 
                      stroke: '#db2777', 
                      strokeWidth: 2, 
                      r: 8, 
                      fill: '#ec4899' 
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 bg-pink-50 rounded-xl">
              <Heart className="w-12 h-12 text-pink-300 mb-3" />
              <p className="text-gray-600">还没有评分记录哦~</p>
              <p className="text-gray-500 text-sm mt-2">完成第一次评分后，这里将显示历史评分趋势</p>
            </div>
          )}
        </motion.div>

        {/* 装饰元素 */}
        <div className="flex justify-center mt-8 space-x-4">
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
              <Heart className="w-5 h-5 text-pink-400" fill="#f9a8d4" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}