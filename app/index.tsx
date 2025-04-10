import { Link, Tabs } from 'expo-router';
import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';


export default function Index() {
  return (
    <View >
      <Text > hELLOW</Text>

      <Link href="/(auth)"> Login Page</Link>
      <Link href="/(auth)/singup"> Sing Up</Link>
    </View>

  );
}