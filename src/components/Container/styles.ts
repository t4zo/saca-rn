import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  cardsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 10,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: 100,
    height: 100,
    marginVertical: 5,
  },
});
