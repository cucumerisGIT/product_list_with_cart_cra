import React, { useContext, useState } from 'react';
import styles from './CartList.module.css';
import ShoppingCartItem from 'components/ShoppingCart/ShoppingCartItem/ShoppingCartItem';
import ProductData from 'utils/scripts/ProductData';
import { AppContext } from 'context/AppContext';

interface CartListProps {
  className?: string;
  cartContent: Record<number, number>;
  showThumbnail: boolean;
}

const CartList: React.FC<CartListProps> = ({
  className = null,
  cartContent,
  showThumbnail
}) => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('App must be used within an AppProvider');
  }
  const { productData } = context;
  
  return (
    <div className={`${styles.itemContainer} ${className ? className : ''}`}>
      {(() => {
        return Object.entries(cartContent).map(([id, amount]: [string, number]) => {
          const product: ProductData = productData[Number(id)];
          return (
            <ShoppingCartItem
              key={id}
              id={Number(id)}
              name={product.name}
              amount={amount}
              price={product.price}
              thumbnail={showThumbnail ? product.image.thumbnail : null}
            />
          )
        })
      })()}
    </div>
  )
}

export default CartList;