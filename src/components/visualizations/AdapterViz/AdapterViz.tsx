import { useCallback, useState } from 'react';
import * as styles from './AdapterViz.css';

type Phase = 'idle' | 'sending' | 'translating' | 'delivering' | 'done';

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
}

const SAMPLE_USER: UserData = {
  id: 42,
  name: 'Иван Петров',
  email: 'ivan@example.com',
  role: 'developer',
};

function toXml(user: UserData): string {
  return `<user>
  <id>${user.id}</id>
  <name>${user.name}</name>
  <email>${user.email}</email>
  <role>${user.role}</role>
</user>`;
}

function fromXml(xml: string): UserData {
  const extract = (tag: string): string => {
    const match = xml.match(new RegExp(`<${tag}>(.*?)</${tag}>`, 's'));
    return match ? match[1].trim() : '';
  };
  return {
    id: Number(extract('id')),
    name: extract('name'),
    email: extract('email'),
    role: extract('role'),
  };
}

let runCounter = 0;

export default function AdapterViz() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [runId, setRunId] = useState<number>(0);
  const [legacyOut, setLegacyOut] = useState<string>('');
  const [modernOut, setModernOut] = useState<string>('');

  const sendRequest = useCallback(() => {
    runCounter++;
    const id = runCounter;
    setRunId(id);
    setLegacyOut('');
    setModernOut('');

    setPhase('sending');
    window.setTimeout(() => {
      setPhase('translating');
      window.setTimeout(() => {
        const xml = toXml(SAMPLE_USER);
        setLegacyOut(xml);
        window.setTimeout(() => {
          const json = fromXml(xml);
          setModernOut(JSON.stringify(json, null, 2));
          setPhase('delivering');
          window.setTimeout(() => setPhase('done'), 400);
        }, 350);
      }, 350);
    }, 350);
  }, []);

  const reset = useCallback(() => {
    setPhase('idle');
    setRunId(0);
    setLegacyOut('');
    setModernOut('');
  }, []);

  const isAnimating = phase !== 'idle' && phase !== 'done';

  const legacyBoxClass = `${styles.clientBox} ${styles.legacyClient} ${
    phase === 'sending' ? styles.clientActive : ''
  } ${phase === 'delivering' || phase === 'done' ? styles.clientReceived : ''}`;

  const adapterClass = `${styles.adapterBox} ${
    phase === 'translating' ? styles.adapterActive : ''
  }`;

  const modernBoxClass = `${styles.clientBox} ${styles.modernClient} ${
    phase === 'delivering' ? styles.clientActive : ''
  } ${phase === 'done' ? styles.clientReceived : ''}`;

  return (
    <div className={styles.container}>
      <div className={styles.header}>Adapter — XML ↔ JSON</div>

      <div className={styles.schema}>
        <div className={legacyBoxClass}>
          <div className={styles.clientLabel}>📟 Старый клиент</div>
          <div className={styles.clientSub}>ожидает XML</div>
          {legacyOut && (
            <pre className={styles.payloadPre}>{legacyOut}</pre>
          )}
        </div>

        <div className={styles.arrowArea}>
          <div className={styles.arrowLine}>
            <span className={styles.arrowHead}>→</span>
          </div>
          <div className={adapterClass}>
            <div className={styles.adapterTitle}>🔌 Adapter</div>
            <div className={styles.adapterSub}>XML → JSON</div>
          </div>
          <div className={styles.arrowLine}>
            <span className={styles.arrowHead}>→</span>
          </div>
        </div>

        <div className={modernBoxClass}>
          <div className={styles.clientLabel}>✨ Новый клиент</div>
          <div className={styles.clientSub}>ожидает JSON</div>
          {modernOut && (
            <pre className={styles.payloadPre}>{modernOut}</pre>
          )}
        </div>
      </div>

      <div className={styles.statusBar}>
        {phase === 'idle' && <span>Готов к запросу</span>}
        {phase === 'sending' && <span>📤 Старый клиент отправляет XML…</span>}
        {phase === 'translating' && <span>🔄 Adapter конвертирует XML → JSON…</span>}
        {phase === 'delivering' && <span>📥 Новый клиент получает JSON…</span>}
        {phase === 'done' && <span className={styles.statusDone}>✅ Оба клиента получили данные</span>}
      </div>

      <div className={styles.buttonsRow}>
        <button
          type="button"
          className={styles.btnPrimary}
          onClick={sendRequest}
          disabled={isAnimating}
        >
          Отправить запрос
        </button>
        <button type="button" className={styles.btnSecondary} onClick={reset} disabled={isAnimating}>
          Сбросить
        </button>
      </div>

      {runId > 0 && (legacyOut || modernOut) && (
        <div className={styles.history}>
          <div className={styles.historyTitle}>Запрос #{runId}</div>
          <div className={styles.historyGrid}>
            <div>
              <div className={styles.historyLabel}>XML (legacy)</div>
              <pre className={styles.historyPre}>{legacyOut || '—'}</pre>
            </div>
            <div>
              <div className={styles.historyLabel}>JSON (modern)</div>
              <pre className={styles.historyPre}>{modernOut || '—'}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}