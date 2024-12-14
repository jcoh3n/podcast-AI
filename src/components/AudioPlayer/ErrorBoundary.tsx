import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';

interface Props {
  children: React.ReactNode;
  onRetry: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class AudioErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
    error: null
  };

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Audio player error:', error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    this.props.onRetry();
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>Unable to play audio</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={this.handleRetry}
          >
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.error,
    borderRadius: 8,
    margin: 16,
  },
  errorText: {
    color: colors.foreground,
    fontSize: 16,
    marginBottom: 8,
  },
  retryButton: {
    backgroundColor: colors.foreground,
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  retryText: {
    color: colors.error,
    fontWeight: '600',
  },
});
