import React from 'react';
import styles from './OrderItem.module.css';

interface OrderItemProps {
  name: string;
  amount: number;
  price: number;
} 

const OrderItem: React.FC<OrderItemProps> = ({
  name,
  amount,
  price
}) => {  
  return (
		<section className={styles.item}>
			<div className={styles.outerWrapper}>
				<p className={styles.name}>{name}</p>
				<span className={styles.container}>
					<p className={styles.amount}>{amount}x</p>
          <p className={styles.singlePrice}>@ ${price.toFixed(2)}</p>
				</span>
			</div>
      <p className={styles.totalPrice}>${(price * amount).toFixed(2)}</p>
		</section>
	);
}

export default OrderItem;