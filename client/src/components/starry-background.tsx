import { useEffect, useState } from 'react';

interface Star {
  id: number;
  left: string;
  top: string;
  size: 'small' | 'medium' | 'large';
  animationDelay: string;
}

export default function StarryBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  
  useEffect(() => {
    // Generate random stars
    const generateStars = () => {
      const newStars: Star[] = [];
      const starCount = 150; // Number of stars
      
      for (let i = 0; i < starCount; i++) {
        const sizes: ('small' | 'medium' | 'large')[] = ['small', 'small', 'small', 'medium', 'medium', 'large'];
        const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
        
        newStars.push({
          id: i,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          size: randomSize,
          animationDelay: `${Math.random() * 4}s`
        });
      }
      
      setStars(newStars);
    };
    
    generateStars();
  }, []);
  
  return (
    <div className="stars" aria-hidden="true">
      {stars.map((star) => (
        <div
          key={star.id}
          className={`star ${star.size}`}
          style={{
            left: star.left,
            top: star.top,
            animationDelay: star.animationDelay
          }}
        />
      ))}
      {/* Add a few shooting stars */}
      <div 
        className="shooting-star" 
        style={{
          top: '20%',
          animationDelay: '0s'
        }}
      />
      <div 
        className="shooting-star" 
        style={{
          top: '60%',
          animationDelay: '2s'
        }}
      />
    </div>
  );
}