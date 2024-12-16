import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../../theme/colors';

interface Props {
  onSubmit: (question: string) => void;
  isLoading?: boolean;
}

export const ChatInput: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = () => {
    if (question.trim() && !isLoading) {
      onSubmit(question.trim());
      setQuestion('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Ask about this podcast..."
          placeholderTextColor={colors.gray[400]}
          value={question}
          onChangeText={setQuestion}
          multiline={false}
          editable={!isLoading}
        />
        <TouchableOpacity
          style={[styles.sendButton, (!question.trim() || isLoading) && styles.disabled]}
          onPress={handleSubmit}
          disabled={!question.trim() || isLoading}
        >
          <MaterialCommunityIcons
            name={isLoading ? "loading" : "send"}
            size={24}
            color={colors.foreground}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.gray[800],
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[800],
    borderRadius: 25,
    paddingLeft: 16,
  },
  input: {
    flex: 1,
    color: colors.foreground,
    fontSize: 16,
    paddingVertical: 12,
    maxHeight: 100,
  },
  sendButton: {
    padding: 12,
    borderRadius: 20,
    backgroundColor: colors.primary,
    margin: 4,
  },
  disabled: {
    opacity: 0.5,
  },
});
