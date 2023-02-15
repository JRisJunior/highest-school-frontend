Have you ever gone to sleep and wondered what you’re going to do tomorrow?

Have you ever woken up and continued to wonder what you're going to do that day?

Do you have trouble with unstructured time?

Have you ever thought, "Gee golly wizz, a high school period system would help structure my day healthily without burning myself out on any particular activity?

Then look no further than...

# The Highest School App!

This app is being designed (and in active development) to help individuals structure their days much in a way that a Pomodoro Timer also operates. You will be able to:

- Add a subject and class duration to your calendar
- See the layout of your schedule from start of class time to the end
- Update and remove class periods when they're no longer relevant or need to change

Note: This app is *still in active development.* Some features may not function properly or are otherwise bare bones.

## Installation

In your terminal, navigate to the directory you wish to install the app in and run:

```zsh
git clone https://github.com/JRisJunior/highest-school-frontend.git
```

You will also need to install the following dependencies:

```zsh
npm i --save @devexpress/dx-react-core @devexpress/dx-react-scheduler

npm i --save @devexpress/dx-react-scheduler-material-ui
```

Additionally, you will need a backend and/or database to integrate with this React.js frontend. I have made one in Rails that is fairly boilerplate for what is needed, and that can be cloned from here (make sure you're not in the same directory as your frontend!):

```zsh
git clone https://github.com/JRisJunior/highest-school-api.git
```

## Features to be added

- You can add your cell phone number to your profile, which will then text you when a class period ends, and when a passing period (break time) ends, in replacement of a "school bell"
- The option to choose to make a specific class repeated on every, schedule A, or schedule B class days
- A "class" catalog you can persue and choose from if you need some inspiration as to what classes to take

## Contributing

I appreciate the thought! However, as this is (currently) not in a fully polished state, I wish to continue to develop it on my own until it is fully featured.

## License

[DevExtreme non-Commercial License](https://js.devexpress.com/licensing/#NonCommercial)
