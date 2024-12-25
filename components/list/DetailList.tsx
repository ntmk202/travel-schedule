import { StyleSheet, View } from "react-native";
import React from "react";
import { Icon, List } from "react-native-paper";
import CustomListItem from "../card/CustomListItem";
import DetailScheduleModal from "../modal/DetailScheduleModal";

const DetailList = ({ data }: any) => {
  const [visibleDetail, setVisibleDetail] = React.useState(false);
  const [selectedActivity, setSelectedActivity] = React.useState(null);
  const formatDate = (date:any) => {
    if (!date) return "";
  
    const validDate = date instanceof Date ? date : new Date(date);
  
    if (isNaN(validDate.getTime())) {
      console.warn("Invalid date provided:", date);
      return "";
    }
  
    const dayOfWeek = validDate.toLocaleDateString("en-US", { weekday: "short" });
    const day = validDate.getDate();
    const month = validDate.toLocaleDateString("en-US", { month: "short" });
    const year = validDate.getFullYear();
  
    const daySuffix = 
      day % 10 === 1 && day !== 11 ? "st" :
      day % 10 === 2 && day !== 12 ? "nd" :
      day % 10 === 3 && day !== 13 ? "rd" : "th";
  
    return `${dayOfWeek}, ${day}${daySuffix} ${month}, ${year}`;
  };
  
  return (
    <>
      {data?.map((day: any, index: number) => (
        <View style={{marginBottom: 20}} key={index}>
          <List.Accordion
            key={index}
            title={day?.day}
            description={formatDate(day?.date)}
            style={styles.accordionStyle}
            titleStyle={styles.titleStyle}
            descriptionStyle={styles.descriptionStyle}
            right={({ isExpanded }) => (
              <Icon
                source={isExpanded ? "circle-slice-8" : "circle-outline"}
                size={24}
                color={isExpanded ? "#6750a4" : "#c3c3c3"}
              />
            )}
          >
            <View style={styles.line}>
              {day?.activities?.map((activity: any, idx: number) => (
                <CustomListItem
                  key={idx}
                  title={activity.title||activity.name}
                  description={activity.timeVisited}
                  icon="map-marker-outline"
                  onPress={() => {
                    setSelectedActivity(activity);
                    setVisibleDetail(true);
                  }}
                />
              ))}
            </View>
          </List.Accordion>
        </View>
      ))}
      
      {selectedActivity && (
        <DetailScheduleModal
          visible={visibleDetail}
          onDismiss={() => setVisibleDetail(false)}
          data={selectedActivity}
        />
      )}
    </>
  );
};

export default DetailList;

const styles = StyleSheet.create({
  line: {
    marginLeft: 40,
    borderLeftWidth: 2,
    borderLeftColor: "#c3c3c3",
    borderStyle: "dashed",
  },
  accordionStyle: {
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#c3c3c3",
  },
  titleStyle: {
    fontFamily: "RC_Medium",
    fontSize: 18,
    lineHeight: 28,
  },
  descriptionStyle: {
    fontFamily: "RC_Regular",
  },
});
