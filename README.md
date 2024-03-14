# Advanced OCR with Multi Modal LLMs

This project showcases an advanced OCR (Optical Character Recognition) solution that combines multi modal LLMs (GPT-4 with vision or Claude 3). It is designed to process images, specifically focusing on extracting line items from grocery receipts. By utilizing multi modal LLMs' advanced text interpretation capabilities alongside AWS Rekognition for targeted image analysis, this project offers a proof of concept for digitizing text from images.

## Getting Started

To begin with this project, ensure Node.js is installed on your system. The project is developed using TypeScript, making it a necessary prerequisite as well.

### Installation

To set up this project locally, follow these steps:

1. Clone the repository to your local machine with `git clone <repository-url>`.
2. In your terminal, change directory to the project folder.
3. Run `npm install` within the project directory to install all required dependencies as listed in the `package.json` file, including the Anthropic AI SDK, OpenAI SDK, AWS SDK, and TypeScript.
4. Create a `.env` file in the root of the project and add your API keys for Anthropic AI and OpenAI, as well as your AWS credentials. You can use the `example.env` file as a template.

### Running the Project

Once the dependencies are installed, the project can be run by executing:

`npm start`

This command triggers the script specified in `package.json`, initiating the TypeScript Node.js application. The application processes a predefined image to perform OCR, leveraging both Claude-3 (or GPT-4 if specified) and AWS Rekognition. Results, including extracted line items from the grocery receipt image, are outputted to the console.

### Understanding the Code

The core OCR functionality is encapsulated in `src/index.ts`. This file orchestrates the integration between the Anthropic AI SDK and AWS Rekognition, handling image loading, analysis, and text extraction processes. It involves detecting text regions with AWS Rekognition, cropping images accordingly, and then utilizing either Claude-3 or GPT-4 to interpret and digitize the text content accurately.

For an in-depth look at the project's codebase and guidance on how to further develop or customize the project, please refer to the comments within `src/index.ts`.
