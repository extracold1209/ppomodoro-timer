module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
    });
    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};
