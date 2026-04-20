
import { Image } from "expo-image";
import "@/src/i18n";
import { StyleSheet } from "react-native";
import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { List_H } from "@/src/locales/interfaceTextComponents/HeaderName";


export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
          contentFit="contain"
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          <List_H />
        </ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <Link href="../AddList">
          <Link.Trigger>
            <ThemedText type="subtitle" style={styles.stepContainer}>
              {" "}
              <IconSymbol
                size={28}
                name="character.textbox"
                color={""}
                style={styles.reactLogo}
              />{" "}
              Списки слов
            </ThemedText>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction
              title="Action"
              icon="cube"
              onPress={() => alert("Action pressed")}
            />
            <Link.MenuAction
              title="Share"
              icon="square.and.arrow.up"
              onPress={() => alert("Share pressed")}
            />
            <Link.Menu title="More" icon="ellipsis">
              <Link.MenuAction
                title="Delete"
                icon="trash"
                destructive
                onPress={() => alert("Delete pressed")}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    top: "10%",
    left: "10%",
    color: "#898b88",
  },
  reactLogo: {
    color: "rgb(214, 10, 10)",
    height: "100%",
    width: "45%",
    bottom: "10%",
    top: "10%",
    left: 0,
  },
});
