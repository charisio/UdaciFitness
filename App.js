import React from 'react';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers';
import AddEntry from './components/AddEntry';
import History from "./components/History";
//https://expo.github.io/vector-icons
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { purple, white } from './utils/colors'
import Constants from 'expo-constants';
import EntryDetail from './components/EntryDetail';
import { createStackNavigator } from '@react-navigation/stack';
import Title from './components/Title';

const UdaciStatusBar = ({backgroundColor, ...props}) => (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
)

const Stack = createStackNavigator();
const MainNavigation = () => (
    <Stack.Navigator mode='modal'>
        <Stack.Screen name='Home' component={TabNav} options={{headerShown: false}}/>
        <Stack.Screen name='EntryDetail' component={EntryDetail} options={({ route }) => ({
            headerTintColor: white,
            headerStyle: {
                    backgroundColor: purple
                },
                title: route.params.entryId,
                headerTitle: props => <Title {...props} />
            })} />
    </Stack.Navigator>
);


const Tabs =
    Platform.OS === 'ios'
        ? createBottomTabNavigator()
        : createMaterialTopTabNavigator()

const TabNav = () => (
    <Tabs.Navigator
        tabBarOptions={{
            header: null,
            activeTintColor: Platform.OS === 'ios' ? purple : white,
            showIcon: true,
            style: {
                height: 80,
                backgroundColor: Platform.OS === 'ios' ? white : purple,
                shadowColor: 'rgba(0, 0, 0, 0.24)',
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 6,
                shadowOpacity: 1
            }
        }}
    >
        <Tabs.Screen
            name='History'
            component={History}
            options={{
                tabBarLabel: 'History',
                tabBarIcon: ({ color, size, tintColor }) => (
                    <Ionicons name="ios-bookmarks" size={size} color={color}/>
                ),
            }}
        />
        <Tabs.Screen
            name='Add Entry'
            component={AddEntry}
            options={{
                tabBarLabel: 'Add Entry',
                tabBarIcon: ({ size, color }) => (
                    <FontAwesome name="plus-square" size={size} color={color}/>
                ),
            }}
        />
    </Tabs.Navigator>
);

export default class App extends React.Component {
    state = {
        value: 0
    }

    render() {
        return (
            //ScrollView or FlatList <- better for performance - only loads what the user currently sees
            <Provider store={createStore(reducer)}>
                <View style={{flex: 1}} >
                <UdaciStatusBar backgroundColor={purple} barStyle='light-content'/>
                <NavigationContainer>
                    <MainNavigation/>
                </NavigationContainer>
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
});