import React from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';
import {white} from '../utils/colors';
import MetricCard from './MetricCard';
import {addEntry} from '../actions';
import {removeEntry} from '../utils/api';
import {timeToString, getDailyReminderValue} from '../utils/helpers';
import TextButton from './TextButton';

class EntryDetail extends React.Component {

    shouldComponentUpdate(nextProps) {
        return nextProps.metrics !== null && !nextProps.metrics.today;
    }

    reset = () => {
        const {remove, goBack, entryId} = this.props;
        remove();
        goBack();
        removeEntry(entryId);
    }

    render() {
        const {metrics} = this.props;
        return (
            <View style={styles.container}>
                <MetricCard metrics={metrics[0]}/>
                <TextButton onPress={this.reset} style={{margin: 20}}>
                    Reset
                </TextButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 15,
    }
})

const mapStateToProps = (state, {route}) => {
    const { entryId } = route.params;

    return {
        entryId,
        metrics: state[entryId]
    }
}

const mapDispatchToProps = (dispatch, {navigation, route}) => {
    const {entryId} = route.params;
    return {
        remove: () => dispatch(addEntry({
            [entryId]: timeToString() === entryId ? getDailyReminderValue() : []
        })),
        goBack: () => navigation.goBack(),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);