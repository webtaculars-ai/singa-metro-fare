# Singa Fare Calculation System

This project is a fare calculation system that processes public transportation trips for users, applies daily and weekly fare caps, and tracks total fares. It also provides a summary indicating whether a user has hit their daily or weekly cap.

## Features

- **Daily and Weekly Fare Caps**: Automatically caps fares based on predefined daily and weekly limits for different routes.
- **Peak and Non-Peak Fare Calculation**: Calculates fares based on peak and non-peak hours for each route.
- **User Fare Tracking**: Tracks fares for multiple users across different routes.
- **Cap Status**: Displays whether users have hit their daily or weekly fare caps.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/webtaculars-ai/singa-metro-fare.git
   cd singa-metro-fare

   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure TypeScript: If you don’t have a tsconfig.json file, generate one:

   ```bash
   npx tsc --init
   ```

4. Running the System
   ```bash
   npm start
   ```
5. Sample CSV file
   ```
   UserID,FromLine,ToLine,DateTime
   user1,Green,Red,2023-09-01T07:30:45
   user1,Green,Red,2023-09-01T09:10:45
   user2,Red,Red,2023-09-01T12:50:15
   ```
