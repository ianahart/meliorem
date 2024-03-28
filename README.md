# Meliorem

An application to help you study better

![React](https://camo.githubusercontent.com/e95e1cbdf8a6d197063c7e8765a79deb9b853081012d6e892adb6ac2c364397c/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f7374796c653d666f722d7468652d6261646765266d6573736167653d526561637426636f6c6f723d323232323232266c6f676f3d5265616374266c6f676f436f6c6f723d363144414642266c6162656c3d)
![Spring Boot](https://camo.githubusercontent.com/f4a35c8c4d475cbde11892b5fbb4735de63043c884ca4616f91fcc494200fa00/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f7374796c653d666f722d7468652d6261646765266d6573736167653d537072696e672b426f6f7426636f6c6f723d364442333346266c6f676f3d537072696e672b426f6f74266c6f676f436f6c6f723d464646464646266c6162656c3d)
![PostgreSQL](https://camo.githubusercontent.com/aaf7d409d95158427f9389c20305d66299f4e15d96bfa9d4f0792b21ad01e327/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f7374796c653d666f722d7468652d6261646765266d6573736167653d506f737467726553514c26636f6c6f723d343136394531266c6f676f3d506f737467726553514c266c6f676f436f6c6f723d464646464646266c6162656c3d)

<img width="700" alt="meliorem" src="https://github.com/ianahart/meliorem/assets/29121238/aa1ab0e9-33f7-4a2e-acd5-0340e918ce05">

### Built With

- Spring Boot
- React
- PostgreSQL

## Description

Meliorem is a study/quiz application that helps the user memorize, study, and gain new skills.
It comes with a variety of features. Let me walk you through some of them. A user can create a personal account,
where they can upload an avatar and customize their preferences. You can create study sets which is essentially a group of related
flash cards. You can customize the flash cards with images, background colors, and colored text. Once you are ready to study
You can flip through the animated flash cards or if you want to do it timed, you can play through the flash cards.
If you need to export your flash cards you can do that. You can also edit and update the flash cards as you see fit. There are also public study sets
you can study, bookmarks, and you can upload your own notes from a word document and turn it into a PDF. You can track your progress with the daily/montly streak counter.

Another part of the application is creating study groups. You can invite other users/students to join your group.
The group section allows you to chat in realtime with one another and also add study sets that are related to the group.

## Table of Contents

- [Meliorem](#meliorem)
    - [Built With](#built-with)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation (Local)](#installation-local)
  - [Usage](#usage)
      - [Test Account](#test-account)
  - [Credits](#credits)
  - [References](#references)
  - [License](#license)
  - [Contributing](#contributing)
  - [Badges](#badges)
  - [Questions](#questions)

## Installation (Local)

- `git clone https://github.com/ianahart/meliorem.git`
- **cd** into the root of the cloned project
- If you have not downloaded [postgresql](https://www.postgresql.org/) go ahead and do so.
- In the terminal run `psql postgres` and create a database called `meliorem` and `\c meliorem`
- in the root of the project, run `mvn clean install`
- now cd into the folder labeled **frontend** and run `npm install`
- inside the **frontend** directory run `npm run dev`
- inside the root of the project run `mvn spring-boot:run`

## Usage

Sign up and create an account. Create your first study set and begin studying!

#### Test Account

- username: millie@gmail.com
- password: Test12345%

[Live Site](https://meliorem.netlify.app/)

[Demo](https://drive.google.com/file/d/1t514WCPX5IIyt5xwq7k65hnHkVBkT9rq/view)

## Credits

[Quizlet](https://quizlet.com/)

## References

- [Quizlet](https://quizlet.com/) Heavily inspired by Quizlet and their features.
  Meliorem is purely for learning purposes to build skills and is essentially a Quizlet clone.
- [React Calendar](https://www.npmjs.com/package/react-calendar)
- [SockJs](https://github.com/sockjs/sockjs-client)
- [StompJs](https://github.com/stomp-js/stompjs)

## License

This project is covered under MIT License

<details>
  <summary>
    Preamble
  </summary>

```

Copyright (c) 2024  Ian Hart

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```

</details>

## Contributing

No contributions are being accepted at this time.

## Badges

[![GitHub license](https://img.shields.io/github/license/ianahart/meliorem)](https://github.com/ianahart/meliorem/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/ianahart/meliorem)](https://github.com/ianahart/meliorem/issues)
[![GitHub stars](https://img.shields.io/github/stars/ianahart/meliorem)](https://github.com/ianahart/meliorem/stargazers)

## Questions

- Get in touch with me through [email](mailto:ianalexhart@gmail.com).
