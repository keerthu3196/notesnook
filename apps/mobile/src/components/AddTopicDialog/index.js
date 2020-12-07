import React, {createRef} from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getElevation} from '../../utils';
import {eSendEvent, ToastEvent} from '../../services/EventManager';
import {eOnNewTopicAdded} from '../../utils/Events';
import {Toast} from '../Toast';
import {Button} from '../Button';
import BaseDialog from '../Dialog/base-dialog';
import DialogHeader from '../Dialog/dialog-header';
import DialogButtons from '../Dialog/dialog-buttons';
import {opacity, ph, pv, SIZE, WEIGHT} from '../../utils/SizeUtils';
import {db} from '../../utils/DB';
import {DDS} from '../../services/DeviceDetection';
import Seperator from '../Seperator';
import { updateEvent } from '../DialogManager/recievers';
import { Actions } from '../../provider/Actions';

export class AddTopicDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      titleFocused: false,
    };

    this.title;
    this.titleRef = createRef();
  }

  addNewTopic = async () => {
    if (!this.title)
      return ToastEvent.show('Title is required', 'error', 'local');

    if (!this.props.toEdit) {
      await db.notebooks.notebook(this.props.notebookID).topics.add(this.title);
      //ToastEvent.show('New topic added', 'success');
    } else {
      let topic = this.props.toEdit;
      topic.title = this.title;

      await db.notebooks.notebook(topic.notebookId).topics.add(topic);
    }
    this.close();
    updateEvent({type:Actions.NOTEBOOKS})
    eSendEvent(eOnNewTopicAdded);
  };

  open() {
    this.setState({
      visible: true,
    });
  }
  close = () => {
    this.title = null;
    this.setState({
      visible: false,
    });
  }

  render() {
    const {visible, titleFocused} = this.state;
    const {colors, toEdit} = this.props;
    if (!visible) return null;
    return (
      <BaseDialog
        onShow={() => {
          this.titleRef.current?.focus();
        }}
        statusBarTranslucent={false}
        visible={true}
        onRequestClose={this.close}>
        <View
          style={{
            ...getElevation(5),
            width: DDS.isTab ? 350 : '80%',
            maxHeight: 350,
            borderRadius: 5,
            backgroundColor: colors.bg,
            paddingHorizontal: ph,
            paddingVertical: pv,
          }}>
          <DialogHeader
            icon="book-outline"
            title={toEdit ? 'Edit Topic' : 'Add New Topic'}
          />

          <Seperator />

          <TextInput
            ref={this.titleRef}
            style={{
              padding: pv,
              borderBottomWidth: 1,
              borderColor: titleFocused ? colors.accent : colors.nav,
              paddingHorizontal: ph,
              borderRadius: 5,
              fontSize: SIZE.sm,
              fontFamily: WEIGHT.regular,
              color: colors.pri,
              marginTop: 20,
            }}
            onFocus={() => {
              this.setState({
                titleFocused: true,
              });
            }}
            onBlur={() => {
              this.setState({
                titleFocused: true,
              });
            }}
            defaultValue={toEdit ? toEdit.title : null}
            onChangeText={(value) => {
              this.title = value;
            }}
            placeholder="Enter title of topic"
            placeholderTextColor={colors.icon}
          />

          <DialogButtons
            positiveTitle={toEdit ? 'Save' : 'Add'}
            onPressNegative={() => {
              this.title = null;
              this.setState({
                visible: false,
              });
            }}
            onPressPositive={this.addNewTopic}
          />
        </View>
        <Toast context="local" />
      </BaseDialog>
    );
  }
}
