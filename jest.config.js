export default {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^.+\\.svg$': 'jest-svg-transformer',
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePaths: ['<rootDir>'],
  reporters: [
    'default',
    [
      'jest-stare',
      {
        resultDir: 'tests/results/jest-stare',
        reportTitle: 'jest-stare!',
        additionalResultsProcessors: ['jest-junit'],
        coverageLink: '../../coverage/lcov-report/index.html',
        jestStareConfigJson: 'jest-stare.json',
        jestGlobalConfigJson: 'globalStuff.json',
      },
    ],
  ],
	transformIgnorePatterns: ['node_modules/(?!(swiper|ssr-window|dom7)/)'],
  moduleNameMapper: {
    '^.+\\.svg$': 'jest-svg-transformer',
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
    'swiper': '<rootDir>/node_modules/swiper/modules/index.mjs',
    'swiper/react': '<rootDir>/node_modules/swiper/react/swiper-react.js',
    'swiper/css': '<rootDir>/node_modules/swiper/swiper.min.css',
    'swiper/css/bundle': '<rootDir>/node_modules/swiper/swiper-bundle.min.css',
    'swiper/css/autoplay': '<rootDir>/node_modules/swiper/modules/autoplay/autoplay.min.css',
    'swiper/css/free-mode': '<rootDir>/node_modules/swiper/modules/autoplay/free-mode.min.css',
    'swiper/css/navigation': '<rootDir>/node_modules/swiper/modules/autoplay/navigation.min.css',
    'swiper/css/pagination': '<rootDir>/node_modules/swiper/modules/autoplay/pagination.min.css',
  },
  transform: {
    '^.+\\.(js|jsx|mjs)$': ['babel-jest'],
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':'<rootDir>/fileTransformer.ts',
    '^.+\\.(css)$': '<rootDir>/jest.transform.ts',
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
};
