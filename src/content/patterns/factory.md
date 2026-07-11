---
title: Factory Method
description: Фабрика — это место, где делают штуки по твоему заказу, а ты не знаешь как именно.
category: creational
order: 1
---

## Проблема

Представь: ты пишешь логистическую систему. У тебя есть грузовики, корабли, самолёты — у каждого своя логика доставки. Код превращается в кашу `if/else`, а каждый новый тип транспорта заставляет лезть в уже готовые модули.

## Когда использовать

- Нужно создавать разные объекты в зависимости от контекста
- Ты не знаешь заранее, какие конкретные классы понадобятся
- Хочешь дать возможность расширять типы создаваемых объектов без изменения существующего кода

## Решение

Фабричный метод выносит создание объекта в отдельный метод-«фабрику». Клиент вызывает фабрику и получает нужный объект, не зная деталей реализации.

```
Клиент → фабрика → RoadTransport / SeaTransport / AirTransport
                     ↑ каждый реализует Transport
```

## Пример

```typescript
interface Transport {
  deliver(): string;
}

class RoadTransport implements Transport {
  deliver() {
    return 'Доставка по дороге 🚛';
  }
}

class SeaTransport implements Transport {
  deliver() {
    return 'Доставка по морю 🚢';
  }
}

class AirTransport implements Transport {
  deliver() {
    return 'Доставка по воздуху ✈️';
  }
}

type TransportType = 'road' | 'sea' | 'air';

function createTransport(type: TransportType): Transport {
  switch (type) {
    case 'road':
      return new RoadTransport();
    case 'sea':
      return new SeaTransport();
    case 'air':
      return new AirTransport();
    default:
      throw new Error(`Неизвестный тип транспорта: ${type}`);
  }
}

// Использование
const transport = createTransport('sea');
console.log(transport.deliver()); // Доставка по морю 🚢
```

## Плюсы и минусы

### Плюсы

- Изолирует код создания от основной бизнес-логики
- Легко добавлять новые типы объектов (просто новый класс + фабрика)
- Код клиента не знает о конкретных классах

### Минусы

- Много классов и интерфейсов даже для простых случаев
- При добавлении нового типа транспорта нужно менять саму фабрику
