module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionDuration: {
        '0': '0ms',
        '2000': '2000ms',
       }
    },
    fontSize: {
      title: "40px",
      description: "25px",
      chapterTitle: "100px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
