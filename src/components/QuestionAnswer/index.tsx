import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { layout } from '../../theme/layout';
import { usePlaybackStore } from '../../store/slices/playbackStore';
import { useAIStore } from '../../store/slices/aiStore';

export const QuestionAnswer = () => {
  const [question, setQuestion] = useState('');
  const { isPlaying, pausePlayback, resumePlayback } = usePlaybackStore();
  const { asking, response, askQuestion, clearResponse } = useAIStore();

  const handleAsk = async () => {
    if (!question.trim()) return;
    await pausePlayback();
    await askQuestion(question);
    setQuestion('');
  };

  const handleResume = () => {
    clearResponse();
    resumePlayback();
  };

  if (!isPlaying && !asking && !response) return null;

  return (
    <View style={styles.container}>
      {response ? (
        <View style={styles.responseContainer}>
          <Text style={styles.responseText}>{response}</Text>
          <TouchableOpacity 
            style={styles.resumeButton}
            onPress={handleResume}
          >
            <Text style={styles.buttonText}>Resume Podcast</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ask a question..."
            placeholderTextColor={colors.gray[400]}
            value={question}
            onChangeText={setQuestion}
            editable={!asking}
          />
          <TouchableOpacity 
            style={styles.askButton}
            onPress={handleAsk}
            disabled={asking || !question.trim()}
          >
            <MaterialCommunityIcons 
              name={asking ? 'loading' : 'send'}
              size={24}
              color={colors.foreground}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 150,
    left: 16,
    right: 16,
    backgroundColor: colors.gray[800],
    borderRadius: layout.borderRadius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.gray[700],
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: colors.foreground,
    fontSize: 16,
    marginRight: 12,
    padding: 8,
  },
  askButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: layout.borderRadius.full,
  },
  responseContainer: {
    padding: 8,
  },
  responseText: {
    color: colors.foreground,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  resumeButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: layout.borderRadius.md,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.foreground,
    fontSize: 16,
    fontWeight: '600',
  },
});
