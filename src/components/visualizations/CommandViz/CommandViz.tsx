import { useMemo, useRef, useState } from 'react';
import * as styles from './CommandViz.css';

type CommandKind = 'add' | 'delete' | 'replace' | 'clear';
type CommandStatus = 'done' | 'undone';

interface TextCommand {
  id: number;
  type: CommandKind;
  title: string;
  detail: string;
  time: string;
  before: string;
  after: string;
}

interface JournalEntry extends TextCommand {
  status: CommandStatus;
}

interface SelectionRange {
  start: number;
  end: number;
}

const INITIAL_DOCUMENT = 'Паттерн Command превращает действие редактора в объект с execute и undo.';

const COMMAND_LABELS: Record<CommandKind, string> = {
  add: 'Добавление',
  delete: 'Удаление',
  replace: 'Замена',
  clear: 'Очистка',
};

const formatTime = () =>
  new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());

const shortText = (value: string) => {
  if (value.length <= 30) return value;
  return `${value.slice(0, 27)}…`;
};

export default function CommandViz() {
  const [documentText, setDocumentText] = useState(INITIAL_DOCUMENT);
  const [inputText, setInputText] = useState('Новая команда');
  const [selection, setSelection] = useState<SelectionRange>({ start: 0, end: 0 });
  const [undoStack, setUndoStack] = useState<TextCommand[]>([]);
  const [redoStack, setRedoStack] = useState<TextCommand[]>([]);
  const [journal, setJournal] = useState<JournalEntry[]>([]);
  const [isUndoing, setIsUndoing] = useState(false);
  const [isRedoing, setIsRedoing] = useState(false);
  const nextIdRef = useRef(1);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const wordCount = useMemo(() => {
    const trimmed = documentText.trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  }, [documentText]);

  const selectedText = useMemo(
    () => documentText.slice(selection.start, selection.end),
    [documentText, selection],
  );

  const hasSelection = selectedText.length > 0;
  const hasInput = inputText.trim().length > 0;

  const updateSelection = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    setSelection({ start: textarea.selectionStart, end: textarea.selectionEnd });
  };

  const executeCommand = (
    type: CommandKind,
    title: string,
    before: string,
    after: string,
    detail: string,
  ) => {
    if (before === after) return;

    const command: TextCommand = {
      id: nextIdRef.current,
      type,
      title,
      detail,
      time: formatTime(),
      before,
      after,
    };
    nextIdRef.current += 1;

    setDocumentText(after);
    setUndoStack((prev) => [command, ...prev]);
    setRedoStack([]);
    setJournal((prev) => [{ ...command, status: 'done' }, ...prev]);
    setSelection({ start: 0, end: 0 });
  };

  const addText = () => {
    if (!hasInput) return;
    const spacer = documentText.length > 0 && !/\s$/.test(documentText) ? ' ' : '';
    const after = `${documentText}${spacer}${inputText.trim()}`;
    executeCommand(
      'add',
      'Добавить текст',
      documentText,
      after,
      `Добавлено: «${shortText(inputText.trim())}»`,
    );
    setInputText('');
  };

  const deleteLastWord = () => {
    const trimmedEnd = documentText.replace(/\s+$/, '');
    const lastWord = trimmedEnd.match(/\S+$/)?.[0];
    if (!lastWord) return;

    const after = trimmedEnd.slice(0, trimmedEnd.length - lastWord.length).replace(/\s+$/, '');
    executeCommand(
      'delete',
      'Удалить последнее слово',
      documentText,
      after,
      `Удалено слово: «${shortText(lastWord)}»`,
    );
  };

  const replaceSelected = () => {
    if (!hasSelection || !hasInput) return;
    const replacement = inputText.trim();
    const after = `${documentText.slice(0, selection.start)}${replacement}${documentText.slice(selection.end)}`;
    executeCommand(
      'replace',
      'Заменить выделенное',
      documentText,
      after,
      `«${shortText(selectedText)}» → «${shortText(replacement)}»`,
    );
    setInputText('');
  };

  const clearDocument = () => {
    if (!documentText) return;
    executeCommand(
      'clear',
      'Очистить',
      documentText,
      '',
      `Очищено ${documentText.length} символов`,
    );
  };

  const undo = () => {
    const command = undoStack[0];
    if (!command) return;

    setIsUndoing(true);
    window.setTimeout(() => setIsUndoing(false), 320);
    setDocumentText(command.before);
    setUndoStack((prev) => prev.slice(1));
    setRedoStack((prev) => [command, ...prev]);
    setJournal((prev) =>
      prev.map((entry) => (entry.id === command.id ? { ...entry, status: 'undone' } : entry)),
    );
    setSelection({ start: 0, end: 0 });
  };

  const redo = () => {
    const command = redoStack[0];
    if (!command) return;

    setIsRedoing(true);
    window.setTimeout(() => setIsRedoing(false), 280);
    setDocumentText(command.after);
    setRedoStack((prev) => prev.slice(1));
    setUndoStack((prev) => [command, ...prev]);
    setJournal((prev) =>
      prev.map((entry) => (entry.id === command.id ? { ...entry, status: 'done' } : entry)),
    );
    setSelection({ start: 0, end: 0 });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Command — Текстовый редактор</div>

      <div className={styles.editorGrid}>
        <section className={styles.controlsPanel}>
          <label className={styles.inputLabel} htmlFor="command-text-input">
            Текст команды
          </label>
          <input
            id="command-text-input"
            className={styles.textInput}
            value={inputText}
            placeholder="Введите фрагмент текста"
            onChange={(event) => setInputText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                addText();
              }
            }}
          />

          <div className={styles.buttonGrid}>
            <button type="button" className={`${styles.button} ${styles.buttonPrimary}`} onClick={addText} disabled={!hasInput}>
              Добавить текст
            </button>
            <button type="button" className={`${styles.button} ${styles.buttonSecondary}`} onClick={deleteLastWord} disabled={wordCount === 0}>
              Удалить последнее слово
            </button>
            <button type="button" className={`${styles.button} ${styles.buttonPrimary}`} onClick={replaceSelected} disabled={!hasSelection || !hasInput}>
              Заменить выделенное
            </button>
            <button type="button" className={`${styles.button} ${styles.buttonDanger}`} onClick={clearDocument} disabled={!documentText}>
              Очистить
            </button>
          </div>

          <div className={styles.undoRow}>
            <button type="button" className={`${styles.button} ${styles.buttonUndo}`} onClick={undo} disabled={undoStack.length === 0}>
              Undo
            </button>
            <button type="button" className={`${styles.button} ${styles.buttonRedo}`} onClick={redo} disabled={redoStack.length === 0}>
              Redo
            </button>
          </div>

          <div className={styles.selectionBox}>
            {hasSelection ? (
              <>
                <span className={styles.selectionLabel}>Выделено:</span>
                <span>«{shortText(selectedText)}»</span>
              </>
            ) : (
              'Выделите текст в документе, чтобы выполнить замену.'
            )}
          </div>
        </section>

        <section className={styles.documentPanel} aria-live="polite">
          <div className={styles.panelTitle}>Состояние документа</div>
          <div
            className={[
              styles.documentShell,
              isUndoing ? styles.documentUndoing : '',
              isRedoing ? styles.documentRedoing : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <textarea
              ref={textareaRef}
              className={styles.documentArea}
              value={documentText}
              readOnly
              onSelect={updateSelection}
              placeholder="Документ пуст"
            />
          </div>
          <div className={styles.documentStats}>
            <span>{documentText.length} символов</span>
            <span>{wordCount} слов</span>
            <span>Undo: {undoStack.length}</span>
            <span>Redo: {redoStack.length}</span>
          </div>
        </section>
      </div>

      <div className={styles.historyGrid}>
        <section className={styles.stackPanel}>
          <div className={styles.panelTitle}>Стек выполненных команд</div>
          {undoStack.length > 0 ? (
            <ol className={styles.commandStack}>
              {undoStack.map((command, index) => (
                <li key={command.id} className={index === 0 ? styles.stackTopItem : styles.stackItem}>
                  <span className={styles.commandTitle}>{command.title}</span>
                  <span className={styles.commandDetail}>{command.detail}</span>
                </li>
              ))}
            </ol>
          ) : (
            <div className={styles.emptyState}>Стек пуст — выполните команду.</div>
          )}
        </section>

        <section className={styles.journalPanel}>
          <div className={styles.panelTitle}>Все команды</div>
          {journal.length > 0 ? (
            <ol className={styles.journalList}>
              {journal.map((entry) => (
                <li
                  key={entry.id}
                  className={[
                    styles.journalItem,
                    entry.status === 'undone' ? styles.journalItemUndone : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <span className={styles.journalType}>{COMMAND_LABELS[entry.type]}</span>
                  <span className={styles.journalText}>{entry.detail}</span>
                  <span className={styles.journalTime}>{entry.time}</span>
                </li>
              ))}
            </ol>
          ) : (
            <div className={styles.emptyState}>История команд появится здесь.</div>
          )}
        </section>
      </div>
    </div>
  );
}
