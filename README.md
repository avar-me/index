# index.avar.me

Статическая карта проектов [avar.me](https://avar.me). Публикуется через GitHub Pages.

## Редактирование

Все сервисы, ссылки и статусы — в файле **`services.json`**.

### Добавить сервис

В нужную секцию (`sections`) в массив `items` добавьте объект:

```json
{
  "title": "Название",
  "url": "https://example.com",
  "status": "stable",
  "description": "Краткое описание."
}
```

### Статусы (`status`)

| Значение | На сайте |
|----------|----------|
| `stable` | стабильно |
| `test` | тестирование |
| `dev` | разработка |
| `plan` | в планах |
| `deprecated` | устарело |

### Новая секция

```json
{
  "id": "my-section",
  "title": "Заголовок раздела",
  "items": []
}
```

Для приглушённого оформления (как «Архив») добавьте `"muted": true`.

В `description` можно использовать HTML: `<strong>`, `<em>`, `<a href="...">`.

Дополнительные адреса (алиасы) — поле `aliases`:

```json
{
  "title": "corpus.avar.me",
  "url": "https://corpus.avar.me",
  "aliases": ["https://korpus.avar.me"],
  "status": "plan",
  "description": "..."
}
```

После правок — commit и push; сайт обновится через GitHub Pages.
