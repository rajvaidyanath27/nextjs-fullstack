"use client";

import { IKVideo } from "imagekitio-react";
import Link from "next/link";
import { IVideo } from "@/models/Video";

export default function VideoComponent({ video }: { video: IVideo }) {
  const videoPath = video.videoUrl ?? "";
  const hasControls = !!video.controls;
  const title = video.title ?? "";
  const description = video.description ?? "";

  return (
    <div className="card bg-base-100 shadow hover:shadow-lg transition-all duration-300">
      <figure className="relative px-4 pt-4">
        <Link href={`/videos/${video._id}`} className="relative group w-full">
          <div
            className="rounded-xl overflow-hidden relative w-full"
            style={{ aspectRatio: "9/16" }}
          >
            <IKVideo
              path={videoPath}
              transformation={[
                {
                  height: 1920,
                  width: 1080,
                },
              ]}
              controls={hasControls}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      </figure>

      <div className="card-body p-4">
        <Link
          href={`/videos/${video._id}`}
          className="hover:opacity-80 transition-opacity"
        >
          <h2 className="card-title text-lg">{title}</h2>
        </Link>

        <p className="text-sm text-base-content/70 line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
}