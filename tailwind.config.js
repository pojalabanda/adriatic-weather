module.exports = {
    content: [
        "./src/**/*.{html,md,js}",
        "./code/**/*.{html,js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#f5f5f5',
                'secondary': '#031c97',
                'tertiary': '#ffffff',
                'muted': '#7a7a7a',
            },
            backgroundColor: {
                'link-hover': '#7a7a7a',
            },
            borderColor: {
               'link': '#031c97',
               DEFAULT: '#D5D4D3',
            },
            spacing: {
                'gap': '1rem',
                '2gap': '2rem',
                '3gap': '3rem',
                '4gap': '4rem',
                '5gap': '5rem',
                '6gap': '6rem',
                '7gap': '7rem',
                '8gap': '8rem',
            },
            fontFamily: {
                serif: ['Bitter', 'Arial', 'Helvetica', 'serif'],
                sans: ['IBM Plex Sans', 'sans-serif']
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        color: '#212529',
                    }
                }
            })
        }
    },
    plugins: [
        require('@tailwindcss/typography'),
    ]
}
