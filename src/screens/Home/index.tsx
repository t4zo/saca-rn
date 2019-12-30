import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  ScrollView,
  Text,
  View,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {withNavigation, NavigationInjectedProps} from 'react-navigation';
import _ from 'lodash';
import Accordion from 'react-native-collapsible/Accordion';

import State from 'models/State';

import Container from 'components/Container';
import Add from 'components/Buttons/Add';

import colors from 'styles/colors';
import styles from './styles';

import {
  getCategories,
  getCardsCategories,
} from 'actions/CategoriesAction';

import Reducers from 'models/Reducers';
import User from 'models/User';
import Category from 'models/Category';

function Home(props: NavigationInjectedProps) {
  const dispatch = useDispatch();

  const user = useSelector<Reducers, User>(state => state.user);
  const categories = useSelector<Reducers, Category[]>(state => state.categories);

  const [state, setState] = useState<State>(new State());

  useEffect(() => {
    async function update() {
      await dispatch(getCategories());
      
      if (!_.isEmpty(user)) {
        await dispatch(getCardsCategories(user));
        setState({
          ...state,
          accordion: {...state.accordion, activeSections: [0]},
        });
      }
    }

    update();
  }, [user, state.update]);

  const content = categories.map(category => {
    return {
      title: category.name,
      content: (
        <Container
          state={state}
          setState={setState}
          cards={category.cards}
        />
      ),
    };
  });

  return (
    <View style={styles.container}>
      {!_.isEmpty(categories) ? (
        <>
          <ScrollView>
            <Accordion
              activeSections={state.accordion.activeSections}
              sections={content}
              touchableComponent={TouchableWithoutFeedback}
              renderHeader={renderHeader}
              renderContent={renderContent}
              duration={400}
              onChange={setSections}
            />
          </ScrollView>
          {!_.isEmpty(user) && <Add />}
        </>
      ) : (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
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

  function setSections(sections: any) {
    setState({
      ...state,
      accordion: {
        ...state.accordion,
        activeSections: sections.includes(undefined) ? [] : sections,
      },
    });
  }
}

export default withNavigation(Home);
