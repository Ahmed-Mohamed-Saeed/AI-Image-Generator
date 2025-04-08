"use client"

import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { motion } from "framer-motion"

interface ImageGridProps {
  images: string[]
  selectedImage: string | null
  onSelect: (image: string) => void
}

export default function ImageGrid({ images, selectedImage, onSelect }: ImageGridProps) {
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({})

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }))
  }

  // Animation variants for the grid items
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  }

  return (
    <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-[100px]" variants={container} initial="hidden" animate="show">
      {images.map((image, index) => (
        <motion.div key={index} variants={item}>
          <Card
            className={cn(
              "overflow-hidden cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-primary/50 hover:shadow-md",
              selectedImage === image ? "ring-2 ring-primary shadow-sm" : "",
            )}
            onClick={() => onSelect(image)}
          >
            <div className="relative w-full" style={{ height: "200px" }}>
              {!loadedImages[index] && <Skeleton className="absolute inset-0 z-10 rounded-none" />}
              <Image
                src={image || "/placeholder.svg"}
                alt={`Generated image ${index + 1}`}
                fill
                className={cn(
                  "object-cover transition-opacity duration-300",
                  loadedImages[index] ? "opacity-100" : "opacity-0",
                )}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                unoptimized={image.startsWith("data:")}
                onLoad={() => handleImageLoad(index)}
              />
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
