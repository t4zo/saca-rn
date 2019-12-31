import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  ScrollView,
  Text,
  View,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import _ from 'lodash';
import Accordion from 'react-native-collapsible/Accordion';

import AccordionModal from 'models/Accordion';

import Cards from 'components/Cards';
import Add from 'components/Buttons/Add';

import colors from 'styles/colors';
import styles from './styles';

import {
  getCategories,
  getUserCategories,
} from 'actions/CategoriesAction';

import Reducers from 'models/Reducers';
import User from 'models/User';
import Category from 'models/Category';

function Home() {
  const dispatch = useDispatch();

  const user = useSelector<Reducers, User>(state => state.user);
  const categories = useSelector<Reducers, Category[]>(state => state.categories);

  const [accordion, setAccordion] = useState<AccordionModal>(new AccordionModal());

  useEffect(() => {
    async function fetch() {
      if (_.isEmpty(user)) {
        await dispatch(getCategories());
      } else {
        await dispatch(getUserCategories(user));
      }
    }

    fetch();
  }, [user]);

  const content = categories.map(category => {
    return {
      title: category.name,
      content: <Cards cards={category.cards}/>
    };
  });

  return (
    <View style={styles.container}>
      {_.isEmpty(categories) ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" color={colors.primary} />
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
