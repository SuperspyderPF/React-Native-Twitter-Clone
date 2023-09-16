import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { TweetInput } from './TweetInput';
import { TweetItem } from './TweetItem';
import { Button as PaperButton } from 'react-native-paper';

type Tweet = {
  id: string;
  content: string;
};

export default function HomeScreen({ navigation }: any) {
  const [tweets, setTweets] = React.useState<Tweet[]>([]);

  const handleTweet = (content: string) => {
    const newTweet: Tweet = {
      id: Math.random().toString(),
      content
    };
    setTweets(prevTweets => [newTweet, ...prevTweets]);
  };

  const deleteTweet = (tweetId: string) => {
    setTweets(prevTweets => prevTweets.filter(tweet => tweet.id !== tweetId));
  };

  return (
        <View style={styles.container}>
            <TweetInput onTweet={handleTweet} />
            <FlatList
                data={tweets}
                renderItem={({ item }) => <TweetItem tweet={item} onDelete={deleteTweet} />}
                keyExtractor={item => item.id}
            />
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});