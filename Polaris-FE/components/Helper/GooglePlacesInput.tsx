import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

interface GooglePlacesInputProps {
  setSearchResults: (results: any[]) => void;
}

const GooglePlacesInput: React.FC<GooglePlacesInputProps> = ({
  setSearchResults,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (query.length > 2) {
      fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=AIzaSyCIQzQHX5obH2Ev4jIX1qVy5i2zDn8nrYI`
      )
        .then(res => res.json())
        .then(data => {
          if (data.predictions) {
            setSearchResults(data.predictions);
          }
        })
        .catch(error => console.error(error));
    } else {
      setSearchResults([]); // Clear results if input is too short
    }
  }, [query]);

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search Polaris"
        placeholderTextColor="gray"
        style={styles.input}
      />

      {/* Clear (X) Button Inside the Input */}
      {query.length > 0 && (
        <TouchableOpacity
          onPress={() => setQuery('')}
          style={styles.clearButton}
        >
          <Text style={styles.clearButtonText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%', // Ensure the parent view takes full width
    position: 'relative',
  },
  input: {
    width: '100%', // Ensure TextInput spans full width
    marginRight: 0,
    marginBottom: 0,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
    color: 'white',
  },
  clearButton: {
    position: 'absolute',
    right: 14,
    top: '55%',
    transform: [{ translateY: -12 }],
    width: 20, // Smaller button size
    height: 20, // Same as width for a perfect circle
    borderRadius: 10, // Half of width and height to make it circular
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
    justifyContent: 'center', // Center the "X"
    alignItems: 'center', // Center the "X"
  },
  clearButtonText: {
    color: 'white',
    fontSize: 12, // Smaller "X"
  },
});

export default GooglePlacesInput;
