export default function dialog(addMessages, setMessages, sendWatsonMessage) {
  setMessages([]);
  let initialMessages = [
    {
      sender: "bot",
      text: "Hey! I'm Houston 👨🏻‍✈️",
    },
    {
      sender: "bot",
      text: "I was created to help you in the process of improving your professional profile, discovering what skills you should learn.",
    },
    {
      sender: "user",
      options: [
        {
          onClick: () =>
            addMessages(
              [
                {
                  sender: "bot",
                  text: "Sure!",
                },
                {
                  sender: "bot",
                  text: "I was born on February 20, 2021. I'm pretty young! ",
                },
                {
                  sender: "bot",
                  text: "On that day my father discovered that, if Torre users knew how skills affect their opportunities... ",
                },
                {
                  sender: "bot",
                  text: "Each of them would make better decisions about which path to follow! 🤓",
                },
                {
                  sender: "user",
                  options: [
                    {
                      onClick: () =>
                        addMessages(
                          [
                            {
                              sender: "bot",
                              text: "Thanks! ",
                            },
                            {
                              sender: "bot",
                              text: "Before we begin, please know that this conversation is confidential, I do not collect any personal information about you.",
                            },
                            {
                              sender: "user",
                              options: [
                                {
                                  onClick: () =>
                                    addMessages(
                                      [
                                        {
                                          sender: "bot",
                                          text: "Great! Lets get started! 😎",
                                        },
                                        {
                                          sender: "bot",
                                          text: "Tellme, what can I do for you?",
                                        },
                                        {
                                          sender: "user",
                                          input: {
                                            handleSubmit: sendWatsonMessage,
                                            placeholder: "text something",
                                          },
                                        },
                                      ],
                                      500
                                    ),
                                  message: {
                                    sender: "user",
                                    text: "Good to know 💖",
                                  },
                                },
                              ],
                            },
                          ],
                          500
                        ),
                      message: {
                        sender: "user",
                        text: "Sounds cool!",
                      },
                    },
                  ],
                },
              ],
              500
            ),
          message: {
            sender: "user",
            text: "Okey, tell me more! 👀",
          },
        },
      ],
    },
  ];

  addMessages(initialMessages, 50);
}
