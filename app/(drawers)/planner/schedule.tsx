import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { List, Icon, SegmentedButtons } from 'react-native-paper';
import { ButtonComponent, CustomListItem } from '@/components';

const ScheduleScreen = () => {
  const [value, setValue] = useState('')

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end', padding: 10, marginBottom: 20, marginHorizontal: 10, alignItems: 'center'}}>
        <ButtonComponent label='Add place' icon='plus' height={40} mode='outlined' onPress={() => console.log('press')} />
      </View>
      <View>
        <View style={styles.wrapper}>
          <View style={{marginBottom: 20}}>
            <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between'}}>
              <Text style={styles.headerText}>Location</Text>
              <View style={{flexDirection: 'row', gap: 20, alignItems:'center'}}>
                <TouchableOpacity>
                  <Icon source='robot-outline' size={20} />
                </TouchableOpacity>
                <SegmentedButtons
                  value={value}
                  onValueChange={setValue}
                  density='small'
                  buttons={[
                    {
                      value: 'list',
                      icon: 'format-list-bulleted',
                      checkedColor: '#6750a4',
                      style: {borderWidth: .5, borderEndWidth: 0, minWidth: 20, maxWidth: 50}
                    },
                    {
                      value: 'map',
                      icon: 'map',
                      checkedColor: '#6750a4',
                      style: {borderWidth: .5, borderStartWidth: 0, minWidth: 20, maxWidth: 50}
                    }
                  ]}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row', gap: 20}}>
                <Text style={styles.headerTitle}>Budget</Text>
                <Text style={styles.headerTitle}>Traveller</Text>
              </View>
              <Text style={styles.headerTitle}>Day</Text>
            </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{marginBottom: 20}}>
                <List.Accordion
                  id="1"
                  title="Day 1"
                  description="17/09/2024"
                  style={styles.accordionStyle}
                  titleStyle={styles.titleStyle}
                  descriptionStyle={styles.descriptionStyle}
                  right={({isExpanded}) => (
                    <Icon source={isExpanded ? 'circle-slice-8' : 'circle-outline'} size={24} color={isExpanded? '#6750a4' : '#c3c3c3' } />
                  )}
                >
                  <View style={styles.line}>
                    <TouchableOpacity onPress={() => console.log('press')}>
                      <CustomListItem
                        title="Hotel Rest"
                        description="Palm Springs Hotel"
                        time="11:00 am"
                        icon="map-marker-outline"
                      />
                    </TouchableOpacity>
                  </View>
                </List.Accordion>
              </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    width: Dimensions.get('screen').width * 0.9,
    height: '100%',
    alignSelf: 'center'
  },
  line: {
    marginLeft: 40,
    borderLeftWidth: 2,
    borderLeftColor: '#c3c3c3',
    borderStyle: 'dashed'
  },
  headerText: {
    fontFamily: 'RC_Medium',
    fontSize: 20,
    color: '#000',
    lineHeight: 24,
  },
  headerTitle: {
    fontFamily: 'RC_Regular',
    fontSize: 14,
  },
  accordionStyle: {
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#c3c3c3',
  },
  titleStyle: {
    fontFamily: 'RC_Medium',
    fontSize: 18,
    lineHeight: 28,
  },
  descriptionStyle: {
    fontFamily: 'RC_Regular',
  },
});
