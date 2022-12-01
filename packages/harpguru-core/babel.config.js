module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['module:metro-react-native-babel-preset'],
    // This is what was used in the expo demo app, but
    // it only adds a few features on top of the
    // metro-react-native-babel-preset we already have
    // and also would require adding expo as a dep or
    // a peer-dep in this project which is supposed
    // to be agnostic to using expo or not.
    // presets: ['babel-preset-expo'],
    plugins: [
      '@babel/plugin-proposal-export-namespace-from',
      'react-native-reanimated/plugin',
    ],
  }
}
