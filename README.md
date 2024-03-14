# Advanced OCR with Multi Modal LLMs

This project showcases an advanced OCR (Optical Character Recognition) solution that combines multi modal LLMs (GPT-4 with vision or Claude 3). It is designed to process images, specifically focusing on extracting line items from grocery receipts. By utilizing multi modal LLMs' advanced text interpretation capabilities alongside AWS Rekognition for targeted image analysis, this project offers a proof of concept for digitizing text from images.

## Getting Started

To begin with this project, ensure Node.js is installed on your system. The project is developed using TypeScript, making it a necessary prerequisite as well.

### Installation Guide

Setting up this project on your local environment is straightforward. Just follow the steps below:

1. **Clone the Repository:** Start by cloning the repository to your local machine using the command:

   ```bash
   git clone git@github.com:stephenc222/example-ocr-with-multi-modal-llms.git
   ```

2. **Navigate to the Project Directory:** After cloning, switch to the project's directory by running:

   ```bash
   cd example-ocr-with-multi-modal-llms
   ```

   in your terminal.

3. **Install Dependencies:** Inside the project directory, execute:

   ```bash
   npm install
   ```

   This installs all necessary dependencies, such as the Anthropic AI SDK, OpenAI SDK, AWS SDK, and TypeScript, as specified in the `package.json` file.

4. **Set Up Environment Variables:** Finally, create a `.env` file at the root of the project. Populate it with your API keys for Anthropic AI, OpenAI, and your AWS credentials. Refer to the `example.env` file for the format.

### Running the Project

Once the dependencies are installed, the project can be run by executing:

`npm start`

This command triggers the script specified in `package.json`, initiating the TypeScript Node.js application. The application processes a predefined image to perform OCR, leveraging both Claude-3 (or GPT-4 if specified) and AWS Rekognition. Results, including extracted line items from the grocery receipt image, are outputted to the console.

### Understanding the Code

The core OCR functionality is encapsulated in `src/index.ts`. This file orchestrates the integration between the Anthropic AI SDK and AWS Rekognition, handling image loading, analysis, and text extraction processes. It involves detecting text regions with AWS Rekognition, cropping images accordingly, and then utilizing either Claude-3 or GPT-4 to interpret and digitize the text content accurately.

For an in-depth look at the project's codebase and guidance on how to further develop or customize the project, please refer to the comments within `src/index.ts`.
