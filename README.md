# Torre-control 🛫

Hi! I'm David...

Let me introduce you to Torre Control, an application that will help you discover the best way to secure your future career.

![Pic of a torre control](https://www.itmplatform.com/lib/uploads/59609188_m.jpg "Pic of a torre control")

Taken from ITM Platform https://www.itmplatform.com/es/blog/la-pmo-como-una-torre-de-control/

## Concept

However, to achieve this goal, it is necessary to help workers to find those skills that, if acquired, will allow them to grow personally and professionally.

This is where Torre Control comes in. With TC users can know what skills are around them with just their Torre username. Also, TC will allow them to visualize their own skills, and create a Sketch where they can add some of the skills they do not yet have, to see how this affects their job offers.

## Logbook

I kept a log of the most relevant things during the creative process. In case you are interested, here is the link 👉🏻 https://github.com/whatevercamps/torre-control/wiki/LogBook

# Nerds stuff

## Third-part services

1.  Torre APIs
2.  IBM Watson Assistant
3.  IBM Speech Recognition Microservice

## Arch

![Arch diagram](https://i.imgur.com/aJNbjvA.png "Architecture Diagram")

I decided to use a hybrid architecture: micro services for the Chatbot features, for future integrations with messaging services like **Whatsapp** or **Telegram** (TO-DO); and a unified service for the _Skill Sketch_ features. However, I decided to use NodeJS for the latter component, and a VC pattern, as this will make it very easy to migrate to microservices when you have the resources to do so.

## How to deploy

1. Have installed Node and npm
   ```sh
   $ npm --version
   $ node --version
   ```
   if you don't have any of these, you can install it by following this link 👉🏻 [nodejs.org](https://nodejs.org/)
2. Clone repository

   ```sh
   $ git clone https://github.com/whatevercamps/torre-control.git
   $ cd torre-control
   ```

3. Install dependencies

   ```sh
   $ npm install
   ```

4. Set enviroment variables
   In order to get connected to a real mongo database, you will have to create a file into project folder, call it **.env** and write this...

   ```sh
   PORT=<Port You want to run application in>
   TORRE_PEOPLE_API_URL=<valid Torre API url for people searching e.g: https://search.torre.co/people/_search/?aggregate=true>
   TORRE_STRENGTHS_API_URL=<valid torre API ulr for get user's genome e.g https://torre.co/api/genome/bios/<username>/strengths-skills>
   WATSON_ASSISTANT_APIKEY=<IBM Watson Assistant Service API Key>
   WATSON_ASSISTANT_URL=<IBM Watson Assistant Service URL>
   WATSON_ASSISTANT_ID=<IBM Watson Assistant Service ID>
   IBM_SPEECH_TO_TEXT_APIKEY=<IBM STT service API key>
   IBM_SPEECH_TO_TEXT_URL=<IBM STT service URL>
   ```

   save it and... that's it!

5. Run the project 🎉
   ```sh
   npm start
   ```
   The current port where server are running is the **:3001** port, but you can change it by going to node-explorer/bin/www file and modifying "3000" in this line ... `sh var port = normalizePort(process.env.PORT || "3001");`

If you want to modify front-end proyect and deploy it in server side...

6. Enter to front-end folder and install dependencies

   ```sh
      $ cd front-end
      $ npm install
   ```

   If you want to run the application in developer mode before building a new production version run `$ npm start ` and access from port **3000**.

7. Run and done
   ```sh
      $ npm run build
   ```

## Next steps (TO-DO)

1. I would like to implement in future versions a connection to instant messaging services through one or two additional microservices. Something like that, however I am listening to different ideas! 🤓
   ![Arch diagram](https://i.imgur.com/Tk2tZTA.png "Architecture Diagram")

## Thaks!

Thanks for reading...

David 🤓
