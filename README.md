<p align="center">
  <img src="rdme/logo.png" width="400"
  <br><br><br>
  Extension for Chromium-based browsers to monitor fun statistics about your daily web activity
</p>

## How it works
Dumb Stats tracks user actions such as clicking, scrolling, typing, and opening pages and calculates
<br> fun statistics about these actions. You can know:
- How many calories you burn by clicking a mouse;
- How many meters of web pages you scroll every day;
- What novel you could have typed with your number of keypresses;
- How much time approximately you have spent browsing internet.

## Installation
If you want to try out Dumb Stats, you can <a href="https://chrome.google.com/webstore/detail/dumb-stats/daifepjkmeaghpkmnljbmkpacimoagam" target="_blank">install</a> it directly from Chrome Web Store.

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

### Available Scripts
- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build the extension
- `pnpm release` - Build the extension for production
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage report
- `pnpm format` - Format code with Prettier
- `pnpm lint` - Check for linting issues
- `pnpm lint:fix` - Fix linting issues automatically

## Project Structure
```
src/
├── assets/         # Extension icons and assets
├── background/     # Background script
├── content/        # Content scripts
├── pages/         
│   └── popup/     # Extension popup
└── manifest.json   # Extension manifest
```

## Testing
The project uses Jest for testing. Tests are located next to the files they test with the `.test.js` extension. To write new tests:

1. Create a test file next to the component/module you want to test
2. Run tests using `pnpm test` or `pnpm test:watch` for development
3. Ensure test coverage with `pnpm test:coverage`

## Contributing
Contributions are welcome! 

Please make sure your PR:
- Includes tests for new functionality
- Passes all existing tests
- Follows the project's code style
- Updates documentation as needed

## Any feedback or suggestions?
Feel free to contact me via <a href="mailto:bekzat.beis@gmail.com" target="_blank">Gmail</a> for any kind of discussion.

## License
This project is licensed under the ISC License.
