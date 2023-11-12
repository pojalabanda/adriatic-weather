module.exports = {
    content: [
        "./src/**/*.{html,md,js}",
        "./code/**/*.{html,js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#1c1c1c',
                'secondary': '#e6242d',
                'tertiary': '#f5f5f5',
                'muted': '#7a7a7a',
            },
            backgroundColor: {
                'link-hover': '#f4c10b',
            },
            borderColor: {
               'link': '#f4c10b',
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
        require("@tailwindcss/typography")
    ]
}
