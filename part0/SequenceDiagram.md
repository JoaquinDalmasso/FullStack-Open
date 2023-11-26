Fullstack part0

Ejercicio 0.4 
```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://fullstack-exampleapp.herokuapp.com/new_note
    server-->>browser: HTTP 302
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes

```
