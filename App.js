import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Picker } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import './global.js'
console.disableYellowBox = true;

export class StartScreen extends React.Component{
  render() {
    return (
      <View style={styles.container}>
        <Text>Bill Split!</Text>
        <Button
          onPress={() => this.props.navigation.navigate('getPeople')}
          title="Lets Start"
        />
      </View>
    );
  }
}

export class GetPeopleScreen extends React.Component{
  render() {
    return (
      <View style={styles.container}>
        <Text>How many roommates?</Text>
        <View style={{flexDirection : 'row'}}>
          <View style={{backgroundColor: '#fff', marginRight: 10, width: 100}}>
            <TextInput
              keyboardType='numeric'
              onChangeText={(text) => numPeople = text}
            />
          </View>
          <Button
            onPress={() => this.props.navigation.navigate('getNames')}
            title="Next"
          />
        </View>
      </View>
    );
  }
}

export class GetNamesScreen extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      nameEntry : "",
      index : 0
    }
  }

  submitName() {
    names.push(this.state.nameEntry)
    this.setState({ index: this.state.index + 1})
    if (this.state.index + 1 >= numPeople) {
      this.props.navigation.navigate('getBills')
    }
    this.textInput.clear()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>What are their names?</Text>
        <View style={{marginVertical:10}}>
          <Text>Roommate {this.state.index + 1}</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={{backgroundColor: '#fff', marginRight: 10, width: 100}}> 
              <TextInput
                onChangeText={(text) => this.setState({nameEntry: text})}
                ref={input => {this.textInput = input}}
              />
            </View>
            <Button
              onPress={() => {this.submitName()}}
              title="Next"
            />
          </View>
        </View>
      </View>
    );
  }
}

export class GetBillsScreen extends React.Component{
  render() {
    return (
      <View style={styles.container}>
        <Text>How many bills?</Text>
        <View style={{flexDirection : 'row'}}>
          <View style={{backgroundColor: '#fff', marginRight: 10, width: 100}}>
            <TextInput
              keyboardType='number-pad'
              onChangeText={(text) => numBills = text}
            />
          </View>
          <Button
            onPress={() => this.props.navigation.navigate('getBillDetails')}
            title="Next"
          />
        </View>
      </View>
    );
  }
}

export class GetBillDetails extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      nameEntry : "",
      price : 0.00,
      index : 0
    }
  }

  submitBill() {
    billNames.push(this.state.nameEntry)
    billPrices.push(this.state.price)
    this.setState({ index: this.state.index + 1})
    if (this.state.index + 1 >= numBills) {
      this.props.navigation.navigate('getAssign')
    }
    this.textInput.clear()
    this.textInput2.clear()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>What are they?</Text>
        <View style={{marginVertical:10}}>
          <Text>Bill {this.state.index + 1}</Text>
          <View style={{backgroundColor: '#fff', width: 100}}> 
            <TextInput
              onChangeText={(text) => this.setState({nameEntry: text})}
              ref={input => {this.textInput = input}}
            />
          </View>
          <Text>Price</Text>
          <View style={{backgroundColor: '#fff', marginBottom:10, width: 100}}> 
            <TextInput
              keyboardType='number-pad'
              onChangeText={(num) => this.setState({price: num})}
              ref={input => {this.textInput2 = input}}
            />
          </View>
          <Button
              onPress={() => {this.submitBill()}}
              title="Next"
          />
        </View>
      </View>
    );
  }
}

export class GetAssignScreen extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      index : 0,
      selected: 1,
    }
  }

  assignToBill() {
    billAssignee.push(this.state.selected)
    this.setState({ index: this.state.index + 1})
    if (this.state.index + 1 >= numBills) {
      this.props.navigation.navigate('results')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Who pays {billNames[this.state.index]}?</Text>
        <Picker
        style={{width: 150, height:180}}
        selectedValue={this.state.selected}
        itemStyle={{color:'#fff', fontSize:26}}
        onValueChange={(index) => this.setState({selected: index})}>
          {names.map((value, i) => (
            <Picker.Item label={value} value={i} key={i}/>
          ))}
        </Picker>
        <Button
          onPress={() => this.assignToBill()}
          title="Next"
        />
      </View>
    );
  }
}

export class ResultsScreen extends React.Component{

  componentWillMount(){
    this.calculateResults();
  }

  calculateResults() {
    var result = new Array(numPeople);
    
    for(var i = 0; i < numPeople; i++){
      result[i] = new Array(numPeople);
    }

    console.log(result)

    // Initialize array
    for (var i = 0; i < numPeople; i++){
      for (var j = 0; j < numPeople; j++){
        result[i][j] = 0.00;
      }
    }

    // Determine how much each individual pays for each bill
    for (var i = 0; i < numBills; i++) {
      billDiv.push(parseFloat(billPrices[i]) / parseFloat(numPeople))
    }

    // Accumulate what is owed to each other
    for (var i = 0; i < numPeople; i++){
      for (var j = 0; j < numPeople; j++){
        if (i != j) {
          for (var k = 0; k < numBills; k++){
            if(billAssignee[k] == j){
              result[i][j] += billDiv[k];
            }
          }
        }
      }
    }

    // Minimize number of transfers
    for (var i = 0; i < numPeople; i++){
      for (var j = 0; j < numPeople; j++){
        if (result[i][j] < result[j][i]){
          result[j][i] -= result[i][j];
          result[i][j] = 0.00;
        } else if (result[i][j] > result[j][i]){
          result[i][j] -= result[j][i];
          result[j][i] = 0.00;
        } else {
          result[i][j] = 0.00;
          result[j][i] = 0.00;
        }
      }
    }

    // Grab results
    for (var i = 0; i < numPeople; i++){
      for (var j = 0; j < numPeople; j++){
        if(result[i][j] > 0.00){
          resultComponent.push(
            <View>
              <Text>{names[i]} owes {names[j]} ${result[i][j].toFixed(2)}</Text>
            </View>
          )
        }
      }
    }
  }

  reset() {
    numPeople = 0
    numBills = 0
    names = []
    billNames = []
    billPrices = []
    billDiv = []
    billAssignee = []
    resultComponent = []
    this.props.navigation.navigate('start')

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>RESULTS!</Text>
        {resultComponent}
        <Button
          onPress={() => this.reset()}
          title="Lets do that again!"
        />
      </View>
    );
  }
}

const AppRouteNavigator = createSwitchNavigator({
  start: StartScreen,
  getPeople: GetPeopleScreen,
  getNames:  GetNamesScreen,
  getBills: GetBillsScreen,
  getBillDetails: GetBillDetails,
  getAssign: GetAssignScreen,
  results: ResultsScreen
})

const App = createAppContainer(AppRouteNavigator);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7D7D7D',
    alignItems: 'center',
    justifyContent: 'center',
  },
});