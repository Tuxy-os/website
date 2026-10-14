module.exports = {
  theme: {
    extend: {
      colors: {
        ink: '#07090C',
        fg: {
          DEFAULT: '#EDEFF1',
          muted: '#97A0A8',
          faint: '#626A72',
        },
        accent: {
          DEFAULT: '#E3A857',
          dim: '#B8863F',
          light: '#EFC076',
        },
        ice: '#7FBADA',
        violet: '#9C8CE0',
      },

      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },

      borderRadius: {
        '2xl': '22px',
      },

      keyframes: {
        'fade-up': {
          '0%': {
            opacity: 0,
            transform: 'translateY(12px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },

        'shimmer-text': {
          '0%,100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        },

        'float-y': {
          '0%,100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },

        'pulse-glow': {
          '0%,100%': {
            opacity: 0.55,
            transform: 'scale(1)',
          },
          '50%': {
            opacity: 1,
            transform: 'scale(1.1)',
          },
        },

        'orb-drift-1': {
          '0%': {
            transform: 'translate(0,0) scale(1)',
          },
          '100%': {
            transform: 'translate(60px,40px) scale(1.12)',
          },
        },

        'orb-drift-2': {
          '0%': {
            transform: 'translate(0,0) scale(1)',
          },
          '100%': {
            transform: 'translate(-50px,60px) scale(1.08)',
          },
        },

        'orb-drift-3': {
          '0%': {
            transform: 'translate(0,0) scale(1)',
          },
          '100%': {
            transform: 'translate(40px,-50px) scale(1.15)',
          },
        },

        'orb-drift-5': {
          '0%': {
            transform: 'translate(0,0) scale(0.9)',
          },
          '50%': {
            transform: 'translate(-70px,-30px) scale(1.25)',
          },
          '100%': {
            transform: 'translate(50px,60px) scale(0.95)',
          },
        },

        'marquee-scroll': {
          '0%': {
            transform: 'translateX(0)',
          },
          '100%': {
            transform: 'translateX(-50%)',
          },
        },

        'divider-sweep': {
          '0%': {
            left: '-30%',
          },
          '45%': {
            left: '100%',
          },
          '100%': {
            left: '100%',
          },
        },

        'icon-pop': {
          '0%': {
            transform: 'scale(1) rotate(0deg)',
          },
          '40%': {
            transform: 'scale(1.18) rotate(-6deg)',
          },
          '100%': {
            transform: 'scale(1) rotate(0deg)',
          },
        },

        'bounce-down': {
          '0%,100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(3px)',
          },
        },

        'blink-cursor': {
          '50%': {
            opacity: 0,
          },
        },

        'section-pulse': {
          '0%,100%': {
            boxShadow: 'inset 0 0 0 1px rgba(227,168,87,0)',
            background: 'rgba(227,168,87,0)',
          },
          '25%': {
            boxShadow: 'inset 0 0 0 1px rgba(227,168,87,.35)',
            background: 'rgba(227,168,87,.04)',
          },
        },

        'pop-in': {
          '0%': {
            opacity: 0,
            transform: 'translateY(16px) scale(0.98)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0) scale(1)',
          },
        },

        'ring-spin': {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },

        'badge-pulse': {
          '0%,100%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.08)',
          },
        },

        'shine-sweep': {
          '0%': {
            transform: 'translateX(-150%) skewX(-20deg)',
          },
          '100%': {
            transform: 'translateX(150%) skewX(-20deg)',
          },
        },

        'icon-bob': {
          '0%,100%': {
            transform: 'translateY(0) rotate(0deg)',
          },
          '50%': {
            transform: 'translateY(-6px) rotate(-4deg)',
          },
        },
      },

      animation: {
        'fade-up':
          'fade-up 0.8s cubic-bezier(0.16,1,0.3,1) forwards',

        'shimmer-text':
          'shimmer-text 7s cubic-bezier(0.37,0,0.63,1) infinite',

        'float-y':
          'float-y 6s cubic-bezier(0.45,0.05,0.55,0.95) infinite',

        'pulse-glow':
          'pulse-glow 5s cubic-bezier(0.37,0,0.63,1) infinite',

        'orb-1':
          'orb-drift-1 22s cubic-bezier(0.45,0.05,0.55,0.95) infinite alternate',

        'orb-2':
          'orb-drift-2 26s cubic-bezier(0.45,0.05,0.55,0.95) infinite alternate',

        'orb-3':
          'orb-drift-3 30s cubic-bezier(0.45,0.05,0.55,0.95) infinite alternate',

        'orb-4':
          'orb-drift-1 18s cubic-bezier(0.45,0.05,0.55,0.95) infinite alternate-reverse',

        'orb-5':
          'orb-drift-5 14s cubic-bezier(0.68,-0.6,0.32,1.6) infinite',

        marquee:
          'marquee-scroll 28s linear infinite',

        'divider-sweep':
          'divider-sweep 7s cubic-bezier(0.65,0,0.35,1) infinite',

        'icon-pop':
          'icon-pop 0.5s cubic-bezier(0.68,-0.55,0.27,1.55)',

        'bounce-down':
          'bounce-down 1.4s cubic-bezier(0.45,0.05,0.55,0.95) infinite',

        'blink-cursor':
          'blink-cursor 1s cubic-bezier(0.37,0,0.63,1) infinite',

        'section-pulse':
          'section-pulse 1.6s cubic-bezier(0.16,1,0.3,1)',

        'pop-in':
          'pop-in 0.6s cubic-bezier(0.16,1,0.3,1) forwards',

        'ring-spin':
          'ring-spin 5s linear infinite',

        'badge-pulse':
          'badge-pulse 2.2s cubic-bezier(0.68,-0.6,0.32,1.6) infinite',

        shine:
          'shine-sweep 1s cubic-bezier(0.65,0,0.35,1)',

        'icon-bob':
          'icon-bob 3.4s cubic-bezier(0.45,0.05,0.55,0.95) infinite',
      },
    },
  },
};