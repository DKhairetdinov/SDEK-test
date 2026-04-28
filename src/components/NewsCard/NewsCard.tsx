import { IconEye, IconThumbUp } from "@tabler/icons-react";
import type { NewsItem } from "../../types/news";

interface NewsCardProps {
  item: NewsItem;
  showImage: boolean;
}

export function NewCard({ item, showImage}: NewsCardProps) {
  
  const formattedDate = new Date(item.publishedAt).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: "2-digit",
    minute: '2-digit'
  });

  return (
    <article>
      
      {showImage && item.cover && (
        <div>
          <img
            src={item.cover.images[0].m}
            alt={item.title}
            />
        </div>
      )}

      <div>
        <div>
          <span>{formattedDate}</span>
          <h3>{item.title}</h3>
        </div>

        <div>
          <div>
            {item.rubrics?.map(rubric => (
              <span key={rubric.id}>
                {rubric.name}
              </span>
            ))}
          </div>
          
          <div>
            <span>
              <IconThumbUp size={16}/> {item.likeCount}
            </span>
            <span>
              <IconEye size={16}/> {item.viewCount}
            </span>
          </div>
        </div>
      </div>

    </article>
  )

}