# Virtual Fridge

## Założenia projektu

Stworzenie aplikacji frontendowej używając biblioteki ReactJS wraz z wykorzystaniem Firebase'a jako backend.

Aplikacja służyć ma do dzielonego tworzenia wirtualnej lodówki na której umieszcza się notatki. 

## Funkcjonalności

- Rejestracja oraz logowanie za pomocą maila oraz za pomocą konta google dzięki opcji autentykacji w konsoli Firebase.
- Tworzenie tablicy: ustalenie nazwy i opisu tablicy, dodanie osób współdzielących tablicę - adresy email.
- Wejście na tablicę:
    - Dodanie notatek
    - Przemieszczanie notatek
    - Zmiana rozmiaru notatek
    - Wypełnianie notatek:
        - Klawiatura
        - Speech recognition
    - Odczytywanie notatki TTS
    - Usuwanie notatki
    - Skalowanie - pinch to zoom
- Dodanie osób współdzielących daną tablicę
- Usuwanie tablicy

## Technologie
- ReactJS 18.2.0
- Tailwind CSS
- Firebase - backend as a service

## Wygląd aplikacji
- Logowanie i rejestracja
![Logowanie i rejestracja](./dokumentacja-screeny/home-sign-in-up.png "Logowanie i rejestracja")
![Rejestracja](./dokumentacja-screeny/sign-up.png "Rejestracja")

- Dashboard
![Dashboard](./dokumentacja-screeny/home-user.png "Dashboard")
![Dashboard drawer](./dokumentacja-screeny/home-user-drawer.png "Dashboard drawer")

- Tworzenie lodówki
![Tworzenie lodówki](./dokumentacja-screeny/fridge-add.png "Tworzenie lodówki")
![Tworzenie lodówki dodany użytkownik](./dokumentacja-screeny/fridge-add-user-added.png "Tworzenie lodówki dodany użytkownik")

- Lodówka
![Lodówka pusta](./dokumentacja-screeny/fridge-empty.png "Lodówka pusta")
![Lodówka edycja](./dokumentacja-screeny/fridge-notes-edit.png "Lodówka edycja")
![Lodówka](./dokumentacja-screeny/fridge-notes.png "Lodówka")
![Lodówka drawer](./dokumentacja-screeny/fridge-drawer.png "Lodówka drawer")
![Lodówka edit](./dokumentacja-screeny/fridge-edit.png "Lodówka edit")

