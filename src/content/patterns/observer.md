---
title: Observer
description: Наблюдатель — это подписка на канал: когда что-то происходит, все подписчики узнают.
category: behavioral
order: 7
---

## Проблема

У тебя есть новостной ресурс, и ты хочешь уведомлять читателей о каждой новой статье. Но подписчики пользуются разными каналами: email, push-уведомления, telegram-бот. Нельзя в каждом новостном посте вызывать все три сервиса вручную — это хрупко и не масштабируется. Добавление нового канала потребует правки кода ресурса.

## Когда использовать

- Когда объект должен уведомлять множество других объектов без привязки к конкретным типам
- Когда набор подписчиков может меняться во время работы программы
- Когда отправитель не должен знать, что делают получатели с уведомлениями

## Решение

Наблюдатель определяет механизм подписки, позволяющий нескольким объектам следить за событиями объекта-издателя. Издатель (Subject) хранит список подписчиков и рассылает им уведомления при изменении состояния. Подписчики сами решают, что делать с событием — обновить UI, отправить письмо или записать в лог.

```
Subject (Новости)
  ├── Observer (Email)
  ├── Observer (Push)
  └── Observer (Telegram-бот)
```

## Пример

```typescript
// Интерфейс наблюдателя
interface Observer {
  update(article: string): void;
}

// Интерфейс издателя
interface Subject {
  subscribe(observer: Observer): void;
  unsubscribe(observer: Observer): void;
  notify(article: string): void;
}

// Издатель: новостной ресурс
class NewsFeed implements Subject {
  private observers: Observer[] = [];

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  notify(article: string): void {
    for (const observer of this.observers) {
      observer.update(article);
    }
  }

  publishArticle(title: string): void {
    console.log(`\n📰 Новая статья: ${title}`);
    this.notify(title);
  }
}

// Конкретные наблюдатели
class EmailSubscriber implements Observer {
  constructor(private email: string) {}

  update(article: string): void {
    console.log(`📧 Email → ${this.email}: "${article}"`);
  }
}

class PushSubscriber implements Observer {
  update(article: string): void {
    console.log(`🔔 Push: "${article}"`);
  }
}

class TelegramBot implements Observer {
  update(article: string): void {
    console.log(`🤖 Telegram: "${article}"`);
  }
}

// Использование
const feed = new NewsFeed();

const emailSub = new EmailSubscriber("user@mail.com");
const pushSub = new PushSubscriber();
const tgBot = new TelegramBot();

feed.subscribe(emailSub);
feed.subscribe(pushSub);
feed.subscribe(tgBot);

feed.publishArticle("Паттерн Observer в реальной жизни");
// 📧 Email → user@mail.com: "Паттерн Observer в реальной жизни"
// 🔔 Push: "Паттерн Observer в реальной жизни"
// 🤖 Telegram: "Паттерн Observer в реальной жизни"

// Отписываем push и публикуем снова
feed.unsubscribe(pushSub);
feed.publishArticle("Новая статья про стратегии");
// 📧 Email → user@mail.com: "Новая статья про стратегии"
// 🤖 Telegram: "Новая статья про стратегии"
```

## Плюсы и минусы

### Плюсы

- Слабая связанность: издатель не знает деталей реализации подписчиков
- Можно динамически добавлять и удалять подписчиков во время работы
- Реализует принцип открытости/закрытости: новые подписчики не требуют изменения издателя

### Минусы

- Уведомления рассылаются синхронно — медленный подписчик может замедлить издателя
- Нет автоматической отписки: если подписчик уничтожен, но не отписан, это утечка памяти
- Порядок уведомления подписчиков не гарантирован
