# Standup Bot for Discord

This project is a Discord bot designed to facilitate daily standup meetings within a server. Users can trigger a modal to submit their daily updates, which the bot then formats and displays in the server.

## Features

- **Custom Standup Modal**: Users can input what they did yesterday, their plans for today, and any blockers they're facing.
- **Formatted Responses**: The bot sends a neatly formatted embed in response to the user's standup submission.
- **Error Handling**: Graceful error handling for modal submissions and bot login process.

## Setup

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/standup-bot.git
cd standup-bot
```

2. **Install dependencies:**
   
  ```bash
  npm install
  ```

3. **Configure environment variables:**

Create a `.env` file in the root directory and add your Discord bot token:
   
```bash
TOKEN=your_discord_bot_token
```

4. **Running the bot:**
```bash
node src/index.js
```

## Usage
After inviting the bot to your Discord server and running the bot, use the /standup command to trigger the standup modal.

## Acknowledgements
- [discord.js](https://discordjs.guide/)
- [djs-commander](https://github.com/notunderctrl/djs-commander)
- [dotenv](https://www.npmjs.com/package/dotenv)
