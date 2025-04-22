// import { RecommendationCard } from "@/components/home/recommendCard";
// import { RemindCarousel } from "@/components/home/remindCard";
// import ParallaxScrollView from "@/components/ParallaxScrollView";
// import { useTheme } from "@/context/ThemeContext";
// import { router } from "expo-router";
// import {
//   Bell,
//   Moon,
//   Sun,
//   Search,
//   ChevronLeft,
//   Filter,
// } from "lucide-react-native";
// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TextInput,
//   SafeAreaView,
//   Animated,
//   Dimensions,
//   StatusBar,
// } from "react-native";

// const ExpertScreen: React.FC = () => {
//   const { colors, isDark, toggleTheme } = useTheme();
//   const [searchText, setSearchText] = useState("");
//   const [filteredExperts, setFilteredExperts] = useState([]);
//   const [showFilter, setShowFilter] = useState(false);
//   const [experts, setExperts] = useState([]);

//   useEffect(() => {
//     const fetchExpert = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/psychologist", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         if (!response.ok) {
//           throw new Error("Failed to fetch experts");
//         }
//         const experts = await response.json();
//         setExperts(experts);
//         console.log(experts);
//       } catch (error) {
//         console.error(error);
//       }
//       fetchExpert();
//     };
//   }, []);

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar
//         barStyle="dark-content"
//         backgroundColor="transparent"
//         translucent
//       />

//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => router.back()}
//           style={{ marginRight: 10, left: 0 }}
//         >
//           <ChevronLeft size={24} color={colors.headerBg} />
//         </TouchableOpacity>
//         <View style={styles.headerButtons}>
//           <TouchableOpacity style={styles.iconButton}>
//             <Bell size={24} color={colors.headerBg} />
//           </TouchableOpacity>
//           {/* <TouchableOpacity style={styles.iconButton} onPress={toggleTheme}>
//                      {isDark ? (
//                        <Sun size={24} color="#fff" />
//                      ) : (
//                        <Moon size={24} color="#fff" />
//                      )}
//                    </TouchableOpacity> */}
//         </View>
//       </View>
//       {/* Main Content */}
//       <View style={styles.container}>
//         <Text style={styles.title}>Experts</Text>
//         {/* Search bar */}
//         <View style={styles.searchContainer}>
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search for experts"
//             placeholderTextColor="#70A6AB"
//           />
//           {/* <TouchableOpacity style={styles.filterButton}>
//             <Text style={styles.filterButtonText}>Filters</Text>
//           </TouchableOpacity> */}
//           <View style={styles.searchIcon}>
//             <Search size={20} color="#fff" />
//           </View>
//         </View>

//         <View>
//           <Text style={styles.sectionTitle}>Don't know who suitable</Text>
//           <TouchableOpacity>
//             <Text>Find with AI</Text>
//           </TouchableOpacity>
//         </View>
//         {/* Expert Gallery */}
//         <View style={styles.expertGalleryHeader}>
//           <Text style={styles.expertGalleryTitle}>Experts gallery</Text>
//           <TouchableOpacity>
//             <Filter size={20} color="#4A8A90" />
//           </TouchableOpacity>
//         </View>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.expertGallery}
//         >
//           <View style={styles.expertCategory}>
//             <Text>Location</Text>
//             <View style={styles.expertCardSection}>
//               {experts.map((expert) => (
//                 <TouchableOpacity key={expert.id} style={styles.expertCard}>
//                   <Image
//                     source={{ uri: expert.profileImage }}
//                     style={styles.expertImage}
//                   />
//                   <Text style={styles.expertName}>{expert.name}</Text>
//                   <Text style={styles.expertSpeciality}>{expert.bio}</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
//         </ScrollView>

//         {/* Extra padding at bottom for better scrolling experience */}
//         <View style={{ height: 50 }} />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#FDF9ED",
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#FDF9ED",
//     paddingHorizontal: 16,
//   },
//   header: {
//     position: "relative",
//     backgroundColor: "#FDF9ED",
//     width: "100%",
//     height: 80,
//     top: 10,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     paddingHorizontal: 16,
//     justifyContent: "space-between",
//     flexDirection: "row",
//     alignItems: "center",
//     // justifyContent: "flex-end",
//   },
//   headerButtons: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "flex-end",
//   },
//   iconButton: {
//     padding: 8,
//     marginLeft: 8,
//   },
//   title: {
//     fontSize: 32,
//     color: "#4F7C56",
//     fontFamily: "Montserrat-Bold",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "rgba(197, 216, 160, 0.28)",
//     borderRadius: 23,

//     marginBottom: 24,
//   },
//   searchIcon: {
//     padding: 10,
//     borderRadius: 23,
//     backgroundColor: "rgba(197, 216, 160, 0.58)",
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     color: "#fff",
//     paddingLeft: 16,
//   },

//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     fontFamily: "Montserrat-Bold",
//     marginBottom: 12,
//     marginLeft: 5,
//     color: "#CC7232",
//   },
//   expertGalleryHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   expertGalleryTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     fontFamily: "Montserrat-Bold",
//     marginBottom: 12,
//     marginLeft: 5,
//     color: "#CC7232",
//   },
//   expertGallery: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },
//   expertCategory: {
//     marginRight: 16,
//   },
//   expertCardSection: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },
//   expertCard: {
//     width: 150,
//     height: 200,
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     marginBottom: 16,
//     marginRight: 16,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   expertImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//   },
//   expertName: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginTop: 8,
//   },
//   expertSpeciality: {
//     fontSize: 14,
//     color: "#777",
//   },
// });

// export default ExpertScreen;
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
const experts = [
  { id: "1", name: "Lorem Ipsum", img: { uri: "https://i.pravatar.cc/150?u=huong.nguyen@example.com" } },
  { id: "2", name: "Lorem Ipsum", img: { uri: "https://i.pravatar.cc/150?u=duc.pham@example.com" } },
  { id: "3", name: "Lorem Ipsum", img: { uri: "https://i.pravatar.cc/150?u=linh.do@example.com" } },
  { id: "4", name: "Lorem Ipsum", img: { uri: "https://i.pravatar.cc/150?u=nam.vu@example.com" } },
  { id: "5", name: "Lorem Ipsum", img: { uri: "https://i.pravatar.cc/150?u=duc.pham@example.com" } },
  { id: "6", name: "Lorem Ipsum", img: { uri: "https://i.pravatar.cc/150?u=linh.do@example.com" } },
];

const messages = [
  {
    id: "2",
    name: "Expert Name",
    message: "Message",
    time: "09:12",
    avatar: { uri: "https://i.pravatar.cc/150?u=duc.pham@example.com" },
  },
  
  {
    id: "4",
    name: "Expert Name",
    message: "Message",
    time: "2 days ago",
    avatar: { uri: "https://i.pravatar.cc/150?u=nam.vu@example.com" },
  },
];


export default function ExpertsScreen() {
  const [isChatOpen, setChatOpen] = useState(false);

  const renderExpert = ({ item }) => (
    <View style={styles.expertCard}>
      <Image source={item.img} style={styles.expertImage} />
      <Text style={styles.locationText}>{item.name}</Text>
    </View>
  );

  const renderMessage = ({ item }) => (
    <View style={styles.messageCard}>
      <Image source={item.avatar} style={styles.avatar} />
      <View>
        <Text style={styles.expertName}>{item.name}</Text>
        <Text style={styles.messagePreview}>
          {item.message} - {item.time}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Experts</Text>
        <Ionicons name="notifications-outline" size={24} color="#4A784E" />
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color="#4A784E" />
        <TextInput placeholder="Search for expert" style={styles.searchInput} />
      </View>

      <Text style={styles.suggestionText}>
        Don't know who suitable?
        <Text style={styles.aiBtn}> Find with AI</Text>
      </Text>

      <View style={styles.galleryHeader}>
        <Text style={styles.galleryText}>Expert gallery</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={experts}
        numColumns={3}
        renderItem={renderExpert}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.grid}
      />

      {/* Chat Bubble Button */}
      <TouchableOpacity
        style={styles.chatButton}
        onPress={() => setChatOpen(true)}
      >
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={24}
          color="#4A784E"
        />
      </TouchableOpacity>

      {/* Popup Chat List */}
      <Modal visible={isChatOpen} transparent animationType="fade">
        <View style={styles.chatPopup}>
          <View style={styles.chatListBox}>
            <View style={styles.popupHeader}>
              <Text style={styles.popupTitle}>Message</Text>
              <Ionicons
                name="notifications-outline"
                size={20}
                color="#4A784E"
              />
            </View>

            <View style={styles.searchBoxPopup}>
              <Ionicons name="search" size={18} color="#4A784E" />
              <TextInput
                placeholder="Search by expert"
                style={styles.searchInput}
              />
            </View>

            <View style={styles.filterRow}>
              <Text style={styles.filterText}>All</Text>
              <Text style={styles.filterText}>Unread</Text>
              <Text style={styles.filterText}>Group</Text>
            </View>

            <FlatList
              data={messages}
              renderItem={renderMessage}
              keyExtractor={(item) => item.id}
            />

            <TouchableOpacity
              onPress={() => setChatOpen(false)}
              style={styles.closeBtnPopup}
            >
              <Ionicons name="close" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F6EC", padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#4A784E" },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E2EAC4",
    borderRadius: 16,
    paddingHorizontal: 10,
    marginVertical: 16,
    height: 40,
  },
  searchInput: { flex: 1, marginLeft: 10, color: "#4A784E" },
  suggestionText: { fontSize: 14, color: "#B2573D", marginBottom: 10 },
  aiBtn: { color: "#4A784E", fontWeight: "bold" },
  galleryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  galleryText: { fontSize: 16, fontWeight: "bold", color: "#4A784E" },
  viewAll: { color: "#4A784E" },
  grid: { gap: 10 },
  expertCard: { flex: 1, alignItems: "center", marginBottom: 20 },
  expertImage: { width: 80, height: 80, borderRadius: 16 },
  locationText: { marginTop: 5, color: "#4A784E" },
  chatButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#D7E4B9",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  chatPopup: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  chatListBox: {
    backgroundColor: "#FDFBF0",
    height: "85%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  popupHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  popupTitle: { fontSize: 22, fontWeight: "bold", color: "#4A784E" },
  searchBoxPopup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E2EAC4",
    borderRadius: 16,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 10,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  filterText: { color: "#4A784E" },
  messageCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#BCD28C",
    marginRight: 10,
  },
  expertName: {
    fontWeight: "bold",
    color: "#B2573D",
  },
  messagePreview: {
    color: "#4A784E",
  },
  closeBtnPopup: {
    position: "absolute",
    top: 15,
    right: 20,
    backgroundColor: "#4A784E",
    padding: 6,
    borderRadius: 12,
  },
});
