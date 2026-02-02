// eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

// eslint-disable-next-line no-undef
module.exports = mergeConfig(getDefaultConfig(__dirname), config);

// const {getDefaultConfig} = require('expo/metro-config');

// module.exports = (() => {
//   const config = getDefaultConfig(__dirname);

//   const {transformer, resolver} = config;

//   config.transformer = {
//     ...transformer,
//     babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
//   };
//   config.resolver = {
//     ...resolver,
//     assetExts: resolver.assetExts.filter(ext => ext !== 'svg'),
//     sourceExts: [...resolver.sourceExts, 'svg'],
//   };

//   return config;
// })();
