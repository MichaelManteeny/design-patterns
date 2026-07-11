---
title: Decorator
description: "Декоратор — это как подарочная упаковка: можно обернуть ещё и ещё, и каждый слой добавляет что-то новое."
category: structural
order: 5
---

## Проблема

У тебя есть базовый кофе. Затем клиенты хотят молоко, потом сахар, потом сироп. Если создавать класс `Кофе_с_молоком`, `Кофе_с_молоком_и_сахаром`, `Кофе_с_молоком_сахаром_и_сиропом` — количество комбинаций взрывается. Наследование не спасает, а только усугубляет.

## Когда использовать

- Нужно динамически добавлять поведение объекту
- Альтернативы наследованию приводят к взрыву классов
- Хочешь комбиновать обязанности в произвольных сочетаниях

## Решение

Декоратор оборачивает объект того же интерфейса и добавляет своё поведение перед/после вызова оригинального метода. Каждый декоратор можно оборачивать в другой декоратор, создавая цепочку.

```
Клиент → Декоратор(Сироп) → Декоратор(Сахар) → Декоратор(Молоко) → БазовыйКофе
         +сироп              +сахар              +молоко             стоимость
```

## Пример

```typescript
interface Coffee {
  getCost(): number;
  getDescription(): string;
}

class BasicCoffee implements Coffee {
  getCost() { return 50; }
  getDescription() { return 'Кофе'; }
}

class MilkDecorator implements Coffee {
  constructor(private coffee: Coffee) {}
  getCost() { return this.coffee.getCost() + 30; }
  getDescription() { return this.coffee.getDescription() + ', молоко'; }
}

class SugarDecorator implements Coffee {
  constructor(private coffee: Coffee) {}
  getCost() { return this.coffee.getCost() + 15; }
  getDescription() { return this.coffee.getDescription() + ', сахар'; }
}

class SyrupDecorator implements Coffee {
  constructor(private coffee: Coffee) {}
  getCost() { return this.coffee.getCost() + 40; }
  getDescription() { return this.coffee.getDescription() + ', сироп'; }
}

// Использование: собираем нужный напиток из слоёв
let coffee: Coffee = new BasicCoffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);
coffee = new SyrupDecorator(coffee);

console.log(coffee.getDescription()); // Кофе, молоко, сахар, сироп
console.log(coffee.getCost());        // 135
```

## Плюсы и минусы

### Плюсы

- Добавление поведения без изменения исходного класса
- Комбинирование responsibilities в произвольных сочетаниях
- Каждый декоратор отвечает только за свою часть

### Минусы

- Много мелких классов, которые выглядят похожими
- Сложно отладить, какой именно декоратор что делает при длинной цепочке
- Конечный объект не похож на исходный — привыкание к интерфейсу ломается
