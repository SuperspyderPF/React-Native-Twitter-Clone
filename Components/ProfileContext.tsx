import React from 'react';

export type ProfileData = {
    name: string;
    imageUri: string | null;
    nickname: string;
    setName: (name: string) => void;
    setNickname: (nickname: string) => void;
    setImageUri: (uri: string | null) => void;
  };
  
  const ProfileContext = React.createContext<ProfileData | undefined>(undefined);
  
  export const ProfileProvider: React.FC = ({ children }) => {
    const [profile, setProfile] = React.useState<ProfileData>({
      name: '',
      nickname: '',
      imageUri: null,
      setName: (name: string) => setProfile(prev => ({ ...prev, name })),
      setNickname: (nickname: string) => setProfile(prev => ({ ...prev, nickname })), 
      setImageUri: (uri: string | null) => setProfile(prev => ({ ...prev, imageUri: uri }))
    });

    return (
      <ProfileContext.Provider value={profile}>
        {children}
      </ProfileContext.Provider>
    );
};

export const useProfile = () => {
  const context = React.useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};