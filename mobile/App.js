import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { WebView } from "react-native-webview";

/** Override at build time: EXPO_PUBLIC_STORE_URL=https://yoursite.com */
const STORE_URL =
  process.env.EXPO_PUBLIC_STORE_URL || "https://soniadresses.vercel.app";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const webRef = useRef(null);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorTitle}>Connection problem</Text>
          <Text style={styles.errorText}>Check your internet and try again.</Text>
          <Pressable
            style={styles.retry}
            onPress={() => {
              setError(false);
              setLoading(true);
              webRef.current?.reload();
            }}
          >
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        </View>
      ) : (
        <WebView
          ref={webRef}
          source={{ uri: STORE_URL }}
          style={styles.webview}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => {
            setLoading(false);
            setError(false);
          }}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
          onHttpError={() => {
            setLoading(false);
          }}
          javaScriptEnabled
          domStorageEnabled
          sharedCookiesEnabled
          thirdPartyCookiesEnabled
          allowsBackForwardNavigationGestures
          setSupportMultipleWindows={false}
        />
      )}
      {loading && !error ? (
        <View style={styles.loader} pointerEvents="none">
          <ActivityIndicator size="large" color="#db2777" />
          <Text style={styles.loaderLabel}>Sonia Dresses</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  webview: {
    flex: 1,
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(250,250,250,0.92)",
  },
  loaderLabel: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#18181b",
  },
  errorBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#18181b",
  },
  errorText: {
    marginTop: 8,
    textAlign: "center",
    color: "#71717a",
  },
  retry: {
    marginTop: 20,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#18181b",
    borderRadius: 12,
  },
  retryText: {
    color: "#fff",
    fontWeight: "600",
  },
});
