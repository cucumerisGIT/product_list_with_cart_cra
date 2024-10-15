import React from 'react';
import styles from './ProductList.module.css'
import ProductCard from './ProductCard/ProductCard';
import ProductData from 'utils/scripts/ProductData';

interface ProductListProps {
	products: ProductData[];
}

const ProductList: React.FC<ProductListProps> = ({
	products
}) => {	
	return (
		<main className={styles.wrapper}>
			<h1 className={styles.title}>Desserts</h1>
			<div className={styles.list}>
				{(() => {
					return products?.map((product, i) => {
						return (
							<ProductCard
								key={i}
								id={i}
								image={product.image}
								name={product.name}
								category={product.category}
								price={product.price}
							/>
						)
					});
				})()}
			</div>
		</main>
	);
}

export default ProductList;