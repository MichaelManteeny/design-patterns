import { useCallback, useMemo, useRef, useState } from 'react';
import * as styles from './CompositeViz.css';

interface OrgNode {
  id: string;
  name: string;
  type: 'department' | 'employee';
  salary?: number;
  children: OrgNode[];
}

let idCounter = 0;
const nextId = () => {
  idCounter++;
  return `n${idCounter}`;
};

const seedTree = (): OrgNode => ({
  id: 'root',
  name: 'CEO Анна',
  type: 'department',
  children: [
    {
      id: 'dev',
      name: 'Отдел разработки',
      type: 'department',
      children: [
        {
          id: 'frontend',
          name: 'Frontend подотдел',
          type: 'department',
          children: [
            { id: 'emp1', name: 'Иван', type: 'employee', salary: 250000, children: [] },
            { id: 'emp2', name: 'Мария', type: 'employee', salary: 280000, children: [] },
          ],
        },
        {
          id: 'backend',
          name: 'Backend подотдел',
          type: 'department',
          children: [
            { id: 'emp3', name: 'Пётр', type: 'employee', salary: 300000, children: [] },
          ],
        },
      ],
    },
    {
      id: 'sales',
      name: 'Отдел продаж',
      type: 'department',
      children: [
        { id: 'emp4', name: 'Олег', type: 'employee', salary: 200000, children: [] },
        { id: 'emp5', name: 'Светлана', type: 'employee', salary: 220000, children: [] },
      ],
    },
  ],
});

function findNode(root: OrgNode, id: string): OrgNode | null {
  if (root.id === id) return root;
  for (const c of root.children) {
    const found = findNode(c, id);
    if (found) return found;
  }
  return null;
}

function updateNode(root: OrgNode, id: string, updater: (n: OrgNode) => OrgNode): OrgNode {
  if (root.id === id) return updater(root);
  return {
    ...root,
    children: root.children.map((c) => updateNode(c, id, updater)),
  };
}

function removeNode(root: OrgNode, id: string): OrgNode {
  return {
    ...root,
    children: root.children
      .filter((c) => c.id !== id)
      .map((c) => removeNode(c, id)),
  };
}

function flattenIds(root: OrgNode): string[] {
  const ids: string[] = [];
  const walk = (n: OrgNode) => {
    ids.push(n.id);
    n.children.forEach(walk);
  };
  walk(root);
  return ids;
}

function totalSalary(root: OrgNode): number {
  if (root.type === 'employee') return root.salary ?? 0;
  return root.children.reduce((sum, c) => sum + totalSalary(c), 0);
}

function employeeCount(root: OrgNode): number {
  if (root.type === 'employee') return 1;
  return root.children.reduce((sum, c) => sum + employeeCount(c), 0);
}

export default function CompositeViz() {
  const [tree, setTree] = useState<OrgNode>(seedTree);
  const [selectedId, setSelectedId] = useState<string>('root');
  const [visitedIds, setVisitedIds] = useState<string[]>([]);
  const [computing, setComputing] = useState(false);
  const [computedTotal, setComputedTotal] = useState<number | null>(null);
  const timersRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
  }, []);

  const selectedNode = useMemo(() => findNode(tree, selectedId), [tree, selectedId]);

  const canHaveChildren = selectedNode?.type === 'department';

  const selectNode = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const addEmployee = useCallback(() => {
    if (!selectedNode || selectedNode.type !== 'department') return;
    const id = nextId();
    const names = ['Алексей', 'Дарья', 'Никита', 'Юлия', 'Артём', 'Елена', 'Михаил', 'Ольга'];
    const name = names[Math.floor(Math.random() * names.length)];
    const salary = 150000 + Math.floor(Math.random() * 200000);
    setTree((prev) =>
      updateNode(prev, selectedNode.id, (n) => ({
        ...n,
        children: [...n.children, { id, name, type: 'employee', salary, children: [] }],
      })),
    );
  }, [selectedNode]);

  const addDepartment = useCallback(() => {
    if (!selectedNode || selectedNode.type !== 'department') return;
    const id = nextId();
    const names = ['Маркетинг', 'Аналитика', 'HR', 'Поддержка', 'QA', 'DevOps'];
    const name = `${names[Math.floor(Math.random() * names.length)]}`;
    setTree((prev) =>
      updateNode(prev, selectedNode.id, (n) => ({
        ...n,
        children: [...n.children, { id, name: `Отдел ${name}`, type: 'department', children: [] }],
      })),
    );
  }, [selectedNode]);

  const removeSelected = useCallback(() => {
    if (selectedId === 'root') return;
    clearTimers();
    setVisitedIds([]);
    setComputedTotal(null);
    setTree((prev) => removeNode(prev, selectedId));
    setSelectedId('root');
  }, [selectedId, clearTimers]);

  const computeSalary = useCallback(() => {
    if (!selectedNode) return;
    clearTimers();
    setVisitedIds([]);
    setComputedTotal(null);
    setComputing(true);

    const ids = flattenIds(selectedNode);
    ids.forEach((id, idx) => {
      const t = window.setTimeout(() => {
        setVisitedIds((prev) => [...prev, id]);
      }, idx * 220);
      timersRef.current.push(t);
    });

    const finalT = window.setTimeout(() => {
      setComputedTotal(totalSalary(selectedNode));
      setComputing(false);
    }, ids.length * 220 + 300);
    timersRef.current.push(finalT);
  }, [selectedNode, clearTimers]);

  const resetTree = useCallback(() => {
    clearTimers();
    idCounter = 0;
    setTree(seedTree());
    setSelectedId('root');
    setVisitedIds([]);
    setComputedTotal(null);
  }, [clearTimers]);

  const renderNode = (node: OrgNode, depth: number): JSX.Element => {
    const isVisited = visitedIds.includes(node.id);
    const isSelected = selectedId === node.id;
    const nodeClass = [
      styles.node,
      node.type === 'department' ? styles.nodeDept : styles.nodeEmp,
      isSelected ? styles.nodeSelected : '',
      isVisited ? styles.nodeVisited : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div key={node.id} className={styles.nodeWrap}>
        <button
          type="button"
          className={nodeClass}
          onClick={() => selectNode(node.id)}
          style={{ marginLeft: `${depth * 16}px` }}
        >
          <span className={styles.nodeIcon}>{node.type === 'department' ? '🏢' : '👤'}</span>
          <span className={styles.nodeName}>{node.name}</span>
          {node.type === 'employee' && node.salary !== undefined && (
            <span className={styles.nodeSalary}>{node.salary.toLocaleString('ru-RU')} ₽</span>
          )}
          {node.type === 'department' && (
            <span className={styles.nodeBadge}>{node.children.length}</span>
          )}
        </button>
        {node.children.length > 0 && (
          <div className={styles.children}>
            {node.children.map((c) => renderNode(c, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Composite — Оргструктура компании</div>

      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <span className={styles.toolbarLabel}>Выбрано:</span>
          <span className={styles.toolbarSelected}>
            {selectedNode
              ? `${selectedNode.type === 'department' ? '🏢' : '👤'} ${selectedNode.name}`
              : '—'}
          </span>
        </div>
        <div className={styles.toolbarRight}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={addEmployee}
            disabled={!canHaveChildren}
            title={canHaveChildren ? 'Добавить сотрудника' : 'Нельзя добавить сотрудника в сотрудника'}
          >
            + Сотрудник
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={addDepartment}
            disabled={!canHaveChildren}
            title={canHaveChildren ? 'Добавить отдел' : 'Нельзя добавить отдел в сотрудника'}
          >
            + Отдел
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnAccent}`}
            onClick={computeSalary}
            disabled={computing}
          >
            💰 Посчитать зарплату
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnDanger}`}
            onClick={removeSelected}
            disabled={selectedId === 'root'}
            title={selectedId === 'root' ? 'Корневой узел удалить нельзя' : 'Удалить узел'}
          >
            ✕ Удалить
          </button>
          <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={resetTree}>
            Сброс
          </button>
        </div>
      </div>

      <div className={styles.treeCard}>{renderNode(tree, 0)}</div>

      {computedTotal !== null && selectedNode && (
        <div className={styles.summary}>
          <div className={styles.summaryRow}>
            <span>Узел:</span>
            <strong>{selectedNode.name}</strong>
          </div>
          <div className={styles.summaryRow}>
            <span>Сотрудников в поддереве:</span>
            <strong>{employeeCount(selectedNode)}</strong>
          </div>
          <div className={styles.summaryRow}>
            <span>Суммарная зарплата:</span>
            <strong className={styles.summaryTotal}>
              {computedTotal.toLocaleString('ru-RU')} ₽
            </strong>
          </div>
        </div>
      )}
    </div>
  );
}