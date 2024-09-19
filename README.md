# Тестовое задание

**Задание:** Необходимо сделать небольшой web server
**Обязательно:** Postgres
**Не обязательно, но будет плюсом:**
Любые дополнения вроде кеширования, валидации и др.

Endpoint :
есть табличка users с полями id и balance, там есть один юзер с id = 1
вторая табличка с историей изменения платежа (user_id, action, amount, ts)
Нужно реализовать списание баланса пользователя

**Пример:** юзер покупает предмет на сайте за $100 
пересчет баланса по истории после каждой операции в поле balance

**Базу можно не поднимать, просто показать код как это может работать**

Время на выполнение обычно от 40 минут до 2 часов.
Результат выполнения - ссылка на github. Так же напишите сколько часов у вас ушло на выполнение.
При возникновении вопросов по тестовому заданию - пишите мне.

# Реализация

## Запуск сервера

```sh
nvm install
npm ci
npm run start
```

## Скрипты

- Пополнить

```sh
# USER_ID ACTION AMOUNT
node ./scripts/changeBalance.js 1 CHARGE 100
```

- Оплатить

```sh
# USER_ID ACTION AMOUNT
node ./scripts/changeBalance.js 1 PAY 100
```

## Принцип работы

1) Скрипт `changeBalance` выполняет обращение на контроллер payment 
2) контроллер проверяет входные данные
3) контроллер вызывает метод сервиса
4) сервис внесит новую запись в базу данных
5) сервис сообщает в шину событий что появилась новая запись
6) слушатель модуля user перехватывает это событие
7) слушатель модуля user обновляет баланс с помощью функции пересчета из сервиса payment
