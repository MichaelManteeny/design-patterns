import { useCallback, useMemo, useState } from 'react';
import * as styles from './DecoratorViz.css';

type AddonKey = 'milk' | 'sugar' | 'syrup' | 'cinnamon';

interface Addon {
  key: AddonKey;
  label: string;
  icon: string;
  price: number;
}

const BASE_NAME = 'Простой эспрессо';
const BASE_PRICE = 100;

const ADDONS: Addon[] = [
  { key: 'milk', label: 'Молоко', icon: '🥛', price: 30 },
  { key: 'sugar', label: 'Сахар', icon: '🍬', price: 10 },
  { key: 'syrup', label: 'Сироп', icon: '🍯', price: 50 },
  { key: 'cinnamon', label: 'Корица', icon: '🌿', price: 20 },
];

export default function DecoratorViz() {
  const [selected, setSelected] = useState<Set<AddonKey>>(new Set());

  const toggle = useCallback((key: AddonKey) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const chain = useMemo(
    () => ADDONS.filter((a) => selected.has(a.key)),
    [selected],
  );

  const totalPrice = useMemo(
    () => BASE_PRICE + chain.reduce((sum, a) => sum + a.price, 0),
    [chain],
  );

  const chainDescription = useMemo(() => {
    if (chain.length === 0) return `${BASE_NAME} (${BASE_PRICE}₽)`;
    let result = `${BASE_NAME}`;
    for (const a of chain) {
      result += ` → ${a.label} (+${a.price}₽)`;
    }
    return result;
  }, [chain]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>Decorator — Кофе с добавками</div>

      <div className={styles.coffeeArea}>
        <div className={styles.coffeeHeader}>
          <span className={styles.coffeeIcon}>☕</span>
          <span className={styles.coffeeTotal}>{totalPrice} ₽</span>
        </div>

        <div className={styles.stack}>
          {chain.length === 0 && (
            <div className={`${styles.layer} ${styles.baseLayer}`}>
              <span>{BASE_NAME}</span>
              <span className={styles.layerPrice}>{BASE_PRICE}₽</span>
            </div>
          )}
          {chain.length > 0 && (
            <div className={`${styles.layer} ${styles.baseLayer}`}>
              <span>{BASE_NAME}</span>
              <span className={styles.layerPrice}>{BASE_PRICE}₽</span>
            </div>
          )}
          {chain.map((a, i) => (
            <div
              key={a.key}
              className={`${styles.layer} ${styles.decoratorLayer} ${styles[`layer${i % 4}`]}`}
            >
              <span>
                {a.icon} + {a.label}
              </span>
              <span className={styles.layerPrice}>+{a.price}₽</span>
            </div>
          ))}
        </div>

        <div className={styles.chainDesc}>
          <span className={styles.chainLabel}>Цепочка:</span>
          <code className={styles.chainCode}>{chainDescription}</code>
        </div>
      </div>

      <div className={styles.addonsArea}>
        <div className={styles.addonsTitle}>Добавки</div>
        <div className={styles.addonsGrid}>
          {ADDONS.map((a) => {
            const checked = selected.has(a.key);
            return (
              <label
                key={a.key}
                className={`${styles.addonCard} ${checked ? styles.addonCardChecked : ''}`}
              >
                <input
                  type="checkbox"
                  className={styles.addonCheckbox}
                  checked={checked}
                  onChange={() => toggle(a.key)}
                />
                <span className={styles.addonIcon}>{a.icon}</span>
                <span className={styles.addonLabel}>{a.label}</span>
                <span className={styles.addonPrice}>+{a.price}₽</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}