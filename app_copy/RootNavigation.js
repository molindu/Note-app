// // RootNavigation.js

// import { createNavigationContainerRef } from '@react-navigation/native';

// export const navigationRef = createNavigationContainerRef()

// export function navigate(name, params) {
//   if (navigationRef.isReady()) {
//     navigationRef.navigate(name, params);
//   }
// }

// // add other navigation functions that you need and export them
import { CommonActions, StackActions } from '@react-navigation/native';

let navigator;

function setTopLevelNavigator(navigatorRef) {
    navigator = navigatorRef;
}

function navigate(routeName, params) {
    if (navigator) {
        navigator.dispatch(
            CommonActions.navigate({
                name: routeName,
                params,
            })
        );
    }
}

function goBack() {
    if (navigator) {
        navigator.dispatch(CommonActions.goBack());
    }
}

function reset(routeName, params) {
    if (navigator) {
        navigator.dispatch(
            StackActions.reset({
                index: 0,
                actions: [CommonActions.navigate({ name: routeName, params })],
            })
        );
    }
}

// Add more navigation functions as needed

export default {
    navigate,
    setTopLevelNavigator,
    goBack,
    reset,
};
