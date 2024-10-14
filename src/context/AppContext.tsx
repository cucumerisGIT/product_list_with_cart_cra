import React, { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import data from '../data.json';
import ProductData from '../utils/scripts/ProductData';

// Initialize the AppContext
interface AppContextType {
  productData: ProductData[];
  cartContent: Record<number, number>; // <ID, Amount>
  updateProductCartQuantity: (productID: number, amount: number) => void;
  orderConfirmationVisible: boolean;
  setOrderConfirmationVisible: (isVisible: boolean) => void;
  startNewOrder: () => void;
  totalPrice: number;
  totalItemCount: number;
}
export const AppContext = createContext<AppContextType | undefined>(undefined);



interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Load and keep state of the product data
  const [productData, setProductData] = useState<ProductData[]>([]);
  useEffect(() => {
    setProductData(data as ProductData[]);
    if (!productData || productData.length === 0) {
      console.error("No product data found");
    } else {
      console.log("ProductData loaded"); // DEBUG
    }
  }, []);
  
  // Handle the state of the shopping cart
  const [cartContent, setCartContent] = useState<Record<number, number>>({});
  const updateProductCartQuantity = useCallback((productIdx: number, amount: number) => {
    setCartContent((prevCartContent) => {
      const cartCopy: Record<number, number> = { ...prevCartContent };
      if (amount === 0) {
        delete cartCopy[productIdx];
      } else {
        cartCopy[productIdx] = amount;
      }
      return cartCopy;
    });
  }, []);
	const [totalItemCount, setTotalItemCount] = useState<number>(0);
	const [totalPrice, setTotalPrice] = useState<number>(0);

	// Update the total price of all items if the cart content changes
	useEffect(() => {
		let totalAmount: number = 0;
		let totalPrice: number = 0;
		
		Object.entries(cartContent).forEach(([id, amount]: [string, number]) => {
			totalAmount += amount;

			const product = productData[Number(id)];
			totalPrice += product.price * amount;
		});

		setTotalItemCount(totalAmount);
		setTotalPrice(totalPrice);
	}, [cartContent]);

  // Handle the visibility state of the order-confirmation
  const [orderConfirmationVisible, setOrderConfirmationVisible] = useState<boolean>(false);
  const startNewOrder = () => {
    window.location.reload();
  }
  
  return (
    <AppContext.Provider value={{ 
      productData, 
      cartContent, 
      updateProductCartQuantity, 
      orderConfirmationVisible, 
      setOrderConfirmationVisible, 
      startNewOrder,
      totalPrice,
      totalItemCount
    }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;