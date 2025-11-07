import { motion } from 'framer-motion';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  maxStars?: number;
  size?: number;
}

export function StarRating({ 
  rating, 
  onRatingChange, 
  maxStars = 5, 
  size = 24 
}: StarRatingProps) {
  return (
    <div className="flex space-x-1 md:space-x-2">
      {[...Array(maxStars)].map((_, index) => {
        const starIndex = index + 1;
        return (
          <motion.button
            key={starIndex}
            type="button"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onRatingChange(starIndex)}
            className="text-gray-200 hover:text-pink-400 transition-colors duration-200 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill={starIndex <= rating ? "#ec4899" : "none"}
              stroke={starIndex <= rating ? "#ec4899" : "currentColor"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </motion.button>
        );
      })}
    </div>
  );
}