import localFont from "next/font/local";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const sansation = localFont({
  src: [
    {
      path: "./Sansation_Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Sansation_Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./Sansation_Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Sansation_Light.ttf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-sansation",
});

export const fontVariables = `${spaceGrotesk.variable} ${sansation.variable}`;
