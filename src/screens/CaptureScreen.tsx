import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Button } from '@ui-kitten/components';
import { getRoomMask } from '../services/SegmentationService';

export default function CaptureScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState<CameraType>(CameraType.back);
  const [capturedUri, setCapturedUri] = useState<string | null>(null);
  const [maskUri, setMaskUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const flipCamera = () => {
    setType((prev) => (prev === CameraType.back ? CameraType.front : CameraType.back));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ skipProcessing: true });
      setCapturedUri(photo.uri);
      setLoading(true);
      try {
        const mask = await getRoomMask(photo.uri);
        setMaskUri(mask);
      } catch (e) {
        console.error('Segmentation error:', e);
      } finally {
        setLoading(false);
      }
    }
  };

  const reset = () => {
    setCapturedUri(null);
    setMaskUri(null);
  };

  if (hasPermission === null) {
    return <View style={styles.container} />;
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!capturedUri ? (
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <Button size="small" onPress={takePicture}>
              Capture
            </Button>
            <Button size="small" onPress={flipCamera} style={styles.flipButton}>
              Flip
            </Button>
          </View>
        </Camera>
      ) : (
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedUri }} style={styles.preview} />
          {loading && <ActivityIndicator style={styles.loading} size="large" />}
          {maskUri && <Image source={{ uri: maskUri }} style={styles.maskOverlay} />}
          <Button onPress={reset} style={styles.resetButton}>
            Retake
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  flipButton: {
    marginLeft: 10,
  },
  previewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  maskOverlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    tintColor: 'rgba(0,255,0,0.3)',
  },
  loading: {
    position: 'absolute',
  },
  resetButton: {
    position: 'absolute',
    bottom: 40,
  },
});