![image](https://user-images.githubusercontent.com/25116785/177857389-7a127ca6-9eb5-4611-b3a0-d9dedbae4455.png)

# SM64-WR-twitter-bot

This Twitter bot tweet Super Mario 64 new world records once submitted and verified on speedrun.com.

https://twitter.com/SM64WRBOT

---

## Requirements

You will need Node.js installed in your environement.

### Node

- #### Node installation on Windows

  Visit [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    vX.X.X

    $ npm --version
    X.X.X

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

## setting up your environment file

    $ cp .env.example .env

Requires a twitter account. Get your twitter API_KEY, API_SECRET_KEY, ACCESS_TOKEN & ACCESS_TOKEN_SECRET on [the twitter developers app](https://developer.twitter.com) then edit your newly created .env file keys & tokens with yours.

## Running the bot

    $ npm i           // install dependencies
    $ npm run start   // compile code and run the bot
