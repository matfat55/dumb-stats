# Dumb Stats

![Dumb Stats](rdme/logo.png)

Extension for Chromium-based browsers to monitor fun statistics about your daily web activity

## How it works

Dumb Stats tracks user actions such as clicking, scrolling, typing, and opening pages and calculates
fun statistics about these actions. You can know:

- How many calories you burn by clicking a mouse;
- How many meters of web pages you scroll every day;
- What novel you could have typed with your number of keypresses;
- How much time approximately you have spent browsing internet.

## Installation

If you want to try out Dumb Stats, you can [install](https://chrome.google.com/webstore/detail/dumb-stats/daifepjkmeaghpkmnljbmkpacimoagam) it directly from Chrome Web Store.

## Development

### Prerequisites

- Node.js (v14 or higher)
- pnpm (v9.15.0 or higher)
- Chrome/Chromium browser

### Getting Started

1. Clone the repository

```bash
git clone https://github.com/bekbeis/dumb-stats.git
cd dumb-stats
```

2. Install dependencies

```bash
pnpm install
```

3. Start development server

```bash
pnpm dev
```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the `dist` directory in the project folder

## Contributing

Contributions are welcome!

Make sure you have no linting errors, the code is formatted, and it passes all tests

```bash
pnpm format
pnpm lint
pnpm test
```

Then open a PR with your changes. 

## Any feedback or suggestions?

Feel free to contact me via [Gmail](mailto:bekzat.beis@gmail.com) for any kind of discussion.

## License

This project is licensed under the ISC License.
