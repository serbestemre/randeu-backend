# Introduction

This application is a backend side of a project created for Izmir University of Economics Computer Engineering Senior Project.

##### Used Technologies

###### Node.JS, MongoDB, Redis, React, Reac Native

- [Web App Repository](https://github.com/serbestemre/randeu-webApp)
- [Mobile App Repository](https://github.com/sercankavdir/randeu-mobileApp)

## Problem Statement

There does not exist such a platform that brings variety of business services and their customers together to organise their appointment processes. Similar platforms do not provide personal recommendations for helping users to find services that fit them best. Therefore, people need more on the experience and recommendation of their friends when they are looking for a service. Also, the places people prefer to get services are directly related to their income levels. People with good income can choose to get served in luxury places and vice versa. Considering the social-economic situation of people, there is no system that can help them according to their preferences.

## Motivation

We planned to create an online personal appointment assistant software which includes a variety of private business services in one place. It offers users recommendations that fit them best when they search a service. There does not exist such a platform that brings all described features together.

Nowadays, due to pandemic conditions, people need to keep social distancing in public places. Governments published some instructions about keeping social distance. One instruction is not to be in the same place more than the stated number of people. For example, to prevent the crowd in beauty salons, the best way is to organise appointments online. So, this type of appointment management applications will gain more value in the following days.

### Detailed Documentation

* [Randeu Proposal](https://github.com/serbestemre/personal-appointment-assistant/blob/master/randeu-proposal.pdf)
* [Randeu Final Report](https://github.com/serbestemre/personal-appointment-assistant/blob/master/randeu-final-report.pdf)


## How to Run

First clone the repository

```
$ cd src/
```

```
$ touch .env.dev 
$ touch .env.test
```

### Environment Variables

```
SERVER_URL=http://localhost:8080
DB_URL=
process.env.REDIS_URL=
JWT_SECRET_KEY=
PORT=8080
clientID= // Google API KEY
clientSecret= // Google API KEY
appID= //Facebook API KEY
appSecret= //Facebook API KEY
SENDGRID_API_KEY= 
```
### Run the Server

```
$ npm install
$ npm run dev
```

### Test

``` $ npm test ```
