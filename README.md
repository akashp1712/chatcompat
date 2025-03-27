# ChatCompat

## Overview

ChatCompat is a web application designed to test the compatibility of any Language Model (LLM) API with OpenAI's `/chat/completions` endpoint specification. It allows developers to verify whether an LLM API adheres to OpenAI's payload and response formats, including support for streaming responses. The app provides a clean, user-friendly interface to input API details, send requests, and view detailed compatibility results.

### Key Features
- **Compatibility Testing**: Tests if an LLM API matches OpenAI's `/chat/completions` payload and response structure.
- **Streaming Support**: Verifies if the API supports streaming responses using OpenAI's `text/event-stream` format.
- **Detailed Logs**: Displays request payloads, responses, and error messages for debugging.
- **Modern UI**: A polished, professional interface inspired by Attio.com, built with Next.js, Tailwind CSS, and shadcn/ui components.
- **Editable Payload**: Allows users to modify the JSON payload directly in the UI using a JSON editor.

## Hosted URL

The app is live at: [chatcompat.vercel.app](https://chatcompat.vercel.app)

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with shadcn/ui components
- **JSON Editor**: `react-json-editor-ajrm` for editable JSON input
- **API Requests**: Fetch API for non-streaming and streaming requests
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- An OpenAI API key (or another LLM API key to test compatibility)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/chatcompat.git
   cd chatcompat
2. Install dependencies:
    ```bash

    npm install
    Run the development server:
    bash
3. Run the development server
    ```bash

    npm run dev

The app will be available at http://localhost:3000.


### Usage
1. Open the app in your browser.
2. Enter the Server URL of the LLM API you want to test (e.g., https://api.openai.com/v1/chat/completions).
3. Provide an API Key if required by the API.
4. Modify the Payload as needed (default payload uses OpenAI's format).
5. Click Test Endpoint to run the compatibility test.
6. View the results:
    - Payload Compatibility: Checks if the request was sent successfully.
    - Response Compatibility: Verifies if the response matches OpenAI's format.
    - Streaming Support: Tests if streaming (stream: true) is supported.
    - Logs: Detailed request and response logs.
    - Streaming Output: Shows real-time streaming responses if stream: true.

### Example
To test OpenAI's API:

- Server URL: https://api.openai.com/v1/chat/completions
- API Key: Your OpenAI API key (sk-...)
- Payload:

    ```json
    {
        "model": "gpt-3.5-turbo",
        "messages": [
            { "role": "user", "content": "Hello, are you compatible?" }
        ],
        "stream": false
    }
- Click "Test Endpoint". The app will report compatibility results and logs.

To test a non-compatible API (e.g., Claude):

- Server URL: https://api.anthropic.com/v1/messages
- API Key: Your Anthropic API key
- Payload: Same as above (OpenAI format)
- The test will fail, as Claude doesn’t comply with OpenAI’s /chat/completions spec, and the logs will show the errors (e.g., authentication failure, response format mismatch).


## Project Structure

chatcompat/
├── app/
│   ├── api/
│   │   ├── test/
│   │   │   └── route.ts        # Handles non-streaming and streaming tests
│   │   ├── test-stream/
│   │   │   └── route.ts        # Handles streaming responses
│   ├── globals.css             # Tailwind CSS setup
│   ├── layout.tsx              # Root layout with Inter font
│   ├── page.tsx                # Main page with TestForm component
├── components/
│   ├── TestForm.tsx            # Main form for input and testing
│   ├── ResultsDisplay.tsx      # Displays compatibility results and logs
│   ├── StreamingOutput.tsx     # Shows streaming responses
│   ├── ui/                     # shadcn/ui components
├── public/                     # Static assets
├── package.json                # Dependencies and scripts
└── README.md                   # Project documentation


## Contributing
Contributions are welcome! Please open an issue or submit a pull request with your improvements.

## License
This project is licensed under the MIT License.

## Acknowledgments
- Built with Next.js
- Styled with Tailwind CSS and shadcn/ui
- JSON editing powered by react-json-editor-ajrm
- Inspired by the UI of Attio.com
- Branding by Lessentext.com