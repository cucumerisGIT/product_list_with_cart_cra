import React from 'react';
import styles from './TotalPrice.module.css'

interface TotalPriceProps {
	className?: string;
	totalPrice: number;
}

const TotalPrice: React.FC<TotalPriceProps> = ({
	className = null,
	totalPrice
}) => {
	return (
		<p className={`${styles.orderTotal} ${className ? className : ''}`}><span>Order total</span><span className={styles.totalPrice}>${totalPrice.toFixed(2)}</span></p>
	);
}

export default TotalPrice;