# dataLouna-test
Elysia, Drizzle, Redis, PostgreSQL

Data Louna test work

📌 Стек: strict TypeScript, фреймворк на выбор: hono/elysia/fastify/express.

📌 Документацию и тесты делать не нужно, валидация не обязательна, но будет плюсом.

Endpoint 1:

- [x] Нужно отобразить массив объектов с двумя минимальными ценами на предмет (одна цена — tradable, другая — нет).

    - [x] Получить данные можно через API: [Skinport API](https://docs.skinport.com/items).
        Параметры app_id и currency — default.
    
    - [x] В отдачу предметов необходимо добавить кэширование через Redis.

Endpoint 2:

- [x] Нужно реализовать покупку любого выдуманного товара из таблицы products.

- [x] Таблицу надо заполнить самостоятельно (несколько предметов, цена должна быть дробной).

- [x] У пользователя должен быть баланс.

- [x] В ответе должен быть обновленный баланс пользователя.

- [x] Для работы с базой данных необходимо использовать пакет postgres.

- [x] Таблицы в базе данных: users, products, purchases. Схему необходимо добавить в репозиторий.

Важная информация:

Если у вас возникнут вопросы, постарайтесь разобраться с ними самостоятельно. Мы обращаем внимание на вашу внимательность, умение работать с документацией и находить решения.

После выполнения пришлите ссылку на репозиторий — мы свяжемся с вами, чтобы обсудить следующий этап. Удачи!




## Improvement proposals

- [ ] Fix `POST /purchase`: use `tx` (not `db`) inside the transaction and make the balance check atomic (`UPDATE ... WHERE balance >= cost` or `SELECT ... FOR UPDATE`).
- [ ] Use SQL `numeric` for money, not JS floats.
- [ ] Insert only whitelisted fields, not `...body`.
- [ ] Return correct status codes (400/409/422 for business errors, 404 for not found) instead of 203/204.
- [ ] `await` the Redis `set`; add stampede protection for the cache key.
- [ ] Pin `elysia` and `bun-types` instead of `latest`; add `POSTGRES_URL` to `.env.example`.
- [ ] Add `bun:test` tests for `/purchase` (insufficient balance, parallel buys).
- [ ] Add a Dockerfile / docker-compose with Postgres and Redis.
