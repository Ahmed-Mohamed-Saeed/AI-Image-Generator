# AI Image Generator

A modern web application that generates AI-powered images based on text descriptions. Built with Next.js, TypeScript, and Tailwind CSS.

![AI Image Generator Screenshot](https://raw.githubusercontent.com/Ahmed-Mohamed-Saeed/ai-image-generator/main/public/generator.png)

## Features

- Generate AI images from text descriptions
- Download generated images
- Generate variations of selected images
- Modern and responsive UI
- Smooth animations and transitions
- Error handling and loading states

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **UI Components**: Shadcn UI
- **Animation**: Framer Motion
- **Icons**: Lucide Icons

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Ahmed-Mohamed-Saeed/ai-image-generator.git
cd ai-image-generator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your API key:
```
NEXT_PUBLIC_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter a description of the image you want to generate in the input field
2. Click the "Generate" button
3. Wait for the images to be generated
4. Select an image to download or generate variations
5. Use the "Download" button to save the selected image
6. Use the "Generate Similar Style" button to create variations of the selected image

## Project Structure

```
ai-image-generator/
├── app/                # Next.js app directory
│   ├── api/           # API routes
│   ├── page.tsx       # Main page component
│   └── globals.css    # Global styles
├── components/        # React components
│   ├── ui/           # UI components
│   └── image-grid.tsx # Image grid component
├── lib/              # Utility functions
├── public/           # Static assets
└── styles/           # CSS styles
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 