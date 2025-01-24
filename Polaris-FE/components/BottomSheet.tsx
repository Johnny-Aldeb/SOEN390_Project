import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, Briefcase, Plus, Mic, Car } from 'lucide-react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 100;
const MIN_TRANSLATE_Y = 750;

const AnimatedView = Animated.createAnimatedComponent(View);

export default function BottomSheet() {
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(MIN_TRANSLATE_Y);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context: any) => {
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateY.value = Math.max(
        Math.min(context.startY + event.translationY, 0),
        MAX_TRANSLATE_Y
      );
    },
    onEnd: event => {
      const shouldSnap = event.velocityY < -500;
      if (shouldSnap) {
        translateY.value = withSpring(MAX_TRANSLATE_Y, {
          damping: 50,
          stiffness: 300,
        });
      } else if (event.velocityY > 500) {
        translateY.value = withSpring(MIN_TRANSLATE_Y, {
          damping: 50,
          stiffness: 300,
        });
      } else {
        const halfWay = (MAX_TRANSLATE_Y + MIN_TRANSLATE_Y) / 2;
        if (translateY.value < halfWay) {
          translateY.value = withSpring(MAX_TRANSLATE_Y, {
            damping: 50,
            stiffness: 300,
          });
        } else {
          translateY.value = withSpring(MIN_TRANSLATE_Y, {
            damping: 50,
            stiffness: 300,
          });
        }
      }
    },
  });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [12, 0],
      Extrapolate.CLAMP
    );

    return {
      borderRadius,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <AnimatedView
        style={[
          styles.container,
          { paddingBottom: insets.bottom },
          rBottomSheetStyle,
        ]}
      >
        {/*<View style={styles.handle} />*/}

        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Polaris"
            placeholderTextColor="#999"
          />
          <TouchableOpacity>
            <Mic size={20} color="#999" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Siri Suggestions</Text>
        <TouchableOpacity style={styles.suggestion}>
          <View style={styles.suggestionIcon}>
            <Car size={24} color="#fff" />
          </View>
          <View>
            <Text style={styles.suggestionTitle}>Parked Car</Text>
            <Text style={styles.suggestionSubtitle}>
              5.8 km away, near Av MacMahon
            </Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Library</Text>
        <View style={styles.library}>
          <TouchableOpacity style={styles.libraryItem}>
            <View style={styles.libraryIcon}>
              <Home size={24} color="#007AFF" />
            </View>
            <Text style={styles.libraryLabel}>Home</Text>
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.libraryItem}>
            <View style={styles.libraryIcon}>
              <Briefcase size={24} color="#007AFF" />
            </View>
            <Text style={styles.libraryLabel}>Work</Text>
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.libraryItem}>
            <View style={styles.libraryIcon}>
              <Plus size={24} color="#007AFF" />
            </View>
            <Text style={styles.libraryLabel}>Add</Text>
          </TouchableOpacity>
        </View>
      </AnimatedView>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(30, 30, 30, 0.95)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    height: SCREEN_HEIGHT,
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: '#666',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 24,
    marginTop: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    color: '#fff',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  suggestion: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  suggestionIcon: {
    width: 44,
    height: 44,
    backgroundColor: '#007AFF',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  suggestionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  suggestionSubtitle: {
    color: '#999',
    fontSize: 14,
  },
  library: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  libraryItem: {
    alignItems: 'center',
  },
  libraryIcon: {
    width: 44,
    height: 44,
    backgroundColor: '#333',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  libraryLabel: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 2,
  },
  addText: {
    color: '#007AFF',
    fontSize: 14,
  },
});
