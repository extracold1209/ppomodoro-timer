import palette from './materialPalette';

/**
 * from @rebass/preset theme
 * light,dark color pick : https://material.io/resources/color
 */
const theme = {
    colors: {
        primary: palette.deeporange.a200,
        primaryLight: '#ffa06d',
        primaryDark: '#c53d13',
        secondary: palette.teal.a700,
        secondaryLight: '#5df2d6',
        secondaryDark: '#008e76',
        highlight: 'hsla(205, 100%, 40%, 0.125)',
        text: '#000',
        background: '#fff',
    },
    fonts: {
        body: 'system-ui, sans-serif',
        heading: 'inherit',
        monospace: 'Menlo, monospace',
    },
    fontSizes: [
        12, 14, 16, 20, 24, 32, 48, 64, 96
    ],
    fontWeights: {
        body: 400,
        heading: 700,
        bold: 700,
    },
    lineHeights: {
        body: 1.5,
        heading: 1.25,
    },
    space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
    sizes: {
        avatar: 48,
    },
    radii: {
        default: 4,
        circle: 99999,
    },
    shadows: {
        card: '5px 7px 15px 0px rgba(189,189,189,1)',
    },
    // rebass variants
    text: {
        heading: {
            fontFamily: 'heading',
            lineHeight: 'heading',
            fontWeight: 'heading',
        },
        display: {
            fontFamily: 'heading',
            fontWeight: 'heading',
            lineHeight: 'heading',
            fontSize: [5, 6, 7],
        },
        caps: {
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
        },
    },
    variants: {
        avatar: {
            width: 'avatar',
            height: 'avatar',
            borderRadius: 'circle',
        },
        card: {
            p: 2,
            bg: 'background',
            borderRadius: 4,
            boxShadow: 'card',
        },
        link: {
            color: 'primary',
        },
        nav: {
            fontSize: 1,
            fontWeight: 'bold',
            display: 'inline-block',
            p: 2,
            color: 'inherit',
            textDecoration: 'none',
            ':hover,:focus,.active': {
                color: 'primary',
            }
        },
    },
    buttons: {
        primary: {
            fontSize: 2,
            fontWeight: 'bold',
            color: 'background',
            bg: 'primary',
            cursor: 'pointer',
            borderRadius: 'default',
        },
        outline: {
            variant: 'buttons.primary',
            color: 'primary',
            bg: 'transparent',
            boxShadow: 'inset 0 0 2px',
        },
        secondary: {
            variant: 'buttons.primary',
            color: 'background',
            cursor: 'pointer',
            bg: 'secondary',
        },
        secondaryDark: {
            variant: 'buttons.secondary',
            bg: 'secondaryDark'
        }
    },
    styles: {
        root: {
            fontFamily: 'body',
            fontWeight: 'body',
            lineHeight: 'body',
        },
    },
};

export type DefaultTheme =  typeof theme;
export default theme;
