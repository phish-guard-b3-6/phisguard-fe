import React from "react";
import Image from "next/image";

export default function LandingImage() {
  return (
    <div className="relative h-full w-full rounded-lg overflow-hidden shadow-2xl">
      <Image src="/image/cimb.png" alt="..." fill className="object-cover" />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent p-10 flex flex-col justify-end items-center">
        <div className="flex flex-col items-start w-4/5 pb-5">
          <h1 className="text-white text-2xl font-bold text-center mb-2">Enterprise Security</h1>
          <p className="text-white text-lg text-left">
            Protecting your most valuable digital assets with military-grade encryption and real-time threat detection.
          </p>
        </div>
      </div>
    </div>
  );
}
