import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';

export type DateContextType = {
  currentDate: Date;
  currentMonth: number;
  currentYear: number;
};

export const DateContext = createContext<DateContextType>({
  currentDate: new Date(),
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
});

export const useDate = () => useContext(DateContext);

const DateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const updateDate = () => {
      setCurrentDate(new Date());
    };
    const intervalId = setInterval(updateDate, 24 * 60 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  const currentMonth = currentDate.getMonth(); // Keeping it 0-based
  const currentYear = currentDate.getFullYear();

  return (
    <DateContext.Provider value={{ currentDate, currentMonth, currentYear }}>
      {children}
    </DateContext.Provider>
  );
};

export default DateProvider;
