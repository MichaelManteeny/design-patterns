---
title: Builder
description: Строитель собирает сложный объект пошагово, как конструктор Lego.
category: creational
order: 2
---

## Проблема

У тебя есть объект с кучей опциональных полей: HTTP-запрос, конфиг, email-сообщение. Создание через конструктор с 10 параметрами — боль. Фабричные методы не помогают, когда объектов много и каждый уникален.

## Когда использовать

- Объект имеет много опциональных параметров и 4+ параметра в конструкторе
- Нужно создавать разные представления одного и того же объекта
- Хочешь читаемый и линейный способ построения

## Решение

Builder разбивает построение на шаги. Каждый шаг возвращает `this` — получается цепочка вызовов. Финальный `.build()` собирает результат.

```
new RequestBuilder()
  .withUrl('/api/users')
  .withMethod('POST')
  .withHeader('Auth', 'token')
  .build()
```

## Пример

```typescript
interface HttpRequest {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: string;
}

class RequestBuilder {
  private url = '';
  private method = 'GET';
  private headers: Record<string, string> = {};
  private body?: string;

  withUrl(url: string): this {
    this.url = url;
    return this;
  }

  withMethod(method: string): this {
    this.method = method;
    return this;
  }

  withHeader(key: string, value: string): this {
    this.headers[key] = value;
    return this;
  }

  withBody(body: string): this {
    this.body = body;
    return this;
  }

  build(): HttpRequest {
    if (!this.url) {
      throw new Error('URL обязателен');
    }

    const result: HttpRequest = {
      url: this.url,
      method: this.method,
      headers: { ...this.headers },
    };

    if (this.body) {
      result.body = this.body;
    }

    return result;
  }
}

// Использование
const request = new RequestBuilder()
  .withUrl('https://api.example.com/users')
  .withMethod('POST')
  .withHeader('Content-Type', 'application/json')
  .withBody(JSON.stringify({ name: 'Alice' }))
  .build();

console.log(request.method); // POST
```

## Плюсы и минусы

### Плюсы

- Пошаговое построение — читаемо и понятно
- Можно переиспользовать один builder для разных объектов
- Изолирует логику сборки от основного класса

### Минусы

- Много кода для одного объекта
- Мутабельный state — нужно следить за чистотой между вызовами
