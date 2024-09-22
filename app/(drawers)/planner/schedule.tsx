import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { List, Checkbox, Icon, Divider } from 'react-native-paper';
import { ButtonComponent, CustomListItem } from '@/components';

const ScheduleScreen = () => {

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, marginBottom: 20, marginHorizontal: 10}}>
        <ButtonComponent label='New place' icon='plus' height={40} mode='outlined' onPress={() => console.log('press')} />
        <View style={{flexDirection: 'row', gap: 15}}>
          <Icon source='share-variant-outline' size={20} />
          <Icon source='chat-processing-outline' size={20} />
          <Icon source='delete-outline' size={20} />
          <Text>Save</Text>
        </View>
      </View>
      <View>
        <View style={styles.wrapper}>
          <View style={{marginBottom: 20}}>
            <Text style={styles.headerText}>Location</Text>
            <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row', gap: 20}}>
                <Text style={styles.headerTitle}>Day</Text>
                <Text style={styles.headerTitle}>Traveller</Text>
              </View>
              <Text style={styles.headerTitle}>Budget</Text>
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
    width: Dimensions.get('screen').width * 0.7,
    height: '100%',
    paddingTop: 20,
    alignSelf: 'center',
    // alignItems: 'center',
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
