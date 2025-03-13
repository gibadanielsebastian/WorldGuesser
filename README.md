# World Guesser

World Guesser is an interactive geography quiz application built with Next.js that tests your knowledge of countries, flags, and world geography through fun and challenging games.

![World Guesser Logo](/public/logo.webp)

## 🌍 Features

- **Multiple Game Modes**:

  - **Guess the Flag**: Identify the country by looking at its flag
  - **Name the Country**: Name the country based on its outline/shape
  - **Find the Country**: Locate a country on the world map

- **Customizable Settings**:

  - **Three Difficulty Levels**: Easy, Medium, and Hard
  - **Three Timer Modes**:
    - Countdown with Bonus: Get extra time for correct answers
    - Fixed Countdown: Race against a set time limit
    - Stopwatch: See how quickly you can complete the challenge
  - **Theme Options**: Light, Dark, and System preference
  - **Sound Effects**: Toggle on/off for game feedback

- **Score Tracking**:
  - Locally stored high scores for each game mode
  - Filter records by difficulty and timer mode
  - Personal best tracking

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/world-guesser.git
   cd world-guesser
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🎮 How to Play

### Guess the Flag

- A random country flag will be displayed
- Type the name of the country in the input box
- If you're correct, you'll score a point (and get bonus time in certain modes)
- Use the hint feature if you're stuck
- Skip button is available, but will count as a wrong answer

### Name the Country

- A country outline/shape will be displayed
- Type the name of the country in the input box
- Hints are available if you need assistance
- Score points for each correct answer

### Find the Country

- A country name will be shown
- Click on the country on the world map
- The game will move to the next country after your answer
- Keep going until time runs out or you've completed all countries

## 🛠️ Project Structure

```
src/
├── app/
│   ├── components/        # Reusable UI components
│   ├── contexts/          # React contexts (Settings)
│   ├── gamemodes/         # Game mode pages
│   ├── globals.css        # Global styles
│   ├── how-to-play/       # Instructions page
│   ├── layout.js          # Root layout component
│   ├── page.js            # Home page
│   ├── records/           # High scores page
│   └── settings/          # Settings page
├── public/                # Static assets
│   ├── 4x3/               # Country flags
│   ├── maps/              # Country outlines
│   ├── sounds/            # Sound effects
│   └── world-map.svg      # World map for Find the Country game
```

## ⚙️ Technologies Used

- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **Fonts**: Google Fonts (Kablammo, Itim)
- **Local Storage**: For saving high scores and settings

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop computers
- Tablets
- Mobile phones

## 🛣️ Roadmap

- Add more game modes (Capital Cities, Population Quizzes)
- Online multiplayer functionality
- Global leaderboards
- More detailed country information
- Support for different languages

## 🙏 Acknowledgements

- Flag images from [Flagpedia](https://flagpedia.net/)
- Country shape outlines created using SVG mapping tools
- Sound effects from [Mixkit](https://mixkit.co/free-sound-effects/)
