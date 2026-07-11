---
title: Adapter
description: "Адаптер — это переходник между розеткой и вилкой, как зарядка для телефона в поездке."
category: structural
order: 4
---

## Проблема

У тебя есть готовый JSON-клиент, который умеет работать только с JSON-ответами. Но на горизонте появляется старый XML-API — ты не можешь его переписать, а клиент менять не хочется. Два формата, два интерфейса, и они не совместимы.

## Когда использовать

- Нужно интегрировать новый код со старым, не изменяя его
- Хочешь использовать стороннюю библиотеку, но её интерфейс не совпадает с твоим
- Несколько классов делают одно и то же, но с разными интерфейсами

## Решение

Адаптер оборачивает объект с несовместимым интерфейсом и превращает его вызовы в формат, понятный клиенту. Клиент думает, что работает с привычным интерфейсом, а адаптер тихо переводит вызовы.

```
Клиент (JSON) → Адаптер → Старое API (XML)
              интерфейс   конвертирует JSON ↔ XML
```

## Пример

```typescript
// Старое XML-API (не меняем!)
class XmlDataService {
  getData(): string {
    return '<response><item id="1"><name>Товар</name></item></response>';
  }
}

// Новый JSON-клиент ожидает такой интерфейс
interface JsonDataService {
  getJsonData(): { id: number; name: string }[];
}

// Адаптер: оборачивает XmlDataService, отдаёт JSON
class XmlToJsonAdapter implements JsonDataService {
  constructor(private xmlService: XmlDataService) {}

  getJsonData(): { id: number; name: string }[] {
    const raw = this.xmlService.getData();
    const matches = [...raw.matchAll(/<item id="(\d+)"><name>(.*?)<\/name>/g)];
    return matches.map((m) => ({
      id: parseInt(m[1]),
      name: m[2],
    }));
  }
}

// Использование
const xmlService = new XmlDataService();
const adapter = new XmlToJsonAdapter(xmlService);
const data = adapter.getJsonData();
console.log(data); // [{ id: 1, name: 'Товар' }]
```

## Плюсы и минусы

### Плюсы

- Позволяет работать с несовместимыми интерфейсами без их изменения
- Разделяет ответственность: бизнес-логика отдельно, конвертация отдельно
- Легко добавлять новые адаптеры без трогания существующего кода

### Минусы

- Усложняет архитектуру: появляются дополнительные классы
- Иногда проще изменить сервисный класс, чем писать адаптер
- Слишком много адаптеров — признак того, что систему стоит рефакторить
