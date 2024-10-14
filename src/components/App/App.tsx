import { useContext, useEffect, useState } from 'react';
import styles from './App.module.css';
import ProductList from '../ProductList/ProductList';
import { AppContext } from 'context/AppContext';
import ShoppingCart from 'components/ShoppingCart/ShoppingCart';
import OrderConfirmation from 'components/OrderConfirmation/OrderConfirmation';

const App = () => {  
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('App must be used within an AppProvider');
  }
  const { productData, orderConfirmationVisible } = context;

  const [showOrderConfirmation, setShowOrderConfirmation] = useState<boolean>(false);
  useEffect(() => {
    setShowOrderConfirmation(orderConfirmationVisible);
  }, [orderConfirmationVisible]);
  
  return (
    <div className={styles.app}>
      {productData ? 
        <ProductList products={productData} />
        :
        null
      }
      <ShoppingCart />
      {showOrderConfirmation && <OrderConfirmation />}
    </div>
  );
}

export default App;
