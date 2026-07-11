import { useCallback, useEffect, useRef, useState } from 'react';
import * as styles from './FactoryViz.css';

type TransportType = 'truck' | 'ship' | 'plane';

interface TransportInfo {
  label: string;
  emoji: string;
  deliverMessage: string;
}

const TRANSPORTS: Record<TransportType, TransportInfo> = {
  truck: {
    label: 'Авто',
    emoji: '🚚',
    deliverMessage: 'Truck доставил посылку по дороге в точку B',
  },
  ship: {
    label: 'Море',
    emoji: '🚢',
    deliverMessage: 'Ship доставил посылку морем в порт назначения',
  },
  plane: {
    label: 'Воздух',
    emoji: '✈️',
    deliverMessage: 'Plane доставил посылку по воздуху в точку B',
  },
};

type Phase = 'idle' | 'creating' | 'moving' | 'delivered';

const PHASE_DURATIONS: Record<Exclude<Phase, 'idle'>, number> = {
  creating: 1200,
  moving: 2000,
  delivered: 2000,
};

export default function FactoryViz() {
  const [selected, setSelected] = useState<TransportType>('truck');
  const [phase, setPhase] = useState<Phase>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isRunning = phase !== 'idle';

  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => () => cleanup(), [cleanup]);

  const runDelivery = useCallback(() => {
    if (isRunning) return;
    cleanup();

    setPhase('creating');
    timerRef.current = setTimeout(() => {
      setPhase('moving');
      timerRef.current = setTimeout(() => {
        setPhase('delivered');
        timerRef.current = setTimeout(() => {
          setPhase('idle');
        }, PHASE_DURATIONS.delivered);
      }, PHASE_DURATIONS.moving);
    }, PHASE_DURATIONS.creating);
  }, [isRunning, cleanup]);

  const handleSelect = useCallback(
    (t: TransportType) => {
      if (!isRunning) setSelected(t);
    },
    [isRunning],
  );

  const transport = TRANSPORTS[selected];

  const renderStage = () => {
    switch (phase) {
      case 'idle':
        return (
          <div className={styles.idleMessage}>
            Выберите транспорт и нажмите «Запустить доставку»
          </div>
        );
      case 'creating':
        return (
          <div className={styles.stageCard}>
            <span className={styles.vehicleEmoji}>{transport.emoji}</span>
            <span className={styles.stageMessage}>
              Создаём {transport.label}...
            </span>
            <span className={styles.methodBadge}>factory.create()</span>
          </div>
        );
      case 'moving':
        return (
          <div className={styles.stageCard}>
            <span className={styles.vehicleEmoji}>{transport.emoji}</span>
            <span className={styles.stageMessage}>
              {transport.label} в пути
            </span>
            <span className={styles.methodBadge}>transport.deliver()</span>
          </div>
        );
      case 'delivered':
        return (
          <div className={styles.stageCard}>
            <span className={styles.vehicleEmoji}>{transport.emoji}</span>
            <span className={styles.stageMessage}>
              {transport.deliverMessage}
            </span>
            <span className={styles.methodBadge}>deliver() ✓</span>
          </div>
        );
    }
  };

  const nodePhase = (p: Phase) =>
    phase === p ? `${styles.chainNode} ${styles.chainNodeActive}` : styles.chainNode;

  return (
    <div className={styles.container}>
      <div className={styles.header}>Factory Method — Логистика</div>

      <div className={styles.chain}>
        <div className={nodePhase('idle')}>
          <span>👤</span>
          <span>Client</span>
        </div>
        <span className={styles.chainArrow}>→</span>
        <div className={nodePhase('creating')}>
          <span>🏭</span>
          <span>Factory</span>
        </div>
        <span className={styles.chainArrow}>→</span>
        <div
          className={
            phase === 'moving' || phase === 'delivered'
              ? `${styles.chainNode} ${styles.chainNodeActive}`
              : styles.chainNode
          }
        >
          <span>{transport.emoji}</span>
          <span>Product</span>
        </div>
      </div>

      <div className={styles.buttonsRow}>
        {(
          Object.entries(TRANSPORTS) as [
            TransportType,
            TransportInfo,
          ][]
        ).map(([key, info]) => (
          <button
            key={key}
            type="button"
            className={`${styles.btn} ${
              selected === key ? styles.btnSelected : ''
            } ${isRunning ? styles.btnDisabled : ''}`}
            onClick={() => handleSelect(key)}
            disabled={isRunning}
          >
            {info.emoji} {info.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          type="button"
          className={`${styles.startBtn} ${
            isRunning ? styles.startBtnDisabled : ''
          }`}
          onClick={runDelivery}
          disabled={isRunning}
        >
          {isRunning ? 'Доставка...' : 'Запустить доставку'}
        </button>
      </div>

      {renderStage()}
    </div>
  );
}
