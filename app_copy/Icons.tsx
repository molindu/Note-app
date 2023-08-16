import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import type { PropsWithChildren } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from './colors';


type IconsProps = PropsWithChildren<{
    name: string;
}>

const Icons = ({ name }: IconsProps) => {

    switch (name) {
        case 'plus':
            return <Icon
                name='plus'
                size={30}
                color={colors.PRIMARY}
                // style={[styles.icon, { ...style }]}
                style={[styles.plus]}
            />
            break;
        case 'cross':
            return <Icon
                name='times'
                size={15}
                color='gray' />
            break;
        case 'notfound':
            return <Icon
                name='frown-o'
                size={100}
                style={[styles.notfound]}
                color='gray' />
            break;
        case 'check':
            return <Icon
                name='save'
                size={24}
                style={[styles.save]}
                color='gray' />
            break;
        case 'delete':
            return <Icon
                name='trash'
                size={26}
                style={[styles.delete]}
                color='#f94449' />
            break;
        default:
            // return <Icon
            //     name='pencil'
            //     size={10}
            //     color='red' />
            break;
    }

};

const styles = StyleSheet.create({
    plus: {
        backgroundColor: colors.LIGHT,
        padding: 15,
        borderRadius: 10,
        // borderColor: colors.PRIMARY,
        elevation: 0,
    },
    notfound: {
        opacity: 0.3,
    },
    save: {
        color: colors.PRIMARY,
    },
    delete: {
        color: colors.ERROR,
    }
})
export default Icons;