# MoodMakeover

# MoodMakeover is a cross-platform mobile application that leverages augmented reality (AR) for dopamine-inducing decor transformations.

Users can point their device cameras at their living spaces and instantly preview virtual decorations—furniture, artwork, lighting effects—overlaid in real time, helping spark creativity and elevate mood.

Note: Earlier versions of this repository included a separate `moodmakeover/` folder generated from the Expo template. That folder was unused and has been removed—the Expo project in this repository lives at the repository root.

## Goals
- Enable AR-based “dopamine decor” to empower users to reimagine their environments
- Provide a library of 3D assets and visual effects for mood-boosting transformations
- Offer intuitive controls for placing, scaling, and customizing AR content

## Technology Stack
- **Framework:** React Native (TypeScript)
- **AR:** Viro React (or Expo AR)
- **Project Setup:** Expo (managed workflow)
- **Styling & Linting:** ESLint, Prettier
- **Testing & CI:** Jest, React Native Testing Library, GitHub Actions

## Installation

Clone the repository and install dependencies:
```sh
npm install
```

Install additional packages:
```sh
npm install @reduxjs/toolkit react-redux @react-navigation/native @react-navigation/native-stack @ui-kitten/components @eva-design/eva @ui-kitten/eva-icons dotenv
expo install react-native-screens react-native-safe-area-context react-native-gesture-handler expo-camera expo-gl expo-gl-cpp expo-three react-native-svg
```

## Libraries Installed

- **React Navigation** (v6) for navigation
- **Redux Toolkit** & **React Redux** for state management
- **UI Kitten** for UI components and theming
- **expo-camera** for camera access
- **expo-three** (with `expo-gl` & `expo-gl-cpp`) for AR support
- **dotenv** for environment variable management

## Usage

Copy `.env.example` to `.env` and add any required keys.

Start the app:
```sh
npm start
```

## Segmentation Service

We’re integrating Meta’s Segment Anything Model (SAM v2) via a cloud endpoint for room segmentation. Calling SAM through a Replicate cloud API lets us avoid bundling a large on‐device model and simplifies rollout. On‐device ONNX runtime is a future optimization to reduce latency and cost.

### Environment Variables

Add your Replicate API token to `.env`:
```env
REPLICATE_API_TOKEN=your_replicate_api_token
```

### How It Works

- `src/services/SegmentationService.ts` exports `getRoomMask(imageUri: string): Promise<string>` which uploads the photo to the SAM v2 endpoint and returns a URL to the generated mask PNG.
- In `src/screens/CaptureScreen.tsx`, after capturing a photo, we call `getRoomMask()` to fetch and overlay the segmentation mask for walls, floors, and large furniture.