import { useCallback, useState } from 'react';
import * as styles from './SingletonViz.css';

type ModuleKey = 'Logger' | 'Database' | 'Cache';

interface RequestRecord {
  module: ModuleKey;
  instanceId: number;
  timestamp: string;
}

let instanceCounter = 0;

function getConfig() {
  instanceCounter++;
  const id = instanceCounter;
  return {
    instanceId: id,
    get: (key: string) => `config:${key}`,
  };
}

const MODULES: ModuleKey[] = ['Logger', 'Database', 'Cache'];

export default function SingletonViz() {
  const [records, setRecords] = useState<RequestRecord[]>([]);
  const [currentInstanceId, setCurrentInstanceId] = useState<number | null>(null);
  const [activeModule, setActiveModule] = useState<ModuleKey | null>(null);

  const requestConfig = useCallback((module: ModuleKey) => {
    const config = getConfig();
    setActiveModule(module);
    setCurrentInstanceId(config.instanceId);
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`;
    setRecords((prev) => [
      { module, instanceId: config.instanceId, timestamp: time },
      ...prev,
    ]);
  }, []);

  const moduleNodeClass = (m: ModuleKey) =>
    `${styles.moduleNode} ${activeModule === m ? styles.moduleNodeActive : ''}`;

  const firstInstance = records.length > 0 ? records[records.length - 1].instanceId : null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>Singleton — Глобальный конфиг</div>

      <div className={styles.schema}>
        <div className={moduleNodeClass('Logger')}>
          <span>📝</span>
          <span>Logger</span>
        </div>
        <span className={styles.arrowSymbol}>→</span>
        <div className={`${styles.singletonNode} ${styles.singletonGlow}`}>
          <span>⚙️</span>
          <span>Config</span>
          {currentInstanceId !== null && (
            <span className={`${styles.instanceBadge} ${styles.instanceBadgeMatch}`}>
              #{currentInstanceId}
            </span>
          )}
        </div>
        <span className={styles.arrowSymbol}>←</span>
        <div className={moduleNodeClass('Database')}>
          <span>🗄️</span>
          <span>Database</span>
        </div>
        <span className={styles.arrowSymbol}>←</span>
        <div className={moduleNodeClass('Cache')}>
          <span>⚡</span>
          <span>Cache</span>
        </div>
      </div>

      <div className={styles.buttonsRow}>
        {MODULES.map((m) => (
          <button
            key={m}
            type="button"
            className={styles.btn}
            onClick={() => requestConfig(m)}
          >
            Запросить Config из {m}
          </button>
        ))}
      </div>

      {records.length > 0 && (
        <div className={styles.resultCard}>
          {records.map((r, i) => (
            <div key={`${r.timestamp}-${r.module}-${i}`} className={styles.resultRow}>
              <span>{r.timestamp}</span>
              <span>{r.module}</span>
              <span className={styles.resultInstanceId}>#{r.instanceId}</span>
              {r.instanceId === firstInstance && firstInstance !== null && (
                <span className={styles.sameInstance}>✓ тот же экземпляр</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
