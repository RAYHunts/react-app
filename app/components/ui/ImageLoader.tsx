import React, { useEffect, useState, type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export default function ImageLoader(props: ComponentProps<"img">) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = props.src as string;
    image.onload = () => {
      setIsReady(true);
    };
  });
  if (!isReady) {
    return <img {...props} />;
  } else {
    return <div className={twMerge("animate-pulse h-full rounded-2xl w-full bg-slate-800", props.className)} />;
  }
}
