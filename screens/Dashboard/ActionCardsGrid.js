import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import ActionCard from '../../components/ActionCard';
import actions from '../../data/actions.json'; // ✅ Import JSON Data

const ActionCardsGrid = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.cardContainer}>
      <FlatList
        data={actions}
        keyExtractor={item => item.id}
        numColumns={3} // Display in grid format
        renderItem={({ item }) => (
          <ActionCard
            icon={item.icon}
            text={item.text}
            onPress={() => navigation.navigate(item.screen)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginVertical: 15,
  },
});

export default ActionCardsGrid;
