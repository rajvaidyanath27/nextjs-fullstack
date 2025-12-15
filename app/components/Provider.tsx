"use client";

import { IKContext } from "imagekitio-react";
import { SessionProvider } from "next-auth/react";

const urlEndPoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY!;

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchInterval={5 * 60}>
      <IKContext
        urlEndpoint={urlEndPoint}
        publicKey={publicKey}
        authenticationEndpoint="/api/auth/imagekit-auth"
      >
        {children}
      </IKContext>
    </SessionProvider>
  );
}