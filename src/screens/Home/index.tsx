import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  ScrollView,
  Text,
  View,
  TouchableWithoutFeedback
} from 'react-native';
import _ from 'lodash';
import Accordion from 'react-native-collapsible/Accordion';
import Lottie from 'lottie-react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import AccordionModal from 'models/Accordion';

import Cards from 'components/Cards';
import Add from 'components/Buttons/Add';

import styles from './styles';

import {
  getCategories,
  getUserCategories,
} from 'actions/CategoriesAction';

import Reducers from 'models/Reducers';
import User from 'models/User';
import Category from 'models/Category';
import { setLoading } from 'actions/LoadingAction';
import consts from 'services/consts';

function Home() {
  const dispatch = useDispatch();

  const user = useSelector<Reducers, User>(state => state.user);
  const categories = useSelector<Reducers, Category[]>(state => state.categories);
  const loading = useSelector<Reducers, boolean>(state => state.loading);

  const [accordion, setAccordion] = useState<AccordionModal>(new AccordionModal());

  useEffect(() => {
    async function fetch() {
      if (_.isEmpty(user)) {
        dispatch(setLoading(consts.loading.true));
        await dispatch(getCategories());
        dispatch(setLoading(consts.loading.false));
      } else {
        dispatch(setLoading(consts.loading.true));
        await dispatch(getUserCategories(user));
        dispatch(setLoading(consts.loading.false));
      }
    }

    fetch();
  }, [user]);

  const content = categories.map(category => {
    return {
      title: (
        <>
          <Icon name={category.iconName} size={25}/>
          <Text style={{paddingLeft: 50}}>   {category.name}</Text>
        </>
      ),
      content: <Cards cards={category.cards}/>
    };
  });

  return (
    <View style={styles.container}>
      {_.isEmpty(categories) || loading ? (
        <View style={styles.loading}>
          <Lottie source={require('assets/animations/loader.json')} autoPlay loop />
        </View>
      ) : (
        <>
          <ScrollView>
            <Accordion
              activeSections={accordion.activeSections}
              sections={content}
              touchableComponent={TouchableWithoutFeedback}
              renderHeader={renderHeader}
              renderContent={renderContent}
              duration={400}
              onChange={_setSections}
            />
          </ScrollView>
          {!_.isEmpty(user) && <Add />}
        </>
      )}
      {!_.isEmpty(user) && (
        <View style={styles.removeMessageContainer}>
          <Text style={styles.removeMessage}>
            Pressione por 5s para remover a imagem pessoal
          </Text>
        </View>
      )}
    </View>
  );

  function renderHeader(section: any) {
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{section.title}</Text>
      </View>
    );
  }

  function renderContent(section: any) {
    return section.content;
  }

  function _setSections(sections: any) {
    setAccordion({
      ...accordion,
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  }
}

export default Home;
