import { View, Text, ViewProps } from "react-native";

import { styles } from "./styles";

interface Props extends ViewProps {
  title: string;
  subtitle: string;
}

export function Heading({ title, subtitle, ...args }: Props) {
  return (
    <View style={styles.container} {...args}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}
