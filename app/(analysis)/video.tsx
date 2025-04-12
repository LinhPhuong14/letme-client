// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Button,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   Video,
// } from "react-native";
// import * as ImagePicker from "expo-camera"; // Dùng 'expo-image-picker' nếu dùng Expo
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Video as ExpoVideo } from "expo-av"; // nếu dùng Expo

// const STORAGE_KEY = "@video_gallery";

// export default function VideoGallery() {
//   const [videos, setVideos] = useState([]);

//   // Load videos from AsyncStorage
//   useEffect(() => {
//     loadVideos();
//   }, []);

//   const loadVideos = async () => {
//     try {
//       const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
//       const savedVideos = jsonValue != null ? JSON.parse(jsonValue) : [];
//       setVideos(savedVideos);
//     } catch (e) {
//       console.log("Failed to load videos", e);
//     }
//   };

//   const saveVideos = async (newVideos) => {
//     try {
//       const jsonValue = JSON.stringify(newVideos);
//       await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
//     } catch (e) {
//       console.log("Failed to save video", e);
//     }
//   };

//   const handleTakeVideo = async () => {
//     ImagePicker.launchCamera(
//       {
//         mediaType: "video",
//         videoQuality: "high",
//       },
//       async (response) => {
//         if (response.didCancel || response.errorCode) {
//           console.log("User cancelled or error: ", response.errorMessage);
//           return;
//         }

//         const uri = response.assets[0].uri;
//         const date = new Date().toLocaleString();

//         const newVideo = {
//           uri,
//           date,
//         };

//         const updatedVideos = [newVideo, ...videos];
//         setVideos(updatedVideos);
//         saveVideos(updatedVideos);
//       }
//     );
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.videoItem}>
//       <Text style={styles.title}>📅 {item.date}</Text>
//       <ExpoVideo
//         source={{ uri: item.uri }}
//         rate={1.0}
//         volume={1.0}
//         isMuted={true}
//         resizeMode="cover"
//         useNativeControls
//         style={styles.video}
//       />
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.button} onPress={handleTakeVideo}>
//         <Text style={styles.buttonText}> 🎥 Take New Video</Text>{" "}
//       </TouchableOpacity>
//       <FlatList
//         data={videos}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={renderItem}
//         contentContainerStyle={{ paddingBottom: 20 }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: "#F9FAF5",
//   },
//   videoItem: {
//     marginVertical: 12,
//   },
//   title: {
//     fontSize: 16,
//     marginBottom: 6,
//   },
//   button: {
//     backgroundColor: "#fff",
//     paddingVertical: 8,
//     paddingHorizontal: 30,
//     width: "100%",
//     borderRadius: 30,
//     alignSelf: "flex-start",
//   },
//   buttonText: {
//     fontFamily: "Inter-SemiBold",
//     color: "#88b4bd",
//     textAlign: "center",
//     fontSize: 14,
//   },
//   video: {
//     width: "100%",
//     height: 200,
//     borderRadius: 10,
//   },
// });
import { Camera, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef<Camera | null>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        setIsRecording(true);
        const video = await cameraRef.current.recordAsync();
        console.log('Video recorded:', video.uri);
        // Bạn có thể lưu video.uri vào storage hoặc upload từ đây
      } catch (e) {
        console.error(e);
      } finally {
        setIsRecording(false);
      }
    }
  };

  const stopRecording = () => {
    if (cameraRef.current) {
      cameraRef.current.stopRecording();
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={facing}
        ref={cameraRef}
        ratio="16:9"
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip</Text>
          </TouchableOpacity>

          {isRecording ? (
            <TouchableOpacity style={styles.button} onPress={stopRecording}>
              <Text style={styles.text}>Stop</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={startRecording}>
              <Text style={styles.text}>Record</Text>
            </TouchableOpacity>
          )}
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    paddingBottom: 30,
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 12,
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
