"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader, Download, RefreshCw, Sparkles, Brush } from "lucide-react";
import ImageGrid from "@/components/image-grid";
import { generateImages } from "@/lib/generate-images";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    try {
      setLoading(true);
      setError(null);
      setSelectedImage(null);
      setImages([]);

      const generatedImages = await generateImages(prompt);
      setImages(generatedImages);
      setPrompt("");
    } catch (err) {
      setError("Failed to generate images. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerateWithStyle = async () => {
    if (!selectedImage) return;

    try {
      setLoading(true);
      setError(null);
      setImages([]);

      // Generate new images with similar style to the selected one
      const newPrompt = `${prompt}, in the style of the selected image`;
      const generatedImages = await generateImages(newPrompt);
      setImages(generatedImages);
      setSelectedImage(null);
    } catch (err) {
      setError("Failed to generate images. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!selectedImage) return;

    const link = document.createElement("a");
    link.href = selectedImage;
    link.download = `ai-generated-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 mt-[80px]"
        >
          <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            AI Image Generator
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enter a description and generate beautiful AI images. Select your
            favorite to download or create variations.
          </p>
        </motion.div>

        <Card className="mb-8 overflow-hidden border-muted/40 shadow-md">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Describe the image you want to generate..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="pl-10 pr-4 py-6 text-base"
                  disabled={loading}
                />
              </div>
              <Button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Brush className="h-4 w-4" />
                    Generate
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-500 mb-6 text-center p-3 bg-red-50 rounded-md"
            >
              {error}
            </motion.div>
          )}

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
            >
              {[...Array(4)].map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <Skeleton className="w-full h-[150px] rounded-none" />
                </Card>
              ))}
            </motion.div>
          )}

          {images.length > 0 && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ImageGrid
                images={images}
                selectedImage={selectedImage}
                onSelect={setSelectedImage}
              />

              <AnimatePresence>
                {selectedImage && (
                  <motion.div
                    className="flex justify-center gap-4 mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <Button
                      onClick={handleDownload}
                      variant="outline"
                      className="shadow-sm hover:shadow transition-all duration-300"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button
                      onClick={handleRegenerateWithStyle}
                      disabled={loading}
                      className="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Generate Similar Style
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {!loading && images.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <div className="bg-muted/50 inline-flex rounded-full p-6 mb-4">
                <Brush className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">
                No images generated yet
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Enter a description above and click "Generate" to create
                AI-powered images.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
