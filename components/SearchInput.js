import React from 'react';
import { StyleSheet, View, TextInput, } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props); {
      this.state = { text: ''}
    }
  }
  handleChangeText = (text) => { this.setState({ text }) };
  handleSubmitEditing = () => {
    const { onSubmit } = this.props;
    const { text } = this.state;
    if (!text) return;
    onSubmit(text);
    this.setState({ text: '' });
  };
  render() {
    const { placeholder } = this.props;
    const { text } = this.state;
    return (
      <View style={styles.container}>
        <TextInput autoCorrect={false}
          placeholder={this.props.placeholder}
          placeholderTextColor="white"
          style={styles.TextInput}
          underlineColorAndroid="transparent"
          clearButtonMode="always"
          onChangeText={this.handleChangeText}
          onSubmitEditing={this.handleSubmitEditing}
          value={text}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 20,
    backgroundColor: '#666',
    marginHorizontal: 60,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  TextInput: {
    flex: 1,
    color: 'white',
  }
})