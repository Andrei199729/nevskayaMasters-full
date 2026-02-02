import {StyleSheet, Text, View} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {ChoiceRights, ChoiceRightsText} from '../../../shared/types';

interface IBlockTypeControl {
  setChoiceRights: (rights: ChoiceRights) => void;
  choiceRights: ChoiceRights;
}
function BlockTypeControl({setChoiceRights, choiceRights}: IBlockTypeControl) {
  return (
    <View style={styles.blockRadioBtns}>
      <RadioButton.Group
        onValueChange={newValue => setChoiceRights(newValue as ChoiceRights)}
        value={choiceRights}>
        <View style={styles.containerRadio}>
          <View style={styles.blockRadioBtn}>
            <RadioButton value={ChoiceRights.Supervisor} />
            <Text>{ChoiceRightsText.Supervisor}</Text>
          </View>
          <View style={styles.blockRadioBtn}>
            <RadioButton value={ChoiceRights.Manager} />
            <Text>{ChoiceRightsText.Manager}</Text>
          </View>
        </View>
      </RadioButton.Group>
    </View>
  );
}

const styles = StyleSheet.create({
  containerRadio: {
    flexDirection: 'row',
  },
  blockRadioBtns: {
    padding: 5,
  },
  blockRadioBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default BlockTypeControl;
