import styles from "./NewsCard.module.css";

export function NewsCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={`${styles.skeleton} ${styles.skeletonImage}`} />
      
      <div className={styles.content}>
        <div>
          <div className={`${styles.skeleton} ${styles.skeletonSmall}`} />
          <div className={`${styles.skeleton} ${styles.skeletonText}`} />
          <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{width: '60%'}} />
        </div>

        <div className={styles.footer}>
          <div className={`${styles.skeleton}`} style={{width: '100px', height: '24px'}} />
          <div className={`${styles.skeleton}`} style={{width: '60px', height: '20px'}} />
        </div>
      </div>
    </div>
  );
}