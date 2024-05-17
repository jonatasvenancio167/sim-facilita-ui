export const theme = {

  grid: {
    container: '130rem',
    gutter: '3.2rem',
    small: '1rem',
    layout: '90%'
  },

  font: {
    family:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    light: 300,
    normal: 400,
    bold: 700,

    sizes: {
      desktop: {
        xsmall: '0.75rem', //12px
        small: '0.875rem', //14px
        medium: '1rem', //16px
        large: '1.125rem', //18px
        xlarge: '1.25rem', //20px
        xxlarge: '2rem', //32px
        xxxlarge: '2.375rem', //38px
        huge: '2.813rem' //45px
      },
      mobile: {
        xsmall: '0.833rem', //10px
        small: '1rem', //12px
        medium: '1.167rem', //14px
        large: '1.5rem', //18px
        xlarge: '1.667rem' //20px
      }
    }
  },


  layers: {
    base: 10,
    overlay: 30,
    modal: 40,
    alwaysOnTop: 50
  }
}