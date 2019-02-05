import { NativeModules, Platform } from 'react-native';

const { RNGoogleSignin } = NativeModules;

const IS_IOS = Platform.OS === 'ios';

class GoogleSignin {
  configPromise;

  constructor() {}

  checkNativeAvailable() {
    if (!RNGoogleSignin) {
      throw new Error(
       'RNGoogleSignin: not  available'
      );
    }
  }

  async signIn() {
    this.checkNativeAvailable();
    await this.configPromise;
    return await RNGoogleSignin.signIn();
  }

  async hasPlayServices(options = { showPlayServicesUpdateDialog: true }) {
    this.checkNativeAvailable();
    if (IS_IOS) {
      return true;
    } else {
      if (options && options.showPlayServicesUpdateDialog === undefined) {
        throw new Error(
          'RNGoogleSignin: Missing property `showPlayServicesUpdateDialog` in options object for `hasPlayServices`'
        );
      }
      return RNGoogleSignin.playServicesAvailable(options.showPlayServicesUpdateDialog);
    }
  }

  configure(options = {}) {
    this.checkNativeAvailable();
    if (options.offlineAccess && !options.webClientId) {
      throw new Error('RNGoogleSignin: offline use requires server web ClientID');
    }

    this.configPromise = RNGoogleSignin.configure(options);
  }

  async signInSilently() {
    this.checkNativeAvailable();
    await this.configPromise;
    return RNGoogleSignin.signInSilently();
  }

  async signOut() {
    this.checkNativeAvailable();
    return RNGoogleSignin.signOut();
  }

  async revokeAccess() {
    this.checkNativeAvailable();
    return RNGoogleSignin.revokeAccess();
  }

  async isSignedIn() {
    this.checkNativeAvailable();
    return RNGoogleSignin.isSignedIn();
  }
}

export const GoogleSigninSingleton = new GoogleSignin();

export const statusCodes = {
  SIGN_IN_CANCELLED: RNGoogleSignin ? RNGoogleSignin.SIGN_IN_CANCELLED : null,
  IN_PROGRESS: RNGoogleSignin ? RNGoogleSignin.IN_PROGRESS : null,
  PLAY_SERVICES_NOT_AVAILABLE: RNGoogleSignin ? RNGoogleSignin.PLAY_SERVICES_NOT_AVAILABLE : null,
  SIGN_IN_REQUIRED: RNGoogleSignin ? RNGoogleSignin.SIGN_IN_REQUIRED : null,
};
