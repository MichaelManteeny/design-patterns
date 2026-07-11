---
title: Composite
description: "Компоновщик — это дерево, где каждый узел может быть и листом, и контейнером с детьми."
category: structural
order: 6
---

## Проблема

У тебя есть файловая система: файлы и папки. Папки содержат файлы и другие папки. Ты хочешь посчитать общий размер — но с файлами и папками приходится работать по-разному: для файла `getSize()` очевиден, а для папки нужно рекурсивно суммировать размеры детей.

## Когда использовать

- Структура данных образует дерево (файлы/папки, GUI-компоненты, организации)
- Нужно одинаково работать с отдельными объектами и их контейнерами
- Хочешь добавлять новые типы элементов без изменения клиентского кода

## Решение

Компоновщик объединяет простые и составные объекты в единое дерево через общий интерфейс. Клиент работает с корнем дерева и не замечает разницы между листьями и контейнерами — всё решает рекурсия.

```
          [Корневая папка]
          /            \
    [Файл a]      [Подпапка]
                   /       \
             [Файл b]   [Файл c]
```

## Пример

```typescript
interface FileSystemItem {
  getName(): string;
  getSize(): number;
  display(indent?: string): void;
}

class File implements FileSystemItem {
  constructor(private name: string, private size: number) {}

  getName() { return this.name; }
  getSize() { return this.size; }
  display(indent = '') {
    console.log(`${indent}📄 ${this.name} (${this.size}KB)`);
  }
}

class Folder implements FileSystemItem {
  private children: FileSystemItem[] = [];

  constructor(private name: string) {}

  add(item: FileSystemItem): this {
    this.children.push(item);
    return this;
  }

  getName() { return this.name; }
  getSize(): number {
    return this.children.reduce((sum, child) => sum + child.getSize(), 0);
  }
  display(indent = '') {
    console.log(`${indent}📁 ${this.name}/ (${this.getSize()}KB)`);
    this.children.forEach((child) => child.display(indent + '  '));
  }
}

// Использование
const root = new Folder('project');
root
  .add(new File('readme.md', 2))
  .add(
    new Folder('src')
      .add(new File('index.ts', 5))
      .add(new File('utils.ts', 3))
  )
  .add(new Folder('assets').add(new File('logo.png', 120)));

root.display();
// 📁 project/ (130KB)
//   📄 readme.md (2KB)
//   📁 src/ (8KB)
//     📄 index.ts (5KB)
//     📄 utils.ts (3KB)
//   📁 assets/ (120KB)
//     📄 logo.png (120KB)

console.log(`Общий размер: ${root.getSize()}KB`); // Общий размер: 130KB
```

## Плюсы и минусы

### Плюсы

- Единый интерфейс для листьев и контейнеров
- Легко добавлять новые типы узлов без изменения существующего кода
- Рекурсивная обработка дерева — естественная и понятная логика

### Минусы

- Сложно ограничить, какие компоненты можно добавлять (контроль состава)
- Интерфейс контейнера и листа могут отличаться — приходится делать методы «необязательными»
- При большом дереве рекурсия может быть ресурсоёмкой
