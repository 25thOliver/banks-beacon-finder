
# Bank Beacon Finder

A modern web application designed to help users quickly search and find bank information without having to search through pages of documentation.

## Features

- **Powerful Search**: Search for banks by name, bank code, branch name, or branch code
- **Bank Filtering**: Filter search results by specific bank names
- **Detailed Information**: View comprehensive information including:
  - Bank names and codes
  - Branch details and codes
  - Contact information
  - Working hours
  - Location data
- **Real-time Status**: See which banks are currently open or closed
- **Quick Copy**: Click on any bank card to copy its bank code to your clipboard
- **Responsive Design**: Works on desktop and mobile devices
- **Pagination**: Navigate through multiple search results easily

## Usage

1. Enter a bank name, code, branch name, or branch code in the search bar
2. Use the bank filter dropdown to narrow down results by specific banks
3. Click on any search result to copy the bank code to your clipboard
4. Navigate multiple results using the pagination controls

## Technical Details

This application is built with:

- React + TypeScript for robust frontend development
- Tailwind CSS for responsive and elegant styling
- Shadcn UI components for a consistent design system
- React Router for navigation
- React Query for data fetching
- Lucide React for scalable icons

## Date and Time Utilities

The application includes several utility functions for handling dates and times:

- `parseTimeStringToDate`: Converts time strings (e.g., "9:00am") to JavaScript Date objects
- `isWeekend`: Determines if a given date falls on a weekend
- `isOpenNow`: Checks if banks are currently open based on the time of day
- `formatContactInfo`: Formats contact information for display

## Component Structure

The application is built with a modular component structure:

- `SearchBar`: Handles user input for searches
- `SearchResultCard`: Displays search results with bank and branch information
- `BankFilter`: Allows filtering search results by bank
- `InfoRow`: Reusable component for displaying labeled information
- `WorkingHours`: Displays formatted working hours
- `BranchInfo`: Shows detailed branch information

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```sh
git clone <repository-url>
cd bank-beacon-finder
```

2. Install dependencies
```sh
npm install
# or
yarn install
```

3. Start the development server
```sh
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
