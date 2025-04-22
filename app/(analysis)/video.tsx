import { Feather, FontAwesome6 } from "@expo/vector-icons";
import {
  CameraView,
  Camera,
  AutoFocus,
  CameraType,
  useCameraPermissions,
  CameraMode,
  FlashMode,
  CameraRatio,
  useMicrophonePermissions,
} from "expo-camera";
import { useState, useRef, useEffect } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [camPermission, setCamPermission] = useCameraPermissions();
  const [micPermission, setMicPermission] = useMicrophonePermissions();
  const [mode, setMode] = useState<CameraMode>("video");
  const [recording, setRecording] = useState(false);
  const ref = useRef<CameraView>(null);
  const [flash, setFlash] = useState<FlashMode>("off");
  const [mirror, setMirror] = useState(false);
  const [torch, setTorch] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [video, setVideo] = useState();

  if (camPermission === undefined || micPermission === undefined) { 
    return <Text>Requesting permission</Text>
  }else if (!camPermission || !micPermission) {
    return <Text>Permission not granted</Text>
  }

  let recordVideo = async () => {
    setRecording(true);
    let options = {
      quality: "1080p",
      maxDuration: 3600,
      mute: false,
    };
    ref.current?.recordAsync(options).then((recordedVideo) => {
      setVideo(recordedVideo);
      setRecording(false);
    });
  };
  
  function toggleFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }
  function toggleFlash() {
    setFlash((current) => (current === "off" ? "on" : "off"));
  }

  async function saveVideo() {
  }


  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        mode={mode}
        responsiveOrientationWhenOrientationLocked
        ref={ref}
        flash={flash}
        mirror={facing === "back" ? mirror : !mirror}
        enableTorch={torch}
        zoom={zoom}
      >
        {/* Grid Overlay */}
        <View style={styles.grid}>
          {[...Array(3)].map((_, i) => (
            <View
              key={`row-${i}`}
              style={[styles.gridRow, { top: `${i * 33.33}%` }]}
            />
          ))}
          {[...Array(3)].map((_, i) => (
            <View
              key={`col-${i}`}
              style={[styles.gridColumn, { left: `${i * 33.33}%` }]}
            />
          ))}
        </View>

        <View style={styles.shutterContainer}>
    

          <Pressable onPress={recordVideo}>
            {({ pressed }) => (
              <View
                style={[
                  styles.shutterBtn,
                  {
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}
              >
                <View
                  style={[
                    styles.shutterBtnInner,
                    {
                      backgroundColor: "red",
                    },
                  ]}
                />
              </View>
            )}
          </Pressable>
          <Pressable onPress={toggleFacing}>
            <FontAwesome6 name="rotate-left" size={32} color="white" />
          </Pressable>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    height: "50%",
  },
  grid: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gridRow: {
    position: "absolute",
    width: "100%",
    height: 1,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  gridColumn: {
    position: "absolute",
    height: "100%",
    width: 1,
    backgroundColor: "rgba(255,255,255,0.3)",
  },

  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  shutterContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgb(114, 169, 158)",
    left: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  shutterBtn: {
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    width: 85,
    height: 85,
    marginLeft:"auto",
    borderRadius: 45,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
});
