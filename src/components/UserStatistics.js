import React, { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';

const UserStatistics = () => {
  const statistics = [
    { number: 500000, label: 'Users' },
    { number: 100000, label: 'Matches Made' },
    { number: 10000, label: 'Success Stories' }
  ];

  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <section className="user-statistics" ref={statsRef}>
      <h2>Our Achievements</h2>
      <div className="statistics-container">
        {statistics.map((stat, index) => (
          <div key={index} className="stat">
            {isVisible && (
              <p className="number">
                <CountUp end={stat.number} duration={2.5} />
              </p>
            )}
            <p className="label">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserStatistics;