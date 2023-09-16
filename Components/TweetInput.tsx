import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

type Props = {
  onTweet: (content: string) => void;
};

export const TweetInput: React.FC<Props> = ({ onTweet }) => {
  const [content, setContent] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="What's happening?"
        multiline
        style={styles.input}
      />
      <PaperButton mode="contained" onPress={() => {
        onTweet(content);
        setContent('');
      }}>
        Tweet
      </PaperButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    flex: 1
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 8,
    padding: 8,
  },
});