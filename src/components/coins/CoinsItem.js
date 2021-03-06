import React, {Component} from 'react';
import {View, FlatList ,Pressable, Text, Image, StyleSheet, Platform} from 'react-native';
import ArrowDown from "cryptoTracker/src/assets/arrow_down.png"
import ArrowUp from "cryptoTracker/src/assets/arrow_up.png"
import Colors from "cryptoTracker/src/res/colors/"

const CoinsItem = ({item, onPress}) => {

  return (
    <Pressable onPress={onPress} style={styles.container}>

      <View style={styles.row}>
        <Text style={styles.rank}>{item.rank} </Text>
        <Text style={styles.symbolText}> {item.symbol} </Text>
        <Text style={styles.nameText}> {item.name} </Text>
        <Text style={styles.price_usd}> {`$${item.price_usd}`} </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.percentText}> {item.percent_change_24h} </Text>
        <Image 
        style={styles.imagIcon}
          source={item.percent_change_24h>0?ArrowUp:ArrowDown} 
          />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: Colors.zircon,
    borderBottomWidth: 1,
    marginLeft: Platform.OS == 'ios' ? 16 : 0,
    paddingLeft: Platform.OS == 'ios' ? 0 : 16,
  },
  row: {
    flexDirection: 'row',
  },
  rank: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  symbolText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  nameText: {
    color: '#fff',
    fontSize: 14,
  },
  price_usd: {
    color: '#fff',
    fontSize: 14,
    marginRight: 16,
  },
  percentText: {
    color: '#fff',
    fontSize: 12,
    marginRight: 8
  },
  imagIcon: {
    width: 22,
    height: 22,
  }
});

export default CoinsItem;
