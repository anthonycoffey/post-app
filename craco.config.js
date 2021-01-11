module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
    css: {
      loaderOptions: {
        url: false,
      },
    },
  },
};
