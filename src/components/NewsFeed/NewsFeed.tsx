import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import type {  ApiRecovery } from "../../types/news";
import { NewsCard } from "../NewsCard/NewsCard";
import { useEffect, useState } from "react";
import { fetchNews } from "../../services/api";

interface NewsFeedProps {
    title: string;
    variant: 'company' | 'business';
    isEmpty?: boolean;
}

export function NewsFeed({ title, variant, isEmpty = false }: NewsFeedProps) {
    const [data, setData] = useState<ApiRecovery | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        
        fetchNews(currentPage, 3, isEmpty)
            .then(res => {
                setData(res);
                setLoading(false);
            })
            .catch(() => setLoading(false));

    }, [currentPage, setLoading, isEmpty]);

    if(loading && !data) return <div>Загрузка...</div>;

    if(!data || data.news.length === 0) {
        return (
            <section>
                <h2>{title}</h2>
                <p>Новых новостей нет</p>
            </section>
        );
    }
    return(
        <section>
           <h2>{title}</h2>
           <div>
                <div>
                    {data.news.map((item, index) => (
                        <NewsCard 
                            key={item.id}
                            item={item}
                            showImage={variant === 'company' || (variant === 'business' && index === 0)}/>
                    ))}
                </div>
                <div>
                    <button 
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        disabled={currentPage === 1 || loading}
                    >
                        <IconChevronLeft />
                    </button>
                    <button 
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        disabled={currentPage === data.totalPages || loading}
                    >
                        <IconChevronRight />
                    </button>
                </div>
            </div>
        </section>
    )
}