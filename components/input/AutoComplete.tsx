import React, { useState } from "react";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput, List, Text } from "react-native-paper";

interface AutocompleteComponentProps {
  // value: string;
  label: string;
  data: { title: string; desc: string; icon: string }[];
}

const AutocompleteComponent = ({  label, data }: AutocompleteComponentProps) => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [showList, setShowList] = useState(false);

  const handleSearch = (text: string) => {
    setQuery(text);
    setShowList(true);
    if (text.length > 0) {
      const results = data.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(results);
    } else {
      setFilteredData(data);
    }
  };

  const handleSelectItem = (item: string) => {
    setQuery(item);
    setShowList(false);
    setFilteredData(data);
  };

  // value = query

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.field}
        outlineStyle={styles.input}
        contentStyle={styles.label}
        value={query}
        mode="outlined"
        onChangeText={handleSearch}
        outlineColor="#a6a6a6"
        onFocus={() => setShowList(true)}
      />
      {showList && filteredData.length > 0 && (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectItem(item.title)}>
              <List.Item
                title={item.title}
                description={item.desc}
                style={styles.item}
                right={({color}) => <List.Icon icon={item.icon} color={color} />}
                descriptionStyle={{ fontSize: 13 }}
              />
            </TouchableOpacity>
          )}
          style={styles.list}
        />
      )}
    </View>
  );
};

export default AutocompleteComponent;

const styles = StyleSheet.create({
  field: {
    marginTop: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 15,
  },
  list: {
    width: 310,
    backgroundColor: "white",
    borderColor: "#a6a6a6",
    borderWidth: 1,
    borderRadius: 15,
    top: 30,
    zIndex: 99,
    position: "absolute",
  },
  item: {
    borderTopColor: "#a6a6a6",
    borderTopWidth: 0.5,
  },
  label: {
    fontFamily: "RC_Regular",
    fontSize: 20,
  },
});
