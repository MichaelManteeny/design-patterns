---
title: Command
description: Команда — это объект-действие: можно положить в очередь, отменить, повторить.
category: behavioral
order: 10
---

## Проблема

Ты разрабатываешь текстовый редактор и хочешь добавить отмену (undo) и повтор (redo). Каждое действие (ввод текста, удаление, форматирование) должно быть обратимым. Если логика «что сделать» и «как отменить» размазана по разным методам, отмена превращается в ад. Плюс хочется добавить макрокоманды — объединение нескольких действий в одно.

## Когда использовать

- Когда нужно ставить действия в очередь или сохранять историю операций
- Когда необходимы undo/redo для любых действий без привязки к конкретным типам
- Когда действие должно быть параметризуемым и независимым от того, кто его запускает

## Решение

Каждое действие оборачивается в объект команды с методами `execute()` и `undo()`. Инвокер (вызывающий) не знает, что именно делает команда — он只知道, что может её запустить или отменить. Receiver (получатель) — это объект, над которым команда совершает действие.

```
Invoker (UI) → Command.execute() → Receiver (документ)
                  ↑ undo()
```

## Пример

```typescript
// Интерфейс команды
interface Command {
  execute(): void;
  undo(): void;
  describe(): string;
}

// Получатель: текстовый документ
class TextDocument {
  private content: string = "";

  insertAt(position: number, text: string): void {
    this.content =
      this.content.slice(0, position) + text + this.content.slice(position);
  }

  deleteRange(start: number, length: number): string {
    const deleted = this.content.slice(start, start + length);
    this.content =
      this.content.slice(0, start) + this.content.slice(start + length);
    return deleted;
  }

  getContent(): string {
    return this.content;
  }
}

// Конкретные команды
class InsertTextCommand implements Command {
  constructor(
    private document: TextDocument,
    private position: number,
    private text: string
  ) {}

  execute(): void {
    this.document.insertAt(this.position, this.text);
    console.log(`📝 Вставили "${this.text}" на позицию ${this.position}`);
  }

  undo(): void {
    this.document.deleteRange(this.position, this.text.length);
    console.log(`⏪ Отменили вставку "${this.text}"`);
  }

  describe(): string {
    return `Вставка "${this.text}"`;
  }
}

class DeleteTextCommand implements Command {
  private deletedText: string = "";

  constructor(
    private document: TextDocument,
    private position: number,
    private length: number
  ) {}

  execute(): void {
    this.deletedText = this.document.deleteRange(this.position, this.length);
    console.log(
      `🗑️ Удалили "${this.deletedText}" с позиции ${this.position}`
    );
  }

  undo(): void {
    this.document.insertAt(this.position, this.deletedText);
    console.log(`⏪ Вернули "${this.deletedText}"`);
  }

  describe(): string {
    return `Удаление ${this.length} символов`;
  }
}

// Макрокоманда: объединяет несколько команд в одну
class MacroCommand implements Command {
  private commands: Command[];

  constructor(commands: Command[]) {
    this.commands = commands;
  }

  execute(): void {
    console.log("▶ Макрокоманда: начало");
    for (const cmd of this.commands) {
      cmd.execute();
    }
    console.log("■ Макрокоманда: завершено");
  }

  undo(): void {
    console.log("◀ Макрокоманда: отмена");
    for (const cmd of [...this.commands].reverse()) {
      cmd.undo();
    }
  }

  describe(): string {
    return `Макро (${this.commands.length} действий)`;
  }
}

// Инвокер: менеджер истории
class EditorHistory {
  private history: Command[] = [];
  private undone: Command[] = [];

  execute(command: Command): void {
    command.execute();
    this.history.push(command);
    this.undone = [];
  }

  undo(): void {
    const command = this.history.pop();
    if (command) {
      command.undo();
      this.undone.push(command);
    } else {
      console.log("❌ Нечего отменять");
    }
  }

  redo(): void {
    const command = this.undone.pop();
    if (command) {
      command.execute();
      this.history.push(command);
    } else {
      console.log("❌ Нечего повторять");
    }
  }

  getHistory(): string[] {
    return this.history.map((cmd) => cmd.describe());
  }
}

// Использование
const doc = new TextDocument();
const history = new EditorHistory();

history.execute(new InsertTextCommand(doc, 0, "Привет"));
console.log(`Документ: "${doc.getContent()}"`); // "Привет"

history.execute(new InsertTextCommand(doc, 6, " мир"));
console.log(`Документ: "${doc.getContent()}"`); // "Привет мир"

history.undo(); // ⏪ Отменили вставку " мир"
console.log(`Документ: "${doc.getContent()}"`); // "Привет"

history.redo(); // Вставили " мир" на позицию 6
console.log(`Документ: "${doc.getContent()}"`); // "Привет мир"

// Макрокоманда: удалить + вставить
const macro = new MacroCommand([
  new DeleteTextCommand(doc, 0, 6),    // "Привет"
  new InsertTextCommand(doc, 0, "Здравствуй"),
]);
history.execute(macro);
console.log(`Документ: "${doc.getContent()}"`); // "Здравствуй мир"

history.undo();
console.log(`Документ: "${doc.getContent()}"`); // "Привет мир"
```

## Плюсы и минусы

### Плюсы

- Историю действий легко хранить, отменять и повторять
- Команды параметризуемы: можно комбинировать, ставить в очередь, записывать в макросы
- Инвокер и получатель слабо связаны: один и тот же UI может управлять разными документами

### Минусы

- Каждое действие — отдельный класс: при большом количестве действий классов становится много
- Макрокоманды сложнее отлаживать — ошибка где-то внутри цепочки
- Для тривиальных действий (одно поле + один метод) отдельный класс команды — избыточность
