require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests();

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock')
)

require('../../node_modules/react-native-gesture-handler/jestSetup.js')
