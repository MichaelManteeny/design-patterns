import { useCallback, useMemo, useState } from 'react';
import * as styles from './StrategyViz.css';

type StrategyKey = 'courier' | 'post' | 'pickup';

interface Strategy {
  key: StrategyKey;
  label: string;
  emoji: string;
  description: string;
  calculate: (weight: number, distance: number, fragile: number) => { formula: string; price: number };
}

const STRATEGIES: Strategy[] = [
  {
    key: 'courier',
    label: 'Курьер (быстро, дорого)',
    emoji: '🚚',
    description: 'Быстрая доставка курьером',
    calculate: (weight, distance, fragile) => {
      const base = 100;
      const price = base * weight + distance * 50 + fragile * 80;
      return { formula: `${base} × ${weight} + ${distance} × 50${fragile ? ' + 80' : ''}`, price };
    },
  },
  {
    key: 'post',
    label: 'Почта (медленно, дёшево)',
    emoji: '📮',
    description: 'Дешёвая почтовая доставка',
    calculate: (weight, distance, fragile) => {
      const base = 50;
      const price = base * weight + distance * 15 + fragile * 30;
      return { formula: `${base} × ${weight} + ${distance} × 15${fragile ? ' + 30' : ''}`, price };
    },
  },
  {
    key: 'pickup',
    label: 'Самовывоз (бесплатно)',
    emoji: '🏪',
    description: 'Забрать самостоятельно',
    calculate: () => ({ formula: '0', price: 0 }),
  },
];

export default function StrategyViz() {
  const [weight, setWeight] = useState<number>(1);
  const [distance, setDistance] = useState<number>(10);
  const [fragile, setFragile] = useState(false);
  const [selected, setSelected] = useState<StrategyKey>('courier');
  const [resultKey, setResultKey] = useState(0);

  const activeStrategy = useMemo(
    () => STRATEGIES.find((s) => s.key === selected)!,
    [selected],
  );

  const result = useMemo(() => {
    return activeStrategy.calculate(weight, distance, fragile ? 1 : 0);
  }, [activeStrategy, weight, distance, fragile]);

  const selectStrategy = useCallback(
    (key: StrategyKey) => {
      setSelected(key);
      setResultKey((k) => k + 1);
    },
    [],
  );

  const contextNodeClass = (key: StrategyKey) =>
    `${styles.contextStrategy} ${selected === key ? styles.contextStrategyActive : ''}`;

  return (
    <div className={styles.container}>
      <div className={styles.header}>Strategy — Калькулятор доставки</div>

      <div className={styles.chain}>
        <div className={`${styles.chainNode} ${styles.chainNodeActive}`}>
          <span>👤</span>
          <span>Client</span>
        </div>
        <span className={styles.chainArrow}>→</span>
        <div className={`${styles.chainNode} ${styles.chainNodeActive}`}>
          <span>⚙️</span>
          <span>Context</span>
        </div>
        <span className={styles.chainArrow}>→</span>
        <div className={`${styles.chainNode} ${styles.chainNodeActive}`}>
          <span>{activeStrategy.emoji}</span>
          <span>Strategy</span>
        </div>
      </div>

      <div className={styles.inputsRow}>
        <div className={styles.fieldGroup}>
          <span className={styles.fieldLabel}>Вес (кг)</span>
          <input
            type="number"
            className={styles.input}
            min={0.1}
            step={0.5}
            value={weight}
            onChange={(e) => setWeight(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
          />
        </div>
        <div className={styles.fieldGroup}>
          <span className={styles.fieldLabel}>Расстояние (км)</span>
          <input
            type="number"
            className={styles.input}
            min={0}
            step={1}
            value={distance}
            onChange={(e) => setDistance(Math.max(0, parseInt(e.target.value) || 0))}
          />
        </div>
        <label className={styles.checkboxRow}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={fragile}
            onChange={(e) => setFragile(e.target.checked)}
          />
          <span className={styles.checkboxLabel}>Хрупкое</span>
        </label>
      </div>

      <div className={styles.strategyRow}>
        {STRATEGIES.map((s) => (
          <button
            key={s.key}
            type="button"
            className={`${styles.btn} ${selected === s.key ? styles.btnSelected : ''}`}
            onClick={() => selectStrategy(s.key)}
          >
            {s.emoji} {s.label}
          </button>
        ))}
      </div>

      <div className={styles.contextCard}>
        <div className={styles.contextTitle}>DeliveryContext</div>
        {STRATEGIES.map((s) => (
          <div key={s.key} className={contextNodeClass(s.key)}>
            <span>{s.emoji}</span>
            <span>{s.description}</span>
          </div>
        ))}
      </div>

      <div className={styles.resultCard} key={resultKey}>
        <div className={styles.formulaText}>{result.formula}</div>
        <div className={styles.priceText}>{result.price} ₽</div>
      </div>
    </div>
  );
}
