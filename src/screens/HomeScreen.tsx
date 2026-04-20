import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '../components';

export function HomeScreen() {
  return (
    <Screen>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>Task 1.1</Text>
        <Text style={styles.title}>VICI arranca con Expo y TypeScript strict.</Text>
        <Text style={styles.body}>
          La siguiente iteración montará Expo Router en la task 1.2 sin mezclar la base
          arquitectónica creada aquí.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    backgroundColor: '#ffffff',
    padding: 24,
    shadowColor: '#0f172a',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
  },
  eyebrow: {
    marginBottom: 8,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#2563eb',
  },
  title: {
    marginBottom: 12,
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
    color: '#0f172a',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: '#334155',
  },
});
