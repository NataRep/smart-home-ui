# API документация

Все запросы требуют заголовок авторизации:

Authorization: Bearer <token>

## Dashboards (дашборды)

### Получить список всех дашбордов

**GET** `/api/dashboards`

**Ответ:**

```json
[
  { "id": "overview", "title": "Overview", "icon": "home" },
  { "id": "electricity", "title": "Electricity", "icon": "bolt" }
]
```

### Получить вкладки и карточки дашборда

**GET** `/api/dashboards/:dashboardId`

**Ответ:**

```json
{
  "tabs": [
    {
      "id": "overview",
      "title": "Overview",
      "cards": [
        {
          "id": "living-room-mixed",
          "title": "Living Room",
          "layout": "verticalLayout",
          "items": [
            {
              "type": "device",
              "icon": "lightbulb",
              "label": "Lamp",
              "state": true
            }
          ]
        }
      ]
    }
  ]
}
```

### Обновить содержимое дашборда

**PUT** /api/dashboards/:dashboardId

**Тело запроса:**

```json
{
  "tabs": [
    {
      "id": "main",
      "title": "Main",
      "cards": [
        {
          "id": "living-room",
          "title": "Living Room",
          "layout": "verticalLayout",
          "items": [
            {
              "type": "device",
              "icon": "lightbulb",
              "label": "Lamp",
              "state": true
            },
            {
              "type": "sensor",
              "icon": "thermostat",
              "label": "Temperature",
              "value": {
                "amount": 23.5,
                "unit": "°C"
              }
            }
          ]
        }
      ]
    }
  ]
}
```
