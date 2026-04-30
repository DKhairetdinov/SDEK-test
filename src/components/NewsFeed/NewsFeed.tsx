import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import type { ApiRecovery } from "../../types/news";
import { NewsCard } from "../NewsCard/NewsCard";
import { useEffect, useState } from "react";
import { fetchNews } from "../../services/api";
import styles from "./NewsFeed.module.css";
import { NewsCardSkeleton } from "../NewsCard/NewsCardSkeleton";

interface NewsFeedProps {
    title: string;
    variant: 'company' | 'business';
    isEmpty?: boolean;
}

export function NewsFeed({ title, variant, isEmpty = false }: NewsFeedProps) {
    const [data, setData] = useState<ApiRecovery | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 990);
    const [error, setError] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 990);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setLoading(true);
        setError(false);

        fetchNews(currentPage, 3, isEmpty)
            .then(res => {
                setData(res);
                setLoading(false);
            })
            .catch(() => {
                setError(true)
                setLoading(false);
            });
    }, [currentPage, isEmpty]);

    return (
        <section className={styles.feedWrapper}>
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.subtitle}>Август, 2025</div>
            </div>

            <div className={styles.list}>
                {loading ? (
                    <>
                        <NewsCardSkeleton />
                        <NewsCardSkeleton />
                        <NewsCardSkeleton />
                    </>
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                        <p style={{ color: '#E74C3C', fontWeight: 'bold' }}>Не удалось загрузить новости</p>
                        <button 
                            onClick={() => window.location.reload()}
                            style={{ cursor: 'pointer', padding: '8px 16px', borderRadius: '6px', border: '1px solid #ddd' }}
                        >
                            Попробовать снова
                        </button>
                    </div>
                ) : (!data || data.news.length === 0) ? (
                    <div className={styles.emptyContent}>
                        <img src="/empty.png" alt="Пусто" className={styles.emptyImg} />
                        <p className={styles.emptyText}>Новых новостей нет</p>
                    </div>
                ) : (
                    data.news.map((item, index) => {
                        const isFirst = index === 0;
                        const shouldShowImage = isMobile 
                            ? isFirst 
                            : (variant === 'company' || (variant === 'business' && isFirst));

                        return (
                            <NewsCard 
                                key={item.id}
                                item={item}
                                variant={variant}
                                isFirst={isFirst}
                                showImage={shouldShowImage}
                                isMobile={isMobile}
                            />
                        );
                    })
                )}
            </div>

            {(data && data.news.length > 0 && !error && !loading) && (
                <div className={styles.pagination}>
                    <button 
                        className={styles.navBtn}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        disabled={currentPage === 1 || loading}
                    >
                        <IconChevronLeft size={18} />
                    </button>
                    <button 
                        className={styles.navBtn}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        disabled={currentPage === data.totalPages || loading}
                    >
                        <IconChevronRight size={18} />
                    </button>
                </div>
            )}
        </section>
    );
}