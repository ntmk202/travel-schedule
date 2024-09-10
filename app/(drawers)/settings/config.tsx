import { View} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ToggleComponent } from "@/components";

export default function SettingScreen() {
  const [notifications, setNotifications] = React.useState(true);
  const [theme, setTheme] = React.useState(false);

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", paddingTop: 40, backgroundColor: '#fff' }}
    >
      <View>
        <ToggleComponent
          label="Notifications"
          description="Toggle this option to enable or disable all notifications related to your account activity and updates."
          value={notifications}
          onValueChange={() => setNotifications(!notifications)}
        />
        <ToggleComponent
          label="Theme"
          description="Switch between light and dark themes to customize the appearance of the application according to your preference."
          value={theme}
          onValueChange={() => setTheme(!theme)}
        />
      </View>
    </SafeAreaView>
  );
}
