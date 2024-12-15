import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';


export default function Page() {
  const handleError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.warn('WebView error: ', nativeEvent);
  };

  const handleMessage = (event) => {
    console.log('Message from webview: ', event.nativeEvent.data);
  };

  // React 웹에서 console.log를 캡처하기 위한 자바스크립트 코드
  const injectedJavaScript = `
    console.log = function(message) {
      window.ReactNativeWebView.postMessage(message);
    };
  `;

  return (
    <SafeAreaView style={styles.container}>
      <WebView 
        source={{ uri: 'http://192.168.44.212:3000' }}  // React 프로젝트 URL
        style={styles.webview}
        originWhitelist={['*']}
        // 쿠키 관련 설정 추가
        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}
        domStorageEnabled={true}
        // 웹뷰 설정 추가
        javaScriptEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        // 캐시 설정
        cacheEnabled={true}
        // HTTP only 쿠키 허용
        allowFileAccess={true}
        allowingReadAccessToURL={'*'}
        onError={handleError}
        onMessage={handleMessage}
        injectedJavaScript={injectedJavaScript}
        // 디버깅을 위한 추가 설정
        debugging={true}
        
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  webview: {
    flex: 1,
  }
});