import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Picker, TouchableOpacity } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Animation from 'lottie-react-native';
import { Font } from 'expo';
import './global.js'
console.disableYellowBox = true;

export class StartScreen extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  } 

  async componentDidMount () {
    await Font.loadAsync({
      'Bebas': require('./BebasKai.ttf'),
    });
    this.setState({ isLoading: false })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}/>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={{fontFamily: 'Bebas', fontSize: 100, color: '#3A972D', marginBottom: 250}}>Bill Split!</Text>
        <Animation source={require('./animation-w2835-h1701.json')} autoPlay/>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('getPeople')}>
            <Text style={{fontSize:70, fontFamily:'Bebas', color: '#3A972D', textAlign:'center'}}>Press Here</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export class GetPeopleScreen extends React.Component{
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontFamily: 'Bebas', fontSize: 50, color: '#3A972D', textAlign: 'center'}}>How many roommates do you have?</Text>
        <View style={{ backgroundColor: '#fff', marginVertical: 20, width: 100, height: 100, elevation: 5, borderRadius: 20}}>
          <TextInput
            textAlign= 'center'
            caretHidden= {true}
            maxLength={2}
            style={{flex:1, fontFamily: 'Bebas', fontSize: 50, color: '#3A972D',}}
            keyboardType='numeric'
            onChangeText={(text) => numPeople = text}
          />
        </View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('getNames')}>
          <Text style={{fontSize:70, fontFamily:'Bebas', color: '#3A972D', textAlign:'center'}}>➭</Text>
        </TouchableOpacity>
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
        <Text style={{ fontFamily: 'Bebas', fontSize: 50, color: '#3A972D', textAlign: 'center', marginHorizontal:15}}>What are their names?</Text>
        <View style={{marginVertical:10}}>
          <Text style={{fontFamily: 'Bebas', fontSize: 20, color: '#3A972D', textAlign: 'center'}}>Roommate {this.state.index + 1}</Text>
          <View style={{ backgroundColor: '#fff', marginVertical: 20, width: 300, height: 70, elevation: 5, borderRadius: 20}}>
            <TextInput
              textAlign= 'center'
              caretHidden= {true}
              maxLength={12}
              style={{flex:1, fontFamily: 'Bebas', fontSize: 50, color: '#3A972D',}}
              onChangeText={(text) => this.setState({nameEntry: text})}
              ref={input => {this.textInput = input}}
            />
          </View>  
          <TouchableOpacity onPress={() => {this.submitName()}}>
            <Text style={{fontSize:70, fontFamily:'Bebas', color: '#3A972D', textAlign:'center'}}>➭</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export class GetBillsScreen extends React.Component{
  render() {
    return (
     <View style={styles.container}>
      <Text style={{ fontFamily: 'Bebas', fontSize: 50, color: '#3A972D', textAlign: 'center'}}>How many bills?</Text>
      <View style={{ backgroundColor: '#fff', marginVertical: 20, width: 100, height: 100, elevation: 5, borderRadius: 20}}>
        <TextInput
          textAlign= 'center'
          caretHidden= {true}
          maxLength={2}
          style={{flex:1, fontFamily: 'Bebas', fontSize: 50, color: '#3A972D',}}
          keyboardType='numeric'
          onChangeText={(text) => numBills = text}
        />
      </View>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('getBillDetails')}>
        <Text style={{fontSize:70, fontFamily:'Bebas', color: '#3A972D', textAlign:'center'}}>➭</Text>
      </TouchableOpacity>
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
        <View style={{marginVertical:10}}>
          <Text style={{ fontFamily: 'Bebas', fontSize: 30, color: '#3A972D', textAlign: 'center'}}>Bill {this.state.index + 1} Name</Text>
          <View style={{ backgroundColor: '#fff', marginTop: 5, marginBottom: 20, width: 300, height: 70, elevation: 5, borderRadius: 20}}>
            <TextInput
              textAlign= 'center'
              caretHidden= {true}
              maxLength={12}
              style={{flex:1, fontFamily: 'Bebas', fontSize: 50, color: '#3A972D',}}
              onChangeText={(text) => this.setState({nameEntry: text})}
              ref={input => {this.textInput = input}}
            />
          </View>
          <Text style={{ fontFamily: 'Bebas', fontSize: 30, color: '#3A972D', textAlign: 'center'}}>Price</Text>
          <View style={{ backgroundColor: '#fff', marginTop: 5, marginBottom: 20, width: 300, height: 70, elevation: 5, borderRadius: 20}}>
            <TextInput
              textAlign= 'center'
              caretHidden= {true}
              maxLength={7}
              keyboardType='number-pad'
              style={{flex:1, fontFamily: 'Bebas', fontSize: 50, color: '#3A972D',}}
              onChangeText={(num) => this.setState({price: num})}
              ref={input => {this.textInput2 = input}}
            />
          </View>
          <TouchableOpacity onPress={() => {this.submitBill()}}>
            <Text style={{fontSize:70, fontFamily:'Bebas', color: '#3A972D', textAlign:'center'}}>➭</Text>
          </TouchableOpacity>
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
        <Text style={{ fontFamily: 'Bebas', fontSize: 50, color: '#3A972D', textAlign: 'center', marginHorizontal: 15}}>Who pays for {billNames[this.state.index]}?</Text>
        <Picker
          style={{width: 150, height:180, fontFamily: 'Bebas', fontSize: 30, color: '#3A972D', textAlign: 'center'}}
          selectedValue={this.state.selected}
          itemStyle={{color:'#fff', fontSize:26}}
          onValueChange={(index) => this.setState({selected: index})}>
            {names.map((value, i) => (
              <Picker.Item label={value} value={i} key={i}/>
            ))}
        </Picker>
        <TouchableOpacity onPress={() => this.assignToBill()}>
            <Text style={{fontSize:70, fontFamily:'Bebas', color: '#3A972D', textAlign:'center'}}>➭</Text>
        </TouchableOpacity>
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
              <Text style={{ fontFamily: 'Bebas', fontSize: 30, color: '#3A972D', textAlign: 'center', marginHorizontal: 15}}>{names[i]} owes {names[j]} ${result[i][j].toFixed(2)}</Text>
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
        <Text style={{ fontFamily: 'Bebas', fontSize: 70, color: '#3A972D', textAlign: 'center', marginHorizontal: 15}}>RESULTS</Text>
        {resultComponent}
        <TouchableOpacity onPress={() => this.reset()}>
            <Text style={{fontSize:50, fontFamily:'Bebas', color: '#3A972D', textAlign:'center', marginTop:30}}>Start Over</Text>
        </TouchableOpacity>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});