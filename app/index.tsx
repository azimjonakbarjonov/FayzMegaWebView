import { WebView, WebViewNavigation } from "react-native-webview";
import {
  BackHandler,
  SafeAreaView,
  StyleSheet,
  RefreshControl,
  ScrollView,
  Dimensions,
} from "react-native";
import { useEffect, useRef, useState } from "react";

export default function index() {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (canGoBack && webViewRef.current) {
          webViewRef.current.goBack();
          return true;
        }
        return false;
      }
    );

    return () => backHandler.remove();
  }, [canGoBack]);

  const onNavigationStateChange = (navState: WebViewNavigation) => {
    setCanGoBack(navState.canGoBack);
  };

  // const onRefresh = () => {
  //   setRefreshing(true);
  //   webViewRef.current?.reload();
  //   setRefreshing(false);
  // };

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressViewOffset={80}
            progressBackgroundColor="#ffffff"
          />
        }
        scrollEventThrottle={16}
      > */}
      <WebView
        ref={webViewRef}
        style={styles.webview}
        source={{ uri: "https://fayz-mega.uz" }}
        onNavigationStateChange={onNavigationStateChange}
        bounces={false}
      />
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    height: Dimensions.get("window").height,
  },
});
