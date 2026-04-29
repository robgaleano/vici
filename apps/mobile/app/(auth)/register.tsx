import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function RegisterScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container} contentInsetAdjustmentBehavior="automatic">
      <View style={styles.card}>
        <Text style={styles.title}>Crear cuenta</Text>
        <Text style={styles.body}>Formulario de registro próximamente.</Text>
        <Link href="/login" style={styles.link}>
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f4f7fb',
  },
  card: {
    borderRadius: 24,
    backgroundColor: '#ffffff',
    padding: 24,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
  },
  title: {
    marginBottom: 12,
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
  },
  body: {
    marginBottom: 16,
    fontSize: 16,
    lineHeight: 24,
    color: '#475569',
  },
  link: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#2563eb',
  },
});
