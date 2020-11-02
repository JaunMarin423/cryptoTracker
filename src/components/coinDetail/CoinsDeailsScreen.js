import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Pressable,
  SectionList,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import Http from 'cryptoTracker/src/libs/http';
import Storage from 'cryptoTracker/src/libs/storage';
import CoinMarketItem from './CoinMarketItem';
import Colors from 'cryptoTracker/src/res/colors/';

class CoinDetailScreen extends Component {
  state = {
    coin: {},
    markets: [],
    isFavorite: false,
  };

  toogleFavorite = () => {

    if (this.state.isFavorite){
      this.removeFavorite();
    } else {
      this.addFavorite();
    }
  }

  addFavorite = async () => {
    const coin = JSON.stringify(this.state.coin);
    const key = `favorite-${this.state.coin.id}`;

    const stored = await Storage.instance.store(key, coin);
    console.log("stored", stored);
    if(stored) {
      this.setState({ isFavorite: true });
    }
  }

  removeFavorite = async() => {

    Alert.alert("Remove favorite", "Are you surce", [
      {
        text: "cancel",
        onPress: () => {},
        style: "cancel"
      },
      {
      text: "Remove",
      onPress: async () => {
        const key = `favorite.${this.state.coin.id}`;

        await Storage.instance.remove(key);

        this.setState({ isFavorite: false });
      }
    },
      
    ]);
  }

  getFasvorite = async () => {
    try {
      const key = `favorite-${this.state.coin.id}`;

      const favStr = await Storage.instance.get(key);

      if(favStr != null) {
        this.setState({isFavorite: true});
      }

    } catch (err) {
      console.log('get favorites err', err);
    }
  }

  getSymbolIcon = (name) => {
    if (name) {
      const symbol = name.toLowerCase();
      console.log(symbol);
      return `http://c1.coinlore.com/img/25x25/${symbol}.png`;
    }
  };

  getMarkets = async (coinId) => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;

    const markets = await Http.instance.get(url);

    this.setState({markets});

    console.log({markets});
  };

  componentDidMount() {
    const {coin} = this.props.route.params;
    this.props.navigation.setOptions({title: coin.name});

    this.getMarkets(coin.id);

    this.setState({coin}, () => {
      this.getFasvorite();
    });
  }
  render() {
    const {coin, markets, isFavorite} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <View style={styles.row}>
            <Image
              style={styles.iconImage}
              source={{uri: this.getSymbolIcon(coin.name)}}
            />
            <Text style={styles.rank}>{coin.rank}</Text>
            <Text style={styles.name}>{coin.name}</Text>
          </View>
          <Pressable
            onPress={this.toogleFavorite}
            style={[
              styles.btnFavorite,
              isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd,
            ]}>
            <Text style={styles.btnFavoriteText}>
              {isFavorite ? 'Remove favorite' : 'Add Favorites'}
            </Text>
          </Pressable>
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
    color: Colors.white,
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
    justifyContent: 'space-between',
  },
  rank: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 16,
  },
  name: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 16,
  },
  marketTitle: {
    color: Colors.white,
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
    maxHeight: 250,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: Colors.white,
    fontSize: 14,
  },
  sectionText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8,
  },
  btnFavoriteText: {
    color: Colors.white,
  },
  btnFavoriteAdd: {
    backgroundColor: Colors.picton,
  },
  btnFavoriteRemove: {
    backgroundColor: Colors.carmin,
  },
});

export default CoinDetailScreen;
