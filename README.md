# Meliorem

An application to help you study better

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white&style=for-the-badge)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?logo=spring-boot&logoColor=white&style=for-the-badge)
![Java](https://img.shields.io/badge/Java-007396?logo=java&logoColor=white&style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white&style=for-the-badge)

<img width="700" alt="meliorem" src="https://github.com/ianahart/meliorem/assets/29121238/aa1ab0e9-33f7-4a2e-acd5-0340e918ce05">

## Built With

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
  - [Visuals](#visuals)
  - [Installation (Local)](#installation-local)
  - [Usage](#usage)
      - [Test Account](#test-account)
  - [Credits](#credits)
  - [References](#references)
  - [License](#license)
  - [Contributing](#contributing)
  - [Badges](#badges)
  - [Questions](#questions)


## Visuals

<div>
    <video src="https://github.com/ianahart/meliorem/assets/29121238/f35df0e8-c07f-4926-bf02-8896d8d71dee" width="650" controls type="video/mp4"></video>
</div>


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
