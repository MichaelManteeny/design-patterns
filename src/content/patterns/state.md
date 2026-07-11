---
title: State
description: "Состояние — это когда объект меняет своё поведение в зависимости от того, в каком он сейчас режиме."
category: behavioral
order: 9
---

## Проблема

Ты реализуешь систему заказов в интернет-магазине. Заказ проходит через этапы: создан → оплачен → отправлен → доставлен. На каждом этапе разрешены разные действия: оплатить можно только созданный заказ, а отменить — только оплаченный, но ещё не отправленный. Если написать проверки текущего состояния в каждом методе, появится каша из `if (state === "created")` и подобных конструкций, которую невозможно поддерживать.

## Когда использовать

- Когда объект меняет своё поведение в зависимости от внутреннего состояния
- Когда в коде появляются длинные цепочки `if-else` или `switch` по состояниям
- Когда состояние объекта должно само определять, какие переходы из него допустимы

## Решение

Каждое состояние выделяется в отдельный класс, реализующий общий интерфейс состояния. Состояние определяет, какие действия доступны и куда можно перейти. Контекст (заказ) делегирует вызовы текущему состоянию, а состояние решает, менять ли состояние объекта на следующее.

```
Создан → Оплачен → Отправлен → Доставлен
  ↑         ↓          ↓
  └── Отменён ←───────┘
```

## Пример

```typescript
// Состояние заказа
interface OrderState {
  pay(order: Order): void;
  ship(order: Order): void;
  deliver(order: Order): void;
  cancel(order: Order): void;
  getStatus(): string;
}

// Создан: можно оплатить или отменить
class CreatedState implements OrderState {
  pay(order: Order): void {
    console.log("💳 Заказ оплачен");
    order.setState(new PaidState());
  }

  ship(_order: Order): void {
    console.log("❌ Нельзя отправить неоплаченный заказ");
  }

  deliver(_order: Order): void {
    console.log("❌ Нельзя доставить неоплаченный заказ");
  }

  cancel(order: Order): void {
    console.log("🚫 Заказ отменён ( был создан, но не оплачен )");
    order.setState(new CancelledState());
  }

  getStatus(): string {
    return "Создан";
  }
}

// Оплачен: можно отправить или отменить
class PaidState implements OrderState {
  pay(_order: Order): void {
    console.log("❌ Заказ уже оплачен");
  }

  ship(order: Order): void {
    console.log("🚚 Заказ отправлен");
    order.setState(new ShippedState());
  }

  deliver(_order: Order): void {
    console.log("❌ Нельзя доставить до отправки");
  }

  cancel(order: Order): void {
    console.log("🚫 Заказ отменён ( был оплачен, верните деньги )");
    order.setState(new CancelledState());
  }

  getStatus(): string {
    return "Оплачен";
  }
}

// Отправлен: можно только доставить
class ShippedState implements OrderState {
  pay(_order: Order): void {
    console.log("❌ Заказ уже оплачен");
  }

  ship(_order: Order): void {
    console.log("❌ Заказ уже отправлен");
  }

  deliver(order: Order): void {
    console.log("✅ Заказ доставлен!");
    order.setState(new DeliveredState());
  }

  cancel(_order: Order): void {
    console.log("❌ Нельзя отменить отправленный заказ — свяжитесь с курьером");
  }

  getStatus(): string {
    return "Отправлен";
  }
}

// Доставлен: финальное состояние
class DeliveredState implements OrderState {
  pay(): void {
    console.log("❌ Заказ уже доставлен");
  }

  ship(): void {
    console.log("❌ Заказ уже доставлен");
  }

  deliver(): void {
    console.log("❌ Заказ уже доставлен");
  }

  cancel(): void {
    console.log("❌ Нельзя отменить доставленный заказ");
  }

  getStatus(): string {
    return "Доставлен";
  }
}

// Отменён: финальное состояние
class CancelledState implements OrderState {
  pay(): void {
    console.log("❌ Заказ отменён, создайте новый");
  }

  ship(): void {
    console.log("❌ Заказ отменён");
  }

  deliver(): void {
    console.log("❌ Заказ отменён");
  }

  cancel(): void {
    console.log("❌ Заказ уже отменён");
  }

  getStatus(): string {
    return "Отменён";
  }
}

// Контекст: сам заказ
class Order {
  private state: OrderState = new CreatedState();

  setState(state: OrderState): void {
    this.state = state;
  }

  getState(): string {
    return this.state.getStatus();
  }

  pay(): void {
    this.state.pay(this);
  }

  ship(): void {
    this.state.ship(this);
  }

  deliver(): void {
    this.state.deliver(this);
  }

  cancel(): void {
    this.state.cancel(this);
  }
}

// Использование
const order = new Order();
console.log(`Статус: ${order.getState()}`); // Создан

order.pay();      // 💳 Заказ оплачен
order.ship();     // 🚚 Заказ отправлен
order.deliver();  // ✅ Заказ доставлен!
console.log(`Статус: ${order.getState()}`); // Доставлен

// Попытка отменить доставленный
order.cancel();   // ❌ Нельзя отменить доставленный заказ
```

## Плюсы и минусы

### Плюсы

- Убирает условные операторы: поведение каждого состояния инкапсулировано в своём классе
- Легко добавлять новые состояния и переходы без изменения существующих
- Каждое состояние знает только свои допустимые переходы — ошибки на уровне компиляции

### Минусы

- Увеличивает количество классов: одно состояние — один класс
- Распределённая логика переходов: чтобы понять полную картину, нужно читать несколько классов
- Для простых объектов с 2-3 состояниями паттерн избыточен
