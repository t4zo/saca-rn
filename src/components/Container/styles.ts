import {StyleSheet} from 'react-native';
import consts from 'services/consts';

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
    width: consts.image.width,
    height: consts.image.height,
    marginVertical: 5,
  },
});
