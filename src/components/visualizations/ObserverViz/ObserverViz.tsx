import { useCallback, useState } from 'react';
import * as styles from './ObserverViz.css';

type SubscriberKey = 'email' | 'push' | 'telegram';

interface Subscriber {
  key: SubscriberKey;
  label: string;
  emoji: string;
  message: string;
}

const SUBSCRIBERS: Subscriber[] = [
  { key: 'email', label: 'Email-подписчик', emoji: '📧', message: 'отправлено' },
  { key: 'push', label: 'Push-устройство', emoji: '🔔', message: 'push ушёл' },
  { key: 'telegram', label: 'Telegram-бот', emoji: '💬', message: 'бот ответил' },
];

interface FeedItem {
  id: number;
  title: string;
  time: string;
  notifications: { key: SubscriberKey; label: string; emoji: string; message: string }[];
}

export default function ObserverViz() {
  const [newsTitle, setNewsTitle] = useState('');
  const [activeSubs, setActiveSubs] = useState<Record<SubscriberKey, boolean>>({
    email: true,
    push: true,
    telegram: false,
  });
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [notifKey, setNotifKey] = useState(0);

  const toggleSub = useCallback((key: SubscriberKey) => {
    setActiveSubs((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const publish = useCallback(() => {
    const title = newsTitle.trim();
    if (!title) return;

    const notifications = SUBSCRIBERS.filter((s) => activeSubs[s.key]).map((s) => ({
      key: s.key,
      label: s.label,
      emoji: s.emoji,
      message: s.message,
    }));

    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

    setFeed((prev) => [{ id: Date.now(), title, time, notifications }, ...prev]);
    setNewsTitle('');
    setNotifKey((k) => k + 1);
  }, [newsTitle, activeSubs]);

  const clearFeed = useCallback(() => setFeed([]), []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') publish();
    },
    [publish],
  );

  const hasActive = Object.values(activeSubs).some(Boolean);

  return (
    <div className={styles.container}>
      <div className={styles.header}>Observer — Новостная лента</div>

      <div className={styles.chain}>
        <div className={`${styles.chainNode} ${styles.chainNodeActive}`}>
          <span>📰</span>
          <span>Publisher</span>
        </div>
        <span className={styles.chainArrow}>→</span>
        <div className={styles.chainNode}>
          <span>👁️</span>
          <span>Observer</span>
        </div>
        <span className={styles.chainArrow}>→</span>
        <div className={styles.chainNode}>
          <span>📬</span>
          <span>Subscribers</span>
        </div>
      </div>

      <div className={styles.inputRow}>
        <input
          className={styles.input}
          type="text"
          placeholder="Заголовок новости..."
          value={newsTitle}
          onChange={(e) => setNewsTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          className={styles.publishBtn}
          onClick={publish}
          disabled={!newsTitle.trim() || !hasActive}
        >
          Опубликовать
        </button>
      </div>

      <div className={styles.mainRow}>
        <div className={styles.sidebar}>
          <div className={styles.sidebarTitle}>Подписчики</div>
          {SUBSCRIBERS.map((sub) => (
            <label key={sub.key} className={styles.subscriberRow}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={activeSubs[sub.key]}
                onChange={() => toggleSub(sub.key)}
              />
              <span className={styles.subscriberLabel}>{sub.label}</span>
            </label>
          ))}
        </div>

        <div className={styles.content}>
          <div className={styles.feedTitle}>Лента новостей</div>
          <div className={styles.feedList}>
            {feed.length === 0 && (
              <div className={styles.emptyFeed}>Пока нет новостей</div>
            )}
            {feed.map((item) => (
              <div key={item.id} className={styles.feedItem}>
                <span>{item.title}</span>
                <span className={styles.feedTime}>{item.time}</span>
              </div>
            ))}
          </div>
          <button type="button" className={styles.clearBtn} onClick={clearFeed}>
            Очистить ленту
          </button>
        </div>
      </div>

      {feed.length > 0 && (
        <div className={styles.sidebar} style={{ minWidth: '100%' }}>
          <div className={styles.sidebarTitle}>Уведомления</div>
          {feed[0].notifications.map((n) => (
            <div key={`${feed[0].id}-${n.key}`} className={styles.subscriberRow}>
              <span className={styles.subscriberLabel}>
                {n.emoji} {n.label}
              </span>
              <span className={styles.badge} key={notifKey}>
                {n.emoji} {n.message}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
