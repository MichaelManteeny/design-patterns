import { useMemo, useState } from 'react';
import * as styles from './StateViz.css';

type OrderState = 'created' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

type ActionTone = 'primary' | 'success' | 'danger';

interface StateMeta {
  label: string;
  icon: string;
  description: string;
}

interface StateAction {
  label: string;
  to: OrderState;
  tone: ActionTone;
}

interface HistoryItem {
  id: number;
  from: OrderState;
  to: OrderState;
  action: string;
  time: string;
}

const STATE_FLOW: OrderState[] = ['created', 'paid', 'shipped', 'delivered'];

const STATE_META: Record<OrderState, StateMeta> = {
  created: {
    label: 'Создан',
    icon: '🧾',
    description: 'Заказ оформлен, но оплата ещё не поступила.',
  },
  paid: {
    label: 'Оплачен',
    icon: '💳',
    description: 'Платёж подтверждён, склад готовит отправку.',
  },
  shipped: {
    label: 'Отправлен',
    icon: '🚚',
    description: 'Посылка в пути, ожидаем подтверждение доставки.',
  },
  delivered: {
    label: 'Доставлен',
    icon: '📦',
    description: 'Покупатель получил заказ, процесс завершён.',
  },
  cancelled: {
    label: 'Отменён',
    icon: '⛔',
    description: 'Заказ закрыт без дальнейших переходов.',
  },
};

const ACTIONS: Record<OrderState, StateAction[]> = {
  created: [
    { label: 'Оплатить', to: 'paid', tone: 'success' },
    { label: 'Отменить', to: 'cancelled', tone: 'danger' },
  ],
  paid: [
    { label: 'Отправить', to: 'shipped', tone: 'primary' },
    { label: 'Отменить (возврат)', to: 'cancelled', tone: 'danger' },
  ],
  shipped: [
    { label: 'Отметить доставленным', to: 'delivered', tone: 'success' },
  ],
  delivered: [],
  cancelled: [],
};

const formatTime = () =>
  new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());

export default function StateViz() {
  const [currentState, setCurrentState] = useState<OrderState>('created');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [lastTransition, setLastTransition] = useState<HistoryItem | null>(null);
  const [transitionCount, setTransitionCount] = useState(0);

  const availableActions = ACTIONS[currentState];

  const currentIndex = useMemo(
    () => STATE_FLOW.indexOf(currentState),
    [currentState],
  );

  const moveTo = (action: StateAction) => {
    const item: HistoryItem = {
      id: transitionCount + 1,
      from: currentState,
      to: action.to,
      action: action.label,
      time: formatTime(),
    };

    setCurrentState(action.to);
    setLastTransition(item);
    setHistory((prev) => [...prev, item]);
    setTransitionCount((count) => count + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>State — Заказ в интернет-магазине</div>

      <section className={styles.currentPanel} aria-live="polite">
        <div key={`${currentState}-${transitionCount}`} className={styles.currentStateCard}>
          <span className={styles.currentIcon}>{STATE_META[currentState].icon}</span>
          <div>
            <div className={styles.currentLabel}>Текущее состояние: {STATE_META[currentState].label}</div>
            <div className={styles.currentDescription}>{STATE_META[currentState].description}</div>
          </div>
        </div>
      </section>

      <section className={styles.machineCard}>
        <div className={styles.machineTitle}>Конечный автомат заказа</div>
        <div className={styles.stateTrack}>
          {STATE_FLOW.map((state, index) => {
            const isActive = currentState === state;
            const isPassed = currentIndex > index && currentState !== 'cancelled';
            return (
              <div key={state} className={styles.flowStepWrap}>
                <div
                  className={[
                    styles.flowStep,
                    isActive ? styles.flowStepActive : '',
                    isPassed ? styles.flowStepDone : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <span className={styles.flowIcon}>{STATE_META[state].icon}</span>
                  <span>{STATE_META[state].label}</span>
                </div>
                {index < STATE_FLOW.length - 1 && <div className={styles.connector}>→</div>}
              </div>
            );
          })}
        </div>

        <div
          key={lastTransition ? lastTransition.id : 'idle'}
          className={lastTransition ? styles.transitionRibbon : styles.transitionIdle}
        >
          {lastTransition ? (
            <>
              <span>{STATE_META[lastTransition.from].label}</span>
              <span className={styles.transitionArrow}>→</span>
              <span>{STATE_META[lastTransition.to].label}</span>
              <span className={styles.transitionTime}>в {lastTransition.time}</span>
            </>
          ) : (
            'Выберите доступное действие, чтобы увидеть переход состояния.'
          )}
        </div>

        <div
          className={[
            styles.cancelState,
            currentState === 'cancelled' ? styles.cancelStateActive : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <span className={styles.flowIcon}>{STATE_META.cancelled.icon}</span>
          <span>{STATE_META.cancelled.label}</span>
          <span className={styles.cancelNote}>терминальное состояние</span>
        </div>
      </section>

      <section className={styles.actionsPanel}>
        <div className={styles.sectionTitle}>Доступные действия</div>
        {availableActions.length > 0 ? (
          <div className={styles.actionsRow}>
            {availableActions.map((action) => (
              <button
                key={action.label}
                type="button"
                className={[
                  styles.actionButton,
                  action.tone === 'primary' ? styles.actionPrimary : '',
                  action.tone === 'success' ? styles.actionSuccess : '',
                  action.tone === 'danger' ? styles.actionDanger : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => moveTo(action)}
              >
                {action.label}
              </button>
            ))}
          </div>
        ) : (
          <div className={styles.noActions}>Действий нет — состояние терминальное.</div>
        )}
      </section>

      <section className={styles.historyPanel}>
        <div className={styles.sectionTitle}>История переходов</div>
        {history.length > 0 ? (
          <ol className={styles.historyList}>
            {history.map((item) => (
              <li key={item.id} className={styles.historyItem}>
                <span>
                  {STATE_META[item.from].label} → {STATE_META[item.to].label}
                </span>
                <span className={styles.historyMeta}>в {item.time}</span>
              </li>
            ))}
          </ol>
        ) : (
          <div className={styles.emptyHistory}>Переходов пока нет.</div>
        )}
      </section>
    </div>
  );
}
