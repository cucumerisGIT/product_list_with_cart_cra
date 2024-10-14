import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTimeout } from 'usehooks-ts';
import styles from './OrderConfirmation.module.css';
import { AppContext } from 'context/AppContext';
import CartList from 'components/CartList/CartList';
import TotalPrice from 'components/TotalPrice/TotalPrice';
import { SwipeCallback, SwipeEventData, useSwipeable } from 'react-swipeable';

const SWIPE_THRESHOLD: number = window.innerHeight * .4;
const TRANSITION_DURATION: number = 500;

const OrderConfirmation: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('App must be used within an AppProvider');
  }
  const { cartContent, totalPrice, startNewOrder, setOrderConfirmationVisible } = context;
  
  // Swipe down this component to collapse it
  const heroRef = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState<number>(0);
  const [transitionDuration, setTransitionDuration] = useState<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const swipeHandlers = useSwipeable({
    preventScrollOnSwipe: false,
    onSwipeStart: (eventData: SwipeEventData) => {
      setTransitionDuration(0);
    },
    onSwiping: (eventData: SwipeEventData) => {
      if (eventData.event.target === heroRef.current && eventData.dir === 'Down') {
        eventData.event.preventDefault();
        eventData.event.stopPropagation();
        setTranslateY(eventData.deltaY > 0 ? eventData.deltaY : 0);
      }
    },
    onSwiped: (eventData: SwipeEventData) => {
      // When the user reached the threshold hide this component completely
      if (eventData.deltaY > SWIPE_THRESHOLD) {
        setTranslateY(heroRef.current?.clientHeight as number);
        setTransitionDuration(TRANSITION_DURATION);

        // Clear the old timeout if there is one
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        // Hide this component after a delay
        timeoutRef.current = setTimeout(() => {
          setOrderConfirmationVisible(false);
        }, TRANSITION_DURATION) as NodeJS.Timeout;
      } else {
        setTranslateY(0); // User stopped swipeing before reaching the threshold, so return the component to its normal Y-transform 
        setTransitionDuration(TRANSITION_DURATION);
      }
    }
  });
  
  // Clear the timeout on unmount
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  // Keep the swipeHandlers up to date
  useEffect(() => {
    swipeHandlers.ref(heroRef.current);
  }, [heroRef, swipeHandlers]);
  
  // Collapse this component when the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (heroRef.current && !heroRef.current.contains(event.target as Node)) {
        setOrderConfirmationVisible(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setOrderConfirmationVisible]);
  
  return (
    <section className={styles.wrapper}>
      <div
        className={styles.hero}
        ref={heroRef}
        style={{
          transform: `translateY(${translateY}px)`,
          transition: `${transitionDuration > 0 ? `${transitionDuration}ms` : ''}`
        }}
      >
        <svg className={styles.icon} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 32.121L13.5 24.6195L15.6195 22.5L21 27.879L32.3775 16.5L34.5 18.6225L21 32.121Z" fill="#1EA575"/>
          <path d="M24 3C19.8466 3 15.7865 4.23163 12.333 6.53914C8.8796 8.84665 6.18798 12.1264 4.59854 15.9636C3.0091 19.8009 2.59323 24.0233 3.40352 28.0969C4.21381 32.1705 6.21386 35.9123 9.15077 38.8492C12.0877 41.7861 15.8295 43.7862 19.9031 44.5965C23.9767 45.4068 28.1991 44.9909 32.0364 43.4015C35.8736 41.812 39.1534 39.1204 41.4609 35.667C43.7684 32.2135 45 28.1534 45 24C45 18.4305 42.7875 13.089 38.8493 9.15076C34.911 5.21249 29.5696 3 24 3ZM24 42C20.4399 42 16.9598 40.9443 13.9997 38.9665C11.0397 36.9886 8.73256 34.1774 7.37018 30.8883C6.0078 27.5992 5.65134 23.98 6.34587 20.4884C7.04041 16.9967 8.75474 13.7894 11.2721 11.2721C13.7894 8.75473 16.9967 7.0404 20.4884 6.34587C23.98 5.65133 27.5992 6.00779 30.8883 7.37017C34.1774 8.73255 36.9886 11.0397 38.9665 13.9997C40.9443 16.9598 42 20.4399 42 24C42 28.7739 40.1036 33.3523 36.7279 36.7279C33.3523 40.1036 28.7739 42 24 42Z" fill="#1EA575"/>
        </svg>
        <h2 className={styles.title}>Order Confirmation</h2>
        <p className={styles.subTitle}>We hope you enjoy your food!</p>
        <CartList className={styles.itemContainer} cartContent={cartContent} showThumbnail={true}/>
        <TotalPrice className={styles.totalPrice} totalPrice={totalPrice}/>
        <button className={styles.button} onClick={startNewOrder}>Start New Order</button>
      </div>
    </section>
  );
}

export default OrderConfirmation;