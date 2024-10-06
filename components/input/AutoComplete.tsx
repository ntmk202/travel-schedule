import React, { useState } from "react";
import { View, FlatList, TouchableOpacity, StyleSheet, Keyboard } from "react-native";
import { TextInput, List, Text } from "react-native-paper";

interface AutocompleteComponentProps {
  query: string;
  onQueryChange: (text: string) => void;
  label: string;
  data: {id: string; title: string; desc: string; icon: string}[];
}

const AutocompleteComponent = ({ query, onQueryChange, label, data }: AutocompleteComponentProps) => {
  const [filteredData, setFilteredData] = useState(data);
  const [showList, setShowList] = useState(false);

  const handleSearch = (text: string) => {
    onQueryChange(text);
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

  const handleSelectItem = (item:any) => {
    onQueryChange(item);
    setShowList(false);
    setFilteredData(data);
  };

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
        onFocus={() => {
          Keyboard.dismiss();  
          setShowList(true);
        }}
        onBlur={() => Keyboard.dismiss()}
      />
      {showList && filteredData.length > 0 && (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectItem(item.title)}>
              <List.Item
                key={item.id}
                title={item.title}
                description={item.desc}
                style={styles.item}
                right={({color}) => <List.Icon icon={item.icon} color={color} />}
                descriptionStyle={{ fontSize: 13 }}
              />
            </TouchableOpacity>
          )}
          style={styles.list}
          nestedScrollEnabled={true}
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
