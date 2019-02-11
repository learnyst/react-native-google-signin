import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  NativeModules,
  requireNativeComponent,
  ViewPropTypes,
  Platform,
  DeviceEventEmitter,
} from 'react-native';

const { RNGoogleSignin } = NativeModules;
const RNGoogleSigninButton = requireNativeComponent('RNGoogleSigninButton', null);

export class GoogleSigninButton extends PureComponent {
  static propTypes = {
    ...ViewPropTypes,
    size: PropTypes.number,
    color: PropTypes.number,
    disabled: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (Platform.OS === 'android') {
      this._clickListener = DeviceEventEmitter.addListener('RNGoogleSigninButtonClicked', () => {
        this.props.onPress && this.props.onPress();
      });
    }
  }

  componentWillUnmount() {
    this._clickListener && this._clickListener.remove();
  }

  render() {
    const { style, ...props } = this.props;

    return <RNGoogleSigninButton style={[{ backgroundColor: 'transparent' }, style]} {...props} />;
  }
}

GoogleSigninButton.Size = {
  Icon: RNGoogleSignin ? RNGoogleSignin.BUTTON_SIZE_ICON : null,
  Standard: RNGoogleSignin ? RNGoogleSignin.BUTTON_SIZE_STANDARD : null,
  Wide: RNGoogleSignin ? RNGoogleSignin.BUTTON_SIZE_WIDE : null,
};

GoogleSigninButton.Color = {
  Auto: RNGoogleSignin ? RNGoogleSignin.BUTTON_COLOR_AUTO : null,
  Light: RNGoogleSignin ? RNGoogleSignin.BUTTON_COLOR_LIGHT : null,
  Dark: RNGoogleSignin ? RNGoogleSignin.BUTTON_COLOR_DARK : null,
};
