---
title: Strategy
description: Стратегия — это выбор алгоритма на лету, как маршрут в навигаторе: пешком, на машине, на автобусе.
category: behavioral
order: 8
---

## Проблема

Ты разрабатываешь интернет-магазин, и стоимость доставки рассчитывается по-разному: курьером — по расстоянию, почтой — по весу, самовывозом — бесплатно. Условия часто меняются: добавляются новые способы доставки, меняются тарифы. Если всё зашить в один метод с кучей `if-else`, каждый новый способ потребует правки существующей функции — а это нарушает принцип открытости/закрытости.

## Когда использовать

- Когда нужно менять алгоритм или поведение объекта во время выполнения
- Когда у тебя есть несколько вариантов одного действия и клиент выбирает один из них
- Когда `if-else` или `switch` по типу поведения разрастается и становится难以维护яемым

## Решение

Выделяем семейство алгоритмов в отдельные классы, реализующие общий интерфейс стратегии. Контекст хранит ссылку на текущую стратегию и делегирует ей основную работу. Стратегия легко заменяется без изменения контекста.

```
Контекст (Доставка)
  │
  ├── Стратегия: Курьер
  ├── Стратегия: Почта
  └── Стратегия: Самовывоз
```

## Пример

```typescript
// Интерфейс стратегии доставки
interface DeliveryStrategy {
  calculate(weight: number, distance: number): number;
  getName(): string;
}

// Конкретные стратегии
class CourierDelivery implements DeliveryStrategy {
  calculate(weight: number, distance: number): number {
    return weight * 50 + distance * 30; // 50₽ за кг + 30₽ за км
  }

  getName(): string {
    return "Курьер";
  }
}

class PostalDelivery implements DeliveryStrategy {
  calculate(weight: number, distance: number): number {
    return weight * 100 + 200; // 100₽ за кг + 200₽ фиксированная плата
  }

  getName(): string {
    return "Почта";
  }
}

class PickupDelivery implements DeliveryStrategy {
  calculate(_weight: number, _distance: number): number {
    return 0; // Бесплатно
  }

  getName(): string {
    return "Самовывоз";
  }
}

// Контекст: корзина с доставкой
class DeliveryContext {
  private strategy: DeliveryStrategy;

  constructor(strategy: DeliveryStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: DeliveryStrategy): void {
    this.strategy = strategy;
    console.log(`📦 Стратегия изменена на: ${strategy.getName()}`);
  }

  calculateCost(weight: number, distance: number): number {
    const cost = this.strategy.calculate(weight, distance);
    console.log(
      `💰 Стоимость (${this.strategy.getName()}): ${cost}₽`
    );
    return cost;
  }
}

// Использование
const delivery = new DeliveryContext(new CourierDelivery());
delivery.calculateCost(5, 10); // 💰 Стоимость (Курьер): 550₽

delivery.setStrategy(new PostalDelivery());
delivery.calculateCost(5, 10); // 💰 Стоимость (Почта): 700₽

delivery.setStrategy(new PickupDelivery());
delivery.calculateCost(5, 10); // 💰 Стоимость (Самовывоз): 0₽
```

## Плюсы и минусы

### Плюсы

- Легко добавлять новые алгоритмы без изменения кода контекста
- Убирает условные операторы, делая код чище и понятнее
- Алгоритмы можно менять и выбирать во время выполнения

### Минусы

- Увеличивает количество классов: для каждой стратегии — отдельный файл
- Клиент должен знать, какие стратегии существуют, чтобы выбрать нужную
- Для простых задач с 2-3 вариантами паттерн может быть избыточным
