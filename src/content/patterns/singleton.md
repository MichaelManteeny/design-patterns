---
title: Singleton
description: Одиночка гарантирует, что в программе есть только один экземпляр класса и даёт к нему доступ.
category: creational
order: 3
---

## Проблема

Глобальные объекты — конфиг, логгер, пул соединений. Если создавать их каждый раз заново, тратятся ресурсы. Если держать в глобальной переменной — теряется контроль над инициализацией и lifetime.

## Когда использовать

- В программе должен быть ровно один экземпляр класса (конфиг, логгер, кэш)
- Нужна точка доступа к общему ресурсу
- Желательно懒ая инициализация — создание при первом обращении

## Решение

Singleton скрывает конструктор и создаёт экземпляр только один раз. Статический метод `getInstance()` возвращает его повторно.

```
Singleton.getInstance() → единственный экземпляр
```

## Пример

```typescript
class AppConfig {
  private static instance: AppConfig;

  readonly apiUrl: string;
  readonly maxRetries: number;

  private constructor() {
    this.apiUrl = process.env.API_URL || 'https://api.example.com';
    this.maxRetries = 3;
  }

  static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }

    return AppConfig.instance;
  }
}

// Использование
const config1 = AppConfig.getInstance();
const config2 = AppConfig.getInstance();

console.log(config1 === config2); // true
console.log(config1.apiUrl); // https://api.example.com
```

## Плюсы и минусы

### Плюсы

- Гарантирует единственный экземпляр
- Ленивая инициализация — не тратит ресурсы до первого обращения
- Глобальная точка доступа

### Минусы

- Скрытая зависимость — модуль зависит от глобального состояния
- Тестируемость страдает — сложно подменить mock
- В мультипоточной среде без синхронизации возможны гонки
