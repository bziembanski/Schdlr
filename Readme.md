# Virtual Fridge

## Autorzy

- Mariusz Morawski
- Bartosz Ziembański



## Założenia projektu

Aplikacja służyć ma do dzielonego tworzenia wirtualnej lodówki na której umieszcza się notatki. Ma za zadanie umilić korzystanie z typowej aplikacji do notatek bądź zadań, wykorzystując interfejs oparty o lodówki z karteczkami.

## Uruchomienie

- Dodanie konfiguracji firebase - plik secrets.ts
- Instalacja dependencji - npm install
- Uruchomienie w trybie debug - npm run dev

## Użytkownicy

Wszyscy użytkownicy aplikacji posiadają takie same możliwości: mogą tworzyć tablice, udostępniać je innym użytkownikom, dodawać oraz usuwać karteczki z lodówki i usuwać lodówkę.

## Widoki
[Designy w figmie](https://www.figma.com/file/Zh5nqtB3gaRsy1izCA0znp/VirtualFridge?node-id=5%3A164&t=V8n88t3zU4Jykf1p-0)

W trakcie projektowania aplikacji, głównym założeniem był prosty ale też ekspresywny design. Skupiono się bardziej na charakterystycznym wyglądzie niż na zaawansowaniu interfejsu.

## Lodówka

Lodówka to nic innego niż przestrzeń na wstawianie karteczkek z notatkami. Użytkownik z poziomu ekranu głównego - dashboardu - jest w stanie dodać nową lodówkę. Określa jej nazwę, opis oraz dodaje użytkowników do współdzielenia.

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
Użytkownik niezalogowany nie jest w stanie korzystać z aplikacji. Głównym ekranem przed logowaniem jest zawsze ekran logowania. Z poziomu tego widoku, użytkownik może się zalogować, zarejestrować mailem, bądź zalogować/zarejestrować za pomocą autentykacji kontem Google.
![Logowanie i rejestracja](./dokumentacja-screeny/home-sign-in-up.png "Logowanie i rejestracja")
![Rejestracja](./dokumentacja-screeny/sign-up.png "Rejestracja")

- Dashboard
Po zalogowaniu ekranem głównym jest dashboard, na którym widoczne są wszystkie stworzone lodówki użytkownika. Na tym ekranie znajduje się również przycisk do tworzenia lodówek.
![Dashboard](./dokumentacja-screeny/home-user.png "Dashboard")
![Dashboard drawer](./dokumentacja-screeny/home-user-drawer.png "Dashboard drawer")

- Tworzenie lodówki
Aby stworzyć lodówkę, wymagane jest zdefiniowanie nazwy lodówki. Jest możliwość wpisania krótkiego opisu oraz dodanie użytkowników współdzielących lodówkę. Po wpisaniu adresu email użytkownika klikamy przycisk "+", po czym input jest czyszczony a dodany użytkownik pojawia się poniżej.
![Tworzenie lodówki](./dokumentacja-screeny/fridge-add.png "Tworzenie lodówki")
![Tworzenie lodówki dodany użytkownik](./dokumentacja-screeny/fridge-add-user-added.png "Tworzenie lodówki dodany użytkownik")

- Lodówka
![Lodówka pusta](./dokumentacja-screeny/fridge-empty.png "Lodówka pusta")
![Lodówka edycja](./dokumentacja-screeny/fridge-notes-edit.png "Lodówka edycja")
![Lodówka](./dokumentacja-screeny/fridge-notes.png "Lodówka")
![Lodówka drawer](./dokumentacja-screeny/fridge-drawer.png "Lodówka drawer")
![Lodówka edit](./dokumentacja-screeny/fridge-edit.png "Lodówka edit")

