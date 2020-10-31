import React, {Component} from 'react';
import {View, Image, Text, SectionList, FlatList, StyleSheet} from 'react-native';
import Http from 'cryptoTracker/src/libs/http';
import CoinMarketItem from './CoinMarketItem';
import Colors from 'cryptoTracker/src/res/colors/';

class CoinDetailScreen extends Component {
  state = {
    coin: {},
    markets: [],
  };
  getSymbolIcon = (name) => {
    if (name) {
      const symbol = name.toLowerCase();
      console.log(symbol);
      return `http://c1.coinlore.com/img/25x25/${symbol}.png`;
    }
  };

  getMarkets = async (coinId) => {

    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`

    const markets = await Http.instance.get(url);

    this.setState({ markets });

    console.log({markets});
  }

  componentDidMount() {
    const {coin} = this.props.route.params;
    this.props.navigation.setOptions({title: coin.name});

    this.getMarkets(coin.id);
    
    this.setState({coin});
  }
  render() {
    const {coin, markets} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <Image
            style={styles.iconImage}
            source={{uri: this.getSymbolIcon(coin.name)}}
          />
          <Text style={styles.rank}>{coin.rank}</Text>
          <Text style={styles.name}>{coin.name}</Text>
        </View>

        <View style={styles.sectionItem}>
          <Text style={styles.sectionText}>Volumen: {coin.volume24}</Text>
          <Text style={styles.sectionText}>{coin.percent_change_24h}</Text>
          <Text style={styles.sectionText}>{coin.price_btc}</Text>
          <Text style={styles.sectionText}>${coin.price_usd}</Text>
        </View>

        <Text style={styles.marketTitle}>Markets</Text>

        <FlatList
          horizontal={true}
          data={markets}
          renderItem={({item}) => <CoinMarketItem item={item} />} 
          style={styles.list}
          keyExtractor={(item) => `${item.base}-${item.name}-${item.quote}`}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#fff'
  },
  row: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  subHeader: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 16,
    flexDirection: 'row',
  },
  rank: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 16,
  },
  name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 16,
  },
  marketTitle: {
    color: "#fff",
    fontSize: 16,
    paddingLeft: 16,
    fontWeight: 'bold',
  },
  list: {
    maxHeight: 100,
    paddingLeft: 16,
  },
  iconImage: {
    width: 25,
    height: 25,
    marginRight: 16,
  },
  section: {
    maxHeight: 250
  },
  sectionHeader: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: 8
  },
  sectionItem: {
    padding: 8
  },
  itemText: {
    color: "#fff",
    fontSize: 14
  },
  sectionText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold"
  }
});

export default CoinDetailScreen;
