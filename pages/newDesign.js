import React from "react";
import styles from "../styles/NewDesign.module.css";

const NewDesign = () => {
  return (
    <div className={styles.bigContainer}>
      <div className={styles.container}>
        <div className={styles.roomTypeHeading}>
          <h2>Deluxe Room</h2>
        </div>
        <div className={styles.secondSection}>
          <div className={styles.roomTypeheading}>
            <h3>Deluxe Room with Buffet</h3>
          </div>
          <div className={styles.dateContainer}>
            <div className={styles.date}>
              <h4>Tue</h4>
              <p>23</p>
            </div>
            <div className={styles.date}>
              <h4>Wed</h4>
              <p>24</p>
            </div>
            <div className={styles.date}>
              <h4>Thu</h4>
              <p>25</p>
            </div>
            <div className={styles.date}>
              <h4>Fri</h4>
              <p>26</p>
            </div>
            <div className={styles.date}>
              <h4>Sat</h4>
              <p>27</p>
            </div>
            <div className={styles.date}>
              <h4>Sun</h4>
              <p>28</p>
            </div>
            <div className={styles.date}>
              <h4>Mon</h4>
              <p>29</p>
            </div>
          </div>
        </div>
        <div className={styles.thirdSection}>
          <div className={styles.otaBox}>
            <div className={styles.otaContainer}>
              <div className={styles.ota}>
                <div className={styles.otaImage}>
                  <img
                    src="https://book-one-pos.vercel.app/Logo_Bookone-Vertical-1.svg"
                    alt=""
                  />
                </div>
                <div className={styles.otaDesc}>
                  <h5>Bookone</h5>
                  <p>(Deluxe Room with Buffet)</p>
                </div>
              </div>
            </div>
            <div className={styles.otaStockPrice}>
              <p>Stock: </p>
              <p>Price: </p>
            </div>
          </div>
          <div className={styles.otaPriceAvailability}>
            <div className={styles.priceContainer}>
              <p>10</p>
              <p>$10</p>
            </div>
            <div className={styles.priceContainer}>
              <p>10</p>
              <p>$10</p>
            </div>
            <div className={styles.priceContainer}>
              <p>10</p>
              <p>$10</p>
            </div>
            <div className={styles.priceContainer}>
              <p>10</p>
              <p>$10</p>
            </div>
            <div className={styles.priceContainer}>
              <p>10</p>
              <p>$10</p>
            </div>
            <div className={styles.priceContainer}>
              <p>10</p>
              <p>$10</p>
            </div>
            <div className={styles.priceContainer}>
              <p>10</p>
              <p>$10</p>
            </div>
            <div className={styles.priceContainer}>
              <p>10</p>
              <p>$10</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDesign;
