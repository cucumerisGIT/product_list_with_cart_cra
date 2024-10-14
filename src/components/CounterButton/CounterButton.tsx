import React, { useContext, useEffect, useState } from 'react';
import styles from './CounterButton.module.css'
import useCounter from 'utils/scripts/hooks/useCounter';
import { AppContext } from 'context/AppContext';

interface CounterButtonProps {
	className: string;
	onCountChanged: (newCount: number) => void;
}

const CounterButton: React.FC<CounterButtonProps> = ({
	className,
	onCountChanged
}) => {	
	const [counter, add, subtract] = useCounter(1);
	const handleAdd = () => add(1);
	const handleSubtract = () => subtract(1);
	
	useEffect(() => {
		onCountChanged(counter);
	}, [counter]);

	return (
    <div className={`${className} ${styles.buttonContainer}`} aria-label="decrease shopping cart quantity">
      <button className={styles.changeButton} onClick={handleSubtract}>
        <svg className={styles.changeIcon} xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2">
          <path fill="#fff" d="M0 .375h10v1.25H0V.375Z" />
        </svg>
      </button>
      <p className={styles.amount}>{counter}</p>
      <button className={styles.changeButton} onClick={handleAdd} aria-label="increase shopping cart quantity">
        <svg className={styles.changeIcon} xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
          <path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z" />
        </svg>
      </button>
    </div>
  );
}

export default CounterButton;