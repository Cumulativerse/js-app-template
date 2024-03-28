'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

export default function Home() {
  const [isCapacitorReady, setIsCapacitorReady] = useState(false);
  const [image, setImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    const defineCapacitorElements = async () => {
      // Call the element loader before the render call
      if (!Capacitor.isNativePlatform()) await defineCustomElements(window);
      setIsCapacitorReady(true);
    };
    if (typeof window !== 'undefined') {
      defineCapacitorElements();
    }
  }, []);

  const takePicture = async () => {
    if (!isCapacitorReady) return;
    const newImage = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
    });

    setImage(newImage.webPath);
  };

  return (
    <main className="flex flex-col items-center">
      <div className="prose lg:prose-xl">
        <h1>Mobile Page</h1>
      </div>
      <button onClick={takePicture} className="btn btn-primary">
        Take Photo
      </button>
      {image && (
        <div className="relative h-64 w-64">
          <Image src={image} alt="Photo" fill className="object-contain" />
        </div>
      )}
    </main>
  );
}
