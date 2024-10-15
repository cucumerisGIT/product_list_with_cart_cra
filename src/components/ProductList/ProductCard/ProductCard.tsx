import React, { useContext, useEffect, useState } from 'react';
import styles from './ProductCard.module.css';
import breakpoints from 'utils/scripts/globalConstants';
import AddToCartButton from './AddToCartButton/AddToCartButton';
import { AppContext } from 'context/AppContext';
import CounterButton from 'components/CounterButton/CounterButton';

interface ProductCardProps {
	id: number;
	image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
	name: string;
	category: string;
	price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
	id,
	image,
	name,
	category,
	price
}) => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error("Missing AppContext");
	}
	const { updateProductCartQuantity, cartContent } = context;
	
	// Keep state of if the product is in the shopping cart
	const [inCart, setInCart] = useState<boolean>(false);
	const handleCountChanged = (newCount: number) => {
		setInCart(newCount > 0);
		updateProductCartQuantity(id, newCount);
	}

	// Update inCart if the global state of the cart changes
	useEffect(() => {
		const cartAmount: number = cartContent[id];
		if (!cartAmount) {
			setInCart(false);
		}
	}, [cartContent]);

	return (
		<article className={styles.card}>
			<div className={styles.pictureWrapper}>
				<picture className={`${styles.picture}`}>
					<source media={`(max-width: ${breakpoints.tablet}px)`} srcSet={image.mobile} />
					<source media={`(min-width: ${breakpoints.tablet}px) and (max-width: ${breakpoints.desktop}px)`} srcSet={image.tablet} />
					<source media={`(min-width: ${breakpoints.desktop}px)`} srcSet={image.desktop} />
					<img className={`${styles.image}  ${inCart ? styles['image--selected'] : ''}`} src={image.thumbnail} alt={name} />
				</picture>
				{inCart ? 
					<CounterButton className={styles.button} productName={name} onCountChanged={handleCountChanged} />
					:
					<AddToCartButton className={styles.button} productName={name} onCountChanged={handleCountChanged} />
				}
			</div>

			<p className={styles.category}>{category}</p>
			<h2 className={styles.name}>{name}</h2>
			<p className={styles.price}>${price.toFixed(2)}</p>
		</article>
	);
}

export default ProductCard;