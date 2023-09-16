import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useProfile } from './ProfileContext';
import { Card, Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
    tweet: {
        id: string;
        content: string;
    };
    onDelete: (tweetId: string) => void;  
};

export const TweetItem: React.FC<Props> = ({ tweet, onDelete }) => {
    const profile = useProfile();
    
    console.log("Nickname:", profile.nickname);
  
    return (
        <Card style={styles.container}>
            <Card.Title
                title={profile.nickname || 'Default Nickname'}
                left={(props) => profile.imageUri ? <Avatar.Image {...props} source={{ uri: profile.imageUri }} /> : null}
                right={(props) => <MaterialCommunityIcons {...props} name="trash-can-outline" size={24} onPress={() => onDelete(tweet.id)} />}
            />
            <Card.Content>
                <Text>{tweet.content}</Text>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});