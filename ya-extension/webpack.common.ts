import CopyWebpackPlugin from 'copy-webpack-plugin';
import { readdirSync } from 'fs';
import path from 'path';
import webpack from 'webpack';

const getEntries = (srcDir: string) => {
  const files = readdirSync(srcDir).filter((file) => file.endsWith('.ts'));
  const entries: Record<string, string> = {};

  files.forEach((file) => {
    const name = path.basename(file, '.ts');
    entries[name] = `./src/${file}`;
  });

  return entries;
};

const config: webpack.Configuration = {
  entry: getEntries(path.resolve(__dirname, 'src')),
  resolve: {
    extensions: ['.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-import', 'tailwindcss'],
              },
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: 'static' }],
    }),
  ],
};

export default config;
