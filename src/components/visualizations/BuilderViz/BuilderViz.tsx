import { useCallback, useState } from 'react';
import * as styles from './BuilderViz.css';

type Method = 'GET' | 'POST' | 'PUT';

interface Header {
  id: number;
  key: string;
  value: string;
}

interface RequestConfig {
  url: string;
  method: Method;
  headers: Header[];
  body: string;
}

interface Step {
  label: string;
  value: string;
}

let headerIdCounter = 0;

export default function BuilderViz() {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState<Method>('GET');
  const [headers, setHeaders] = useState<Header[]>([]);
  const [headerKey, setHeaderKey] = useState('');
  const [headerValue, setHeaderValue] = useState('');
  const [body, setBody] = useState('');
  const [steps, setSteps] = useState<Step[]>([]);
  const [finalRequest, setFinalRequest] = useState<RequestConfig | null>(null);
  const [resultKey, setResultKey] = useState(0);

  const addHeader = useCallback(() => {
    const k = headerKey.trim();
    const v = headerValue.trim();
    if (!k || !v) return;
    headerIdCounter++;
    setHeaders((prev) => [...prev, { id: headerIdCounter, key: k, value: v }]);
    setHeaderKey('');
    setHeaderValue('');
  }, [headerKey, headerValue]);

  const removeHeader = useCallback((id: number) => {
    setHeaders((prev) => prev.filter((h) => h.id !== id));
  }, []);

  const addStep = useCallback(() => {
    const newSteps: Step[] = [];
    if (url.trim()) {
      newSteps.push({ label: 'URL', value: url.trim() });
    }
    if (method) {
      newSteps.push({ label: 'Method', value: method });
    }
    if (headers.length > 0) {
      newSteps.push({ label: 'Headers', value: `${headers.length} headers` });
    }
    if (body.trim()) {
      newSteps.push({ label: 'Body', value: body.trim() });
    }
    setSteps(newSteps);
    setFinalRequest({ url: url.trim(), method, headers: [...headers], body: body.trim() });
    setResultKey((k) => k + 1);
  }, [url, method, headers, body]);

  const reset = useCallback(() => {
    setUrl('');
    setMethod('GET');
    setHeaders([]);
    setHeaderKey('');
    setHeaderValue('');
    setBody('');
    setSteps([]);
    setFinalRequest(null);
  }, []);

  const hasContent = url.trim() || headers.length > 0 || body.trim();

  return (
    <div className={styles.container}>
      <div className={styles.header}>Builder — Построение HTTP-запроса</div>

      <div className={styles.inputGroup}>
        <div className={styles.inputRow}>
          <span className={styles.fieldLabel}>URL</span>
          <input
            className={styles.input}
            type="text"
            placeholder="https://api.example.com/data"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div className={styles.inputRow}>
          <span className={styles.fieldLabel}>Method</span>
          <select
            className={styles.select}
            value={method}
            onChange={(e) => setMethod(e.target.value as Method)}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
          </select>
        </div>

        <div className={styles.inputRow}>
          <span className={styles.fieldLabel}>Headers</span>
          <div className={styles.headerRow}>
            <input
              className={styles.smallInput}
              type="text"
              placeholder="Key"
              value={headerKey}
              onChange={(e) => setHeaderKey(e.target.value)}
            />
            <input
              className={styles.smallInput}
              type="text"
              placeholder="Value"
              value={headerValue}
              onChange={(e) => setHeaderValue(e.target.value)}
            />
            <button
              type="button"
              className={styles.addHeaderBtn}
              onClick={addHeader}
              disabled={!headerKey.trim() || !headerValue.trim()}
            >
              +
            </button>
          </div>
          {headers.length > 0 && (
            <div className={styles.headerList}>
              {headers.map((h) => (
                <span key={h.id} className={styles.headerTag}>
                  {h.key}: {h.value}
                  <span
                    className={styles.removeHeader}
                    onClick={() => removeHeader(h.id)}
                  >
                    ✕
                  </span>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className={styles.inputRow}>
          <span className={styles.fieldLabel}>Body</span>
        </div>
        <textarea
          className={styles.textarea}
          placeholder='{"key": "value"}'
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>

      <div className={styles.buttonsRow}>
        <button
          type="button"
          className={styles.btn}
          onClick={addStep}
          disabled={!hasContent}
        >
          Добавить шаг
        </button>
        <button type="button" className={styles.resetBtn} onClick={reset}>
          Сбросить
        </button>
      </div>

      <div className={styles.building}>
        <span className={styles.buildLabel}>Request Builder</span>
        {steps.length === 0 && (
          <span className={styles.emptyBuilding}>Настройте запрос и нажмите «Добавить шаг»</span>
        )}
        {steps.map((step, i) => {
          let blockStyle = styles.blockFoundation;
          if (i === steps.length - 1) blockStyle = styles.blockRoof;
          else if (i > 0 && i < steps.length - 1) blockStyle = styles.blockWalls;
          return (
            <div key={`${step.label}-${i}`} className={`${styles.buildingBlock} ${blockStyle}`}>
              <span>{step.label}:</span>
              <span>{step.value}</span>
            </div>
          );
        })}
      </div>

      {finalRequest && (
        <div className={styles.jsonCard} key={resultKey}>
          <pre className={styles.jsonPre}>
            {JSON.stringify(finalRequest, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
