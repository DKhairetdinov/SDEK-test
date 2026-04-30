import { IconEye, IconThumbUp } from "@tabler/icons-react";
import type { NewsItem } from "../../types/news";
import styles from "./NewsCard.module.css";

interface NewsCardProps {
  item: NewsItem;
  showImage: boolean;
  isFirst: boolean;
  variant: 'company' | 'business';
  isMobile: boolean;
}

const API_HOST = 'http://1e14c3489fcb.vps.myjino.ru:5000';

export function NewsCard({ item, showImage, isFirst, variant, isMobile }: NewsCardProps) {
  const plug = item?.cover?.images[0]?.m;
  const imageUrl = plug ? `${API_HOST}${plug}` : undefined;

  const formattedDate = new Date(item.publishedAt).toLocaleString('ru-RU', {
    day: 'numeric', month: 'long', hour: "2-digit", minute: '2-digit'
  });

const isLarge = isFirst && (variant === 'business' || isMobile);
const isCompact = !isFirst && (variant === 'business' || isMobile);

const cardClasses = [
    styles.card,
    isLarge ? styles.largeCard : '',
    isCompact ? styles.compact : ''
].filter(Boolean).join(' ');

  return (
    <article className={cardClasses}>
    
      {showImage && imageUrl && (
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={imageUrl} alt={item.title}/>
        </div>
      )}

      <div className={styles.content}>
        <div>
          <span className={styles.date}>{formattedDate}</span>
          <h3 className={styles.title}>{item.title}</h3>
        </div>

        <div className={styles.footer}>
          <div className={styles.tags}>
            {item.rubrics?.map(rubric => (
              <span key={rubric.id} className={styles.tag}>
                {rubric.name}
              </span>
            ))}
          </div>
          
          <div className={styles.stats}>
            <span className={styles.statItem}>
              <IconThumbUp size={16}/> {item.likeCount}
            </span>
            <span className={styles.statItem}>
              <IconEye size={16}/> {item.viewCount}
            </span>
          </div>
        </div>
      </div>

    </article>
  )
}