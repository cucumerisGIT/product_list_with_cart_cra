import React, { useContext } from 'react';
import styles from './ShoppingCartItem.module.css'
import { AppContext } from 'context/AppContext';

interface ShoppingCartItemProps {
	id: number;
	name: string;
	price: number;
	amount: number;
	thumbnail?: string | null;
}

const ShoppingCartItem: React.FC<ShoppingCartItemProps> = ({
	id,
	name,
	price,
	amount,
	thumbnail = null
}) => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('App must be used within an AppProvider');
	}
	
	const handleClick = () => {
		context.updateProductCartQuantity(id, 0);
	}

	if (thumbnail === null) {
		return (
			<section className={styles.item}>
				<div className={styles.outerWrapper}>
					<p className={styles.name}>{name}</p>
					<span className={styles.container}>
						<p className={styles.amount}>{amount}x</p>
						<span className={styles.priceWrapper}>
							<p className={styles.singlePrice}>@ ${price.toFixed(2)}</p>
							<p className={styles.totalPrice}>${(price * amount).toFixed(2)}</p>
						</span>
					</span>
				</div>
				<button className={styles.removeButton} onClick={handleClick} aria-label={`remove ${amount} ${name} from your cart`}>
					<svg className={styles.cancelIcon} xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
						<path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z" />
					</svg>
				</button>
			</section>
		);
	} else {
		return (
			<section className={styles.item}>
				<div className={styles.thumbnailWrapper}>
					<img className={styles.thumbnail} src={thumbnail} alt=""/>
				</div>
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
}

export default ShoppingCartItem;